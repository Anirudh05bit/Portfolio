"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 12;

interface TrailPoint {
    x: number;
    y: number;
}

export default function CustomCursor() {
    const [trail, setTrail] = useState<TrailPoint[]>(
        Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
    );
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const posRef = useRef<TrailPoint>({ x: -100, y: -100 });
    const frameRef = useRef<number>(0);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
        };
        const down = () => setIsClicking(true);
        const up = () => setIsClicking(false);
        const hoverIn = () => setIsHovering(true);
        const hoverOut = () => setIsHovering(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);
        document.querySelectorAll("a, button").forEach(el => {
            el.addEventListener("mouseenter", hoverIn);
            el.addEventListener("mouseleave", hoverOut);
        });

        const animate = () => {
            setTrail(prev => {
                const next = [{ ...posRef.current }, ...prev.slice(0, TRAIL_LENGTH - 1)];
                return next;
            });
            frameRef.current = requestAnimationFrame(animate);
        };
        frameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
            cancelAnimationFrame(frameRef.current);
        };
    }, []);

    return (
        <>
            {/* trail dots */}
            {trail.map((pos, i) => {
                const progress = 1 - i / TRAIL_LENGTH;
                const size = i === 0
                    ? (isClicking ? 14 : isHovering ? 16 : 10)
                    : Math.max(1.5, 6 * progress * progress);
                const opacity = i === 0 ? 1 : progress * progress * 0.7;
                const blur = i === 0 ? 0 : (1 - progress) * 3;

                // color shifts from white at head to blue-ish at tail
                const r = Math.round(200 + 55 * progress);
                const g = Math.round(200 + 55 * progress);
                const b = 255;
                const color = i === 0
                    ? (isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.95)")
                    : `rgba(${r},${g},${b},${opacity})`;

                return (
                    <div
                        key={i}
                        style={{
                            position: "fixed",
                            left: pos.x,
                            top: pos.y,
                            transform: "translate(-50%, -50%)",
                            width: size,
                            height: size,
                            borderRadius: "50%",
                            background: color,
                            pointerEvents: "none",
                            zIndex: 9999,
                            filter: blur > 0 ? `blur(${blur}px)` : "none",
                            transition: i === 0 ? "width 0.15s, height 0.15s" : "none",
                            boxShadow: i === 0
                                ? isHovering
                                    ? "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(180,200,255,0.3)"
                                    : "0 0 10px rgba(255,255,255,0.4)"
                                : i < 3
                                    ? `0 0 ${6 * progress}px rgba(180,200,255,${opacity * 0.5})`
                                    : "none",
                            mixBlendMode: i === 0 ? "difference" : "normal",
                        }}
                    />
                );
            })}

            {/* crosshair lines on hover */}
            {isHovering && (
                <>
                    <div style={{
                        position: "fixed",
                        left: trail[0].x,
                        top: trail[0].y,
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none",
                        zIndex: 9998,
                    }}>
                        <div style={{
                            position: "absolute",
                            top: 0, left: -16,
                            width: 32, height: "1px",
                            background: "rgba(255,255,255,0.3)",
                        }} />
                        <div style={{
                            position: "absolute",
                            top: -16, left: 0,
                            width: "1px", height: 32,
                            background: "rgba(255,255,255,0.3)",
                        }} />
                    </div>
                </>
            )}
        </>
    );
}