import { Router } from 'express'
const router = Router()
const records = []
function listCtfEvents() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listCtfEvents()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
