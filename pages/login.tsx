import { useCallback } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

const Login = () => {
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    const { email, password } = e.target.elements
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
    } catch (e) {}
  }, [])

  const loginWithGoogle = useCallback(async (e) => {
    const provider = new GoogleAuthProvider()

    const auth = getAuth()
    try {
      await signInWithPopup(auth, provider)
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
    }
  }, [])

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="email" type="email" />
        <input name="password" placeholder="password" type="password" />
        <button type="submit">Login</button>
      </form>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </>
  )
}

export default Login
