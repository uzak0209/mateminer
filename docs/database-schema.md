# データベース設計書

## 概要

ルームメイトマッチングプラットフォームのデータベーススキーマ定義

- **合計テーブル数**: 27テーブル
- **データベース**: PostgreSQL 15+
- **ORM**: Ecto (Elixir)
- **主キー**: UUID (uuid_generate_v4)

---

## 1. ユーザー管理 (4テーブル)

### users - ユーザー基本情報

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| email | STRING | メールアドレス（ユニーク） |
| password_hash | STRING | パスワードハッシュ |
| phone_number | STRING | 電話番号（ユニーク） |
| phone_verified | BOOLEAN | 電話番号認証済み |
| email_verified | BOOLEAN | メール認証済み |
| is_university_email | BOOLEAN | 大学メールアドレスか |
| trust_score | INTEGER | 信頼スコア (0-100) |
| status | STRING | ステータス (active等) |
| last_login_at | DATETIME | 最終ログイン日時 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `email` (unique)
- `phone_number` (unique)
- `status`

---

### profiles - プロフィール

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| user_id | UUID | users.id への外部キー |
| nickname | STRING | ニックネーム |
| age | INTEGER | 年齢 |
| gender | STRING | 性別 |
| user_type | STRING | ユーザータイプ (student, working等) |
| university_name | STRING | 大学名 |
| faculty | STRING | 学部 |
| department | STRING | 学科 |
| grade | INTEGER | 学年 |
| campus | STRING | キャンパス |
| occupation | STRING | 職業 |
| bio | TEXT | 自己紹介 |
| video_url | STRING | 自己紹介動画URL |
| avatar_url | STRING | アバター画像URL |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user_id` (unique)
- `university_name`
- `gender`

---

### student_verifications - 学生証認証

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| user_id | UUID | users.id への外部キー |
| student_card_image_url | STRING | 学生証画像URL |
| university_name | STRING | 大学名 |
| status | STRING | ステータス (pending, approved, rejected) |
| verified_at | DATETIME | 認証日時 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user_id`
- `status`

---

### social_connections - SNS連携

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| user_id | UUID | users.id への外部キー |
| provider | STRING | SNSプロバイダー (google, twitter, instagram) |
| provider_user_id | STRING | プロバイダー側のユーザーID |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `provider, provider_user_id` (unique)
- `user_id`

---

## 2. 希望条件・ライフスタイル (5テーブル)

### property_preferences - 物件希望条件

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| user_id | UUID | users.id への外部キー |
| min_rent | DECIMAL | 最低家賃 |
| max_rent | DECIMAL | 最高家賃 |
| max_initial_cost | DECIMAL | 初期費用上限 |
| preferred_prefectures | ARRAY | 希望都道府県 |
| preferred_cities | ARRAY | 希望市区町村 |
| preferred_stations | ARRAY | 希望最寄り駅 |
| max_commute_time | INTEGER | 最大通勤時間（分） |
| room_types | ARRAY | 希望間取り (1LDK, 2DK等) |
| min_building_age | INTEGER | 最低築年数 |
| max_building_age | INTEGER | 最高築年数 |
| requires_auto_lock | BOOLEAN | オートロック必須 |
| requires_separate_bath_toilet | BOOLEAN | バストイレ別必須 |
| requires_south_facing | BOOLEAN | 南向き必須 |
| other_requirements | TEXT | その他要件 |
| move_in_timing | STRING | 入居時期 (immediate, 1-3months等) |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user_id` (unique)

---

### lifestyles - ライフスタイル

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| user_id | UUID | users.id への外部キー |
| sleep_schedule | STRING | 睡眠スケジュール (early_bird, night_owl等) |
| cleanliness_level | INTEGER | 清潔度レベル (1-5) |
| smoking | BOOLEAN | 喫煙 |
| e_cigarette | BOOLEAN | 電子タバコ |
| pets | STRING | ペット (have, want, allergic, neutral) |
| guest_frequency | STRING | 来客頻度 (rarely, monthly, weekly) |
| noise_tolerance | INTEGER | 騒音許容度 (1-5) |
| socializing_preference | INTEGER | 社交性 (1-5) |
| home_time | STRING | 在宅時間 (mostly_out, half, mostly_home) |
| cooking_frequency | STRING | 料理頻度 (never, sometimes, daily) |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user_id` (unique)

