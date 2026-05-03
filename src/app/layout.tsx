import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anirudh Suresh",
  description: "Portfolio of Anirudh Suresh — Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('unhandledrejection', (event) => {
                if (event.reason && (
                  event.reason.message?.includes('MetaMask') || 
                  event.reason.message?.includes('extension') ||
                  event.reason.message?.includes('i: Failed to connect')
                )) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                }
              });
              const originalWarn = console.warn;
              console.warn = (...args) => {
                if (args[0]?.includes?.('ensure that the container has a non-static position')) return;
                originalWarn.apply(console, args);
              };
            `,
          }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}