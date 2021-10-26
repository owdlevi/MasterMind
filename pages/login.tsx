import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from '@/context/AuthContext'
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { DividerWithText } from '@/components/DividerWithText'
import { LoginForm } from '@/components/LoginForm'
import Logo from '@/components/Logo'

const Login = () => {
  const { isAuthenticated } = useAuthState()
  const router = useRouter()

  if (isAuthenticated) router.push('/')

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
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      maxH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
      m="0"
    >
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to your account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Don&apos;t have an account?</Text>
        </Text>
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          py="8"
          px={{ base: '4', md: '10' }}
          shadow="base"
          rounded={{ sm: 'lg' }}
        >
          <LoginForm />
          <DividerWithText mt="6">or continue with</DividerWithText>
          <SimpleGrid mt="6" columns={3} spacing="3" justifyContent="center">
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Facebook</VisuallyHidden>
              <FaFacebook />
            </Button>
            <Button
              color="currentColor"
              variant="outline"
              onClick={(e) => loginWithGoogle(e)}
            >
              <VisuallyHidden>Login with Google</VisuallyHidden>
              <FaGoogle />
            </Button>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
