import '../bootstrap'

export default {
  secret: process.env.JWT_SECRET || 'postfy',
  expiresIn: '7d'
}
