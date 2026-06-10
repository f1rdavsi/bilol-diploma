export function listQuery(event: Parameters<typeof getQuery>[0]) {
  const query = getQuery(event)
  const search = typeof query.search === 'string' && query.search.length >= 2 ? query.search : ''
  const page = Math.max(Number(query.page || 1), 1)
  const pageSize = Math.min(Math.max(Number(query.pageSize || 10), 1), 100)

  return { search, page, pageSize, skip: (page - 1) * pageSize }
}
