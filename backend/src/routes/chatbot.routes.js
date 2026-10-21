import { Router } from 'express'
const router = Router()
const records = []
function listChatbot() { return records.map((record) => ({ ...record })) }
router.get('/', (_req, res) => res.json(listChatbot()))
router.get('/*', (_req, res) => res.json({ items: [], records: [] }))
export default router
