import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react'
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth'
import { initializeApp } from 'firebase/app'

type User = {
  displayName: string
  email: string
  emailVerified: boolean
  photoURL: string | null
  uid: string
} | null

type authContext = {
  user: User
  error: object | null
  logout: () => void
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_MMIND_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_MMIND_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_MMIND_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_MMIND_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_MMIND_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MMIND_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_MMIND_FIREBASE_APP_ID,
}
// initialize firebase app
export const firebaseApp = initializeApp(firebaseConfig)

export const AuthContext = createContext<authContext | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)
  const [error, setError] = useState<object | null>(null)

  const handleUser = (data: any) => {
    if (data) {
      const { displayName, email, emailVerified, photoURL, uid } = data

      setUser({
        displayName,
        email,
        emailVerified,
        photoURL,
        uid,
      })
    } else setUser(null)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), handleUser, setError)
    return () => unsubscribe()
  }, [])

  const logout = () => {
    signOut(getAuth())
  }

  const authContextValue: authContext = {
    user,
    error,
    logout,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)

  return { ...auth, isAuthenticated: auth?.user != null }
}
