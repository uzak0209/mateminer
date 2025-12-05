# Backend Container App
resource "azurerm_container_app" "backend" {
  name                         = "${local.project_name}-${local.environment}-backend"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  registry {
    server               = azurerm_container_registry.main.login_server
    username             = azurerm_container_registry.main.admin_username
    password_secret_name = "acr-password"
  }

  secret {
    name  = "acr-password"
    value = azurerm_container_registry.main.admin_password
  }

  secret {
    name  = "postgres-password"
    value = var.postgres_admin_password
  }

  secret {
    name  = "redis-password"
    value = azurerm_redis_cache.main.primary_access_key
  }

  secret {
    name  = "jwt-secret"
    value = var.jwt_secret
  }

  template {
    container {
      name   = "backend"
      image  = "${azurerm_container_registry.main.login_server}/${var.backend_image}"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "PORT"
        value = "8080"
      }

      env {
        name  = "GIN_MODE"
        value = var.environment == "production" ? "release" : "debug"
      }

      env {
        name  = "DB_HOST"
        value = azurerm_postgresql_flexible_server.main.fqdn
      }

      env {
        name  = "DB_PORT"
        value = "5432"
      }

      env {
        name  = "DB_USER"
        value = var.postgres_admin_username
      }

      env {
        name        = "DB_PASSWORD"
        secret_name = "postgres-password"
      }

      env {
        name  = "DB_NAME"
        value = var.postgres_database_name
      }

      env {
        name  = "DB_SSLMODE"
        value = "require"
      }

      env {
        name  = "REDIS_HOST"
        value = azurerm_redis_cache.main.hostname
      }

      env {
        name  = "REDIS_PORT"
        value = tostring(azurerm_redis_cache.main.ssl_port)
      }

      env {
        name        = "REDIS_PASSWORD"
        secret_name = "redis-password"
      }

      env {
        name        = "JWT_SECRET"
        secret_name = "jwt-secret"
      }

      env {
        name  = "APPLICATIONINSIGHTS_CONNECTION_STRING"
        value = azurerm_application_insights.main.connection_string
      }

      env {
        name  = "AZURE_STORAGE_CONNECTION_STRING"
        value = azurerm_storage_account.main.primary_connection_string
      }
    }

    min_replicas = var.environment == "production" ? 2 : 1
    max_replicas = var.environment == "production" ? 10 : 3
  }

  ingress {
    external_enabled = true
    target_port      = 8080
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  tags = local.common_tags
}

# Frontend Container App (Optional - if not using Vercel)
# Uncomment if deploying frontend to Azure Container Apps
# resource "azurerm_container_app" "frontend" {
#   name                         = "${local.project_name}-${local.environment}-frontend"
#   container_app_environment_id = azurerm_container_app_environment.main.id
#   resource_group_name          = azurerm_resource_group.main.name
#   revision_mode                = "Single"

#   registry {
#     server               = azurerm_container_registry.main.login_server
#     username             = azurerm_container_registry.main.admin_username
#     password_secret_name = "acr-password"
#   }

#   secret {
#     name  = "acr-password"
#     value = azurerm_container_registry.main.admin_password
#   }

#   template {
#     container {
#       name   = "frontend"
#       image  = "${azurerm_container_registry.main.login_server}/${var.frontend_image}"
#       cpu    = 0.5
#       memory = "1Gi"

#       env {
#         name  = "NEXT_PUBLIC_API_URL"
#         value = "https://${azurerm_container_app.backend.ingress[0].fqdn}"
#       }

#       env {
#         name  = "NODE_ENV"
#         value = "production"
#       }
#     }

#     min_replicas = var.environment == "production" ? 2 : 1
#     max_replicas = var.environment == "production" ? 10 : 3
#   }

#   ingress {
#     external_enabled = true
#     target_port      = 3000
#     traffic_weight {
#       latest_revision = true
#       percentage      = 100
#     }
#   }

#   tags = local.common_tags
# }
