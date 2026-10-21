import { Router } from 'express'
const router = Router()
const records = []
function listResumes() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listResumes()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
