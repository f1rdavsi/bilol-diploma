import { prisma } from '../../../utils/prisma'
import { serviceRequestSchema } from '../../../utils/schemas'
import { validationError } from '../../../utils/errors'
import { createStatusHistory } from '../../../utils/orderHistory'

function parseCarName(value?: string | null) {
  const text = value?.trim() || 'Автомобиль не указан'
  const parts = text.split(/\s+/)
  const yearMatch = text.match(/\b(19[5-9]\d|20\d{2})\b/)

  return {
    brand: parts[0] || 'Авто',
    model: parts.slice(1).join(' ').replace(/\b(19[5-9]\d|20\d{2})\b/, '').trim() || 'Не указана',
    year: yearMatch ? Number(yearMatch[0]) : new Date().getFullYear()
  }
}

function uniqueVin(id: number) {
  return `WEBREQ${String(id).padStart(11, '0')}`.slice(0, 17)
}

function uniquePlate(id: number) {
  return `WEBREQ${String(id).padStart(6, '0')}`.slice(0, 12)
}

export default defineEventHandler(async (event) => {
  try {
    const body = serviceRequestSchema.parse(await readBody(event))
    const service = body.serviceSlug
      ? await prisma.service.findUnique({ where: { slug: body.serviceSlug } })
      : null
    const carData = parseCarName(body.car)

    return await prisma.$transaction(async (tx) => {
      const serviceRequest = await tx.serviceRequest.create({ data: body })
      const client = await tx.client.findFirst({ where: { phone: body.phone } })
        || await tx.client.create({
          data: {
            fullName: body.name,
            phone: body.phone,
            address: 'Заявка с сайта'
          }
        })
      const car = await tx.car.create({
        data: {
          clientId: client.id,
          brand: carData.brand,
          model: carData.model,
          year: carData.year,
          vin: uniqueVin(serviceRequest.id),
          plateNumber: uniquePlate(serviceRequest.id)
        }
      })
      const serviceTitle = service?.title || 'Заявка с сайта'
      const problemDescription = [
        `Услуга: ${serviceTitle}`,
        body.message ? `Комментарий клиента: ${body.message}` : null,
        body.car ? `Автомобиль со слов клиента: ${body.car}` : null,
        `Источник: публичная форма #${serviceRequest.id}`
      ].filter(Boolean).join('\n')
      const repairOrder = await tx.repairOrder.create({
        data: {
          clientId: client.id,
          carId: car.id,
          problemDescription,
          status: 'NEW',
          price: service?.price || 0,
          queuePosition: 0
        },
        include: {
          client: true,
          car: true,
          employee: { select: { id: true, name: true, email: true, role: true } }
        }
      })
      await createStatusHistory(tx, {
        repairOrderId: repairOrder.id,
        toStatus: 'NEW',
        note: `Создано из публичной формы #${serviceRequest.id}`
      })

      return { serviceRequest, repairOrder }
    })
  } catch (error) {
    validationError(error)
  }
})
