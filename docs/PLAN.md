# Implementation Plan

## Phase 1: Foundation

- Nuxt 4, TypeScript strict, Tailwind, Pinia, Lucide.
- Docker MySQL and Prisma schema.
- Seed admin, manager, mechanic, sample client, car, order.
- Auth API and route middleware.

## Phase 2: Core Operations

- Clients CRUD.
- Cars CRUD with client relation.
- Repair orders CRUD with mechanic assignment.
- Queue list and position updates.
- Employees CRUD for admin/manager workflows.

## Phase 3: Visibility

- Dashboard summary cards.
- Reports by repair status.
- Mechanic workload.
- Search, loading, error and empty states.

## Phase 4: Quality

- Self-review before commit.
- Typecheck, lint, build, Prisma validate.
- UI pass for desktop and mobile.
- Create GitHub issue for each feature or bug before work, branch from issue, open PR for review.
