import { Router } from 'express'
const router = Router()
const config = { routes: { dashboard: true, learningPaths: true, practiceLabs: true, upcomingCtf: true, profile: true }, features: { labRooms: true, redTeamPath: true, publicRegistration: false } }
router.get('/', (_req, res) => res.json({ ...config }))
export default router
