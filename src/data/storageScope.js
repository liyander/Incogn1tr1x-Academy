                                                                            
export function catalogStorageKey(key) {
  try {
    const session = JSON.parse(localStorage.getItem('incognitrix_auth_session') || 'null')
    return session?.role === 'admin' ? `${key}:admin-preview` : key
  } catch {
    return key
  }
}
