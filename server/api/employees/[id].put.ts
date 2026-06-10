import bcrypt from 'bcryptjs'
import { employeeSchema, idSchema } from '../../utils/schemas'
import { requireRole } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'
import { UserRole } from '@prisma/client'

export default defineEventHandler(async (event) => {
  await requireRole(event, [UserRole.ROLE_ADMIN])

  try {
    const id = idSchema.parse(getRouterParam(event, 'id'))
    const body = employeeSchema.partial().parse(await readBody(event))
    const password = body.password ? await bcrypt.hash(body.password, 10) : undefined
    return await prisma.user.update({
      where: { id },
      data: { name: body.name, email: body.email, role: body.role, ...(password ? { password } : {}) },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    })
  } catch (error) {
    validationError(error)
  }
})
