// src/lib/validations/lifestyle.ts
import * as z from "zod";

// DBの型定義に基づいたバリデーションスキーマ
export const lifestyleSchema = z.object({
  // === Step 1: 基本生活リズム ===
  sleepSchedule: z.enum(["early_bird", "night_owl", "irregular"], {
    required_error: "睡眠リズムを選択してください",
  }),
  homeTime: z.enum(["mostly_out", "half", "mostly_home"], {
    required_error: "在宅時間について選択してください",
  }),
  cookingFrequency: z.enum(["never", "sometimes", "daily"], {
    required_error: "料理の頻度を選択してください",
  }),

  // === Step 2: 清潔感・衛生 ===
  cleanlinessLevel: z.number().min(1).max(5), // 1: 気にしない - 5: 超潔癖
  smoking: z.enum(["none", "electronic_only", "smoking"], {
    required_error: "喫煙習慣を選択してください",
  }),

  // === Step 3: ペット・共有 ===
  pets: z.enum(["have", "want", "allergic", "neutral"], {
    required_error: "ペットについての考えを選択してください",
  }),

  // === Step 4: 社交性・コミュニケーション ===
  socializingPreference: z.number().min(1).max(5), // 1: 1人が好き - 5: 常に一緒
  guestFrequency: z.enum(["rarely", "monthly", "weekly", "often"], {
    required_error: "来客頻度を選択してください",
  }),
  noiseTolerance: z.number().min(1).max(5), // 1: 静寂重視 - 5: 賑やかでも平気
});

export type LifestyleFormValues = z.infer<typeof lifestyleSchema>;