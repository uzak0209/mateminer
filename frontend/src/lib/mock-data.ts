// src/lib/mock-data.ts
import { ChatThread, Message ,MatchCandidate, PropertyCandidate, User } from '@/types';

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
export const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    senderId: "u2", // Shoくん (相手)
    content: "はじめまして！プロフィール見ました。僕も明大前周辺で探していて、ぜひお話ししたいです。",
    timestamp: "2025-12-05T10:00:00.000Z",
    isRead: true,
  },
  {
    id: "m2",
    senderId: "u1", // Kentaくん (自分)
    content: "こんにちは！マッチありがとうございます。ぜひぜひ。家賃予算も近そうですね。",
    timestamp: "2025-12-05T10:05:00.000Z",
    isRead: true,
  },
  {
    id: "m3",
    senderId: "u2",
    content: "そうですね！6万円以下だと助かります。ちなみに自炊はよくされますか？",
    timestamp: "2025-12-05T10:10:00.000Z",
    isRead: true,
  },
  {
    id: "m4",
    senderId: "u1",
    content: "週3くらいです！でも掃除は当番制とかできっちり決めたい派です。",
    timestamp: "2025-12-05T10:12:00.000Z",
    isRead: true,
  },
  {
    id: "m5",
    senderId: "u2",
    content: "僕もキレイ好きなんで助かります！今週末とか内見行けたりしますか？良さげな物件いくつかピックアップしました。",
    timestamp: "2025-12-06T09:30:00.000Z",
    isRead: false,
  },
];

export const MOCK_CHATS: ChatThread[] = [
  {
    id: "thread1",
    partner: MOCK_CANDIDATES[0], // Shoくん
    lastMessage: MOCK_MESSAGES[MOCK_MESSAGES.length - 1],
    unreadCount: 1,
  },
  {
    id: "thread2",
    partner: MOCK_CANDIDATES[1], // Mikeくん
    lastMessage: {
      id: "m_temp",
      senderId: "u3",
      content: "研究室が忙しくて返信遅れました...",
      timestamp: "2025-12-04T18:00:00.000Z",
      isRead: true,
    },
    unreadCount: 0,
  },
];