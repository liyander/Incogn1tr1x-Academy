import { Router } from 'express'
import { findCatalogItem, selectCatalog } from '../services/catalogQuery.js'
const router = Router()
const rooms = [
  { id: 'sample-room', title: 'Sample Lab', category: 'Web Exploitation', level: 'Easy', roomType: 'theoretical', description: 'Offline learning preview', content: { markdown: '# Sample Lab' } },
]
function listRooms(query) { return selectCatalog(rooms, query, ['title', 'description', 'category']) }
function findRoom(id) { return findCatalogItem(rooms, id) }
router.get('/', (req, res) => res.json(listRooms(req.query)))
router.get('/progress', (_req, res) => res.json({}))
router.get('/scoreboard/summary', (_req, res) => res.json([]))
router.get('/streaks/me', (_req, res) => res.json({ currentStreak: 0 }))
router.get('/:id', (req, res) => res.json(findRoom(req.params.id)))
export default router
