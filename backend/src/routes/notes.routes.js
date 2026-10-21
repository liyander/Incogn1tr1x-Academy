import { Router } from 'express'
const router = Router()
const records = []
function listNotes() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listNotes()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
