// src/types/index.ts

export type UUID = string;

// ==========================================
// Enums & Union Types
// ==========================================

export type UserType = 'student' | 'graduate' | 'working' | 'other';
export type Gender = 'male' | 'female' | 'other' | 'private';
export type MoveInTiming = 'immediate' | '1-3months' | '3-6months' | 'undecided';
export type UserStatus = 'active' | 'inactive' | 'banned';
export type VerificationStatus = 'pending' | 'approved' | 'rejected'; // Typo fixed: Varification -> Verification
export type SocialProvider = 'google' | 'facebook' | 'twitter' | 'instagram';

// ライフスタイル回答用
export type SleepSchedule = 'early_bird' | 'night_owl' | 'irregular'; // Updated to match DB examples
export type CleanlinessLevel = 1 | 2 | 3 | 4 | 5; // 1: 気にしない - 5: 超潔癖
export type SocialPreference = 1 | 2 | 3 | 4 | 5; // 1: 1人が好き - 5: 常に一緒
export type SmokingStatus = 'none' | 'smoking' | 'electronic_only'; // Note: DB uses booleans (smoking, e_cigarette), logic might handle conversion
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
export type MessageType = 'text' | 'image' | 'file' | 'system';
export type AttachmentType = 'image' | 'video' | 'file' | 'pdf';

// Chat Types (New)
export type ChatRoomType = 'direct' | 'group' | 'match_pair';
export type ChatRole = 'member' | 'admin';

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
    insertedAt: Date;
    updatedAt: Date;
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

    insertedAt: Date;
    updatedAt: Date;
}

export interface StudentVerification {
    id: UUID;
    userId: UUID;
    studentCardImageUrl: string;
    universityName: string;
    status: VerificationStatus;
    verifiedAt: Date | null; // Fixed typo
    insertedAt: Date;
    updatedAt: Date;
}

export interface SocialConnection {
    id: UUID;
    userId: UUID;
    provider: SocialProvider;
    providerUserId: string;
    insertedAt: Date;
    updatedAt: Date;
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
    preferredPrefectures: string[]; // Changed to array (plural in DB)
    preferredCities: string[]; // Changed to array (plural in DB)
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
    insertedAt: Date;
    updatedAt: Date;
}

export interface Lifestyle {
    id: UUID;
    userId: UUID;
    sleepSchedule: SleepSchedule;
    cleanlinessLevel: number; // 1-5
    smoking: boolean;
    eCigarette: boolean;
    pets: PetPreference;
    guestFrequency: GuestFrequency;
    noiseTolerance: number; // 1-5
    socializingPreference: number; // 1-5
    homeTime: HomeTime;
    cookingFrequency: CookingFrequency;
    insertedAt: Date;
    updatedAt: Date;
}

export interface InterestTag {
    id: UUID;
    name: string;
    category: string;
    insertedAt: Date;
    updatedAt: Date;
}

export interface UserInterest {
    userId: UUID;
    interestTagId: UUID;
    insertedAt: Date;
    updatedAt: Date;
}

export interface LifestyleAssessment {
    id: UUID;
    userId: UUID;
    questionId: number;
    answerValue: number;
    completedAt: Date;
    insertedAt: Date;
    updatedAt: Date;
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
    insertedAt: Date;
    updatedAt: Date;
}

export interface MatchedPair {
    id: UUID;
    user1Id: UUID; // user1_id < user2_id constraint
    user2Id: UUID;
    matchRequestId: UUID;
    status: MatchedPairStatus;
    matchedAt: Date;
    dissolvedAt: Date | null;
    insertedAt: Date;
    updatedAt: Date;
}

export interface PropertyCandidate {
    id: UUID;
    matchedPairId: UUID;
    sourceUrl: string;
    title: string;
    address: string;
    rent: number;
    initialCost: number;
    roomType: string;
    buildingAge: number;
    stationName: string;
    stationWalkMinutes: number;
    imageUrls: string[];
    description: string;
    user1Rating: number | null; // 1-5
    user2Rating: number | null; // 1-5
    user1Comment: string | null;
    user2Comment: string | null;
    status: PropertyCandidateStatus;
    insertedAt: Date;
    updatedAt: Date;
}

