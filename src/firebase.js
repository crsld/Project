import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDI-uwQj9R6qxUbx_SdACJzJ62wA69yTgQ",
  authDomain: "scanship-website.firebaseapp.com",
  projectId: "scanship-website",
  storageBucket: "scanship-website.firebasestorage.app",
  messagingSenderId: "55438405454",
  appId: "1:55438405454:web:5e6b3066e780f7c036781f",
  measurementId: "G-XN3RQHFM16"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()