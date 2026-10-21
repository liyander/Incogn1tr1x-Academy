import { Router } from 'express'
const router = Router()
const records = []
function listLabResearch() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listLabResearch()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
