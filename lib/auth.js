import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const JWT_EXPIRES_IN = '7d'
const COOKIE_NAME = 'token'

export function getCookieName() {
  return COOKIE_NAME
}

export async function hashPassword(password) {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash)
}

export function signJwt(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyJwt(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return null
  }
}

// Password validation helper
export function validatePasswordStrength(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

// Token refresh helper
export function shouldRefreshToken(token) {
  const decoded = verifyJwt(token);
  if (!decoded) return true;
  const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
  return expiresIn < 86400; // Refresh if less than 1 day
}
