# Hosting & Deployment Guide

## 🚀 Deployment Overview

CookGuide is designed for deployment across multiple platforms with a clear separation between frontend and backend services. This guide covers deployment strategies, platform configurations, and best practices.

## 🏗️ Architecture Overview

### Deployment Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vercel)      │◄──►│   (Railway)     │◄──►│   (Railway PG)  │
│                 │    │                 │    │                 │
│ • Vue 3 + Vite  │    │ • Express.js    │    │ • PostgreSQL    │
│ • CDN Delivery  │    │ • Node.js       │    │ • Automated     │
│ • Auto Deploy   │    │ • Auto Scaling  │    │   Backups       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   External      │    │   File Storage  │    │   Monitoring    │
│   Services      │    │   (Cloudinary)  │    │   (Sentry)      │
│                 │    │                 │    │                 │
│ • Analytics     │    │ • Recipe Images │    │ • Error Tracking│
│ • Email Service │    │ • User Avatars  │    │ • Performance   │
│ • CDN           │    │ • Optimized     │    │   Monitoring    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Recommended Platforms

### Frontend Hosting
| Platform | Pros | Cons | Best For |
|----------|------|------|----------|
| **Vercel** | Fast CDN, auto-deploy, great Vue support | Limited server-side features | Production, staging |
| **Netlify** | Easy setup, form handling, functions | Less Vue-specific optimizations | Production, staging |
| **GitHub Pages** | Free, simple | Limited features, no server-side | Demo, portfolio |

### Backend Hosting
| Platform | Pros | Cons | Best For |
|----------|------|------|----------|
| **Railway** | Easy deployment, PostgreSQL included | Limited free tier | Production, staging |
| **Render** | Free tier, auto-deploy | Slower cold starts | Production, staging |
| **Heroku** | Mature platform, add-ons | Expensive, no free tier | Production |

### Database Hosting
| Platform | Pros | Cons | Best For |
|----------|------|------|----------|
| **Railway PostgreSQL** | Integrated, automated backups | Limited free tier | Production, staging |
| **Supabase** | Free tier, real-time features | Vendor lock-in | Development, staging |
| **PlanetScale** | Serverless, branching | MySQL only | Alternative option |

## 🚀 Deployment Strategies

### 1. Vercel + Railway (Recommended)

#### Frontend Deployment (Vercel)
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://api.cookguide.com/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_BASE_URL": "https://api.cookguide.com/api"
  }
}
```

#### Backend Deployment (Railway)
```json
// railway.json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2. Netlify + Render (Alternative)

#### Frontend Deployment (Netlify)
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "https://api.cookguide.com/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Backend Deployment (Render)
```yaml
# render.yaml
services:
  - type: web
    name: cookguide-api
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: cookguide-db
          property: connectionString
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] SSL certificates obtained
- [ ] Domain names configured
- [ ] Monitoring tools set up

### Frontend Deployment
- [ ] Build optimization completed
- [ ] Environment variables set
- [ ] API endpoints configured
- [ ] CDN configuration verified
- [ ] Performance testing passed
- [ ] SEO meta tags updated

### Backend Deployment
- [ ] Database connection tested
- [ ] Environment variables configured
- [ ] Health check endpoint working
- [ ] Logging configured
- [ ] Rate limiting enabled
- [ ] Security headers set

### Post-Deployment
- [ ] Application functionality verified
- [ ] Performance metrics checked
- [ ] Error monitoring active
- [ ] Backup procedures tested
- [ ] Rollback plan prepared
- [ ] Documentation updated

## 🔧 Platform-Specific Configurations

### Vercel Configuration

#### Build Settings
```json
// package.json scripts
{
  "scripts": {
    "build": "vue-tsc && vite build",
    "build:staging": "vue-tsc && vite build --mode staging",
    "build:production": "vue-tsc && vite build --mode production"
  }
}
```

#### Environment Variables
```bash
# Vercel Dashboard → Settings → Environment Variables
VITE_API_BASE_URL=https://api.cookguide.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxxxxxxxx@xxxxx.ingest.sentry.io/xxxxx
```

#### Custom Domain
```bash
# DNS Configuration
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.19
```

### Railway Configuration

#### Service Configuration
```json
// railway.json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  },
  "environments": {
    "production": {
      "variables": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

#### Database Configuration
```sql
-- Railway PostgreSQL setup
CREATE DATABASE cookguide_prod;
CREATE USER cookguide_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE cookguide_prod TO cookguide_user;
```

#### Environment Variables
```bash
# Railway Dashboard → Variables
NODE_ENV=production
DATABASE_URL=postgresql://username:password@railway-host:5432/cookguide_prod
JWT_SECRET=your_production_jwt_secret
JWT_REFRESH_SECRET=your_production_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=https://cookguide.com
SENTRY_DSN=https://xxxxxxxxx@xxxxx.ingest.sentry.io/xxxxx
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: |
          npm ci
          cd backend && npm ci
      
      - name: Run tests
        run: |
          npm test
          cd backend && npm test
      
      - name: Build frontend
        run: npm run build
      
      - name: Build backend
        run: cd backend && npm run build

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - name: Deploy to staging
        run: |
          # Deploy frontend to staging
          # Deploy backend to staging
          # Run smoke tests

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Deploy to production
        run: |
          # Deploy frontend to production
          # Deploy backend to production
          # Run health checks
```

### Automated Testing
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run component tests
        run: npm run test:component
      
      - name: Run E2E tests
        run: npm run test:e2e

  backend-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
      
      - name: Install dependencies
        run: cd backend && npm ci
      
      - name: Run tests
        run: cd backend && npm test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
```

## 📊 Monitoring & Analytics

### Application Monitoring
```typescript
// Sentry configuration
import * as Sentry from '@sentry/vue';

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
  ],
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring
```typescript
// Performance metrics collection
const collectMetrics = () => {
  // Core Web Vitals
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        analytics.track('LCP', { value: entry.startTime });
      }
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });
};
```

### Health Checks
```typescript
// Backend health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check external services
    const cloudinaryHealth = await checkCloudinaryHealth();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'healthy',
        cloudinary: cloudinaryHealth ? 'healthy' : 'unhealthy'
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});
```

## 🔒 Security Considerations

### SSL/TLS Configuration
- **Automatic SSL**: Vercel and Railway provide automatic SSL certificates
- **HSTS Headers**: Configure strict transport security
- **Certificate Renewal**: Automatic renewal handled by platforms

### Domain Security
```typescript
// Security headers configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.cloudinary.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## 🔄 Backup & Recovery

### Database Backups
```bash
# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="cookguide_prod"

# Create backup
pg_dump $DATABASE_URL > "$BACKUP_DIR/backup_$DATE.sql"

# Compress backup
gzip "$BACKUP_DIR/backup_$DATE.sql"

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

### Disaster Recovery Plan
1. **Backup Verification**: Regular backup testing
2. **Recovery Procedures**: Documented recovery steps
3. **Data Retention**: 30-day backup retention
4. **Testing**: Monthly disaster recovery drills

## 🔗 Related Documentation

- **[Environment Configuration](./environment.md)** - Environment variables and configuration
- **[Monitoring](./monitoring.md)** - Production monitoring and analytics
- **[Security](../technical/security.md)** - Security considerations for deployment
- **[Performance](../technical/performance.md)** - Performance optimization for production

---

*This deployment guide ensures reliable, secure, and scalable hosting of the CookGuide application. Regular monitoring and maintenance are essential for production success.* 