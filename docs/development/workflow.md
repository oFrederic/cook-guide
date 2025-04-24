# Branch Naming Convention Guide

## 📋 Overview

This document explains the branch naming convention used in the CookGuide project roadmap. We follow **Git Flow** conventions with some project-specific adaptations for our phased development approach.

## 🏗️ Branch Structure

### Main Branches (Standard Git Flow)
- **`main`** - Production-ready code
- **`develop`** - Integration branch for features
- **`staging`** - Pre-production testing (optional)

### Feature Branches (Standard Convention)
- **Format**: `feature/descriptive-feature-name`
- **Example**: `feature/user-authentication`
- **Purpose**: Individual feature development

### Project-Specific Phase Branches
- **Format**: `phase/XX-phase-name` (for project organization)
- **Example**: `phase/01-project-foundation`
- **Purpose**: Project management and roadmap tracking

## 📊 Complete Branch Reference

### Phase 1: Project Foundation & Setup
- **Phase Branch**: `phase/01-project-foundation`
- **Feature Branches**:
  - `feature/monorepo-setup`
  - `feature/frontend-foundation`
  - `feature/backend-foundation`
  - `feature/development-environment`

### Phase 2: Database & Core Backend
- **Phase Branch**: `phase/02-database-backend`
- **Feature Branches**:
  - `feature/database-schema`
  - `feature/database-utilities`
  - `feature/core-api-endpoints`
  - `feature/image-management`

### Phase 3: Authentication & User System
- **Phase Branch**: `phase/03-authentication`
- **Feature Branches**:
  - `feature/backend-authentication`
  - `feature/frontend-authentication`
  - `feature/user-features`

### Phase 4: Recipe Core Features
- **Phase Branch**: `phase/04-recipe-features`
- **Feature Branches**:
  - `feature/recipe-browsing`
  - `feature/recipe-detail`
  - `feature/interactive-cooking-tools`
  - `feature/recipe-management`

### Phase 5: Search & Discovery
- **Phase Branch**: `phase/05-search-discovery`
- **Feature Branches**:
  - `feature/search-system`
  - `feature/recipe-discovery`

### Phase 6: Social & Sharing Features
- **Phase Branch**: `phase/06-social-features`
- **Feature Branches**:
  - `feature/comments-reviews`
  - `feature/sharing-features`
  - `feature/community-features`

### Phase 7: Progressive Enhancement
- **Phase Branch**: `phase/07-progressive-enhancement`
- **Feature Branches**:
  - `feature/hands-free-mode`
  - `feature/offline-capabilities`
  - `feature/performance-optimization`
  - `feature/accessibility-improvements`

### Phase 8: Deployment & Polish
- **Phase Branch**: `phase/08-deployment`
- **Feature Branches**:
  - `feature/deployment-setup`
  - `feature/analytics-monitoring`
  - `feature/final-polish`
  - `feature/documentation`

## 🔄 Development Workflow (Git Flow)

### Starting a New Phase
1. Create the phase branch from `develop` (for tracking):
   ```bash
   git checkout develop
   git checkout -b phase/01-project-foundation
   ```

### Working on Features
1. Create feature branch from `develop`:
   ```bash
   git checkout develop
   git checkout -b feature/monorepo-setup
   ```

2. Make commits following conventional commits format:
   ```bash
   git commit -m "chore: initialize monorepo structure"
   git commit -m "chore: set up root package.json with workspaces"
   ```

3. Push and create pull request to `develop`:
   ```bash
   git push origin feature/monorepo-setup
   # Create PR: feature/monorepo-setup → develop
   ```

### Completing a Phase
1. All feature branches are merged to `develop`
2. Create pull request to merge `develop` to `main` when ready for production:
   ```bash
   # Create PR: develop → main
   ```

## 📝 Naming Rules (Standard Conventions)

### Branch Types
- **`feature/`** - New features
- **`bugfix/`** - Bug fixes
- **`hotfix/`** - Critical production fixes
- **`release/`** - Release preparation
- **`phase/`** - Project management (our custom addition)

### Naming Conventions
- Use kebab-case for all branch names
- Be descriptive but concise
- Use consistent terminology
- Avoid numbers in feature branch names (except for phase branches)

### Conventional Commits
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code style changes
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

## 🎯 Benefits

1. **Standard Compliance**: Follows Git Flow conventions
2. **Clear Hierarchy**: Easy to understand feature → develop → main flow
3. **Team-Friendly**: Familiar to most developers
4. **Scalable**: Easy to add new features
5. **Git-Friendly**: Works well with Git's branch management
6. **Project Organization**: Phase branches help track roadmap progress

## 📚 Quick Commands

### List all feature branches
```bash
git branch -r | grep "feature/"
```

### List all phase branches
```bash
git branch -r | grep "phase/"
```

### Check current development status
```bash
git log --oneline --graph --all
```

### Switch to develop branch
```bash
git checkout develop
```

## 🔄 Alternative: GitHub Flow (Simpler)

If you prefer a simpler approach, you can use **GitHub Flow**:

### GitHub Flow Branches
- **`main`** - Production-ready code
- **`feature/`** - Feature branches (direct to main)

### GitHub Flow Workflow
1. Create feature branch from `main`
2. Make changes and commit
3. Create pull request to `main`
4. Review and merge

This is simpler but less structured than Git Flow. 