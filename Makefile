.PHONY: help build up down logs clean test

# Default target
.DEFAULT_GOAL := help

# Colors for output
COLOR_RESET = \033[0m
COLOR_BOLD = \033[1m
COLOR_GREEN = \033[32m
COLOR_YELLOW = \033[33m

# Detect docker compose command (with or without hyphen)
DOCKER_COMPOSE := $(shell command -v docker-compose 2> /dev/null)
ifndef DOCKER_COMPOSE
	DOCKER_COMPOSE := docker compose
endif

help: ## Show this help message
	@echo "$(COLOR_BOLD)Available commands:$(COLOR_RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(COLOR_GREEN)%-15s$(COLOR_RESET) %s\n", $$1, $$2}'

# Docker commands
build: ## Build all Docker containers
	@echo "$(COLOR_YELLOW)Building Docker containers...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) build

up: ## Start all services
	@echo "$(COLOR_YELLOW)Starting services...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) up -d
	@echo "$(COLOR_GREEN)Services started!$(COLOR_RESET)"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend:  http://localhost:8080"

down: ## Stop all services
	@echo "$(COLOR_YELLOW)Stopping services...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) down
	@echo "$(COLOR_GREEN)Services stopped!$(COLOR_RESET)"

restart: ## Restart all services
	@echo "$(COLOR_YELLOW)Restarting services...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) restart

logs: ## Show logs from all services
	$(DOCKER_COMPOSE) logs -f

logs-backend: ## Show backend logs
	$(DOCKER_COMPOSE) logs -f backend

logs-frontend: ## Show frontend logs
	$(DOCKER_COMPOSE) logs -f frontend

logs-db: ## Show database logs
	$(DOCKER_COMPOSE) logs -f postgres

# Development commands
dev-backend: ## Run backend in development mode
	cd backend && go run cmd/api/main.go

dev-frontend: ## Run frontend in development mode
	cd frontend && npm run dev

# Database commands
db-migrate: ## Run database migrations
	@echo "$(COLOR_YELLOW)Running database migrations...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) exec backend /app/migrate up
	@echo "$(COLOR_GREEN)Migrations complete!$(COLOR_RESET)"

db-rollback: ## Rollback last database migration
	@echo "$(COLOR_YELLOW)Rolling back last migration...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) exec backend /app/migrate down 1
	@echo "$(COLOR_GREEN)Rollback complete!$(COLOR_RESET)"

db-shell: ## Open PostgreSQL shell
	$(DOCKER_COMPOSE) exec postgres psql -U postgres -d roommate_db

db-reset: ## Reset database (WARNING: destroys all data)
	@echo "$(COLOR_YELLOW)Resetting database...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE) up -d postgres
	@echo "$(COLOR_GREEN)Database reset complete!$(COLOR_RESET)"

# Testing commands
test: ## Run all tests
	@echo "$(COLOR_YELLOW)Running tests...$(COLOR_RESET)"
	cd backend && go test ./... -v
	cd frontend && npm test
	@echo "$(COLOR_GREEN)Tests complete!$(COLOR_RESET)"

test-backend: ## Run backend tests
	cd backend && go test ./... -v -cover

test-frontend: ## Run frontend tests
	cd frontend && npm test

# Cleanup commands
clean: ## Clean up containers and volumes
	@echo "$(COLOR_YELLOW)Cleaning up...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) down -v --remove-orphans
	docker system prune -f
	@echo "$(COLOR_GREEN)Cleanup complete!$(COLOR_RESET)"

clean-all: ## Deep clean (including images)
	@echo "$(COLOR_YELLOW)Deep cleaning...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) down -v --rmi all --remove-orphans
	docker system prune -af --volumes
	@echo "$(COLOR_GREEN)Deep cleanup complete!$(COLOR_RESET)"

# Setup commands
setup: ## Initial project setup
	@echo "$(COLOR_YELLOW)Setting up project...$(COLOR_RESET)"
	cp -n .env.example .env || true
	@echo "$(COLOR_GREEN)Setup complete! Edit .env file with your configuration.$(COLOR_RESET)"

install: ## Install dependencies
	@echo "$(COLOR_YELLOW)Installing dependencies...$(COLOR_RESET)"
	cd backend && go mod download
	cd frontend && npm install
	@echo "$(COLOR_GREEN)Dependencies installed!$(COLOR_RESET)"

# Production commands
prod-build: ## Build production images
	@echo "$(COLOR_YELLOW)Building production images...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml build

prod-up: ## Start production services
	@echo "$(COLOR_YELLOW)Starting production services...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml up -d

# Health check
health: ## Check service health
	@echo "$(COLOR_YELLOW)Checking service health...$(COLOR_RESET)"
	@curl -f http://localhost:3000/api/health || echo "Frontend: DOWN"
	@curl -f http://localhost:8080/health || echo "Backend: DOWN"
	@echo "$(COLOR_GREEN)Health check complete!$(COLOR_RESET)"

# Quick start
quick-start: setup build up ## Quick start (setup + build + up)
	@echo "$(COLOR_GREEN)Application is running!$(COLOR_RESET)"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend:  http://localhost:8080"
