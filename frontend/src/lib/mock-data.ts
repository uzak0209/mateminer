// src/lib/mock-data.ts
import { MatchCandidate, PropertyCandidate, User } from '@/types';

// ログイン中の自分（大学生Aくん）
export const CURRENT_USER: User = {
  id: 'u1',
  email: 'student_a@meiji.ac.jp',
  isUniversityEmail: true,
  trustScore: 85, // 学生証認証済みなどで高い
  phoneVerified: true,
  studentVerified: true,
  avatarUrl: '/avatars/me.jpg', // 仮
  profile: {
    nickname: 'Kenta',
    age: 20,
    gender: 'male',
    userType: 'student',
    universityName: '明治大学',
    faculty: '政治経済学部',
    grade: 2,
    campus: '和泉キャンパス',
    bio: '明治大学の2年生です。家賃を抑えるためにルームシェアしたいです。基本静かに過ごしたい派です。',
    tags: ['映画鑑賞', 'カフェ巡り', 'フットサル'],
  },
  lifestyle: {
    sleepSchedule: 'night', // 夜型
    cleanlinessLevel: 3, // 普通
    smoking: 'none',
    hasPet: false,
    guestFrequency: 'sometimes',
    noiseTolerance: 3,
    socializingPreference: 3, // 適度に交流
    cookingFrequency: 'sometimes',
  },
  preferences: {
    minRent: 40000,
    maxRent: 60000,
    preferredAreas: ['東京都世田谷区', '東京都杉並区'],
    preferredStations: ['明大前', '下高井戸'],
    roomTypes: ['2DK', '2LDK'],
    moveInTiming: '1-3months',
  }
};

// 検索結果に出てくる候補者リスト
export const MOCK_CANDIDATES: MatchCandidate[] = [
  {
    ...CURRENT_USER, // 構造をコピーして上書き
    id: 'u2',
    email: 'test2@example.com',
    trustScore: 92,
    profile: {
      nickname: 'Sho',
      age: 21,
      gender: 'male',
      userType: 'student',
      universityName: '明治大学',
      faculty: '法学部',
      grade: 3,
      campus: '和泉キャンパス',
      bio: '同じ大学の人と住みたいです！掃除は得意です。',
      tags: ['サッカー', '映画鑑賞', '料理'], // 共通タグあり
    },
    compatibilityScore: 95, // ★超高相性
    compatibilityDetails: {
      lifestyleMatch: 98,
      valueMatch: 90,
      tagsMatch: ['映画鑑賞'],
    },
    preferences: {
      minRent: 45000,
      maxRent: 65000,
      preferredAreas: ['東京都世田谷区'],
      preferredStations: ['明大前'],
      roomTypes: ['2DK'],
      moveInTiming: '1-3months',
    }
  },
  {
    ...CURRENT_USER,
    id: 'u3',
    email: 'test3@example.com',
    trustScore: 40,
    profile: {
      nickname: 'Mike',
      age: 24,
      gender: 'male',
      userType: 'graduate', // 大学院生
      universityName: '東京大学大学院',
      bio: '研究で忙しいので、家では寝るだけです。',
      tags: ['プログラミング', '読書'],
    },
    compatibilityScore: 45, // ★相性低め
    compatibilityDetails: {
      lifestyleMatch: 40,
      valueMatch: 50,
      tagsMatch: [],
    },
  }
];

// 共有物件リスト（マッチング後）
export const MOCK_SHARED_PROPERTIES: PropertyCandidate[] = [
  {
    id: 'p1',
    sourceUrl: 'https://suumo.jp/...',
    title: 'メゾン明大前 202号室',
    rent: 110000, // 2人で割る想定
    address: '東京都世田谷区松原...',
    stationName: '明大前駅',
    walkMinutes: 5,
    imageUrl: 'https://via.placeholder.com/300x200?text=Room+Image',
    myRating: 4,
    partnerRating: 5,
    myComment: '駅近で最高だけど、少し古いかも？',
    partnerComment: '家賃予算内だし、広くていいね！',
  },
  {
    id: 'p2',
    sourceUrl: 'https://homes.co.jp/...',
    title: 'サンハイツ下高井戸',
    rent: 98000,
    address: '東京都世田谷区赤堤...',
    stationName: '下高井戸駅',
    walkMinutes: 8,
    imageUrl: 'https://via.placeholder.com/300x200?text=Room+Image+2',
    myRating: 5,
    partnerRating: 3,
    myComment: 'ここが一番コスパ良いと思う',
    partnerComment: '日当たりが気になる...',
  }
];