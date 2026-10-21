import { Router } from 'express'
const router = Router()
const records = []
function listCategories() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listCategories()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
