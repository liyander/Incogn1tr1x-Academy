import app from './app.js'
import { env } from './config/env.js'

const server = app.listen(env.port, env.host, () => {
  console.log(`Incognitrix local preview listening on http://${env.host}:${env.port}`)
})
server.on('error', (error) => {
  console.error('Preview server failed:', error?.message || error)
  process.exitCode = 1
})
