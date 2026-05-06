import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { MenuIcon } from "lucide-react";
import { LogOut, LayoutDashboardIcon, HomeIcon } from "lucide-react";

const NavbarMenu = ({ handleLogout, currentSection, navigate }) => {
    return (
        <Menu>
            <MenuButton>
                <MenuIcon style={{ cursor: 'pointer' }} />
            </MenuButton>
            <MenuItems transition anchor='bottom end' className="flex flex-col z-20 border border-slate-200 bg-white shadow-md max-w-2xl justify-center w-50 transition duration-100 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:scale-100 data-[enter]:opacity-100">
                <MenuItem>
                    {currentSection === 'Dashboard' ? <div className="flex items-center p-2 w-full cursor-pointer text-blue-800 hover:bg-gray-100" onClick={() => { navigate('/') }}><HomeIcon className="size-5 mr-2"/> LandingPage</div> :
                        <div className="flex items-center p-2 w-full cursor-pointer text-blue-800 hover:bg-gray-100" onClick={() => { navigate('/Dashboard') }}><LayoutDashboardIcon className="size-5 mr-2"/> Dashboard</div>
                    }
                </MenuItem>
                <MenuItem>
                    <div className="flex items-center p-2 w-full cursor-pointer hover:bg-gray-100 text-red-500" onClick={handleLogout}><LogOut className="text-red-500 size-5 mr-2"/> Logout</div>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}

export default NavbarMenu;