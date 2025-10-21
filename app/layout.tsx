import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

const YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: {
    default: "Next MD Blog",
    template: "%s | Next MD Blog",
  },
  description: "Next.jsとMarkdownで構築されたブログテンプレートです。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <a
          href="#content"
          className="absolute left-6 top-4 z-50 -translate-y-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white opacity-0 transition focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          コンテンツへスキップ
        </a>
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-gray-900 hover:text-blue-600 focus-visible:text-blue-600"
              >
                Next MD Blog
              </Link>
            </div>
          </header>
          <div id="content" className="flex-1">
            {children}
          </div>
          <footer className="border-t border-gray-200 bg-white/80">
            <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-gray-500">
              © {YEAR} Next MD Blog Template
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
