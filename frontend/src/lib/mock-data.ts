// src/lib/mock-data.ts
import {
  User, Profile, Lifestyle, PropertyPreference,
  ChatRoom, ChatRoomMember, Message,
  MatchedPair, UserType, Gender
} from '@/types';

// ==============================================
// 1. Core Entities (Users & Profiles)
// ==============================================

const NOW = new Date();
const ONE_HOUR_AGO = new Date(NOW.getTime() - 60 * 60 * 1000);
const YESTERDAY = new Date(NOW.getTime() - 24 * 60 * 60 * 1000);

// 現在のユーザー (Me)
const user1: User = {
  id: 'u1',
  email: 'student_a@meiji.ac.jp',
  passwordHash: 'hashed_pw',
  phoneNumber: '090-0000-0000',
  phoneVerified: true,
  emailVerified: true,
  isUniversityEmail: true,
  trustScore: 85,
  status: 'active',
  lastLoginAt: NOW,
  insertedAt: YESTERDAY,
  updatedAt: NOW
};

const profile1: Profile = {
  id: 'p1',
  userId: 'u1',
  nickname: 'Kenta',
  age: 20,
  gender: 'male',
  userType: 'student',
  universityName: '明治大学',
  faculty: '政治経済学部',
  grade: 2,
  campus: '和泉キャンパス',
  bio: '明治大学の2年生です。家賃を抑えるためにルームシェアしたいです。',
  avatarUrl: '/avatars/me.jpg', // 仮パス
  insertedAt: YESTERDAY,
  updatedAt: NOW
};

// 相手ユーザー1 (Sho)
const user2: User = {
  id: 'u2',
  email: 'sho@example.com',
  passwordHash: 'hashed_pw',
  phoneNumber: '090-1111-1111',
  phoneVerified: true,
  emailVerified: true,
  isUniversityEmail: true,
  trustScore: 92,
  status: 'active',
  lastLoginAt: NOW,
  insertedAt: YESTERDAY,
  updatedAt: NOW
};

const profile2: Profile = {
  id: 'p2',
  userId: 'u2',
  nickname: 'Sho',
  age: 21,
  gender: 'male',
  userType: 'student',
  universityName: '明治大学',
  faculty: '法学部',
  grade: 3,
  campus: '和泉キャンパス',
  bio: '同じ大学の人と住みたいです！掃除は得意です。',
  avatarUrl: undefined, // アバターなしの場合のフォールバックテスト用
  insertedAt: YESTERDAY,
  updatedAt: NOW
};

// 相手ユーザー2 (Mike)
const user3: User = {
  id: 'u3',
  email: 'mike@example.com',
  passwordHash: 'hashed_pw',
  phoneNumber: '090-2222-2222',
  phoneVerified: true,
  emailVerified: false,
  isUniversityEmail: false,
  trustScore: 40,
  status: 'active',
  lastLoginAt: YESTERDAY,
  insertedAt: YESTERDAY,
  updatedAt: YESTERDAY
};

const profile3: Profile = {
  id: 'p3',
  userId: 'u3',
  nickname: 'Mike',
  age: 24,
  gender: 'male',
  userType: 'graduate',
  universityName: '東京大学大学院',
  bio: '研究で忙しいので、家では寝るだけです。',
  insertedAt: YESTERDAY,
  updatedAt: YESTERDAY
};

// ==============================================
// 2. Chat Data (Rooms & Messages)
// ==============================================

// チャットルーム
export const MOCK_CHAT_ROOMS: ChatRoom[] = [
  {
    id: 'room1',
    name: 'Sho & Kenta',
    roomType: 'match_pair',
    matchedPairId: 'mp1', // 仮のID
    lastMessageAt: NOW,
    isArchived: false,
    insertedAt: YESTERDAY,
    updatedAt: NOW
  },
  {
    id: 'room2',
    name: 'Mike & Kenta',
    roomType: 'match_pair',
    matchedPairId: 'mp2',
    lastMessageAt: YESTERDAY,
    isArchived: false,
    insertedAt: YESTERDAY,
    updatedAt: YESTERDAY
  }
];

// メッセージ (u1 と u2 のやり取り)
export const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    chatRoomId: "room1",
    senderUserId: "u2", // Sho
    content: "はじめまして！プロフィール見ました。僕も明大前周辺で探していて、ぜひお話ししたいです。",
    messageType: 'text',
    insertedAt: new Date(NOW.getTime() - 24 * 60 * 60 * 1000), // 1日前
    updatedAt: new Date(NOW.getTime() - 24 * 60 * 60 * 1000),
    isFlagged: false,
    isDeleted: false
  },
  {
    id: "m2",
    chatRoomId: "room1",
    senderUserId: "u1", // Me
    content: "こんにちは！マッチありがとうございます。ぜひぜひ。家賃予算も近そうですね。",
    messageType: 'text',
    insertedAt: new Date(NOW.getTime() - 23 * 60 * 60 * 1000),
    updatedAt: new Date(NOW.getTime() - 23 * 60 * 60 * 1000),
  },
  {
    id: "m3",
    chatRoomId: "room1",
    senderUserId: "u2",
    content: "そうですね！6万円以下だと助かります。ちなみに自炊はよくされますか？",
    messageType: 'text',
    insertedAt: new Date(NOW.getTime() - 22 * 60 * 60 * 1000),
    updatedAt: new Date(NOW.getTime() - 22 * 60 * 60 * 1000),
  },
  {
    id: "m4",
    chatRoomId: "room1",
    senderUserId: "u1",
    content: "週3くらいです！でも掃除は当番制とかできっちり決めたい派です。",
    messageType: 'text',
    insertedAt: new Date(NOW.getTime() - 21 * 60 * 60 * 1000),
    updatedAt: new Date(NOW.getTime() - 21 * 60 * 60 * 1000),
  },
  {
    id: "m5",
    chatRoomId: "room1",
    senderUserId: "u2",
    content: "僕もキレイ好きなんで助かります！今週末とか内見行けたりしますか？良さげな物件いくつかピックアップしました。",
    messageType: 'text',
    insertedAt: ONE_HOUR_AGO, // 1時間前
    updatedAt: ONE_HOUR_AGO,
  },
  // u3 とのメッセージ (返信なし)
  {
    id: "m6",
    chatRoomId: "room2",
    senderUserId: "u3",
    content: "研究室が忙しくて返信遅れました...",
    messageType: 'text',
    insertedAt: YESTERDAY,
    updatedAt: YESTERDAY,
  }
];

// ==============================================
// 3. UI Helpers (Constructed Objects)
// ==============================================

// フロントエンドで使いやすいように結合した型
export interface UIUserContext {
  user: User;
  profile: Profile;
}

export const CURRENT_USER_CONTEXT: UIUserContext = {
  user: user1,
  profile: profile1
};

// チャットリスト表示用の型定義（DB型には存在しないがUIで必要）
export interface ChatThreadUI {
  id: string; // chatRoomId
  partner: UIUserContext;
  lastMessage: Message;
  unreadCount: number;
}

// データを結合してUI用リストを作成
export const MOCK_CHATS_UI: ChatThreadUI[] = [
  {
    id: 'room1',
    partner: { user: user2, profile: profile2 },
    lastMessage: MOCK_MESSAGES.filter(m => m.chatRoomId === 'room1').pop()!,
    unreadCount: 1,
  },
  {
    id: 'room2',
    partner: { user: user3, profile: profile3 },
    lastMessage: MOCK_MESSAGES.filter(m => m.chatRoomId === 'room2').pop()!,
    unreadCount: 0,
  }
];