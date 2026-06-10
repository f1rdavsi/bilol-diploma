import type { H3Event } from 'h3'
import { SignJWT, jwtVerify } from 'jose'
import { UserRole } from '@prisma/client'
import { prisma } from './prisma'

const cookieName = 'autoservice_session'

type SessionPayload = {
  id: number
  role: UserRole
}

function getSecret(event: H3Event) {
  const config = useRuntimeConfig(event)
  return new TextEncoder().encode(config.jwtSecret)
}

export async function createSession(event: H3Event, payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret(event))

  setCookie(event, cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
}

export function clearAuthSession(event: H3Event) {
  deleteCookie(event, cookieName, { path: '/' })
}

export async function getSessionUser(event: H3Event) {
  const token = getCookie(event, cookieName)

  if (!token) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token, getSecret(event))
    const id = Number(payload.id)

    if (!Number.isInteger(id)) {
      return null
    }

    return await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true }
    })
  } catch {
    clearAuthSession(event)
    return null
  }
}

export async function requireUser(event: H3Event) {
  const user = await getSessionUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return user
}

export async function requireRole(event: H3Event, roles: UserRole[]) {
  const user = await requireUser(event)

  if (!roles.includes(user.role)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  return user
}

export const managerRoles = [UserRole.ROLE_ADMIN, UserRole.ROLE_MANAGER]
export const staffRoles = [UserRole.ROLE_ADMIN, UserRole.ROLE_MANAGER, UserRole.ROLE_MECHANIC]
