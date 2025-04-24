# CookGuide Project Overview

## Name
CookGuide

## Description
A comprehensive recipe website that provides detailed, step-by-step cooking instructions with interactive features to enhance the cooking experience. The application serves both as a portfolio showcase and as a practical tool for daily use.

## Goals
- Create an intuitive and visually appealing recipe platform
- Implement interactive cooking features (timers, measurement converters, etc.)
- Provide detailed step-by-step instructions with visual aids
- Build a robust search and filtering system for recipes
- Enable user accounts for saving favorite recipes and personal collections

## Current Status
Initial Setup - Planning project structure and defining core features

## Technology Stack
- **Frontend**: 
  - Next.js
  - React
  - TypeScript
  - Chakra UI (Component Library and Styling)
  - React Query (Data Fetching)
  - React Hook Form + Zod (Form handling)

- **Backend**:
  - Next.js API Routes & Server Components
  - PostgreSQL
  - Prisma (ORM)
  - NextAuth.js / Auth.js (Authentication)
  - Cloudinary (Image Storage)

- **Testing & Development**:
  - Jest (Unit/component testing)
  - Cypress (End-to-end testing)
  - MSW (API mocking)

## Project Structure
- `app/` - App Router Pages & Layouts
- `components/` - Reusable UI components
- `lib/` - Utility functions and shared logic
- `hooks/` - Custom React hooks
- `styles/` - Global styles and Chakra UI theme customization
- `types/` - TypeScript type definitions
- `prisma/` - Database schema and migrations
- `public/` - Static assets

## Development Plan
The detailed development roadmap is in [ROADMAP.md](./ROADMAP.md), containing all planned phases and tasks.

## Key Features
- **Detailed Recipe Pages**:
  - Step-by-step instructions with images for each cooking stage
  - Ingredient lists with measurements
  - Cooking time, serving size, and difficulty level
  - Nutritional information
  - Visual progress tracking through the cooking process

- **Interactive Cooking Tools**:
  - Built-in cooking timers
  - Measurement converter
  - Serving size adjuster that recalculates ingredients
  - Real-time cooking assistance during the entire process

- **Hands-Free Cooking Mode**:
  - Voice-controlled navigation and commands
  - Step-by-step audio narration of instructions
  - Voice-activated timers and measurement conversions
  - Automatic progression through recipe steps
  - Designed specifically for messy-hands cooking scenarios

- **Recipe Search and Discovery**:
  - Advanced filtering (by cuisine, ingredients, cooking time, etc.)
  - Recommendation engine based on user preferences
  - Categorization by meal type, cuisine, dietary restrictions

- **User Accounts and Social Features**:
  - Personal recipe collections
  - Favorite recipes system
  - Rating and review system
  - Share functionality for social media

- **Backend Functionality**:
  - User authentication and profiles
  - Recipe database with optimized query system
  - Image storage and optimization
  - API endpoints for all recipe operations

## Key Decisions
- Using Chakra UI for component consistency, styling, and customization
- Implementing Next.js App Router for improved routing and layouts
- Choosing Prisma for type-safe database operations
- Leveraging Cloudinary for optimized image storage and transformations
- Implementing progressive enhancement for core functionality

## Resources

### Core Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### UI & Components
- [Chakra UI Documentation](https://chakra-ui.com/docs/getting-started)
- [Heroicons](https://heroicons.com)
- [Radix UI Primitives](https://www.radix-ui.com)

### Data Fetching & State
- [React Query Documentation](https://tanstack.com/query/latest)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)

### Backend & Database
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

### Authentication
- [NextAuth.js Documentation](https://next-auth.js.org)

### Testing
- [Jest Documentation](https://jestjs.io/docs)
- [Cypress Documentation](https://docs.cypress.io)
- [MSW Documentation](https://mswjs.io/docs/)

### Deployment
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app) (Database hosting alternative)

## Notes
- Focus on mobile-first design as many users will access recipes while cooking
- Consider accessibility features for voice control and screen readers
- Optimize image loading for recipe steps to improve performance
- Plan for offline capability through PWA features
- When using Chakra UI with Next.js App Router:
  - Use `'use client'` directive in components that use Chakra UI
  - Create a client-side provider component for Chakra UI
  - Leverage Server Components where possible for performance optimization

---

*This file will be updated as the project progresses to maintain continuity between development sessions.* 