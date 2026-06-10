import { ZodError } from 'zod'

export function validationError(error: unknown) {
  if (error instanceof ZodError) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Error',
      data: error.flatten()
    })
  }

  if (typeof error === 'object' && error && 'code' in error) {
    const code = (error as { code?: string }).code

    if (code === 'P2002') {
      throw createError({
        statusCode: 422,
        statusMessage: 'Validation Error',
        data: { message: 'Запись с такими уникальными данными уже существует' }
      })
    }

    if (code === 'P2025') {
      notFound()
    }
  }

  throw error
}

export function notFound(message = 'Запись не найдена') {
  throw createError({ statusCode: 404, statusMessage: message })
}

export function forbidden(message = 'Недостаточно прав') {
  throw createError({ statusCode: 403, statusMessage: message })
}
