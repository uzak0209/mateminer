"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lifestyleSchema, LifestyleFormValues } from "@/lib/validations/lifestyle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronRight, ChevronLeft } from "lucide-react"; // アイコン用

// 4ステップに分割
const STEPS = [
  {
    id: "rhythm",
    title: "生活リズム ⏰",
    description: "普段の活動時間や在宅状況について教えてください",
  },
  {
    id: "hygiene",
    title: "衛生・習慣 🧹",
    description: "快適に過ごすための衛生観念や習慣について",
  },
  {
    id: "preferences",
    title: "同居の条件 🐕",
    description: "ペットやタバコなど、譲れない条件はありますか？",
  },
  {
    id: "social",
    title: "交流・雰囲気 🤝",
    description: "ルームメイトとの理想的な距離感について",
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
      // 初期値設定（UXのため）
      sleepSchedule: undefined,
      homeTime: undefined,
      cookingFrequency: undefined,
      smoking: undefined,
      pets: undefined,
      guestFrequency: undefined,
    },
    mode: "onChange",
  });

  function onSubmit(data: LifestyleFormValues) {
    console.log("診断結果:", data);
    // TODO: ここで登録APIをコール
    alert("診断完了！マッチングを開始します。");
  }

  const handleNext = async () => {
    // 現在のステップのフィールドを特定してバリデーション
    const fields = getFieldsForStep(currentStepIndex);
    const output = await form.trigger(fields as any);

    if (output) {
      if (currentStepIndex < STEPS.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
        window.scrollTo(0, 0); // ステップ遷移時に上部へスクロール
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // ステップごとのバリデーション対象フィールド定義
  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 0: return ["sleepSchedule", "homeTime", "cookingFrequency"];
      case 1: return ["cleanlinessLevel", "smoking"];
      case 2: return ["pets"];
      case 3: return ["socializingPreference", "guestFrequency", "noiseTolerance"];
      default: return [];
    }
  };

  const currentStep = STEPS[currentStepIndex];
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* プログレスバー */}
      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-sm font-medium text-gray-500">
          <span>Start</span>
          <span>Goal</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="border-0 shadow-lg sm:border sm:shadow-sm">
        <CardHeader className="text-center sm:text-left">
          <CardTitle className="text-xl sm:text-2xl">{currentStep.title}</CardTitle>
          <CardDescription className="text-base">{currentStep.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              {/* === Step 1: 生活リズム === */}
              {currentStep.id === "rhythm" && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="sleepSchedule"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>睡眠サイクルは？</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                          >
                            <RadioCard value="early_bird" label="早寝早起き" icon="☀️" />
                            <RadioCard value="night_owl" label="夜型" icon="🌙" />
                            <RadioCard value="irregular" label="不規則" icon="🌀" />
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="homeTime"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>休日の過ごし方は？</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                              <FormControl><RadioGroupItem value="mostly_out" /></FormControl>
                              <FormLabel className="flex-1 cursor-pointer font-normal">外出していることが多い</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                              <FormControl><RadioGroupItem value="half" /></FormControl>
                              <FormLabel className="flex-1 cursor-pointer font-normal">半々くらい</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                              <FormControl><RadioGroupItem value="mostly_home" /></FormControl>
                              <FormLabel className="flex-1 cursor-pointer font-normal">家でゆっくり過ごす派</FormLabel>
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
                      <FormItem className="space-y-3">
                        <FormLabel>自炊はしますか？</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl><RadioGroupItem value="daily" /></FormControl>
                              <FormLabel className="font-normal">毎日する</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl><RadioGroupItem value="sometimes" /></FormControl>
                              <FormLabel className="font-normal">時々</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl><RadioGroupItem value="never" /></FormControl>
                              <FormLabel className="font-normal">しない</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* === Step 2: 衛生・習慣 === */}
              {currentStep.id === "hygiene" && (
                <div className="space-y-8">
                  <FormField
                    control={form.control}
                    name="cleanlinessLevel"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-4">
                          <FormLabel className="text-base">部屋の清潔レベル</FormLabel>
                          <span className="text-blue-600 font-bold text-lg">{field.value} / 5</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={1} max={5} step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="py-4"
                          />
                        </FormControl>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>多少散らかっててもOK</span>
                          <span>ホコリ一つ許せない</span>
                        </div>
                        <FormDescription>
                          共有スペース（リビング・水回り）の綺麗さに対するこだわり度です。
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="smoking"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>喫煙習慣</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 gap-2">
                            <FormItem className="flex items-center space-x-3 p-3 border rounded-lg">
                              <FormControl><RadioGroupItem value="none" /></FormControl>
                              <FormLabel className="font-normal">吸わない</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 p-3 border rounded-lg">
                              <FormControl><RadioGroupItem value="electronic_only" /></FormControl>
                              <FormLabel className="font-normal">電子タバコのみ</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 p-3 border rounded-lg">
                              <FormControl><RadioGroupItem value="smoking" /></FormControl>
                              <FormLabel className="font-normal">紙タバコを吸う</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* === Step 3: 条件 === */}
              {currentStep.id === "preferences" && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="pets"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>ペットについて</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                          >
                            <RadioCard value="have" label="飼っている" icon="🐶" />
                            <RadioCard value="want" label="飼いたい" icon="💭" />
                            <RadioCard value="neutral" label="どちらでも" icon="😐" />
                            <RadioCard value="allergic" label="アレルギー/不可" icon="❌" />
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* 必要であればここに「楽器可」「女性限定」などの追加質問を配置 */}
                </div>
              )}

              {/* === Step 4: 社交性 === */}
              {currentStep.id === "social" && (
                <div className="space-y-8">
                  <FormField
                    control={form.control}
                    name="socializingPreference"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-4">
                          <FormLabel className="text-base">ルームメイトとの距離感</FormLabel>
                          <span className="text-blue-600 font-bold text-lg">{field.value} / 5</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={1} max={5} step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>挨拶程度で静かに</span>
                          <span>週末は一緒に遊びたい</span>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guestFrequency"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>友人を招く頻度</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                            <div className="flex flex-col gap-2">
                              <FormItem className="flex items-center space-x-2">
                                <RadioGroupItem value="rarely" id="g1" />
                                <FormLabel htmlFor="g1" className="font-normal">ほぼ呼ばない (年数回)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2">
                                <RadioGroupItem value="monthly" id="g2" />
                                <FormLabel htmlFor="g2" className="font-normal">時々呼ぶ (月1-2回)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2">
                                <RadioGroupItem value="weekly" id="g3" />
                                <FormLabel htmlFor="g3" className="font-normal">週末など定期的 (週1回)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2">
                                <RadioGroupItem value="often" id="g4" />
                                <FormLabel htmlFor="g4" className="font-normal">頻繁に呼ぶ (週2回以上)</FormLabel>
                              </FormItem>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="noiseTolerance"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-4">
                          <FormLabel className="text-base">生活音の許容度</FormLabel>
                          <span className="text-blue-600 font-bold text-lg">{field.value} / 5</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={1} max={5} step={1}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>非常に静かな環境を好む</span>
                          <span>賑やかでも気にならない</span>
                        </div>
                        <FormDescription>
                          相手の通話の声やテレビの音などがどのくらい気になりますか？
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              )}

            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-between pt-6 border-t bg-gray-50/50">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className="pl-2"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            戻る
          </Button>
          <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 min-w-[120px]">
            {currentStepIndex === STEPS.length - 1 ? (
              <>
                完了する
                <Check className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                次へ
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// UIヘルパー: 選択肢をカード形式で表示するコンポーネント
function RadioCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <FormItem>
      <FormControl>
        <RadioGroupItem value={value} className="sr-only" />
      </FormControl>
      <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full">
        <span className="text-2xl mb-2">{icon}</span>
        <span className="font-semibold text-sm">{label}</span>
      </FormLabel>
    </FormItem>
  );
}