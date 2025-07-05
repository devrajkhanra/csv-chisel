import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Toaster } from "@/components/ui/Toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CSV Chisel - Premium Data Processing Tool",
  description: "Transform and filter your CSV data with precision and elegance",
  keywords: ["CSV", "data processing", "filtering", "analytics", "business intelligence"],
  authors: [{ name: "CSV Chisel Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2563eb",
  openGraph: {
    title: "CSV Chisel - Premium Data Processing Tool",
    description: "Transform and filter your CSV data with precision and elegance",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <ErrorBoundary>
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}