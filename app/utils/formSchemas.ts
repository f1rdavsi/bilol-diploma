import { z } from 'zod'

export type FormErrors = Record<string, string>

const requiredText = z.string().trim().min(1, 'Заполните поле')
const phone = z.string().trim().regex(/^\+?[0-9\s\-()]{7,20}$/, 'Введите корректный телефон')
const vin = z.string().trim().toUpperCase().regex(/^[A-HJ-NPR-Z0-9]{8,17}$/, 'VIN: 8-17 символов без I, O, Q')
const plate = z.string().trim().toUpperCase().min(3, 'Минимум 3 символа').max(12, 'Максимум 12 символов')
const password = z.string().min(8, 'Минимум 8 символов')

export const clientFormSchema = z.object({
  fullName: requiredText.min(2, 'Минимум 2 символа').max(120),
  phone,
  address: z.string().trim().max(180, 'Максимум 180 символов').optional()
})

export const carFormSchema = z.object({
  clientId: z.coerce.number().int().positive('Выберите клиента'),
  brand: requiredText.min(2, 'Минимум 2 символа').max(60),
  model: requiredText.max(80),
  year: z.coerce.number().int().min(1950, 'Год не может быть меньше 1950').max(new Date().getFullYear() + 1, 'Проверьте год выпуска'),
  vin,
  plateNumber: plate
})

export const employeeFormSchema = z.object({
  id: z.coerce.number().optional(),
  name: requiredText.min(2, 'Минимум 2 символа').max(80),
  email: z.email('Введите корректный email').trim().toLowerCase(),
  password: z.string().optional(),
  role: z.enum(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_MECHANIC'])
}).superRefine((data, ctx) => {
  if (!data.id && !data.password) {
    ctx.addIssue({ code: 'custom', path: ['password'], message: 'Пароль обязателен' })
  }

  if (data.password && !password.safeParse(data.password).success) {
    ctx.addIssue({ code: 'custom', path: ['password'], message: 'Минимум 8 символов' })
  }
})

export const orderFormSchema = z.object({
  clientId: z.coerce.number().int().positive('Выберите клиента'),
  carId: z.coerce.number().int().positive('Выберите автомобиль'),
  employeeId: z.coerce.number().int().positive().nullable().optional(),
  problemDescription: requiredText.min(10, 'Опишите проблему минимум в 10 символов').max(2000),
  status: z.enum(['QUEUE', 'DIAGNOSTICS', 'IN_REPAIR', 'WAITING_PARTS', 'COMPLETED', 'HANDED_OVER']),
  price: z.coerce.number().min(0, 'Цена не может быть отрицательной').max(999999),
  queuePosition: z.coerce.number().int().min(0, 'Позиция не может быть отрицательной')
})

export function getFormErrors(error: z.ZodError): FormErrors {
  const result: FormErrors = {}
  const fieldErrors = error.flatten().fieldErrors as Record<string, string[] | undefined>

  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages?.[0]) result[field] = messages[0]
  }

  return result
}
