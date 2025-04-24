# Environment Configuration

## 🌍 Environment Overview

CookGuide uses environment-specific configurations to manage different deployment stages (development, staging, production) and external service integrations.

## 📋 Environment Variables

### Frontend Environment Variables

#### Development (`.env.development`)
```env
# Application
VITE_APP_TITLE=CookGuide (Dev)
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000

# External Services
VITE_CLOUDINARY_CLOUD_NAME=your_dev_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_dev_upload_preset
VITE_CLOUDINARY_API_KEY=your_dev_api_key

# Analytics (Development)
VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=

# Feature Flags
VITE_ENABLE_DEBUG=true
VITE_ENABLE_MOCK_DATA=true
VITE_ENABLE_OFFLINE_MODE=false
```

#### Staging (`.env.staging`)
```env
# Application
VITE_APP_TITLE=CookGuide (Staging)
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=staging

# API Configuration
VITE_API_BASE_URL=https://api-staging.cookguide.com/api
VITE_API_TIMEOUT=15000

# External Services
VITE_CLOUDINARY_CLOUD_NAME=your_staging_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_staging_upload_preset
VITE_CLOUDINARY_API_KEY=your_staging_api_key

# Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxxxxxxxx@xxxxx.ingest.sentry.io/xxxxx

# Feature Flags
VITE_ENABLE_DEBUG=true
VITE_ENABLE_MOCK_DATA=false
VITE_ENABLE_OFFLINE_MODE=true
```

#### Production (`.env.production`)
```env
# Application
VITE_APP_TITLE=CookGuide
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production

# API Configuration
VITE_API_BASE_URL=https://api.cookguide.com/api
VITE_API_TIMEOUT=20000

# External Services
VITE_CLOUDINARY_CLOUD_NAME=your_prod_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_prod_upload_preset
VITE_CLOUDINARY_API_KEY=your_prod_api_key

# Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxxxxxxxx@xxxxx.ingest.sentry.io/xxxxx

# Feature Flags
VITE_ENABLE_DEBUG=false
VITE_ENABLE_MOCK_DATA=false
VITE_ENABLE_OFFLINE_MODE=true
```

### Backend Environment Variables

#### Development (`.env.development`)
```env
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=localhost

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cookguide_dev"
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# JWT Configuration
JWT_SECRET=your_dev_jwt_secret_key_here_make_it_long_and_random
JWT_REFRESH_SECRET=your_dev_jwt_refresh_secret_key_here_make_it_long_and_random
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
JWT_ISSUER=cookguide-dev
JWT_AUDIENCE=cookguide-users

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_dev_cloud_name
CLOUDINARY_API_KEY=your_dev_api_key
CLOUDINARY_API_SECRET=your_dev_api_secret
CLOUDINARY_UPLOAD_PRESET=your_dev_upload_preset

# Security Configuration
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization

# Logging
LOG_LEVEL=debug
LOG_FORMAT=dev
ENABLE_REQUEST_LOGGING=true

# Email Configuration (Development)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_pass
EMAIL_FROM=noreply@cookguide.dev

# Redis (Optional for Development)
REDIS_URL=redis://localhost:6379
REDIS_TTL=3600

# Monitoring
SENTRY_DSN=
ENABLE_METRICS=false
```

#### Staging (`.env.staging`)
```env
# Server Configuration
NODE_ENV=staging
PORT=5000
HOST=0.0.0.0

# Database
DATABASE_URL="postgresql://username:password@staging-db.cookguide.com:5432/cookguide_staging"
DATABASE_POOL_MIN=5
DATABASE_POOL_MAX=20

# JWT Configuration
JWT_SECRET=your_staging_jwt_secret_key_here_make_it_long_and_random
JWT_REFRESH_SECRET=your_staging_jwt_refresh_secret_key_here_make_it_long_and_random
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
JWT_ISSUER=cookguide-staging
JWT_AUDIENCE=cookguide-users

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_staging_cloud_name
CLOUDINARY_API_KEY=your_staging_api_key
CLOUDINARY_API_SECRET=your_staging_api_secret
CLOUDINARY_UPLOAD_PRESET=your_staging_upload_preset

# Security Configuration
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=200
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false

# CORS Configuration
CORS_ORIGIN=https://staging.cookguide.com
CORS_CREDENTIALS=true
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization

# Logging
LOG_LEVEL=info
LOG_FORMAT=combined
ENABLE_REQUEST_LOGGING=true

# Email Configuration
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
EMAIL_FROM=noreply@staging.cookguide.com

# Redis
REDIS_URL=redis://staging-redis.cookguide.com:6379
REDIS_TTL=3600

# Monitoring
SENTRY_DSN=https://xxxxxxxxx@xxxxx.ingest.sentry.io/xxxxx
ENABLE_METRICS=true
```

#### Production (`.env.production`)
```env
# Server Configuration
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# Database
DATABASE_URL="postgresql://username:password@prod-db.cookguide.com:5432/cookguide_prod"
DATABASE_POOL_MIN=10
DATABASE_POOL_MAX=50

# JWT Configuration
JWT_SECRET=your_prod_jwt_secret_key_here_make_it_long_and_random
JWT_REFRESH_SECRET=your_prod_jwt_refresh_secret_key_here_make_it_long_and_random
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
JWT_ISSUER=cookguide
JWT_AUDIENCE=cookguide-users

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_prod_cloud_name
CLOUDINARY_API_KEY=your_prod_api_key
CLOUDINARY_API_SECRET=your_prod_api_secret
CLOUDINARY_UPLOAD_PRESET=your_prod_upload_preset

# Security Configuration
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=500
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false

# CORS Configuration
CORS_ORIGIN=https://cookguide.com
CORS_CREDENTIALS=true
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization

# Logging
LOG_LEVEL=warn
LOG_FORMAT=combined
ENABLE_REQUEST_LOGGING=true

# Email Configuration
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
EMAIL_FROM=noreply@cookguide.com

# Redis
REDIS_URL=redis://prod-redis.cookguide.com:6379
REDIS_TTL=3600

# Monitoring
SENTRY_DSN=https://xxxxxxxxx@xxxxx.ingest.sentry.io/xxxxx
ENABLE_METRICS=true
```