---

### interest_tags - 興味・趣味タグ

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| name | STRING | タグ名（ユニーク） |
| category | STRING | カテゴリー |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `name` (unique)
- `category`

---

### user_interests - ユーザーと興味の関連

| カラム名 | 型 | 説明 |
|---------|-----|------|
| user_id | UUID | users.id への外部キー |
| interest_tag_id | UUID | interest_tags.id への外部キー |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user_id, interest_tag_id` (unique)
- `user_id`
- `interest_tag_id`

---

### lifestyle_assessments - ライフスタイル診断結果

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| user_id | UUID | users.id への外部キー |
| question_id | INTEGER | 質問ID |
| answer_value | INTEGER | 回答値 |
| completed_at | DATETIME | 完了日時 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user_id`

---

## 3. マッチング機能 (6テーブル)

### match_requests - マッチングリクエスト

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| sender_user_id | UUID | 送信者 users.id |
| receiver_user_id | UUID | 受信者 users.id |
| status | STRING | ステータス (pending, accepted, rejected, expired) |
| message | TEXT | メッセージ |
| compatibility_score | INTEGER | 相性スコア (0-100) |
| expires_at | DATETIME | 期限 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `sender_user_id`
- `receiver_user_id`
- `status`

---

### matched_pairs - マッチング成立ペア

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| user1_id | UUID | ユーザー1 (user1_id < user2_id) |
| user2_id | UUID | ユーザー2 |
| match_request_id | UUID | match_requests.id への外部キー |
| status | STRING | ステータス (active, property_searching, contracted, dissolved) |
| matched_at | DATETIME | マッチング日時 |
| dissolved_at | DATETIME | 解消日時 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user1_id`
- `user2_id`
- `status`

---

### messages - メッセージ（DM/チャット）

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| chat_room_id | UUID | chat_rooms.id への外部キー |
| sender_user_id | UUID | 送信者 users.id |
| receiver_user_id | UUID | 受信者 users.id |
| matched_pair_id | UUID | matched_pairs.id への外部キー |
| content | TEXT | メッセージ内容 |
| message_type | STRING | メッセージタイプ (text, image, file, system) |
| attachment_url | STRING | 添付ファイルURL |
| attachment_type | STRING | 添付ファイルタイプ (image/jpeg, application/pdf等) |
| attachment_size | INTEGER | 添付ファイルサイズ（バイト） |
| is_flagged | BOOLEAN | フラグ付き |
| is_deleted | BOOLEAN | 削除済み |
| deleted_at | DATETIME | 削除日時 |
| read_at | DATETIME | 既読日時 |
| delivered_at | DATETIME | 配信日時 |
| reply_to_message_id | UUID | 返信先メッセージID |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `chat_room_id`
- `sender_user_id`
- `receiver_user_id`
- `matched_pair_id`
- `inserted_at`
- `reply_to_message_id`

---

### property_candidates - 物件候補

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| matched_pair_id | UUID | matched_pairs.id への外部キー |
| source_url | STRING | 元URL (SUUMO等) |
| title | STRING | 物件タイトル |
| address | TEXT | 住所 |
| rent | DECIMAL | 家賃 |
| initial_cost | DECIMAL | 初期費用 |
| room_type | STRING | 間取り |
| building_age | INTEGER | 築年数 |
| station_name | STRING | 最寄り駅 |
| station_walk_minutes | INTEGER | 駅徒歩分 |
| image_urls | ARRAY | 画像URL配列 |
| description | TEXT | 説明 |
| user1_rating | INTEGER | ユーザー1評価 (1-5) |
| user2_rating | INTEGER | ユーザー2評価 (1-5) |
| user1_comment | TEXT | ユーザー1コメント |
| user2_comment | TEXT | ユーザー2コメント |
| status | STRING | ステータス (candidate, favorite, viewing_scheduled等) |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `matched_pair_id`
- `status`

---

### pair_preferences - ペアの共通希望条件

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| matched_pair_id | UUID | matched_pairs.id への外部キー |
| agreed_min_rent | DECIMAL | 合意済み最低家賃 |
| agreed_max_rent | DECIMAL | 合意済み最高家賃 |
| agreed_max_initial_cost | DECIMAL | 合意済み初期費用上限 |
| agreed_areas | ARRAY | 合意済みエリア |
| agreed_stations | ARRAY | 合意済み駅 |
| agreed_room_types | ARRAY | 合意済み間取り |
| priority_order | ARRAY | 優先順位 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `matched_pair_id` (unique)

---

### viewing_schedules - 内見スケジュール

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| property_candidate_id | UUID | property_candidates.id への外部キー |
| scheduled_date | DATETIME | 予定日時 |
| location | TEXT | 場所 |
| notes | TEXT | メモ |
| status | STRING | ステータス (scheduled, completed, cancelled) |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `property_candidate_id`
- `status`

---

## 4. チャット・DM機能 (4テーブル) 🆕

### chat_rooms - チャットルーム

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| name | STRING | ルーム名 |
| room_type | STRING | ルームタイプ (direct, group, match_pair) |
| matched_pair_id | UUID | matched_pairs.id への外部キー |
| last_message_at | DATETIME | 最終メッセージ日時 |
| is_archived | BOOLEAN | アーカイブ済み |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `matched_pair_id`
- `room_type`
- `last_message_at`

---

### chat_room_members - チャットルームメンバー

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| chat_room_id | UUID | chat_rooms.id への外部キー |
| user_id | UUID | users.id への外部キー |
| role | STRING | 役割 (member, admin) |
| last_read_at | DATETIME | 最終既読日時 |
| notifications_enabled | BOOLEAN | 通知有効 |
| joined_at | DATETIME | 参加日時 |
| left_at | DATETIME | 退出日時 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `chat_room_id, user_id` (unique)
- `chat_room_id`
- `user_id`

---

### message_reactions - メッセージリアクション

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| message_id | UUID | messages.id への外部キー |
| user_id | UUID | users.id への外部キー |
| emoji | STRING | 絵文字 (👍, ❤️, 😂等) |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `message_id, user_id, emoji` (unique)
- `message_id`
- `user_id`

---

### typing_indicators - タイピングインジケーター

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| chat_room_id | UUID | chat_rooms.id への外部キー |
| user_id | UUID | users.id への外部キー |
| is_typing | BOOLEAN | タイピング中 |
| expires_at | DATETIME | 有効期限 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `chat_room_id, user_id` (unique)
- `chat_room_id`
- `expires_at`

---

## 5. コミュニティ機能 (8テーブル)

### reviews - レビュー・評価

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| reviewer_user_id | UUID | レビュー投稿者 users.id |
| reviewee_user_id | UUID | レビュー対象者 users.id |
| matched_pair_id | UUID | matched_pairs.id への外部キー |
| cleanliness_rating | INTEGER | 清潔度評価 (1-5) |
| communication_rating | INTEGER | コミュニケーション評価 (1-5) |
| rule_compliance_rating | INTEGER | ルール遵守評価 (1-5) |
| financial_reliability_rating | INTEGER | 金銭面信頼性評価 (1-5) |
| overall_rating | INTEGER | 総合評価 (1-5) |
| positive_comment | TEXT | 良かった点 |
| improvement_comment | TEXT | 改善点 |
| advice_for_next | TEXT | 次の人へのアドバイス |
| visibility | STRING | 公開範囲 (public等) |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `reviewer_user_id`
- `reviewee_user_id`
- `matched_pair_id`

---

### reports - 通報

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| reporter_user_id | UUID | 通報者 users.id |
| reported_user_id | UUID | 通報対象者 users.id |
| reason | STRING | 理由 |
| description | TEXT | 詳細 |
| status | STRING | ステータス (pending等) |
| resolved_at | DATETIME | 解決日時 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `reporter_user_id`
- `reported_user_id`
- `status`

---

### blocked_users - ブロックリスト

| カラム名 | 型 | 説明 |
|---------|-----|------|
| blocker_user_id | UUID | ブロック実行者 users.id |
| blocked_user_id | UUID | ブロック対象者 users.id |
| blocked_at | DATETIME | ブロック日時 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `blocker_user_id, blocked_user_id` (unique)
- `blocker_user_id`
- `blocked_user_id`

---

### favorite_users - お気に入りユーザー

| カラム名 | 型 | 説明 |
|---------|-----|------|
| user_id | UUID | users.id |
| favorite_user_id | UUID | お気に入りユーザー users.id |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user_id, favorite_user_id` (unique)
- `user_id`
- `favorite_user_id`

