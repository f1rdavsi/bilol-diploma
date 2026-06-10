import { RepairStatus, UserRole } from '@prisma/client'
import { z } from 'zod'

export const idSchema = z.coerce.number().int().positive()

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(UserRole).default(UserRole.ROLE_MECHANIC)
})

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
})

export const clientSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(5),
  address: z.string().optional().nullable()
})

export const carSchema = z.object({
  clientId: idSchema,
  brand: z.string().min(2),
  model: z.string().min(1),
  year: z.coerce.number().int().min(1950).max(new Date().getFullYear() + 1),
  vin: z.string().min(8),
  plateNumber: z.string().min(3)
})

export const orderSchema = z.object({
  clientId: idSchema,
  carId: idSchema,
  employeeId: idSchema.optional().nullable(),
  problemDescription: z.string().min(5),
  status: z.enum(RepairStatus).default(RepairStatus.QUEUE),
  price: z.coerce.number().min(0).default(0),
  queuePosition: z.coerce.number().int().min(0).default(0)
})

export const statusSchema = z.object({
  status: z.enum(RepairStatus)
})

export const queueMoveSchema = z.object({
  queuePosition: z.coerce.number().int().min(1)
})

export const employeeSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6).optional(),
  role: z.enum(UserRole)
})
