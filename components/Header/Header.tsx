import { ReactNode } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Logo from '@/components/Logo'
import UserMenu from '@/components/UserMenu/UserMenu'
import { useAuthState } from '@/context/AuthContext'

const Links = ['Dashboard', 'New Game']

const NavLink = ({ children }: { children: ReactNode }) => (
  <NextLink href={'/'} passHref>
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Link>
  </NextLink>
)

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, isAuthenticated } = useAuthState()

  return (
    <Box
      bg={useColorModeValue('brand.primary.bg', 'brand.primary.main')}
      px={4}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box h={12} w={64} pr={2} justifyContent={'left'}>
            <NextLink href={'/'} passHref>
              <Link>
                <Logo />
              </Link>
            </NextLink>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          {isAuthenticated && user ? (
            <UserMenu {...user} />
          ) : (
            <NextLink href={`/login`} passHref>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'brand.primary.main'}
                _hover={{
                  bg: 'brand.primary.light',
                }}
              >
                Login
              </Button>
            </NextLink>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

export default Header
