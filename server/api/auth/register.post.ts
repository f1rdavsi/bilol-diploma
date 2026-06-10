import bcrypt from 'bcryptjs'
import { registerSchema } from '../../utils/schemas'
import { createSession, requireRole } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'
import { UserRole } from '@prisma/client'

export default defineEventHandler(async (event) => {
  await requireRole(event, [UserRole.ROLE_ADMIN])

  try {
    const body = registerSchema.parse(await readBody(event))
    const password = await bcrypt.hash(body.password, 10)
    const user = await prisma.user.create({
      data: { ...body, password },
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true }
    })

    await createSession(event, { id: user.id, role: user.role })
    return user
  } catch (error) {
    validationError(error)
  }
})
