import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchCategories } from "@/lib/wordpress";
import { WordPressCategory } from "@/types/wordpress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Blog - Latest Posts",
  description: "A modern blog powered by Next.js and WordPress API",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch categories for navigation
  let categories: WordPressCategory[] = [];
  try {
    categories = await fetchCategories();
  } catch (error) {
    // Silently fail for categories - the app will still work without navigation
    console.warn('Categories not available:', error instanceof Error ? error.message : 'Unknown error');
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Header categories={categories} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
