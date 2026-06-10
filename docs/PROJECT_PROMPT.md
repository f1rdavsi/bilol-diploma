# AutoService Queue Project Prompt

Use this file as the compact project memory for future work.

Build AutoService Queue as a Nuxt full-stack SPA for an auto repair shop. Frontend lives in `app/`; backend API lives in `server/api`; database access uses Prisma with MySQL. The product must support auth, roles, clients, cars, repair orders, queue management, employees, dashboard, reports, dark mode, loading states, error handling, pagination, 500ms debounced search, and search only from 2 characters.

Roles:
- `ROLE_ADMIN`: full system access, users, employees, queue, statuses, statistics, settings.
- `ROLE_MANAGER`: clients, cars, repair orders, queue, mechanic assignment.
- `ROLE_MECHANIC`: assigned orders, status changes, comments.

Engineering rules:
- TypeScript strict mode.
- All frontend requests go through `app/services`.
- Pinia stores own loading/error state.
- Nuxt server routes validate input with Zod.
- JWT is stored in an httpOnly cookie.
- Prisma schema is the source of truth for database entities.
- Keep pages operational and dense; this is an internal workflow tool, not a marketing site.

Quality gate before merge:
- `npx prisma validate`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
