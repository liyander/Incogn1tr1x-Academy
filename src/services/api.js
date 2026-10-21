                                                
export const API_BASE_URL = ''

export function getAuthToken() {
  try {
    return JSON.parse(localStorage.getItem('incognitrix_auth_session') || 'null')?.token || ''
  } catch {
    return ''
  }
}

function currentUser() {
  try {
    return JSON.parse(localStorage.getItem('incognitrix_auth_session') || 'null')
  } catch {
    return null
  }
}

function unavailable() {
  throw new Error('This action is unavailable in the local preview.')
}

function selectRecords(records, params) {
  const search = (params.get('search') || params.get('q') || '').trim().toLowerCase()
  const category = (params.get('category') || '').trim().toLowerCase()
  const level = (params.get('level') || params.get('difficulty') || '').trim().toLowerCase()
  const offset = Math.max(0, Number.parseInt(params.get('offset'), 10) || 0)
  const limit = Math.min(100, Math.max(1, Number.parseInt(params.get('limit'), 10) || 100))

  const matches = records.filter((record) => {
    const title = String(record.title || record.name || record.cve_id || '').toLowerCase()
    const description = String(record.description || record.short_description || '').toLowerCase()
    if (search && !`${title} ${description}`.includes(search)) return false
    if (category && String(record.category || '').toLowerCase() !== category) return false
    if (level && String(record.level || record.difficulty || '').toLowerCase() !== level) return false
    return true
  })

  const sortField = params.get('sortBy')
  if (sortField && ['title', 'name', 'cve_id', 'level'].includes(sortField)) {
    matches.sort((a, b) => String(a[sortField] || '').localeCompare(String(b[sortField] || '')))
    if (params.get('order') === 'desc') matches.reverse()
  }

  return structuredClone(matches.slice(offset, offset + limit))
}

export async function apiFetch(path, options = {}) {
  const method = String(options.method || 'GET').toUpperCase()
  const requestUrl = new URL(path, 'http://local.preview')
  const pathname = requestUrl.pathname
  const params = requestUrl.searchParams
  if (pathname === '/auth/login' && method === 'POST') {
    const input = JSON.parse(options.body || '{}')
    const identifier = String(input.identifier || '').trim()
    if (!identifier || !String(input.password || '').trim()) {
      throw new Error('Enter a username and password.')
    }
    const role = identifier.toLowerCase().includes('admin') ? 'admin' : 'operator'
    return { token: 'local-preview-session', user: { username: identifier, email: '', registrationNumber: '', role } }
  }
  if (method !== 'GET') return unavailable()

  if (pathname === '/rooms') {
    const { defaultRooms } = await import('../data/roomsData')
    return selectRecords(defaultRooms, params)
  }
  if (pathname === '/career-paths') {
    const { defaultCareerPaths } = await import('../data/careerPathsData')
    return selectRecords(defaultCareerPaths, params)
  }
  if (pathname === '/cves') {
    const { defaultCves } = await import('../data/cvesData')
    return selectRecords(defaultCves, params)
  }
  if (path === '/platform-config') {
    const { DEFAULT_PLATFORM_CONFIG } = await import('../platformConfig')
    return structuredClone(DEFAULT_PLATFORM_CONFIG)
  }
  if (path === '/users/me') {
    return { username: currentUser()?.username || 'operator' }
  }
  if (path === '/rooms/progress') return {}
  if (path === '/rooms/scoreboard/summary') return []
  if (path === '/rooms/streaks/me') return { currentStreak: 0 }
  if (path === '/notifications' || path === '/categories') return []
  if (path.includes('/docker-config/status')) return { connected: false, images: [], containers: 0, config: {}, message: '' }
  if (path.includes('/docker-config/containers')) return { containers: [] }
  if (path.includes('/docker-machines/me')) return { machines: [] }
  if (path.includes('/docker/')) return { enabled: true, running: false, access: null }
  if (path.startsWith('/rooms/')) {
    const { defaultRooms } = await import('../data/roomsData')
    return structuredClone(defaultRooms.find((room) => room.id === decodeURIComponent(path.split('/')[2])) || null)
  }
  if (path.startsWith('/career-paths/')) {
    const { defaultCareerPaths } = await import('../data/careerPathsData')
    return structuredClone(defaultCareerPaths.find((item) => item.id === decodeURIComponent(path.split('/')[2])) || null)
  }
  return { items: [], projects: [], applications: [], recommendations: [], sessions: [], users: [], results: [] }
}
