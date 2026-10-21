export function authenticate(req, _res, next) { req.user = { id: 0, username: 'preview_operator', role: 'operator' }; next() }
export function optionalAuthenticate(req, res, next) { authenticate(req, res, next) }
export function requireAdmin(_req, _res, next) { next() }
export function requireDeveloper(_req, _res, next) { next() }
export function signToken() { return 'local-preview-session' }
