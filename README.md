# AutoService Queue

Full-stack Nuxt приложение для управления очередью ремонта автомобилей: клиенты, автомобили, заявки, статусы, механики, отчеты и роли доступа.

## Быстрый запуск одной командой

На Windows из корня проекта:

```bat
.\start.bat
```

Скрипт сам создает `.env`, устанавливает зависимости, запускает MySQL, применяет Prisma schema, запускает seed и стартует Nuxt на `http://127.0.0.1:3002`.

## Требования

- Node.js 20+ или 24+
- Docker Desktop
- npm

## .env

Файл `.env` находится в корне проекта локально. Если е`го нет, `.\start.bat` создаст его из `.env.example`:`

```env
DATABASE_URL="mysql://autoservice:autoservice_password@127.0.0.1:3306/autoservice_queue"
JWT_SECRET="change-this-secret-before-production"
NUXT_PUBLIC_API_URL=""
```

Для реального продакшена `JWT_SECRET` нужно заменить.

## Доступы для проверки

```txt
admin@autoservice.local / password123
manager@autoservice.local / password123
mechanic@autoservice.local / password123
```

## Полезные команды

```bash
npm run dev
npm run launch
npm run typecheck
npm run lint
npm run build
npx prisma studio
```

## Что уже реализовано

- Nuxt full-stack приложение с `app/` и `server/api`.
- Авторизация через JWT в httpOnly cookie.
- Роли `ROLE_ADMIN`, `ROLE_MANAGER`, `ROLE_MECHANIC`.
- CRUD для клиентов, автомобилей, заявок и сотрудников.
- Очередь ремонта и изменение позиции.
- Dashboard и reports summary.
- Prisma + MySQL + seed.
- Tailwind dark mode, Pinia stores, API service layer.
- GitHub templates, план, дизайн-документация и workflow docs.

## Идеи для сильных фич

- Детальная карточка заявки с таймлайном ремонта.
- Комментарии механика и история смены статусов.
- Уведомления менеджеру при задержке ремонта.
- Drag-and-drop очередь.
- Календарь загрузки постов и механиков.
- Экспорт отчетов в PDF/Excel.
- Фото автомобиля до/после ремонта.
- SLA-индикаторы: просрочка, риск задержки, приоритет клиента.