---

### view_history - 閲覧履歴

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| user_id | UUID | 閲覧者 users.id |
| viewed_user_id | UUID | 閲覧されたユーザー users.id |
| viewed_at | DATETIME | 閲覧日時 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user_id`
- `viewed_user_id`

---

### notifications - 通知

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| user_id | UUID | users.id への外部キー |
| type | STRING | 通知タイプ |
| title | STRING | タイトル |
| content | TEXT | 内容 |
| link_url | STRING | リンクURL |
| is_read | BOOLEAN | 既読フラグ |
| read_at | DATETIME | 既読日時 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user_id`
- `is_read`

---

### university_posts - 大学コミュニティ投稿

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| user_id | UUID | users.id への外部キー |
| university_name | STRING | 大学名 |
| title | STRING | タイトル |
| content | TEXT | 内容 |
| category | STRING | カテゴリー (question, advice, property_info, event) |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `user_id`
- `university_name`
- `category`

---

### university_post_comments - 投稿コメント

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | プライマリーキー |
| post_id | UUID | university_posts.id への外部キー |
| user_id | UUID | users.id への外部キー |
| content | TEXT | コメント内容 |
| inserted_at | DATETIME | 作成日時 |
| updated_at | DATETIME | 更新日時 |

**インデックス:**
- `post_id`
- `user_id`

