import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
// import { format } from "date-fns"; // 日付フォーマット用（なければString操作でも可）
// import { ja } from "date-fns/locale";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isCurrentUser: boolean; // 自分が送信者か？
  senderName?: string;
  senderAvatar?: string;
}

export function MessageBubble({
  content,
  timestamp,
  isCurrentUser,
  senderName,
  senderAvatar,
}: MessageBubbleProps) {
  return (
    <div className={cn("flex w-full gap-2 mb-4", isCurrentUser ? "justify-end" : "justify-start")}>
      {/* 相手の場合のみアイコンを表示 */}
      {!isCurrentUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src={senderAvatar} />
          <AvatarFallback>{senderName?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("max-w-[70%] flex flex-col", isCurrentUser ? "items-end" : "items-start")}>
        {/* 名前表示（相手のみ） */}
        {!isCurrentUser && (
          <span className="text-xs text-gray-500 mb-1 ml-1">{senderName}</span>
        )}
        
        {/* 吹き出し本体 */}
        <div
          className={cn(
            "px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm",
            isCurrentUser
              ? "bg-blue-600 text-white rounded-tr-none" // 自分: 青色
              : "bg-white border text-gray-800 rounded-tl-none" // 相手: 白色
          )}
        >
          {content}
        </div>
        
        {/* 時刻表示 */}
        <span className="text-[10px] text-gray-400 mt-1 mx-1" suppressHydrationWarning>
            {new Date(timestamp).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}