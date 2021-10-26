import { useCallback } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  Stack,
} from '@chakra-ui/react'
import { PasswordField } from './PasswordField'

export const LoginForm = (props: HTMLChakraProps<'form'>) => (
  <chakra.form
    onSubmit={useCallback(async (e) => {
      e.preventDefault()

      const { email, password } = e.target.elements
      const auth = getAuth()
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
      } catch (e) {}
    }, [])}
    {...props}
  >
    <Stack spacing="6">
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input name="email" type="email" autoComplete="email" required />
      </FormControl>
      <PasswordField />
      <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        Sign in
      </Button>
    </Stack>
  </chakra.form>
)
