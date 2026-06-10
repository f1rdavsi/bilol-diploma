import bcrypt from 'bcryptjs'
import { loginSchema } from '../../utils/schemas'
import { createSession } from '../../utils/auth'
import { validationError } from '../../utils/errors'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = loginSchema.parse(await readBody(event))
    const user = await prisma.user.findUnique({ where: { email: body.email } })

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw createError({ statusCode: 401, statusMessage: 'Неверный email или пароль' })
    }

    await createSession(event, { id: user.id, role: user.role })
    return { id: user.id, name: user.name, email: user.email, role: user.role }
  } catch (error) {
    validationError(error)
  }
})
