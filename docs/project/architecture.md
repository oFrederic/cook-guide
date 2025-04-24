# CookGuide Architecture & Technology Stack

## 🏗️ System Architecture

CookGuide follows a **modern full-stack architecture** with clear separation between frontend and backend, designed for scalability, maintainability, and performance.

### Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vue 3)       │◄──►│   (Express.js)  │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • Vite          │    │ • Prisma ORM    │    │ • User Data     │
│ • Vuetify 3     │    │ • Passport.js   │    │ • Recipes       │
│ • Pinia         │    │ • Cloudinary    │    │ • Categories    │
│ • TypeScript    │    │ • Security      │    │ • Reviews       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   External      │    │   File Storage  │    │   Monitoring    │
│   Services      │    │   (Cloudinary)  │    │   & Analytics   │
│                 │    │                 │    │                 │
│ • Social Media  │    │ • Recipe Images │    │ • Performance   │
│ • Email Service │    │ • User Avatars  │    │ • Error Tracking│
│ • CDN           │    │ • Optimized     │    │ • User Analytics│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### Frontend Stack
| Technology | Version | Purpose | Key Benefits |
|------------|---------|---------|--------------|
| **Vue 3** | 3.4+ | Progressive JavaScript framework | Composition API, TypeScript support |
| **TypeScript** | 5.0+ | Type-safe JavaScript | Better development experience, fewer bugs |
| **Vite** | 5.0+ | Build tool and dev server | Fast development, optimized builds |
| **Vuetify 3** | 3.3+ | UI component library | Material Design, built-in validation |
| **Vue Router** | 4.2+ | Client-side routing | Navigation and route management |
| **Pinia** | 2.1+ | State management | Type-safe, lightweight, Vue 3 native |
| **VueUse** | 9.0+ | Composition utilities | Reusable logic and utilities |
| **Zod** | 3.22+ | Schema validation | Type-safe form validation |
| **@mdi/font** | 7.3+ | Material Design icons | Consistent iconography |

### Backend Stack
| Technology | Version | Purpose | Key Benefits |
|------------|---------|---------|--------------|
| **Express.js** | 4.18+ | Web framework | Fast, unopinionated, well-documented |
| **TypeScript** | 5.0+ | Type-safe JavaScript | Better development experience |
| **Prisma** | 5.0+ | Database ORM | Type-safe database operations |
| **PostgreSQL** | 14+ | Relational database | ACID compliance, advanced features |
| **Passport.js** | 0.6+ | Authentication | Flexible authentication strategies |
| **bcryptjs** | 2.4+ | Password hashing | Secure password storage |
| **jsonwebtoken** | 9.0+ | JWT handling | Stateless authentication |
| **Cloudinary** | 1.39+ | Image storage | Cloud image management and optimization |

### Security & Performance
| Technology | Version | Purpose | Key Benefits |
|------------|---------|---------|--------------|
| **helmet** | 7.0+ | Security headers | Protection against common vulnerabilities |
| **cors** | 2.8+ | CORS configuration | Cross-origin request handling |
| **express-rate-limit** | 7.0+ | Rate limiting | Protection against abuse |
| **express-validator** | 7.0+ | Input validation | Request data validation |
| **multer** | 1.4+ | File uploads | Multipart form data handling |
| **compression** | 1.7+ | Response compression | Faster response times |
| **morgan** | 1.10+ | Request logging | Development and debugging |

### Testing Stack
| Technology | Version | Purpose | Key Benefits |
|------------|---------|---------|--------------|
| **Vitest** | 1.0+ | Unit testing | Fast, Vue 3 native testing |
| **Vue Test Utils** | 2.4+ | Component testing | Vue component testing utilities |
| **Cypress** | 13.0+ | E2E testing | Full application testing |
| **Supertest** | 6.3+ | API testing | Express.js API testing |

### Development Tools
| Technology | Version | Purpose | Key Benefits |
|------------|---------|---------|--------------|
| **ESLint** | 8.0+ | Code linting | Code quality and consistency |
| **Prettier** | 3.0+ | Code formatting | Consistent code style |
| **@vue/eslint-config-typescript** | 12.0+ | Vue + TS linting | Vue 3 + TypeScript linting |

## 🏗️ Project Structure

