// src/types/index.ts

export type UUID = string;

// ==========================================
// Enums & Union Types
// ==========================================

export type UserType = 'student' | 'graduate' | 'working' | 'other';
export type Gender = 'male' | 'female' | 'other' | 'private';
export type MoveInTiming = 'immediate' | '1-3months' | '3-6months' | 'undecided';
export type UserStatus = 'active' | 'inactive' | 'banned';
export type VarificationStatus = 'pending' | 'approved' | 'rejected';
export type SocialProvider = 'google' | 'facebook' | 'twitter';

// ライフスタイル回答用
export type SleepSchedule = 'early' | 'night' | 'irregular';
export type CleanlinessLevel = 1 | 2 | 3 | 4 | 5; // 1: 気にしない - 5: 超潔癖
export type SocialPreference = 1 | 2 | 3 | 4 | 5; // 1: 1人が好き - 5: 常に一緒
export type SmokingStatus = 'none' | 'smoking' | 'electronic_only';
export type PetPreference = 'have' | 'want' | 'allergic' | 'neutral';
export type GuestFrequency = 'rarely' | 'monthly' | 'weekly' | 'often';
export type HomeTime = 'mostly_out' | 'half' | 'mostly_home';
export type CookingFrequency = 'never' | 'sometimes' | 'daily';

export type MatchRequestStatus = 'pending' | 'accepted' | 'rejected' | 'expired';
export type MatchedPairStatus = 'active' | 'property_searching' | 'contracted' | 'dissolved';
export type PropertyCandidateStatus = 'candidate' | 'favorite' | 'viewing_scheduled' | 'rejected' | 'contracted';
export type Visibility = 'public' | 'friends' | 'private';
export type ReportStatus = 'pending' | 'investigating' | 'resolved' | 'dismissed';
export type ViewingScheduleStatus = 'scheduled' | 'completed' | 'cancelled';
export type NotificationType = 'match_request' | 'match_accepted' | 'message' | 'viewing_reminder' | 'system';
export type UniversityPostCategory = 'question' | 'advice' | 'property_info' | 'event';

// ==========================================
// Core Entities
// ==========================================

export interface User {
  id: UUID;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  isUniversityEmail: boolean;
  trustScore: number; // 0-100
  status: UserStatus;
  lastLoginAt: Date | null;
}

export interface Profile {
  id: UUID;
  userId: UUID;
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
  videoUrl?: string;
  avatarUrl?: string;
}

export interface StudentVarification {
  id: UUID;
  userId: UUID;
  student_card_image_url: string;
  university_name: string;
  status: VarificationStatus;
  varified_at: Date | null;
}

export interface SocialConnections {
  id: UUID;
  userId: UUID;
  provider: string;
  providerUserId: string;
}

// -----------------------------------------------------------------------------
// Preferences & Lifestyle
// -----------------------------------------------------------------------------

export interface PropertyPreference {
  id: UUID;
  userId: UUID;
  minRent: number;
  maxRent: number;
  maxInitialCost: number;
  preferredPrefecture: string[];
  preferredCity: string[];
  preferredStations: string[];
  maxCommuteTime: number;
  roomTypes: string[]; // 1LDK, 2DK etc
  minBuildingAge?: number;
  maxBuildingAge?: number;
  requiresAutoLock: boolean;
  requiresSeparateBathToilet: boolean;
  requiresSouthFacing: boolean;
  otherRequirements?: string;
  moveInTiming: MoveInTiming;
}

export interface Lifestyle {
  id: UUID;
  user_id: UUID;
  sleep_schedule: SleepSchedule;
  cleanliness_level: number; // 1-5
  smoking: boolean;
  e_cigarette: boolean;
  pets: PetPreference;
  guest_frequency: GuestFrequency;
  noise_tolerance: number; // 1-5
  socializing_preference: number; // 1-5
  home_time: HomeTime;
  cooking_frequency: CookingFrequency;
}

export interface InterestTag {
  id: UUID;
  name: string;
  category: string;
}

