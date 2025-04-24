# Development Environment Setup

## 🎯 Overview

This guide will help you set up the complete development environment for CookGuide, including all necessary tools, dependencies, and configurations.

## 📋 Prerequisites

### Required Software
- **Node.js** 18.0+ (LTS version recommended)
- **npm** 9.0+ or **yarn** 1.22+ or **pnpm** 8.0+
- **Git** 2.30+
- **PostgreSQL** 14+ (local or cloud instance)
- **VS Code** (recommended) or your preferred editor

### Optional Software
- **Docker** (for containerized development)
- **Postman** or **Insomnia** (for API testing)
- **pgAdmin** or **DBeaver** (for database management)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cook-guide
```

### 2. Install Dependencies
```bash
# Install root dependencies (if using workspaces)
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Configuration
```bash
# Copy environment templates
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 4. Database Setup
```bash
# Navigate to backend directory
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (if seed data exists)
npx prisma db seed
```

### 5. Start Development Servers
```bash
# Terminal 1: Start frontend
cd frontend
npm run dev

# Terminal 2: Start backend
cd backend
npm run dev
```

## 🔧 Detailed Setup Instructions

### Frontend Setup (Vue 3 + Vite)

#### 1. Create Frontend Directory Structure
```bash
mkdir -p frontend/src/{components,views,stores,composables,utils,types,assets,router,middleware}
mkdir -p frontend/public
```

#### 2. Initialize Frontend Package
```bash
cd frontend
npm init -y
```

#### 3. Install Frontend Dependencies
```bash
# Core dependencies
npm install vue@^3.4.0 vue-router@^4.2.0 pinia@^2.1.0

# UI and styling
npm install vuetify@^3.3.0 @mdi/font@^7.3.0

# Development tools
npm install -D vite@^5.0.0 @vitejs/plugin-vue@^4.4.0 typescript@^5.0.0

# Utilities
npm install vueuse@^9.0.0 zod@^3.22.0

# Testing
npm install -D vitest@^1.0.0 @vue/test-utils@^2.4.0 jsdom@^22.0.0

# Code quality
npm install -D eslint@^8.0.0 prettier@^3.0.0 @vue/eslint-config-typescript@^12.0.0
```

#### 4. Configure Vite
Create `frontend/vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

#### 5. Configure TypeScript
Create `frontend/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Backend Setup (Express.js + TypeScript)

#### 1. Create Backend Directory Structure
```bash
mkdir -p backend/src/{routes,middleware,prisma,types,config,utils,validators,services}
mkdir -p backend/prisma
```

#### 2. Initialize Backend Package
```bash
cd backend
npm init -y
```

#### 3. Install Backend Dependencies
```bash
# Core dependencies
npm install express@^4.18.0 cors@^2.8.0 helmet@^7.0.0

# Database
npm install prisma@^5.0.0 @prisma/client@^5.0.0

# Authentication
npm install passport@^0.6.0 passport-jwt@^4.0.0 bcryptjs@^2.4.0 jsonwebtoken@^9.0.0

# Validation and security
npm install express-validator@^7.0.0 express-rate-limit@^7.0.0

# File handling
npm install multer@^1.4.0 cloudinary@^1.39.0

# Performance and logging
npm install compression@^1.7.0 morgan@^1.10.0

# Development tools
npm install -D typescript@^5.0.0 @types/node@^20.0.0 @types/express@^4.17.0

# Testing
npm install -D vitest@^1.0.0 supertest@^6.3.0 @types/supertest@^2.0.0

# Code quality
npm install -D eslint@^8.0.0 prettier@^3.0.0 @typescript-eslint/parser@^6.0.0 @typescript-eslint/eslint-plugin@^6.0.0
```

#### 4. Configure TypeScript
Create `backend/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### 5. Configure Prisma
Create `backend/prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Add your models here
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Environment Variables

#### Frontend Environment (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_TITLE=CookGuide
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

#### Backend Environment (`.env`)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cookguide"

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🧪 Testing Setup

### Frontend Testing (Vitest)
Create `frontend/vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

### Backend Testing (Vitest)
Create `backend/vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

## 📝 Package Scripts

### Frontend Scripts (`frontend/package.json`)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  }
}
```

### Backend Scripts (`backend/package.json`)
```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    "lint": "eslint . --ext .ts --fix",
    "format": "prettier --write src/"
  }
}
```

## 🔧 VS Code Configuration

### Recommended Extensions
- **Vue Language Features (Volar)**
- **TypeScript Vue Plugin (Volar)**
- **ESLint**
- **Prettier**
- **Prisma**
- **PostgreSQL**

### VS Code Settings (`.vscode/settings.json`)
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ]
}
```

## 🚀 Development Workflow

### 1. Start Development
```bash
# Terminal 1: Frontend
cd frontend && npm run dev

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Database (if using local PostgreSQL)
# Start your PostgreSQL service
```

### 2. Database Management
```bash
# Generate Prisma client after schema changes
cd backend && npm run db:generate

# Run migrations
cd backend && npm run db:migrate

# Open Prisma Studio for database management
cd backend && npm run db:studio
```

### 3. Testing
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# Run tests with UI
npm run test:ui
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using port
lsof -i :3000  # or :5000
# Kill process
kill -9 <PID>
```

#### 2. Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists: `createdb cookguide`

#### 3. Prisma Issues
```bash
# Reset Prisma
cd backend
npx prisma generate
npx prisma migrate reset
```

#### 4. Node Modules Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🔗 Related Documentation

- **[Project Architecture](../project/architecture.md)** - System design and technology stack
- **[Development Workflow](./workflow.md)** - Git workflow and coding conventions
- **[Technology Compatibility](../technical/compatibility.md)** - Dependency compatibility
- **[Environment Configuration](../deployment/environment.md)** - Production environment setup

---

*This setup guide ensures a consistent development environment across the team. Follow these steps carefully to avoid configuration issues.* 