### Monorepo Organization
```
cook-guide/
├── frontend/                 # Vue 3 + Vite application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── views/            # Page components
│   │   ├── stores/           # Pinia state stores
│   │   ├── composables/      # Custom Vue composables
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript type definitions
│   │   ├── assets/           # Static assets
│   │   ├── router/           # Vue Router configuration
│   │   └── middleware/       # Vue Router guards
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration
├── backend/                  # Express.js API server
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   ├── middleware/       # Express middleware
│   │   ├── prisma/           # Database schema and migrations
│   │   ├── types/            # Shared TypeScript types
│   │   ├── config/           # Server configuration
│   │   ├── utils/            # Backend utilities
│   │   ├── validators/       # Request validation schemas
│   │   └── services/         # Business logic services
│   ├── prisma/               # Database files
│   ├── package.json          # Backend dependencies
│   └── tsconfig.json         # TypeScript configuration
├── shared/                   # Shared types and utilities
│   ├── types/                # Common TypeScript types
│   └── utils/                # Shared utility functions
├── docs/                     # Additional documentation
├── docs/                    # Project documentation
└── package.json              # Root package.json for workspaces
```

## 🔐 Security Architecture

### Authentication Flow
1. **User Registration**: bcryptjs password hashing with salt rounds
2. **User Login**: JWT token generation with refresh tokens
3. **Token Management**: Short-lived access tokens (15min) + refresh tokens (7 days)
4. **Route Protection**: Middleware-based authentication checks
5. **Session Management**: Stateless JWT-based sessions

### Security Measures
- **Input Validation**: express-validator for all API inputs
- **Security Headers**: helmet.js for XSS, CSRF protection
- **Rate Limiting**: express-rate-limit to prevent abuse
- **CORS Configuration**: Controlled cross-origin access
- **File Upload Security**: multer with file type validation
- **Database Security**: Prisma ORM prevents SQL injection

## ⚡ Performance Architecture

### Frontend Performance
- **Code Splitting**: Lazy loading of routes and components
- **Image Optimization**: WebP format with responsive images
- **Service Worker**: Offline functionality and caching
- **Bundle Optimization**: Vite's build optimization
- **Tree Shaking**: Elimination of unused code

### Backend Performance
- **Response Compression**: gzip/brotli compression
- **Database Optimization**: Proper indexing and query optimization
- **Connection Pooling**: Efficient database connections
- **Caching Strategy**: API response caching (future: Redis)
- **Load Balancing**: Horizontal scaling considerations

### Database Performance
- **Indexing Strategy**: Optimized indexes for common queries
- **Query Optimization**: Prisma query optimization
- **Connection Management**: Connection pooling configuration
- **Read Replicas**: Future scaling consideration

## 🔄 Data Flow

### Recipe Creation Flow
1. **User Input**: Recipe data via Vuetify forms with Zod validation
2. **Frontend Validation**: Client-side validation before submission
3. **API Request**: HTTP POST to backend with validated data
4. **Backend Validation**: Server-side validation with express-validator
5. **Database Storage**: Prisma ORM stores data in PostgreSQL
6. **Image Upload**: Cloudinary handles image storage and optimization
7. **Response**: Success/error response to frontend
8. **UI Update**: Pinia store updates and UI reflects changes

### Recipe Browsing Flow
1. **User Request**: Recipe browsing with filters and pagination
2. **API Query**: Backend processes search/filter parameters
3. **Database Query**: Prisma generates optimized SQL queries
4. **Data Retrieval**: PostgreSQL returns filtered results
5. **Response Processing**: Backend formats and compresses response
6. **Frontend Update**: Pinia store updates with new data
7. **UI Rendering**: Vue components render with Vuetify styling

## 🚀 Deployment Architecture

### Frontend Deployment
- **Platform**: Vercel or Netlify
- **Build Process**: Vite production build
- **CDN**: Global content delivery
- **Environment**: Production environment variables

### Backend Deployment
- **Platform**: Railway or Render
- **Process**: Node.js with PM2 or similar
- **Database**: PostgreSQL with connection pooling
- **Environment**: Production environment variables

### Database Deployment
- **Platform**: Railway PostgreSQL or Supabase
- **Backup**: Automated daily backups
- **Monitoring**: Database performance monitoring
- **Scaling**: Read replicas for future growth

## 🔗 Related Documentation

- **[Project Overview](./overview.md)** - Project goals and features
- **[Technology Compatibility](../technical/compatibility.md)** - Detailed compatibility analysis
- **[Development Setup](../development/setup.md)** - Environment setup guide
- **[Security Considerations](../technical/security.md)** - Security best practices
- **[Performance Optimizations](../technical/performance.md)** - Performance strategies

---

*This architecture provides a solid foundation for building a scalable, maintainable, and performant recipe application.* 