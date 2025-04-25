# Prisma ORM

This directory contains database schema and migrations using Prisma ORM.

## Key Files

- `schema.prisma` - Database schema definition
- `migrations/` - Database migrations
- `seed.ts` - Database seeding script

## Usage Guidelines

- Run `npx prisma generate` after schema changes
- Use migrations for schema changes in production
- Document complex relations in schema comments
- Keep seed data consistent with schema