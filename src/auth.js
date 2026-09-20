// Frontend-only demo auth. Accounts live in this browser's localStorage, so this
// is NOT real security. Replace the bodies of signUp/logIn/logOut with API calls
// to a backend (HttpOnly session cookie or JWT) before going to production.
import { ref } from 'vue'
import { MODULE_ROUTES } from './modules.js'

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

// ── QR gate ──
// Visitors must scan/upload a valid Scanship QR code before reaching log in / sign up.
// Recognised once per browser session (sessionStorage). Like the rest of this file this
// is a client-side check only. Adjust isValidScanshipQr to match your real QR payload.
const QR_KEY = 'scanship_qr_verified'

const readQr = () => {
  try {
    return sessionStorage.getItem(QR_KEY)
  } catch {
    return null
  }
}

export const qrVerified = ref(readQr())

// Where to go after log in / sign up, taken from the scanned station QR (null = no specific module).
const QR_TARGET_KEY = 'scanship_qr_target'

const writeQrTarget = (value) => {
  try {
    if (value) sessionStorage.setItem(QR_TARGET_KEY, value)
    else sessionStorage.removeItem(QR_TARGET_KEY)
  } catch {
    // ignore: stays in memory for this page load
  }
}

const readQrTarget = () => {
  try {
    return sessionStorage.getItem(QR_TARGET_KEY)
  } catch {
    return null
  }
}

export const qrTarget = ref(readQrTarget())

// Each station QR encodes a link to the site: https://<site>/access?code=SCANSHIP-MODULE-<n>
// where <n> is the module to open after log in (e.g. SCANSHIP-MODULE-1 for Station 1).
// Any other SCANSHIP-<ID> code is accepted too and just opens the site (no specific module).
// so a normal phone camera opens the website directly. The raw code ("SCANSHIP-<ID>")
// is accepted too. It uses a dash (not a colon) so cameras treat it as plain text.
const CODE_RE = /^SCANSHIP-[A-Z0-9_-]+$/i

// Pulls the code out of either a link or a raw code; returns '' when there is none.
export const extractQrCode = (text) => {
  const value = (text || '').trim()
  if (/^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value)
      return url.pathname.replace(/\/+$/, '') === '/access' ? (url.searchParams.get('code') || '').trim() : ''
    } catch {
      return ''
    }
  }
  return value
}

const MODULE_CODE_RE = /^SCANSHIP-MODULE-(\d+)$/i

// Anything starting with SCANSHIP-MODULE- must carry a module number; other codes just need the format.
export const isValidScanshipQr = (text) => {
  const code = extractQrCode(text)
  if (!CODE_RE.test(code)) return false
  return !/^SCANSHIP-MODULE-/i.test(code) || MODULE_CODE_RE.test(code)
}

// The page a code should open: the module's route, the modules list if that module has no
// page yet, or null for codes that don't name a module.
export const targetForCode = (code) => {
  const match = MODULE_CODE_RE.exec((code || '').trim())
  if (!match) return null
  return MODULE_ROUTES[Number(match[1])] || '/#modules'
}

export const acceptQr = (text) => {
  if (!isValidScanshipQr(text)) return false
  const value = extractQrCode(text)
  qrVerified.value = value
  qrTarget.value = targetForCode(value)
  writeQrTarget(qrTarget.value)
  try {
    sessionStorage.setItem(QR_KEY, value)
  } catch {
    // ignore: stays verified in memory for this page load
  }
  return true
}

export const isQrVerified = () => !!qrVerified.value

// Returns the scanned module's page (once) and clears it.
export const takeQrTarget = () => {
  const target = qrTarget.value
  qrTarget.value = null
  writeQrTarget(null)
  return target
}

// Where to send the user after a successful log in / sign up:
// the scanned module first, then a deep link they tried to open, then the homepage.
export const postAuthPath = (redirect) => {
  const scanned = takeQrTarget()
  if (scanned) return scanned
  return typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/'
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
