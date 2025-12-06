import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, LogIn } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* ロゴエリア */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-blue-600">🏠 UniRoom</span>
        </Link>

        {/* ナビゲーション (PC) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/search" className="hover:text-blue-600 transition-colors">
            ルームメイトを探す
          </Link>
          <Link href="/dashboard/rooms" className="hover:text-blue-600 transition-colors">
            物件リスト
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            サービスについて
          </Link>
        </nav>

        {/* アクションボタン */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">
              <LogIn className="w-4 h-4 mr-2" />
              ログイン
            </Link>
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-bold" asChild>
            <Link href="/register/lifestyle">
              無料で始める
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}