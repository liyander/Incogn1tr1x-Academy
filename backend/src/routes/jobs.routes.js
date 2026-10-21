import { Router } from 'express'
const router = Router()
const records = []
function listJobs() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listJobs()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
