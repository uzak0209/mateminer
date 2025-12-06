import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Search, Users, Home as HomeIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* === Hero Section === */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-1 text-sm border-blue-200">
            🎓 大学生限定・ルームメイト募集プラットフォーム
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            <span className="text-blue-600">人</span>が先。<br className="md:hidden" />
            <span className="text-blue-600">物件</span>は後。
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            いきなり物件を決めて妥協していませんか？<br />
            UniRoomは、まず相性の良いルームメイトを見つけてから、<br className="hidden md:inline" />
            2人で理想の物件を一緒に探す新しいサービスです。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg h-14 px-8 bg-blue-600 hover:bg-blue-700 shadow-lg" asChild>
              <Link href="/register/lifestyle">
                3分で相性診断を始める
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
              <Link href="/search">
                登録ユーザーを見る
              </Link>
            </Button>
          </div>
        </div>
        
        {/* 装飾用背景（円） */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl -z-10" />
      </section>

      {/* === Step Section === */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            理想の暮らしまでの3ステップ
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. パートナーを探す</h3>
              <p className="text-gray-600">
                生活リズムや価値観の診断で、あなたと相性ぴったりの大学生を見つけます。
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. マッチング＆相談</h3>
              <p className="text-gray-600">
                チャットでお互いの条件をすり合わせ。意気投合したらチーム結成です。
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <HomeIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. 一緒に物件探し</h3>
              <p className="text-gray-600">
                2人で住めば、一人暮らしより広い部屋に、安く住めます。理想の部屋を探しましょう。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === Features Section === */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">
                なぜ UniRoom なのか？
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">AIによる相性マッチング</h3>
                    <p className="text-gray-600">20項目のライフスタイル診断で、生活リズムや清潔感の不一致を事前に防ぎます。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">大学生特化の安心コミュニティ</h3>
                    <p className="text-gray-600">学生証認証（任意）や大学メール認証により、身元の確かな同世代とだけ繋がれます。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">共有ウィッシュリスト</h3>
                    <p className="text-gray-600">気になる物件を2人でリスト化。評価やコメントを共有して、スムーズに物件を選べます。</p>
                  </div>
                </div>
              </div>
            </div>
            {/* イメージエリア（モック画像代わり） */}
            <div className="relative">
              <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur rotate-3 z-10 relative">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                    <div>
                      <div className="font-bold">Kenta</div>
                      <div className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block">相性 95%</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    「僕も朝型で、自炊派です！ぜひ一度お話ししませんか？」
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-xl border-0 bg-white absolute top-12 -left-8 -rotate-3 -z-10">
                <CardContent className="p-0">
                  <p className="font-bold text-gray-400">Loading...</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA Section === */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            理想のルームメイトが待っています
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            家賃を抑えて、生活の質を上げる。<br />
            新しい大学生活の形を始めましょう。
          </p>
          <Button size="lg" variant="secondary" className="text-blue-600 text-lg h-14 px-10 font-bold" asChild>
            <Link href="/register/lifestyle">
              今すぐ診断を受ける（無料）
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}