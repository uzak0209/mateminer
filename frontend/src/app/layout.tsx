import "./globals.css";
import type { Metadata } from "next";
// 日本語フォント (Noto Sans JP) を適用する場合
import { Noto_Sans_JP } from "next/font/google";
import { Header, Footer } from "@/components/layout";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: "UniRoom | 大学生のためのルームシェア・マッチング",
  description: "まずは理想のルームメイトを見つけて、それから一緒に物件を探そう。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}