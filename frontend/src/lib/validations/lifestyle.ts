// src/lib/validations/lifestyle.ts
import * as z from "zod";

// Step 2の型定義と一致させる
export const lifestyleSchema = z.object({
  // 1. 生活リズム
  sleepSchedule: z.enum(["early", "night", "irregular"], {
    required_error: "睡眠リズムを選択してください",
  }),
  
  // 2. 清潔感・ルール
  cleanlinessLevel: z.number().min(1).max(5),
  smoking: z.enum(["none", "smoking", "electronic_only"], {
    required_error: "喫煙習慣を選択してください",
  }),
  hasPet: z.boolean().default(false),
  
  // 3. 社交性
  guestFrequency: z.enum(["rarely", "sometimes", "often"], {
    required_error: "来客頻度を選択してください",
  }),
  socializingPreference: z.number().min(1).max(5), // 1: 1人好き <-> 5: 交流したい
  noiseTolerance: z.number().min(1).max(5),       // 1: 静寂重視 <-> 5: 気にしない
  
  // 4. 生活習慣
  cookingFrequency: z.enum(["never", "sometimes", "daily"], {
    required_error: "料理の頻度を選択してください",
  }),
});

export type LifestyleFormValues = z.infer<typeof lifestyleSchema>;