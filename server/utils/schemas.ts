import { RepairStatus, UserRole } from '@prisma/client'
import { z } from 'zod'

export const idSchema = z.coerce.number().int().positive()

const requiredText = z.string().trim().min(1)
const phoneSchema = z.string().trim().regex(/^\+?[0-9\s\-()]{7,20}$/, 'Введите корректный телефон')
const vinSchema = z.string().trim().toUpperCase().regex(/^[A-HJ-NPR-Z0-9]{8,17}$/, 'VIN должен содержать 8-17 символов без I, O, Q')
const plateSchema = z.string().trim().toUpperCase().min(3).max(12)
const passwordSchema = z.string().min(8, 'Пароль должен быть не короче 8 символов')

export const registerSchema = z.object({
  name: requiredText.min(2).max(80),
  email: z.email().trim().toLowerCase(),
  password: passwordSchema,
  role: z.enum(UserRole).default(UserRole.ROLE_MECHANIC)
})

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1)
})

export const clientSchema = z.object({
  fullName: requiredText.min(2).max(120),
  phone: phoneSchema,
  address: z.string().trim().max(180).optional().nullable()
})

export const carSchema = z.object({
  clientId: idSchema,
  brand: requiredText.min(2).max(60),
  model: requiredText.max(80),
  year: z.coerce.number().int().min(1950).max(new Date().getFullYear() + 1),
  vin: vinSchema,
  plateNumber: plateSchema
})

export const orderSchema = z.object({
  clientId: idSchema,
  carId: idSchema,
  employeeId: idSchema.optional().nullable(),
  problemDescription: requiredText.min(10).max(2000),
  status: z.enum(RepairStatus).default(RepairStatus.NEW),
  price: z.coerce.number().min(0).max(999999).default(0),
  queuePosition: z.coerce.number().int().min(0).default(0)
})

export const statusSchema = z.object({
  status: z.enum(RepairStatus)
})

export const queueMoveSchema = z.object({
  queuePosition: z.coerce.number().int().min(1)
})

export const employeeSchema = z.object({
  name: requiredText.min(2).max(80),
  email: z.email().trim().toLowerCase(),
  password: passwordSchema.optional(),
  role: z.enum(UserRole)
})

export const serviceSchema = z.object({
  slug: z.string().trim().toLowerCase().min(2).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug должен быть в формате latin-slug'),
  title: requiredText.min(2).max(120),
  short: requiredText.min(10).max(500),
  description: requiredText.min(20).max(3000),
  price: z.coerce.number().min(0).max(999999),
  currency: z.string().trim().toUpperCase().min(3).max(8).default('TJS'),
  image: z.string().trim().url().max(1000),
  icon: z.string().trim().min(2).max(80).default('Wrench'),
  benefits: z.array(requiredText.max(180)).min(1).max(8),
  steps: z.array(requiredText.max(180)).min(1).max(8),
  isActive: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0)
})

export const serviceRequestSchema = z.object({
  name: requiredText.min(2).max(120),
  phone: phoneSchema,
  car: z.string().trim().max(160).optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
  serviceSlug: z.string().trim().toLowerCase().max(80).optional().nullable()
})
