#!/bin/bash

# Azure環境のセットアップスクリプト
# このスクリプトは、Azure上にTerraformのstateを保存するための
# Storage Accountを作成します

set -e

# カラー出力
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Azure環境セットアップ ===${NC}"

# 変数
RESOURCE_GROUP="terraform-state-rg"
STORAGE_ACCOUNT="tfstateroommate"
CONTAINER_NAME="tfstate"
LOCATION="japaneast"

# Azure CLIがインストールされているか確認
if ! command -v az &> /dev/null; then
    echo -e "${RED}Error: Azure CLI がインストールされていません${NC}"
    echo "https://docs.microsoft.com/cli/azure/install-azure-cli"
    exit 1
fi

# ログイン確認
echo -e "${YELLOW}Azure にログインしています...${NC}"
az account show &> /dev/null || az login

# サブスクリプションの確認
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
echo -e "${GREEN}サブスクリプション: $SUBSCRIPTION_ID${NC}"

# リソースグループの作成
echo -e "${YELLOW}リソースグループを作成しています...${NC}"
az group create \
    --name $RESOURCE_GROUP \
    --location $LOCATION \
    --output none

echo -e "${GREEN}✓ リソースグループ作成完了${NC}"

# Storage Accountの作成
echo -e "${YELLOW}Storage Accountを作成しています...${NC}"
az storage account create \
    --name $STORAGE_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --sku Standard_LRS \
    --encryption-services blob \
    --output none

echo -e "${GREEN}✓ Storage Account作成完了${NC}"

# Storage Containerの作成
echo -e "${YELLOW}Storage Containerを作成しています...${NC}"
az storage container create \
    --name $CONTAINER_NAME \
    --account-name $STORAGE_ACCOUNT \
    --auth-mode login \
    --output none

echo -e "${GREEN}✓ Storage Container作成完了${NC}"

# バックエンド設定の出力
echo ""
echo -e "${GREEN}=== セットアップ完了 ===${NC}"
echo ""
echo "Terraformのバックエンド設定を以下のように更新してください:"
echo ""
echo -e "${YELLOW}terraform {
  backend \"azurerm\" {
    resource_group_name  = \"$RESOURCE_GROUP\"
    storage_account_name = \"$STORAGE_ACCOUNT\"
    container_name       = \"$CONTAINER_NAME\"
    key                  = \"roommate.tfstate\"
  }
}${NC}"
echo ""
echo "次に、以下のコマンドを実行してTerraformを初期化してください:"
echo ""
echo -e "${YELLOW}cd infrastructure/terraform
terraform init${NC}"
echo ""
