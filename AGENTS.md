# AutoService Queue — Документация для разработки

## Обзор проекта

AutoService Queue — веб-система автоматизации очереди ремонта автомобилей в автосервисе. Система предназначена для управления заявками клиентов, очередью ремонта, статусами обслуживания автомобилей и контролем работы сотрудников автосервиса.

Система реализуется как full-stack SPA приложение на основе Nuxt с использованием серверных API маршрутов.

Основные возможности системы:

* регистрация и авторизация пользователей
* управление клиентами
* управление автомобилями
* создание заявок на ремонт
* управление очередью ремонта
* изменение статусов ремонта
* управление сотрудниками
* история ремонтов
* административная панель

---

# Роли пользователей

## ROLE_ADMIN

Полный доступ к системе:

* управление пользователями
* управление сотрудниками
* просмотр всех заявок
* изменение очереди
* изменение статусов
* просмотр статистики
* управление настройками системы

## ROLE_MANAGER

Менеджер автосервиса:

* создание заявок
* добавление клиентов
* добавление автомобилей
* управление очередью
* назначение мастеров

## ROLE_MECHANIC

Механик:

* просмотр назначенных заявок
* изменение статуса ремонта
* добавление комментариев

---

# Технологический стек

* Framework: Nuxt
* Language: TypeScript
* State Management: Pinia
* Styling: Tailwind CSS
* ORM: Prisma
* Database: MySQL
* Icons: Lucide Vue Next
* Build Tool: Vite

---

# Архитектура системы

```txt
Pages (Nuxt Pages)
        ↓
Components
        ↓
Pinia Store
        ↓
API Layer
        ↓
Server API (Nuxt Server)
        ↓
Database (MySQL)
```

---

# Структура проекта

```txt
src/
├── assets/
│   ├── css/
│   └── images/
│
├── components/
│   ├── layout/
│   ├── ui/
│   ├── tables/
│   ├── forms/
│   └── dashboard/
│
├── composables/
│   ├── useToast.ts
│   ├── useAuth.ts
│   └── usePagination.ts
│
├── layouts/
│   ├── default.vue
│   └── admin.vue
│
├── pages/
│   ├── auth/
│   ├── dashboard/
│   ├── clients/
│   ├── cars/
│   ├── orders/
│   ├── queue/
│   ├── employees/
│   └── reports/
│
├── server/
│   ├── api/
│   │   ├── auth/
│   │   ├── clients/
│   │   ├── cars/
│   │   ├── orders/
│   │   ├── queue/
│   │   └── employees/
│   │
│   └── utils/
│
├── stores/
│
├── services/
│
├── middleware/
│
└── prisma/
    └── schema.prisma
```

---

# Основные модули системы

## 1. Авторизация

* вход в систему
* JWT авторизация
* разграничение ролей
* middleware защиты страниц

## 2. Клиенты

* список клиентов
* создание клиента
* редактирование данных
* история обращений

## 3. Автомобили

* VIN номер
* государственный номер
* марка автомобиля
* модель
* год выпуска

## 4. Заявки на ремонт

* создание заявки
* описание неисправности
* назначение механика
* дата ремонта
* стоимость ремонта

## 5. Очередь ремонта

* текущая очередь
* изменение позиции
* приоритет ремонта
* фильтрация заявок

## 6. Статусы ремонта

* В очереди
* Диагностика
* В ремонте
* Ожидание деталей
* Завершено
* Выдано клиенту

## 7. Сотрудники

* список сотрудников
* роли
* назначенные ремонты

---

# Структура базы данных

## Таблица users

```sql
id
name
email
password
role
created_at
updated_at
```

## Таблица clients

```sql
id
full_name
phone
address
created_at
```

## Таблица cars

```sql
id
client_id
brand
model
year
vin
plate_number
created_at
```

## Таблица repair_orders

```sql
id
client_id
car_id
employee_id
problem_description
status
price
queue_position
created_at
updated_at
```

---

# UI Компоненты

## DataTable

Таблица отображения данных:

* сортировка
* поиск
* пагинация
* dropdown действий

## Modal

Модальные окна:

* создание заявки
* подтверждение удаления
* изменение статуса

## StatusBadge

| Статус    | Цвет    |
| --------- | ------- |
| Завершено | Зеленый |
| В ремонте | Синий   |
| Ожидание  | Желтый  |
| Ошибка    | Красный |

---

# Паттерны разработки

## Service Layer

```ts
export const ordersApi = {
  list: () => $fetch("/api/orders"),
  create: (data) => $fetch("/api/orders", {
    method: "POST",
    body: data
  }),
  update: (id, data) => $fetch(`/api/orders/${id}`, {
    method: "PUT",
    body: data
  }),
  delete: (id) => $fetch(`/api/orders/${id}`, {
    method: "DELETE"
  })
}
```

---

# Store Layer (Pinia)

```ts
export const useOrdersStore = defineStore("orders", () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchOrders() {
    loading.value = true

    try {
      items.value = await ordersApi.list()
    } catch (e) {
      error.value = "Ошибка загрузки"
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    fetchOrders
  }
})
```

---

# Основные страницы

## Dashboard

* статистика
* количество ремонтов
* активные заявки
* завершенные ремонты

## Queue Page

* текущая очередь
* изменение позиции
* фильтрация

## Orders Page

* список заявок
* поиск
* просмотр деталей
* изменение статуса

## Employees Page

* сотрудники
* роли
* активные ремонты

---

# Основные правила проекта

1. TypeScript strict mode
2. Все запросы через API layer
3. Использование Pinia
4. Поддержка Dark Mode
5. Loading state для всех запросов
6. Обработка ошибок
7. Адаптивный интерфейс
8. Пагинация для таблиц
9. Debounce поиска 500ms
10. Минимум 2 символа для поиска

---

# API интеграция

## Base URL

```env
NUXT_PUBLIC_API_URL=
```

## Обработка ошибок

* 401 — Unauthorized
* 403 — Forbidden
* 404 — Not Found
* 422 — Validation Error
* 500 — Server Error

---

# Команды разработки

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```

---

# План разработки

## Этап 1

* настройка проекта
* авторизация
* база данных

## Этап 2

* CRUD клиентов
* CRUD автомобилей
* CRUD заявок

## Этап 3

* очередь ремонта
* статусы ремонта
* dashboard

## Этап 4

* тестирование
* оптимизация
* подготовка диплома

---

**Версия:** 1.0
**Дата:** 2026-05-24
