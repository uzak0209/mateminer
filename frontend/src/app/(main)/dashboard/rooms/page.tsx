import { MOCK_SHARED_PROPERTIES } from "@/lib/mock-data";
import { PropertyCard } from "@/components/features/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { Plus, Share2 } from "lucide-react";

export default function SharedRoomsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* ヘッダーエリア */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🏠 2人の物件候補リスト
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {MOCK_SHARED_PROPERTIES.length}件
            </span>
          </h1>
          <p className="text-gray-600 mt-1">
            Shoくんと共有中の物件です。気になる物件のURLを追加しましょう。
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            リストを共有
          </Button>
          <Button className="bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            物件URLを追加
          </Button>
        </div>
      </div>

      {/* 物件リスト */}
      {MOCK_SHARED_PROPERTIES.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SHARED_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        // データがない場合の表示（今回はモックがあるので表示されませんが実装例として）
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
          <p className="text-gray-500 mb-4">まだ共有された物件がありません</p>
          <Button>物件を追加する</Button>
        </div>
      )}
    </div>
  );
}