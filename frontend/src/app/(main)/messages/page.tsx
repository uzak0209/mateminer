"use client";

import { useState } from "react";
import {
  MOCK_CHATS_UI,
  MOCK_MESSAGES,
  CURRENT_USER_CONTEXT
} from "@/lib/mock-data";
import { MessageBubble } from "@/components/features/chat/MessageBubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MoreVertical, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  // DBの chat_rooms.id を管理
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(MOCK_CHATS_UI[0].id);
  const [inputText, setInputText] = useState("");

  // 選択中のスレッドデータ (UI用結合データ)
  const activeChat = MOCK_CHATS_UI.find((c) => c.id === selectedRoomId);

  // 選択中のルームのメッセージのみをフィルタリング
  const activeMessages = MOCK_MESSAGES.filter(
    (msg) => msg.chatRoomId === selectedRoomId
  );

  return (
    <div className="container mx-auto py-6 px-4 h-[calc(100vh-64px)] max-w-6xl">
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden h-full flex flex-col md:flex-row">

        {/* === 左側：チャットリスト === */}
        <div className={cn(
          "w-full md:w-80 border-r flex flex-col bg-gray-50/50",
          selectedRoomId ? "hidden md:flex" : "flex"
        )}>
          <div className="p-4 border-b bg-white">
            <h2 className="font-bold text-lg">メッセージ</h2>
          </div>

          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {MOCK_CHATS_UI.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedRoomId(chat.id)}
                  className={cn(
                    "flex items-center gap-3 p-4 text-left transition-colors hover:bg-gray-100",
                    selectedRoomId === chat.id && "bg-blue-50 hover:bg-blue-50"
                  )}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={chat.partner.profile.avatarUrl} />
                      <AvatarFallback>{chat.partner.profile.nickname[0]}</AvatarFallback>
                    </Avatar>
                    {chat.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-sm truncate">
                        {chat.partner.profile.nickname}
                      </span>
                      <span className="text-[10px] text-gray-400" suppressHydrationWarning>
                        {chat.lastMessage?.insertedAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {chat.lastMessage?.content}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* === 右側：トーク画面 === */}
        {activeChat ? (
          <div className={cn(
            "flex-1 flex flex-col bg-white",
            !selectedRoomId ? "hidden md:flex" : "flex"
          )}>
            {/* トークヘッダー */}
            <div className="h-16 border-b flex items-center justify-between px-6 bg-white shrink-0">
              <div className="flex items-center gap-3">
                {/* スマホ用: 戻るボタン */}
                <button
                  className="md:hidden text-blue-600 text-sm mr-2"
                  onClick={() => setSelectedRoomId(null)}
                >
                  ←
                </button>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activeChat.partner.profile.avatarUrl} />
                  <AvatarFallback>{activeChat.partner.profile.nickname[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-sm">
                    {activeChat.partner.profile.nickname}
                  </h3>
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    オンライン
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Button variant="ghost" size="icon"><Phone className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon"><Video className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
              </div>
            </div>

            {/* メッセージエリア */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
              <div className="space-y-6">
                {/* 日付区切りの例 (簡易実装) */}
                <div className="flex justify-center my-4">
                  <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                    {/* 実際のアプリでは日付比較ロジックが必要 */}
                    2025年12月5日
                  </span>
                </div>

                {activeMessages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    content={msg.content}
                    // MessageBubbleコンポーネント側でDateを受け取るように修正が必要、
                    // または文字列変換: msg.insertedAt.toISOString()
                    timestamp={msg.insertedAt.toISOString()}
                    isCurrentUser={msg.senderUserId === CURRENT_USER_CONTEXT.user.id}
                    senderName={activeChat.partner.profile.nickname}
                    senderAvatar={activeChat.partner.profile.avatarUrl}
                  />
                ))}
              </div>
            </div>

            {/* 入力エリア */}
            <div className="p-4 border-t bg-white shrink-0">
              <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setInputText(""); }}>
                <Input
                  placeholder="メッセージを入力..."
                  className="flex-1"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <Button type="submit" size="icon" className="bg-blue-600 shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 bg-gray-50">
            <p>チャットを選択してください</p>
          </div>
        )}
      </div>
    </div>
  );
}