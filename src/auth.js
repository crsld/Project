// Frontend-only demo auth. Accounts live in this browser's localStorage, so this
// is NOT real security. Replace the bodies of signUp/logIn/logOut with API calls
// to a backend (HttpOnly session cookie or JWT) before going to production.
import { ref } from 'vue'

const USERS_KEY = 'scanship_users'
const SESSION_KEY = 'scanship_session'

const readJSON = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    throw new Error('Unable to save data. Please enable browser storage.')
  }
}

const toHex = (buf) => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')

const hashPassword = async (password, saltHex) => {
  const salt = saltHex
    ? new Uint8Array(saltHex.match(/../g).map(h => parseInt(h, 16)))
    : crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256)
  return { salt: toHex(salt), hash: toHex(bits) }
}

export const currentUser = ref(readJSON(SESSION_KEY, null))

export const isAuthenticated = () => !!currentUser.value

export const signUp = async ({ name, email, password }) => {
  const users = readJSON(USERS_KEY, [])
  const normalized = email.trim().toLowerCase()
  if (users.some(u => u.email === normalized)) {
    throw new Error('An account with this email already exists.')
  }
  const { salt, hash } = await hashPassword(password)
  users.push({ name: name.trim(), email: normalized, salt, hash })
  writeJSON(USERS_KEY, users)
  startSession({ name: name.trim(), email: normalized })
}

export const logIn = async ({ email, password }) => {
  const users = readJSON(USERS_KEY, [])
  const user = users.find(u => u.email === email.trim().toLowerCase())
  // Same message for unknown email and wrong password to avoid account enumeration.
  const invalid = new Error('Invalid email or password.')
  if (!user) throw invalid
  const { hash } = await hashPassword(password, user.salt)
  if (hash !== user.hash) throw invalid
  startSession({ name: user.name, email: user.email })
}

export const logOut = () => {
  currentUser.value = null
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // ignore
  }
}

const startSession = (user) => {
  currentUser.value = user
  writeJSON(SESSION_KEY, user)
}