---

## 主要な設計方針

### 1. ルームメイトファースト
- 物件テーブルは存在せず、ユーザー間のマッチングが中心
- 物件は `property_candidates`（候補）として、マッチング後に2人で共有

### 2. セキュリティ
- UUIDをプライマリーキーとして使用（推測困難）
- パスワードはハッシュ化して保存
- 信頼スコアシステムで安全性を担保

### 3. データ整合性
- 外部キー制約で関連データの整合性を保証
- Check制約で評価値の範囲を検証（1-5、0-100等）
- Unique制約で重複を防止

### 4. パフォーマンス
- 頻繁に検索されるカラムにインデックスを設定
- PostgreSQLの配列型を活用（preferred_cities等）
- チャット機能向けに `inserted_at` にインデックス

### 5. 拡張性
- enum型ではなくstring型を使用（柔軟性重視）
- タイムスタンプで履歴管理
- ソフトデリート可能な設計（`is_deleted`, `deleted_at`）

### 6. リアルタイム機能
- チャットルームベースのメッセージング
- タイピングインジケーター
- メッセージリアクション
- 既読・配信状態の追跡

---

## ER図

```
users (1) --- (1) profiles
users (1) --- (0..n) student_verifications
users (1) --- (0..n) social_connections
users (1) --- (0..1) property_preferences
users (1) --- (0..1) lifestyles
users (1) --- (0..n) user_interests --- (1) interest_tags
users (1) --- (0..n) lifestyle_assessments

users (1) --- (0..n) match_requests [sender]
users (1) --- (0..n) match_requests [receiver]
match_requests (1) --- (0..1) matched_pairs

matched_pairs (1) --- (0..n) messages
matched_pairs (1) --- (0..n) property_candidates
matched_pairs (1) --- (0..1) pair_preferences
matched_pairs (1) --- (0..1) chat_rooms

property_candidates (1) --- (0..n) viewing_schedules

users (1) --- (0..n) chat_room_members
chat_rooms (1) --- (0..n) chat_room_members
chat_rooms (1) --- (0..n) messages
messages (1) --- (0..n) message_reactions
chat_rooms (1) --- (0..n) typing_indicators

users (1) --- (0..n) reviews [reviewer]
users (1) --- (0..n) reviews [reviewee]
users (1) --- (0..n) reports [reporter]
users (1) --- (0..n) reports [reported]
users (1) --- (0..n) blocked_users [blocker]
users (1) --- (0..n) blocked_users [blocked]
users (1) --- (0..n) favorite_users
users (1) --- (0..n) view_history
users (1) --- (0..n) notifications
users (1) --- (0..n) university_posts
university_posts (1) --- (0..n) university_post_comments
```

