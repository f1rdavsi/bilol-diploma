import bcrypt from 'bcryptjs'
import { employeeSchema } from '../../utils/schemas'
import { requireRole } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'
import { UserRole } from '@prisma/client'

export default defineEventHandler(async (event) => {
  await requireRole(event, [UserRole.ROLE_ADMIN])

  try {
    const body = employeeSchema.required({ password: true }).parse(await readBody(event))
    return await prisma.user.create({
      data: { ...body, password: await bcrypt.hash(body.password, 10) },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    })
  } catch (error) {
    validationError(error)
  }
})
