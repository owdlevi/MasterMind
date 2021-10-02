import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import { useAuthState } from '@/context/AuthContext'

type UserProfile = {
  displayName: string
  email: string
  emailVerified: boolean
  photoURL: string | null
  uid: string
}

const UserMenu = ({ displayName, photoURL }: UserProfile) => {
  const { logout } = useAuthState()

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
      >
        {photoURL ? <Avatar size={'sm'} src={photoURL} /> : null}
      </MenuButton>
      <MenuList>
        <MenuItem>{displayName}</MenuItem>
        <MenuItem>Link 2</MenuItem>
        <MenuDivider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
