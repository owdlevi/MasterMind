import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    primary: {
      main: '#0AC5A8',
      light: '#51F3DA',
      bg: '#F5F5F5',
      700: '#51F3DA',
    },
    800: '#151F35',
    700: '#2a69ac',
  },
}
export const theme = extendTheme({ colors })
