import { MatchCandidate } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompatibilityBadge } from "./CompatibilityBadge";
import { MapPin, GraduationCap } from "lucide-react";

interface UserCardProps {
  user: MatchCandidate;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {/* ヘッダー画像エリア（仮でグラデーション） */}
      <div className="h-24 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
        <div className="absolute -bottom-10 left-4">
          {/* アバター画像（なければイニシャル） */}
          <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.profile?.nickname} className="w-full h-full rounded-full object-cover" />
            ) : (
              user.profile?.nickname.slice(0, 1)
            )}
          </div>
        </div>
      </div>

      <CardContent className="pt-12 pb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{user.profile?.nickname}</h3>
            <p className="text-sm text-gray-500">
              {user.profile?.age}歳 / {user.profile?.gender === 'male' ? '男性' : '女性'}
            </p>
          </div>
          {/* 相性スコアバッジ */}
          <CompatibilityBadge score={user.compatibilityScore} />
        </div>

        {/* 大学・エリア情報 */}
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>{user.profile?.universityName} ({user.profile?.grade}年)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>希望: {user.preferences?.preferredStations.join(", ")}</span>
          </div>
        </div>

        {/* 趣味タグ */}
        <div className="flex flex-wrap gap-1">
          {user.profile?.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t bg-gray-50 p-3">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          詳細を見る
        </Button>
      </CardFooter>
    </Card>
  );
}