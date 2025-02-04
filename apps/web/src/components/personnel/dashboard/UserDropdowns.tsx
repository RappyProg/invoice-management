import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
export default function UserDropdowns() {
  return (
    <Menu>
      <MenuButton>
        <FontAwesomeIcon icon={faUser} />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="mt-3 p-4 bg-gray-200 rounded-md shadow-md text-center space-y-5"
      >
        <MenuItem>
          <Link href="/personnel/profile" className="block">
            Profile
          </Link>
        </MenuItem>
        
          <hr className="flex-grow border-t-2 border-black rounded-full" />
        
        <MenuItem>
          <Link href="/personnel/reset-password" className="block">
            Change Password
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
