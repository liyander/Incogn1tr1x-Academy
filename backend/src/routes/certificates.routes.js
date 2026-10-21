import { Router } from 'express'
const router = Router()
const records = []
function listCertificates() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listCertificates()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
