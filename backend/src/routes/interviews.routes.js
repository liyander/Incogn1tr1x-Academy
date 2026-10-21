import { Router } from 'express'
const router = Router()
const records = []
function listInterviews() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listInterviews()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
