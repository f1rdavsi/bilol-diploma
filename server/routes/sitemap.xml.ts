import { prisma } from '../utils/prisma'

const fallbackServiceSlugs = [
  'diagnostics',
  'engine-repair',
  'suspension',
  'oil-service',
  'computer-diagnostics',
  'auto-electric'
]

export default defineEventHandler(async (event) => {
  const baseUrl = getRequestURL(event).origin
  let serviceSlugs = fallbackServiceSlugs

  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      select: { slug: true },
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }]
    })

    if (services.length) {
      serviceSlugs = services.map((service) => service.slug)
    }
  } catch {
    serviceSlugs = fallbackServiceSlugs
  }

  const urls = [
    '/',
    '/about',
    '/services',
    '/contacts',
    ...serviceSlugs.map((slug) => `/services/${slug}`)
  ]

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`
})
