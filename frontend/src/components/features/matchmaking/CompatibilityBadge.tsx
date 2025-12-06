import { cn } from "@/lib/utils";
import { Heart } from "lucide-react"; // アイコン用

interface CompatibilityBadgeProps {
  score: number;
  className?: string;
}

export function CompatibilityBadge({ score, className }: CompatibilityBadgeProps) {
  // スコアに応じた色決定
  let colorClass = "bg-gray-100 text-gray-600"; // デフォルト
  
  if (score >= 90) {
    colorClass = "bg-rose-100 text-rose-600 border-rose-200"; // 最高
  } else if (score >= 70) {
    colorClass = "bg-blue-100 text-blue-600 border-blue-200"; // 良い
  } else if (score >= 50) {
    colorClass = "bg-green-100 text-green-600 border-green-200"; // 普通
  }

  return (
    <div className={cn(
      "flex items-center gap-1 px-3 py-1 rounded-full border font-bold text-sm",
      colorClass,
      className
    )}>
      <Heart className="w-4 h-4 fill-current" />
      <span>相性 {score}%</span>
    </div>
  );
}