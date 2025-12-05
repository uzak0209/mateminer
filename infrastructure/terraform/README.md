# Terraform Infrastructure

このディレクトリには、Azureリソースのプロビジョニング用のTerraform設定が含まれています。

## 前提条件

- Terraform 1.6.0以上
- Azure CLI
- Azureサブスクリプション

## セットアップ

### 1. Azure CLIでログイン

```bash
az login
az account set --subscription "your-subscription-id"
```

### 2. 環境変数の設定

```bash
cp terraform.tfvars.example terraform.tfvars
# terraform.tfvars を編集して値を設定
```

または、環境変数で設定:

```bash
export TF_VAR_postgres_admin_password="YourSecurePassword123!"
export TF_VAR_jwt_secret="your-super-secret-jwt-key"
```

### 3. Terraform初期化

```bash
terraform init
```

## 使用方法

### リソースの計画

```bash
terraform plan
```

### リソースのデプロイ

```bash
terraform apply
```

### リソースの削除

```bash
terraform destroy
```

## デプロイされるリソース

### ネットワーク
- Virtual Network (VNet)
- Subnets (Container Apps, Database)

### コンテナ
- Azure Container Registry (ACR)
- Container Apps Environment
- Container App (Backend)

### データベース
- Azure Database for PostgreSQL (Flexible Server)
- PostgreSQL Database

### キャッシュ
- Azure Cache for Redis

### ストレージ
- Storage Account (ファイルアップロード用)
- Blob Container

### セキュリティ
- Key Vault (シークレット管理)

### 監視
- Log Analytics Workspace
- Application Insights

## 環境別デプロイ

### Staging環境

```bash
terraform apply -var="environment=staging"
```

### Production環境

```bash
terraform apply -var="environment=production"
```

## CI/CDとの統合

GitHub Actionsが自動的にTerraformを実行します:

1. **mainブランチへのプッシュ** → Staging環境にデプロイ
2. **タグ付け (v*)** → Production環境にデプロイ

## 手動デプロイ

GitHub Actionsから手動でトリガー可能:

1. GitHubリポジトリの「Actions」タブ
2. 「Deploy to Azure」ワークフローを選択
3. 「Run workflow」をクリック
4. 環境を選択 (staging/production)

## State管理

現在、Terraformのstateはローカルに保存されています。

本番環境では、Azureにstateを保存することを推奨:

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfstateroommate"
    container_name       = "tfstate"
    key                  = "roommate.tfstate"
  }
}
```

## 注意事項

- **シークレット**: terraform.tfvars にシークレットを保存しないでください（.gitignoreに含まれています）
- **コスト**: デプロイされるリソースには課金が発生します
- **削除**: terraform destroy を実行する前に、重要なデータをバックアップしてください

## トラブルシューティング

### エラー: "Subscription not registered"

```bash
az provider register --namespace Microsoft.App
az provider register --namespace Microsoft.DBforPostgreSQL
az provider register --namespace Microsoft.Cache
```

### エラー: "Insufficient quota"

Azureポータルで割り当て量を増やすか、別のリージョンを使用してください。

## 参考リンク

- [Terraform Azure Provider Documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure Container Apps Documentation](https://learn.microsoft.com/azure/container-apps/)
- [Azure Database for PostgreSQL Documentation](https://learn.microsoft.com/azure/postgresql/)
