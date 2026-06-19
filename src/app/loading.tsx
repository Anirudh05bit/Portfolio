// Portfolio-main/src/app/loading.tsx
"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#5ed29c]/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#5ed29c] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-[#5ed29c] text-sm tracking-[3px] uppercase font-medium">Loading Experience...</p>
      </div>
    </div>
  );
}