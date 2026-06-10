# Initial GitHub Issues

Use these as the first issues for project tracking.

## 1. Project Foundation

Set up Nuxt full-stack project, dependencies, Docker MySQL, Prisma schema, seed data, base docs.

Acceptance:
- project installs
- Prisma validates
- typecheck passes
- Docker Compose defines MySQL

## 2. Authentication and Roles

Implement login/logout/me, httpOnly JWT cookie, role middleware, seeded users.

Acceptance:
- admin/manager/mechanic can log in
- unauthorized users redirect to login
- protected pages enforce roles

## 3. Clients and Cars CRUD

Implement API, services, stores, pages, forms and tables for clients and cars.

Acceptance:
- create/edit/delete clients
- create/edit/delete cars linked to clients
- search uses debounce and minimum 2 characters

## 4. Repair Orders and Queue

Implement repair order CRUD, status changes, mechanic assignment, queue ordering.

Acceptance:
- manager creates and assigns orders
- mechanic sees assigned orders
- queue position can be updated

## 5. Dashboard, Reports, and UI Polish

Implement dashboard metrics, reports, responsive dark-mode UI and visual QA.

Acceptance:
- dashboard shows counts
- reports show statuses and workload
- interface works on desktop and mobile
