import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // 追加
import { Home, Search, LogIn, Menu, Building } from "lucide-react"; // Menuアイコン追加

export function Header() {
  // ナビゲーションリンクの定義（DRY原則）
  const navItems = [
    { href: "/search", label: "ルームメイトを探す", icon: Search },
    { href: "/dashboard/rooms", label: "物件リスト", icon: Building },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-blue-600">🏠 UniRoom</span>
        </Link>

        {/* === PC用ナビゲーション === */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-blue-600 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* PC用アクションボタン */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login"><LogIn className="w-4 h-4 mr-2" />ログイン</Link>
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-bold" asChild>
            <Link href="/register/lifestyle">無料で始める</Link>
          </Button>
        </div>

        {/* === スマホ用メニュー (Sheet) === */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-blue-600"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ))}
                  <Link href="/login" className="flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-blue-600">
                    <LogIn className="w-5 h-5" />
                    ログイン
                  </Link>
                </nav>
                <Button className="w-full bg-blue-600" asChild>
                  <Link href="/register/lifestyle">無料で始める</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}