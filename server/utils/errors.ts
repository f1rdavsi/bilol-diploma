import { ZodError } from 'zod'

export function validationError(error: unknown) {
  if (error instanceof ZodError) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation Error',
      data: error.flatten()
    })
  }

  throw error
}

export function notFound(message = 'Запись не найдена') {
  throw createError({ statusCode: 404, statusMessage: message })
}

export function forbidden(message = 'Недостаточно прав') {
  throw createError({ statusCode: 403, statusMessage: message })
}
