import { Router } from 'express'
const router = Router()
const records = []
function listUsers() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listUsers()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
