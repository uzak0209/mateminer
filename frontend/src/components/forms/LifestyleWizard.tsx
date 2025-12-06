"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lifestyleSchema, LifestyleFormValues } from "@/lib/validations/lifestyle";
import { Button } from "@/components/ui/button"; // Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Shadcn
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Shadcn
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Shadcn
import { Slider } from "@/components/ui/slider"; // Shadcn (なければinput type="range"で代用可)

// 質問をステップごとに分割
const STEPS = [
  {
    id: "rhythm",
    title: "生活リズム",
    description: "あなたの基本的な生活時間を教えてください",
  },
  {
    id: "cleanliness",
    title: "清潔感・ルール",
    description: "共有スペースの使い方に関する感覚です",
  },
  {
    id: "social",
    title: "社交性・交流",
    description: "ルームメイトとの距離感について",
  },
];

export function LifestyleWizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const form = useForm<LifestyleFormValues>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues: {
      cleanlinessLevel: 3,
      socializingPreference: 3,
      noiseTolerance: 3,
      hasPet: false,
    },
    mode: "onChange", // リアルタイムバリデーション
  });

  // 全ステップ完了時の処理
  function onSubmit(data: LifestyleFormValues) {
    console.log("診断完了:", data);
    alert("診断が完了しました！マッチング画面へ移動します（仮）");
    // ここでAPIを叩いてDBに保存 -> Step 4の検索画面へ遷移
  }

  // 「次へ」ボタンの処理
  const handleNext = async () => {
    // 現在のステップにあるフィールドだけバリデーションするロジックが必要ですが、
    // 簡易的にここではそのまま進めます（本番では trigger() を使う）
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // 最後のステップならSubmit
      form.handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const currentStep = STEPS[currentStepIndex];
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* プログレスバー */}
      <div className="mb-8 w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step {currentStepIndex + 1}: {currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* === Step 1: 生活リズム === */}
              {currentStep.id === "rhythm" && (
                <>
                  <FormField
                    control={form.control}
                    name="sleepSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>睡眠サイクル</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="early" /></FormControl>
                              <FormLabel className="font-normal">早寝早起き (朝型)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="night" /></FormControl>
                              <FormLabel className="font-normal">夜更かし気味 (夜型)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl><RadioGroupItem value="irregular" /></FormControl>
                              <FormLabel className="font-normal">不規則・バラバラ</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cookingFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>自炊の頻度</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl><RadioGroupItem value="daily" /></FormControl>
                              <FormLabel>毎日</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl><RadioGroupItem value="sometimes" /></FormControl>
                              <FormLabel>時々</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl><RadioGroupItem value="never" /></FormControl>
                              <FormLabel>しない</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* === Step 2: 清潔感 === */}
              {currentStep.id === "cleanliness" && (
                <>
                  <FormField
                    control={form.control}
                    name="cleanlinessLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>部屋の清潔レベル ({field.value})</FormLabel>
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>細かいことは気にしない</span>
                          <span>超潔癖</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={1} max={5} step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smoking"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>タバコについて</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="none" id="s1" />
                              <FormLabel htmlFor="s1">吸わない</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="electronic_only" id="s2" />
                              <FormLabel htmlFor="s2">電子タバコのみ</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="smoking" id="s3" />
                              <FormLabel htmlFor="s3">吸う</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* === Step 3: 社交性 === */}
              {currentStep.id === "social" && (
                <>
                  <FormField
                    control={form.control}
                    name="socializingPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ルームメイトとの交流希望 ({field.value})</FormLabel>
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>挨拶程度でOK</span>
                          <span>一緒に遊びたい</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={1} max={5} step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guestFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>友人を呼ぶ頻度</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="rarely" />
                              <FormLabel>ほぼ呼ばない</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="sometimes" />
                              <FormLabel>時々 (月1-2回)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="often" />
                              <FormLabel>よく呼ぶ (週1以上)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}

            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStepIndex === 0}
          >
            戻る
          </Button>
          <Button onClick={handleNext}>
            {currentStepIndex === STEPS.length - 1 ? "診断を完了する" : "次へ"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}