## 🔧 Configuration Management

### Environment-Specific Configs

#### Frontend Configuration (`src/config/environment.ts`)
```typescript
interface EnvironmentConfig {
  app: {
    title: string;
    version: string;
    environment: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
  cloudinary: {
    cloudName: string;
    uploadPreset: string;
    apiKey: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    sentryDsn?: string;
  };
  features: {
    enableDebug: boolean;
    enableMockData: boolean;
    enableOfflineMode: boolean;
  };
}

const config: EnvironmentConfig = {
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'CookGuide',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_APP_ENV || 'development',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  },
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '',
  },
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  },
  features: {
    enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
    enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
    enableOfflineMode: import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true',
  },
};

export default config;
```

#### Backend Configuration (`src/config/environment.ts`)
```typescript
interface ServerConfig {
  server: {
    port: number;
    host: string;
    environment: string;
  };
  database: {
    url: string;
    pool: {
      min: number;
      max: number;
    };
  };
  jwt: {
    secret: string;
    refreshSecret: string;
    expiresIn: string;
    refreshExpiresIn: string;
    issuer: string;
    audience: string;
  };
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
    uploadPreset: string;
  };
  security: {
    bcryptSaltRounds: number;
    rateLimit: {
      windowMs: number;
      maxRequests: number;
      skipSuccessfulRequests: boolean;
    };
  };
  cors: {
    origin: string;
    credentials: boolean;
    methods: string[];
    allowedHeaders: string[];
  };
  logging: {
    level: string;
    format: string;
    enableRequestLogging: boolean;
  };
  email: {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
  };
  redis: {
    url: string;
    ttl: number;
  };
  monitoring: {
    sentryDsn?: string;
    enableMetrics: boolean;
  };
}

const config: ServerConfig = {
  server: {
    port: parseInt(process.env.PORT || '5000'),
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV || 'development',
  },
  database: {
    url: process.env.DATABASE_URL || '',
    pool: {
      min: parseInt(process.env.DATABASE_POOL_MIN || '2'),
      max: parseInt(process.env.DATABASE_POOL_MAX || '10'),
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    refreshSecret: process.env.JWT_REFRESH_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    issuer: process.env.JWT_ISSUER || 'cookguide',
    audience: process.env.JWT_AUDIENCE || 'cookguide-users',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || '',
  },
  security: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'),
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
      skipSuccessfulRequests: process.env.RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS === 'true',
    },
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: process.env.CORS_CREDENTIALS === 'true',
    methods: (process.env.CORS_METHODS || 'GET,POST,PUT,DELETE,OPTIONS').split(','),
    allowedHeaders: (process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization').split(','),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined',
    enableRequestLogging: process.env.ENABLE_REQUEST_LOGGING === 'true',
  },
  email: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.EMAIL_FROM || 'noreply@cookguide.com',
  },
  redis: {
    url: process.env.REDIS_URL || '',
    ttl: parseInt(process.env.REDIS_TTL || '3600'),
  },
  monitoring: {
    sentryDsn: process.env.SENTRY_DSN,
    enableMetrics: process.env.ENABLE_METRICS === 'true',
  },
};

export default config;
```

## 🔐 Secrets Management

### Development Secrets
- Store sensitive data in `.env.local` (gitignored)
- Use dummy values for external services
- Rotate secrets regularly

### Production Secrets
- Use platform-specific secret management (Vercel, Railway, etc.)
- Never commit secrets to version control
- Implement secret rotation procedures
- Use different secrets for each environment

### Secret Rotation Process
1. **Generate New Secrets**: Create new JWT secrets, API keys
2. **Update Environment**: Deploy new secrets to staging
3. **Test Thoroughly**: Verify all functionality works
4. **Deploy to Production**: Update production secrets
5. **Monitor**: Watch for any issues post-deployment
6. **Cleanup**: Remove old secrets after confirmation

## 🔄 Environment Switching

### Frontend Environment Switching
```bash
# Development
npm run dev

# Staging build
npm run build:staging

# Production build
npm run build:production
```

### Backend Environment Switching
```bash
# Development
npm run dev

# Staging
NODE_ENV=staging npm start

# Production
NODE_ENV=production npm start
```

## 📊 Environment Validation

### Frontend Validation
```typescript
// Validate required environment variables
const validateEnvironment = () => {
  const required = [
    'VITE_API_BASE_URL',
    'VITE_CLOUDINARY_CLOUD_NAME',
    'VITE_CLOUDINARY_UPLOAD_PRESET'
  ];
  
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
```

### Backend Validation
```typescript
// Validate required environment variables
const validateEnvironment = () => {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
```

## 🔗 Related Documentation

- **[Hosting](../deployment/hosting.md)** - Deployment platform configuration
- **[Monitoring](../deployment/monitoring.md)** - Environment monitoring setup
- **[Security](../technical/security.md)** - Security considerations for environment variables
- **[Development Setup](../development/setup.md)** - Local environment setup

---

*Environment configuration is critical for secure and reliable application deployment. Always validate configurations and never expose sensitive information in version control.* 