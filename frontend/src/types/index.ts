// src/types/index.ts

// ==========================================
// Enums & Union Types
// ==========================================

export type UserType = 'student' | 'graduate' | 'working' | 'other';
export type Gender = 'male' | 'female' | 'other' | 'private';
export type MoveInTiming = 'immediate' | '1-3months' | '3-6months' | 'undecided';

// ライフスタイル回答用
export type SleepSchedule = 'early' | 'night' | 'irregular';
export type CleanlinessLevel = 1 | 2 | 3 | 4 | 5; // 1: 気にしない - 5: 超潔癖
export type SocialPreference = 1 | 2 | 3 | 4 | 5; // 1: 1人が好き - 5: 常に一緒
export type SmokingStatus = 'none' | 'smoking' | 'electronic_only';

// ==========================================
// Core Entities
// ==========================================

export interface User {
  id: string;
  email: string;
  isUniversityEmail: boolean; // .ac.jp かどうか
  trustScore: number; // 0-100
  phoneVerified: boolean;
  studentVerified: boolean;
  avatarUrl?: string;
  profile?: Profile;
  lifestyle?: Lifestyle;
  preferences?: PropertyPreference;
}

export interface Profile {
  nickname: string;
  age: number;
  gender: Gender;
  userType: UserType;
  
  // 学生情報 (Optional)
  universityName?: string;
  faculty?: string;
  department?: string;
  grade?: number;
  campus?: string;
  
  // 社会人情報 (Optional)
  occupation?: string;

  bio: string;
  tags: string[]; // 趣味・興味タグ
}

// 20問の診断結果に相当
export interface Lifestyle {
  sleepSchedule: SleepSchedule;
  cleanlinessLevel: CleanlinessLevel;
  smoking: SmokingStatus;
  hasPet: boolean; // 要件書の pets を簡略化
  guestFrequency: 'rarely' | 'sometimes' | 'often';
  noiseTolerance: 1 | 2 | 3 | 4 | 5;
  socializingPreference: SocialPreference;
  cookingFrequency: 'never' | 'sometimes' | 'daily';
  // ...他、要件書の診断項目に準拠
}

// 物件探しの希望条件
export interface PropertyPreference {
  minRent: number;
  maxRent: number;
  preferredAreas: string[]; // 都道府県・市区町村
  preferredStations: string[];
  roomTypes: string[]; // 1LDK, 2DK etc
  moveInTiming: MoveInTiming;
}

// ==========================================
// Matching & Features
// ==========================================

// 検索結果に表示するユーザー情報（相性スコア付き）
export interface MatchCandidate extends User {
  compatibilityScore: number; // 0-100
  compatibilityDetails: {
    lifestyleMatch: number;
    valueMatch: number;
    tagsMatch: string[]; // 共通の趣味タグ
  };
}

// 物件候補（2人で共有するリストのアイテム）
export interface PropertyCandidate {
  id: string;
  sourceUrl: string;
  title: string;
  rent: number;
  address: string;
  stationName: string;
  walkMinutes: number;
  imageUrl: string;
  
  // 2人の評価
  myRating: 1 | 2 | 3 | 4 | 5 | null;
  partnerRating: 1 | 2 | 3 | 4 | 5 | null;
  myComment?: string;
  partnerComment?: string;
}