export interface PairPreference {
    id: UUID;
    matchedPairId: UUID;
    agreedMinRent: number | null;
    agreedMaxRent: number | null;
    agreedMaxInitialCost: number | null;
    agreedAreas: string[];
    agreedStations: string[];
    agreedRoomTypes: string[];
    priorityOrder: string[];
    insertedAt: Date;
    updatedAt: Date;
}

export interface ViewingSchedule {
    id: UUID;
    propertyCandidateId: UUID;
    scheduledDate: Date;
    location: string;
    notes: string | null;
    status: ViewingScheduleStatus;
    insertedAt: Date;
    updatedAt: Date;
}

// ==========================================
// Chat & Messaging (New Section)
// ==========================================

export interface ChatRoom {
    id: UUID;
    name: string;
    roomType: ChatRoomType;
    matchedPairId?: UUID; // Optional, links if room_type is match_pair
    lastMessageAt: Date;
    isArchived: boolean;
    insertedAt: Date;
    updatedAt: Date;
}

export interface ChatRoomMember {
    id: UUID;
    chatRoomId: UUID;
    userId: UUID;
    role: ChatRole;
    lastReadAt: Date;
    notificationsEnabled: boolean;
    joinedAt: Date;
    leftAt?: Date;
    insertedAt: Date;
    updatedAt: Date;
}

export interface Message {
    id: UUID;
    chatRoomId: UUID; // Added to link to ChatRoom
    senderUserId: UUID;
    receiverUserId?: UUID; // Can be inferred from room context, but kept in DB
    matchedPairId?: UUID; // Kept in DB schema, likely for redundancy or analytics
    content: string;
    messageType: MessageType;
    attachmentUrl?: string;
    attachmentType?: AttachmentType; // String in DB, mapped to Type
    attachmentSize?: number;
    isFlagged?: boolean;
    isDeleted?: boolean;
    deletedAt?: Date | null;
    readAt?: Date | null;
    deliveredAt?: Date | null;
    replyToMessageId?: UUID;
    insertedAt: Date;
    updatedAt: Date;
}

export interface MessageReaction {
    id: UUID;
    messageId: UUID;
    userId: UUID;
    emoji: string;
    insertedAt: Date;
    updatedAt: Date;
}

export interface TypingIndicator {
    id: UUID;
    chatRoomId: UUID;
    userId: UUID;
    isTyping: boolean;
    expiresAt: Date;
    insertedAt: Date;
    updatedAt: Date;
}

// ==========================================
// Community & Other Features
// ==========================================

export interface Review {
    id: UUID;
    reviewerUserId: UUID;
    revieweeUserId: UUID;
    matchedPairId: UUID;
    cleanlinessRating: number; // 1-5
    communicationRating: number; // 1-5
    ruleComplianceRating: number; // 1-5
    financialReliabilityRating: number; // 1-5
    overallRating: number; // 1-5
    positiveComment: string | null;
    improvementComment: string | null;
    adviceForNext: string | null;
    visibility: Visibility;
    insertedAt: Date;
    updatedAt: Date;
}

export interface Report {
    id: UUID;
    reporterUserId: UUID;
    reportedUserId: UUID;
    reason: string;
    description: string;
    status: ReportStatus;
    resolvedAt: Date | null;
    insertedAt: Date;
    updatedAt: Date;
}

export interface BlockedUser {
    blockerUserId: UUID;
    blockedUserId: UUID;
    blockedAt: Date;
    insertedAt: Date;
    updatedAt: Date;
}

export interface FavoriteUser {
    userId: UUID;
    favoriteUserId: UUID;
    insertedAt: Date;
    updatedAt: Date;
}

export interface ViewHistory {
    id: UUID;
    userId: UUID;
    viewedUserId: UUID;
    viewedAt: Date;
    insertedAt: Date;
    updatedAt: Date;
}

export interface Notification {
    id: UUID;
    userId: UUID;
    type: NotificationType;
    title: string;
    content: string;
    linkUrl: string | null;
    isRead: boolean;
    readAt: Date | null;
    insertedAt: Date;
    updatedAt: Date;
}

export interface UniversityPost {
    id: UUID;
    userId: UUID;
    universityName: string;
    title: string;
    content: string;
    category: UniversityPostCategory;
    insertedAt: Date;
    updatedAt: Date;
}

export interface UniversityPostComment {
    id: UUID;
    postId: UUID;
    userId: UUID;
    content: string;
    insertedAt: Date;
    updatedAt: Date;
}