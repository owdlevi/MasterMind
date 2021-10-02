import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from '../context/AuthContext'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
