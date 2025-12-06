import { MOCK_CANDIDATES } from "@/lib/mock-data";
import { UserCard } from "@/components/features/matchmaking/UserCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* ページヘッダー */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">ルームメイトを探す</h1>
        <p className="text-gray-600">
          あなたと相性の良いルームメイト候補が見つかりました。
        </p>
      </div>

      {/* 検索・フィルターバー（UIのみ） */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="大学名、エリア、キーワードで検索..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">絞り込み</Button>
          <Button>検索</Button>
        </div>
      </div>

      {/* 検索結果グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CANDIDATES.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}