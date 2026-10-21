import { Router } from 'express'
import { findCatalogItem, selectCatalog } from '../services/catalogQuery.js'
const router = Router()
const paths = [{ id: 'sample-path', title: 'Sample Learning Path', modules: [], resources: [] }]
function listPaths(query) { return selectCatalog(paths, query, ['title', 'description', 'category']) }
router.get('/', (req, res) => res.json(listPaths(req.query)))
router.get('/:id', (req, res) => res.json(findCatalogItem(paths, req.params.id)))
export default router