export interface UserInterest {
  userId: UUID;
  interestTagId: UUID;
}

export interface LifestyleAssessment {
  id: UUID;
  userId: UUID;
  questionId: number;
  answerValue: number;
  completedAt: Date;
}

export interface LifestyleAssessment {
  id: UUID;
  userId: UUID;
  questionId: number;
  answerValue: number;
  createdAt: Date;
}

// ==========================================
// Matching & Features
// ==========================================
export interface MatchRequest {
  id: UUID;
  senderUserId: UUID;
  receiverUserId: UUID;
  status: MatchRequestStatus;
  message: string | null;
  compatibilityScore: number; // 0-100
  expiresAt: Date;
}

export interface MatchedPair {
  id: UUID;
  user1_id: UUID; // user1_id < user2_id constraint usually handled in DB/Backend logic
  user2_id: UUID;
  match_request_id: UUID;
  status: MatchedPairStatus;
  matched_at: Date;
  dissolved_at: Date | null;
}

export interface Message {
  id: UUID;
  sender_user_id: UUID;
  receiver_user_id: UUID;
  matched_pair_id: UUID;
  content: string;
  is_flagged: boolean;
  read_at: Date | null;
}


export interface PropertyCandidate {
  id: UUID;
  matched_pair_id: UUID;
  source_url: string;
  title: string;
  address: string;
  rent: number;
  initial_cost: number;
  room_type: string;
  building_age: number;
  station_name: string;
  station_walk_minutes: number;
  image_urls: string[];
  description: string;
  user1_rating: number | null; // 1-5
  user2_rating: number | null; // 1-5
  user1_comment: string | null;
  user2_comment: string | null;
  status: PropertyCandidateStatus;
}

export interface PairPreference {
  id: UUID;
  matched_pair_id: UUID;
  agreed_min_rent: number | null;
  agreed_max_rent: number | null;
  agreed_max_initial_cost: number | null;
  agreed_areas: string[];
  agreed_stations: string[];
  agreed_room_types: string[];
  priority_order: string[];
}


export interface ViewingSchedule {
  id: UUID;
  property_candidate_id: UUID;
  scheduled_date: Date;
  location: string;
  notes: string | null;
  status: ViewingScheduleStatus;
}

// -----------------------------------------------------------------------------
// Community
// -----------------------------------------------------------------------------


export interface Review {
  id: UUID;
  reviewer_user_id: UUID;
  reviewee_user_id: UUID;
  matched_pair_id: UUID;
  cleanliness_rating: number; // 1-5
  communication_rating: number; // 1-5
  rule_compliance_rating: number; // 1-5
  financial_reliability_rating: number; // 1-5
  overall_rating: number; // 1-5
  positive_comment: string | null;
  improvement_comment: string | null;
  advice_for_next: string | null;
  visibility: Visibility;
}


export interface Report {
  id: UUID;
  reporter_user_id: UUID;
  reported_user_id: UUID;
  reason: string;
  description: string;
  status: ReportStatus;
  resolved_at: Date | null;
}

export interface BlockedUser {
  blocker_user_id: UUID;
  blocked_user_id: UUID;
  blocked_at: Date;
}

export interface FavoriteUser {
  user_id: UUID;
  favorite_user_id: UUID;
  // created_at があれば追加
}

export interface ViewHistory {
  id: UUID;
  user_id: UUID;
  viewed_user_id: UUID;
  viewed_at: Date;
}


export interface Notification {
  id: UUID;
  user_id: UUID;
  type: NotificationType; // 実際のアプリ仕様に合わせて拡張
  title: string;
  content: string;
  link_url: string | null;
  is_read: boolean;
  read_at: Date | null;
}


export interface UniversityPost {
  id: UUID;
  user_id: UUID;
  university_name: string;
  title: string;
  content: string;
  category: UniversityPostCategory;
  // created_at, updated_at 等は通常ORM等で自動付与されるが、DB定義にないため省略
}

export interface UniversityPostComment {
  id: UUID;
  post_id: UUID;
  user_id: UUID;
  content: string;
}