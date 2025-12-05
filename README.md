# ルームメイトファースト型ルームシェアプラットフォーム

大学生向けのルームメイトマッチングプラットフォーム - 「人が先、物件は後」

## プロジェクト概要

既存のルームシェアサービスとは異なり、まず理想のルームメイトを見つけてから、2人で一緒に物件を探すという革新的なアプローチを採用しています。

### 主な機能

- ✅ ライフスタイル診断による相性マッチング
- ✅ 大学別コミュニティ
- ✅ リアルタイムチャット
- ✅ 物件探しサポート
- ✅ レビュー・評価システム

## 技術スタック

### フロントエンド
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- TanStack Query

### バックエンド
- **Go 1.21+** (選定理由: [TECH_STACK.md](./TECH_STACK.md) を参照)
- Gin Framework
- GORM (PostgreSQL ORM)
- JWT認証
- WebSocket (gorilla/websocket)

### インフラ
- **ローカル開発**: Docker Compose
- **本番環境**:
  - Frontend: Vercel
  - Backend: Azure Container Apps
  - Database: Azure Database for PostgreSQL
  - Cache: Azure Cache for Redis
  - IaC: Terraform

## 開発環境のセットアップ

### 必要要件

- Docker & Docker Compose
- Make (optional, but recommended)
- Node.js 20+ (ローカル開発の場合)
- Go 1.21+ (ローカル開発の場合)

### クイックスタート

1. **リポジトリをクローン**
   ```bash
   git clone <repository-url>
   cd roommate
   ```

2. **環境変数の設定**
   ```bash
   cp .env.example .env
   # .env ファイルを編集して必要な値を設定
   ```

3. **Docker Composeで起動**
   ```bash
   make quick-start
   # または
   docker-compose up -d
   ```

4. **アクセス**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Health Check: http://localhost:8080/health

### Makeコマンド

```bash
make help              # 利用可能なコマンドを表示
make build             # Dockerイメージをビルド
make up                # サービスを起動
make down              # サービスを停止
make logs              # ログを表示
make test              # テストを実行
make db-shell          # PostgreSQLシェルを開く
make clean             # コンテナとボリュームをクリーンアップ
```

## プロジェクト構造

```
.
├── backend/                 # Go バックエンド
│   ├── cmd/                # エントリーポイント
│   ├── internal/           # 内部パッケージ
│   │   ├── domain/        # ドメインモデル
│   │   ├── usecase/       # ビジネスロジック
│   │   ├── repository/    # データアクセス層
│   │   ├── handler/       # HTTPハンドラー
│   │   └── websocket/     # WebSocket管理
│   ├── pkg/               # 共有パッケージ
│   ├── migrations/        # DBマイグレーション
│   └── Dockerfile
│
├── frontend/               # Next.js フロントエンド
│   ├── src/
│   │   ├── app/          # App Router
│   │   ├── components/   # Reactコンポーネント
│   │   ├── lib/          # ユーティリティ
│   │   └── types/        # TypeScript型定義
│   ├── public/
│   └── Dockerfile
│
├── infrastructure/         # インフラ設定
│   ├── terraform/         # Terraform設定
│   └── scripts/          # デプロイスクリプト
│
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
│
├── docker-compose.yml     # ローカル開発環境
├── Makefile              # 開発用コマンド
└── TECH_STACK.md         # 技術選定の詳細
```

## 開発ワークフロー

### ローカル開発

1. **バックエンド開発**
   ```bash
   cd backend
   go run cmd/api/main.go
   ```

2. **フロントエンド開発**
   ```bash
   cd frontend
   npm run dev
   ```

### テスト

```bash
# すべてのテスト
make test

# バックエンドのみ
make test-backend

# フロントエンドのみ
make test-frontend
```

### データベース操作

```bash
# マイグレーション実行
make db-migrate

# ロールバック
make db-rollback

# PostgreSQLシェル
make db-shell

# データベースリセット (注意: すべてのデータが削除されます)
make db-reset
```

## CI/CD

GitHub Actionsを使用した自動化:

- **Pull Request**: テスト、リント、ビルドチェック
- **main ブランチマージ**:
  - テスト実行
  - Dockerイメージビルド
  - Azure Container Registryにプッシュ
  - Terraformによる自動デプロイ (staging環境)
- **タグプッシュ (v*)**: 本番環境へのデプロイ

## 本番デプロイ

### Azure環境の準備

1. **Terraform初期化**
   ```bash
   cd infrastructure/terraform
   terraform init
   ```

2. **環境変数の設定**
   ```bash
   # Azure認証情報を設定
   export ARM_SUBSCRIPTION_ID="your-subscription-id"
   export ARM_TENANT_ID="your-tenant-id"
   export ARM_CLIENT_ID="your-client-id"
   export ARM_CLIENT_SECRET="your-client-secret"
   ```

3. **インフラのデプロイ**
   ```bash
   terraform plan
   terraform apply
   ```

### Vercelへのフロントエンドデプロイ

```bash
cd frontend
vercel --prod
```

## トラブルシューティング

### Docker関連

- **コンテナが起動しない**
  ```bash
  make clean
  make build
  make up
  ```

- **ポートが使用中**
  ```bash
  # .envファイルでポートを変更
  # または、既存のプロセスを停止
  ```

### データベース関連

- **接続エラー**
  ```bash
  # PostgreSQLコンテナの状態を確認
  docker-compose ps postgres
  docker-compose logs postgres
  ```

## ドキュメント

- [技術スタック選定理由](./TECH_STACK.md)
- [機能要件定義](./roomshare-requirements.html)
- API ドキュメント: http://localhost:8080/swagger (開発中)

## ライセンス

MIT License

## コントリビューション

1. フォークする
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## サポート

問題や質問がある場合は、GitHubのIssuesで報告してください。
