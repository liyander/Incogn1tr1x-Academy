import { Router } from 'express'
const router = Router()
const records = []
function listNotifications() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listNotifications()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
