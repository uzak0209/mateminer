#!/bin/bash

# ローカル環境でのデプロイスクリプト
# Docker Composeを使用してローカル環境を起動

set -e

# カラー出力
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== ルームメイトプラットフォーム - ローカルデプロイ ===${NC}"

# Dockerがインストールされているか確認
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker がインストールされていません${NC}"
    echo "https://docs.docker.com/get-docker/"
    exit 1
fi

# Docker Composeコマンドの検出
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo -e "${RED}Error: Docker Compose がインストールされていません${NC}"
    echo "https://docs.docker.com/compose/install/"
    exit 1
fi

echo -e "${GREEN}Using: $DOCKER_COMPOSE${NC}"

# .envファイルの確認
if [ ! -f .env ]; then
    echo -e "${YELLOW}Warning: .env ファイルが見つかりません${NC}"
    echo -e "${YELLOW}.env.example から .env を作成しています...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env ファイルを作成しました${NC}"
    echo -e "${YELLOW}必要に応じて .env ファイルを編集してください${NC}"
fi

# 既存のコンテナを停止
echo -e "${YELLOW}既存のコンテナを停止しています...${NC}"
$DOCKER_COMPOSE down

# Dockerイメージのビルド
echo -e "${YELLOW}Dockerイメージをビルドしています...${NC}"
$DOCKER_COMPOSE build

# コンテナの起動
echo -e "${YELLOW}コンテナを起動しています...${NC}"
$DOCKER_COMPOSE up -d

# ヘルスチェック
echo -e "${YELLOW}サービスの起動を待っています...${NC}"
sleep 10

# PostgreSQLヘルスチェック
echo -e "${YELLOW}PostgreSQL の接続を確認しています...${NC}"
if $DOCKER_COMPOSE exec -T postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PostgreSQL は正常に起動しています${NC}"
else
    echo -e "${RED}✗ PostgreSQL の起動に失敗しました${NC}"
fi

# Redisヘルスチェック
echo -e "${YELLOW}Redis の接続を確認しています...${NC}"
if $DOCKER_COMPOSE exec -T redis redis-cli ping > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Redis は正常に起動しています${NC}"
else
    echo -e "${RED}✗ Redis の起動に失敗しました${NC}"
fi

# Backendヘルスチェック
echo -e "${YELLOW}Backend API の接続を確認しています...${NC}"
sleep 5
if curl -f http://localhost:8080/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend API は正常に起動しています${NC}"
else
    echo -e "${RED}✗ Backend API の起動に失敗しました${NC}"
fi

# Frontendヘルスチェック
echo -e "${YELLOW}Frontend の接続を確認しています...${NC}"
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend は正常に起動しています${NC}"
else
    echo -e "${RED}✗ Frontend の起動に失敗しました${NC}"
fi

# 完了メッセージ
echo ""
echo -e "${GREEN}=== デプロイ完了 ===${NC}"
echo ""
echo -e "${BLUE}アクセスURL:${NC}"
echo -e "  Frontend:  ${GREEN}http://localhost:3000${NC}"
echo -e "  Backend:   ${GREEN}http://localhost:8080${NC}"
echo -e "  API Docs:  ${GREEN}http://localhost:8080/swagger${NC} (未実装)"
echo ""
echo -e "${BLUE}データベース:${NC}"
echo -e "  PostgreSQL: ${GREEN}localhost:5432${NC}"
echo -e "  Redis:      ${GREEN}localhost:6379${NC}"
echo ""
echo -e "${YELLOW}ログを確認するには:${NC}"
echo -e "  $DOCKER_COMPOSE logs -f"
echo ""
echo -e "${YELLOW}停止するには:${NC}"
echo -e "  $DOCKER_COMPOSE down"
echo ""
