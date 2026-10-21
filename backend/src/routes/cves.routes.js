import { Router } from 'express'
import { findCatalogItem, selectCatalog } from '../services/catalogQuery.js'
const router = Router()
const entries = [{ id: 1, cve_id: 'CVE-2021-44228', short_description: 'Public reference entry' }]
function listEntries(query) { return selectCatalog(entries, query, ['cve_id', 'short_description']) }
router.get('/', (req, res) => res.json(listEntries(req.query)))
router.get('/:id', (req, res) => res.json(findCatalogItem(entries, req.params.id, ['id', 'cve_id'])))
export default router
