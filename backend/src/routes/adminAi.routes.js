import { Router } from 'express'
const router = Router()
const records = []
function listAdminAi() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listAdminAi()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
