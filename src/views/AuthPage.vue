<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

const router = useRouter()
const isLogin = ref(true)
const email = ref('')
const password = ref('')
const error = ref('')
const message = ref('')
const loading = ref(false)
const showAuth = ref(false)

// Google Sign-In
async function signInWithGoogle() {
  try {
    loading.value = true
    const result = await signInWithPopup(auth, googleProvider)
    // Google accounts are pre-verified — go straight to dashboard
    router.push('/dashboard')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Email + Password
async function handleSubmit() {
  error.value = ''
  message.value = ''
  loading.value = true
  try {
    if (isLogin.value) {
      // LOGIN
      const result = await signInWithEmailAndPassword(auth, email.value, password.value)
      if (!result.user.emailVerified) {
        error.value = 'Please verify your email first. Check your inbox.'
        await auth.signOut()
        return
      }
      router.push('/dashboard')
    } else {
      // SIGN UP — sends verification email like Netflix
      const result = await createUserWithEmailAndPassword(auth, email.value, password.value)
      await sendEmailVerification(result.user)
      await auth.signOut()
      message.value = '✅ Verification email sent! Check your inbox to activate your account.'
      isLogin.value = true
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Forgot password
async function resetPassword() {
  if (!email.value) { error.value = 'Enter your email first.'; return }
  await sendPasswordResetEmail(auth, email.value)
  message.value = '📧 Password reset email sent!'
}


</script>