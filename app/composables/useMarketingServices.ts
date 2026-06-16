import { fallbackServices, type MarketingService } from '~/data/marketing'
import { publicServicesApi } from '~/services/resourcesApi'

export type MarketingServicePayload = Omit<MarketingService, 'icon'> & { iconName: string }

function toPayload(service: Omit<MarketingService, 'icon'> & { icon?: unknown, iconName?: string }): MarketingServicePayload {
  const { icon: _icon, ...data } = service

  return {
    ...data,
    iconName: service.iconName || (typeof service.icon === 'string' ? service.icon : 'Wrench')
  }
}

export async function fetchMarketingServices(): Promise<MarketingServicePayload[]> {
  try {
    const response = await publicServicesApi.list()
    const items = response.items.map(service => toPayload({
      ...service,
      iconName: service.icon
    }))

    return items.length ? items : fallbackServices().map(toPayload)
  } catch {
    return fallbackServices().map(toPayload)
  }
}

export async function fetchMarketingService(slug: string): Promise<MarketingServicePayload | null> {
  try {
    const service = await publicServicesApi.get(slug)

    return toPayload({
      ...service,
      iconName: service.icon
    })
  } catch {
    const service = fallbackServices().find((item) => item.slug === slug)

    return service ? toPayload(service) : null
  }
}
