import { apiFetch } from './services/api'

const AUTH_KEY = 'incognitrix_auth_session'
export const TEMP_USERS = []

export async function loginUser(username, password) {
  const response = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier: username, password }),
  })
  const session = { ...response.user, token: response.token, loggedInAt: Date.now() }
  localStorage.setItem(AUTH_KEY, JSON.stringify(session))
  return session
}

export async function registerUser() {
  throw new Error('Registration is unavailable in the local preview.')
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY)
}

export function getAuthSession() {
  try {
    const session = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null')
    return session?.username && session?.role ? session : null
  } catch {
    return null
  }
}

export function isAuthenticatedUser() {
  return Boolean(getAuthSession())
}
