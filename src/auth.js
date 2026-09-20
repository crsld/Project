// Sign-up, log-in and sessions are handled by Supabase Auth (email + password).
// Passwords are hashed and checked on Supabase's servers; the session is stored in the
// browser and refreshed automatically. The QR gate below is separate and client-side only.
import { ref } from 'vue'
import { MODULE_ROUTES } from './modules.js'
import { supabase } from './supabase.js'

// ── QR gate ──
// Visitors must scan/upload a valid Scanship QR code before reaching log in / sign up.
// Recognised once per browser session (sessionStorage). This check is client-side only.
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
// Any other SCANSHIP-<ID> code (raw, or as a link) is accepted too and just opens the site.
// The dash (not a colon) keeps phone cameras from treating the code as a broken link.
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

// ── Auth (Supabase) ──
const toUser = (user) => (user
  ? { id: user.id, name: (user.user_metadata?.name || '').trim() || user.email, email: user.email }
  : null)

export const currentUser = ref(null)

export const isAuthenticated = () => !!currentUser.value

// Resolves once any saved session has been restored. main.js waits for this before the first
// route check, so a signed-in user is not bounced to the log in page on refresh.
export const authReady = (async () => {
  // Remove data left by the old browser-only demo login.
  try {
    localStorage.removeItem('scanship_users')
    localStorage.removeItem('scanship_session')
  } catch {
    // ignore
  }
  if (!supabase) return
  try {
    const { data } = await supabase.auth.getSession()
    currentUser.value = toUser(data.session?.user)
  } catch {
    currentUser.value = null
  }
  // Keeps currentUser in sync: sign in/out (also from another tab), token refresh, expiry.
  supabase.auth.onAuthStateChange((_event, session) => {
    currentUser.value = toUser(session?.user)
  })
})()

const requireClient = () => {
  if (!supabase) throw new Error('Sign-in is temporarily unavailable. Please try again later.')
  return supabase
}

const friendlyError = (error) => {
  const message = (error?.message || '').toLowerCase()
  if (message.includes('invalid login credentials')) return 'Invalid email or password.'
  if (message.includes('email not confirmed')) return 'Please confirm your email first. Check your inbox for the confirmation link.'
  if (error?.code === 'user_already_exists' || message.includes('already registered')) return 'An account with this email already exists.'
  if (error?.status === 429 || message.includes('rate limit')) return 'Too many attempts. Please wait a moment and try again.'
  if (message.includes('password')) return error.message // e.g. weak password
  if (message.includes('fetch') || message.includes('network')) return 'Network problem. Check your connection and try again.'
  return 'Something went wrong. Please try again.'
}

// Resolves with { needsConfirmation }. When email confirmation is on in Supabase, the user
// must click the link in their inbox before they can log in.
export const signUp = async ({ name, email, password }) => {
  const client = requireClient()
  // After confirming, bring the user back through their station QR so the module still opens.
  const redirectTo = qrVerified.value
    ? `${window.location.origin}/access?code=${encodeURIComponent(qrVerified.value)}`
    : window.location.origin

  const { data, error } = await client.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: { data: { name: name.trim() }, emailRedirectTo: redirectTo }
  })
  if (error) throw new Error(friendlyError(error))

  // With confirmation on, an already-registered email returns a user with no identities instead of an error.
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    throw new Error('An account with this email already exists.')
  }

  if (data.session) {
    currentUser.value = toUser(data.session.user)
    return { needsConfirmation: false }
  }
  return { needsConfirmation: true }
}

export const logIn = async ({ email, password }) => {
  const client = requireClient()
  const { data, error } = await client.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password
  })
  if (error) throw new Error(friendlyError(error))
  currentUser.value = toUser(data.user)
}

export const logOut = async () => {
  currentUser.value = null
  if (!supabase) return
  try {
    const { error } = await supabase.auth.signOut()
    // If the server could not be reached, still end the session in this browser.
    if (error) await supabase.auth.signOut({ scope: 'local' })
  } catch {
    // ignore: the user is already signed out locally
  }
}
