import { Router } from 'express'
const router = Router()

function createLocalSession(identifier) {
  const username = String(identifier || 'operator').trim()
  const role = username.toLowerCase().includes('admin') ? 'admin' : 'operator'
  return { token: 'local-preview-session', user: { username, role, email: '' } }
}

router.post('/login', (req, res) => {
  const identifier = req.body?.identifier
  if (!identifier || !req.body?.password) return res.status(400).json({ message: 'Credentials are required.' })
  return res.json(createLocalSession(identifier))
})
router.post('/logout', (_req, res) => res.json({ loggedOut: true }))
router.get('/me', (_req, res) => res.json({ user: { username: 'preview_operator', role: 'operator' } }))
export default router
