import { Router } from 'express'
const router = Router()
const records = []
function listDeveloper() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listDeveloper()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
