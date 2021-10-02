import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

import Header from '../Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Box p={4}>{children}</Box>
      {/* Footer */}
    </>
  )
}
