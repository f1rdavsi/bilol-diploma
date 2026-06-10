import { getSessionUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  return await getSessionUser(event)
})
