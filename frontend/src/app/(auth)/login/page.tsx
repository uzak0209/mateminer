"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // もしコンポーネントがなければ通常のinput type="checkbox"で代用可
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ログイン処理（モック）
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: ここに実際の認証ロジックを実装
    setTimeout(() => {
      setIsLoading(false);
      alert("ログイン処理（デモ）");
    }, 2000);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-blue-900">
            おかえりなさい
          </CardTitle>
          <CardDescription>
            メールアドレスとパスワードを入力してログイン
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* メールアドレス入力 */}
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.ac.jp"
                required
                className="bg-white"
              />
            </div>

            {/* パスワード入力 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">パスワード</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  パスワードをお忘れですか？
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="bg-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">パスワードを表示</span>
                </button>
              </div>
            </div>

            {/* アクションボタン */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ログイン中...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  ログイン
                </>
              )}
            </Button>
          </form>

          {/* 区切り線 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                または
              </span>
            </div>
          </div>

          {/* ソーシャルログイン（必要に応じて） */}
          <Button variant="outline" type="button" className="w-full" disabled={isLoading}>
            {/* Googleアイコンなどを入れる */}
            Googleでログイン
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-gray-500">
            アカウントをお持ちでないですか？{" "}
            <Link
              href="/register/lifestyle"
              className="font-semibold text-blue-600 hover:text-blue-500 hover:underline"
            >
              新規登録（無料）
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}