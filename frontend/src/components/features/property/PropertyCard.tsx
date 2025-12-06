import { PropertyCandidate } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Train, Star, ExternalLink, MessageCircle } from "lucide-react";

interface PropertyCardProps {
  property: PropertyCandidate;
}

export function PropertyCard({ property }: PropertyCardProps) {
  // 評価（星）を表示するヘルパー関数
  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-300">未評価</span>;
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-current" : "text-gray-200"}`} />
        ))}
      </div>
    );
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {/* 物件画像エリア */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-black/70 hover:bg-black/70">
          {property.rent.toLocaleString()}円 / 人
        </Badge>
      </div>

      <CardContent className="flex-1 pt-4 pb-2">
        <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-1">
          {property.title}
        </h3>
        
        {/* 基本情報 */}
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-gray-400" />
            <span>{property.stationName} 徒歩{property.walkMinutes}分</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="line-clamp-1">{property.address}</span>
          </div>
        </div>

        {/* 評価比較エリア（このアプリの核心） */}
        <div className="bg-slate-50 rounded-lg p-3 space-y-3 border">
          {/* 自分の評価 */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-bold text-blue-600">あなた</span>
              {renderStars(property.myRating)}
            </div>
            {property.myComment && (
              <p className="text-xs text-gray-600 bg-white p-2 rounded border">
                {property.myComment}
              </p>
            )}
          </div>

          {/* パートナーの評価 */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-bold text-rose-600">パートナー</span>
              {renderStars(property.partnerRating)}
            </div>
            {property.partnerComment ? (
              <p className="text-xs text-gray-600 bg-white p-2 rounded border flex gap-1">
                <MessageCircle className="w-3 h-3 mt-0.5 shrink-0" />
                {property.partnerComment}
              </p>
            ) : (
              <p className="text-xs text-gray-400 italic">まだコメントがありません</p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 p-3 flex gap-2 border-t">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <a href={property.sourceUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            元サイト
          </a>
        </Button>
        <Button size="sm" className="flex-1 bg-blue-600">
          評価する
        </Button>
      </CardFooter>
    </Card>
  );
}