---

## マイグレーション実行順序

1. `create_users` - ユーザーテーブル（UUID拡張有効化）
2. `create_profiles` - プロフィール
3. `create_student_verifications` - 学生証認証
4. `create_social_connections` - SNS連携
5. `create_property_preferences` - 物件希望条件
6. `create_lifestyles` - ライフスタイル
7. `create_interest_tags` - 興味タグ
8. `create_user_interests` - ユーザー興味関連
9. `create_lifestyle_assessments` - 診断結果
10. `create_match_requests` - マッチングリクエスト
11. `create_matched_pairs` - マッチングペア
12. `create_messages` - メッセージ
13. `create_property_candidates` - 物件候補
14. `create_pair_preferences` - ペア希望条件
15. `create_viewing_schedules` - 内見スケジュール
16. `create_reviews` - レビュー
17. `create_reports` - 通報
18. `create_blocked_users` - ブロックリスト
19. `create_favorite_users` - お気に入り
20. `create_view_history` - 閲覧履歴
21. `create_notifications` - 通知
22. `create_university_posts` - 大学投稿
23. `create_university_post_comments` - 投稿コメント
24. `create_chat_rooms` - チャットルーム 🆕
25. `create_chat_room_members` - ルームメンバー 🆕
26. `create_message_reactions` - メッセージリアクション 🆕
27. `create_typing_indicators` - タイピングインジケーター 🆕
28. `add_chat_room_to_messages` - メッセージにチャットルーム追加 🆕

---

## チャット/DM機能の使い方

### DMの送信フロー

1. ユーザー間でダイレクトチャットルームを作成または取得
2. `chat_rooms` テーブルに `room_type: "direct"` のレコードを作成
3. `chat_room_members` に両ユーザーを追加
4. `messages` テーブルにメッセージを挿入（`chat_room_id` を指定）
5. 受信者の `chat_room_members.last_read_at` を更新して既読状態を管理

### グループチャット

1. `room_type: "group"` でチャットルームを作成
2. 複数ユーザーを `chat_room_members` に追加
3. 管理者は `role: "admin"` に設定

### マッチングペア専用チャット

1. マッチング成立時に自動的に `room_type: "match_pair"` のルームを作成
2. `matched_pair_id` を設定
3. ペア解消時にアーカイブ（`is_archived: true`）

---

## 更新履歴

- 2025-12-08: 初版作成（23テーブル）
- 2025-12-12: チャット/DM機能追加（4テーブル追加、messagesテーブル拡張）

---

**作成日**: 2025年12月12日
**データベース**: PostgreSQL 15+
**ORM**: Ecto (Elixir Phoenix)
