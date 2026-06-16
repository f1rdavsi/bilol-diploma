import type { Service } from '@prisma/client'

function toStringArray(value: unknown) {
  return Array.isArray(value) ? value.map(String) : []
}

export function serializeService(service: Service) {
  return {
    ...service,
    price: Number(service.price),
    benefits: toStringArray(service.benefits),
    steps: toStringArray(service.steps)
  }
}
