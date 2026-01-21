import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { auth } from "../../config/firebase";
import { MenuIcon } from "lucide-react";

const Navbar = ({currentSection}) => {
    const currentUser = useContext(UserContext);
    const navigate = useNavigate()
    const [menuPopup, setMenuPopup] = useState(false);

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/')
    }
    return (
        <div className="flex items-center justify-between h-[10%] w-full px-4">
            <p>McqGenerator</p>
            {currentUser ? <div className="flex gap-2 mr-5">
                <MenuIcon style={{ cursor: 'pointer' }} onClick={() => setMenuPopup(true)} />
                {menuPopup ? <div className="flex flex-col z-20 absolute bg-white shadow-lg max-w-2xl rounded-xl justify-center w-50 right-8">
                    {currentSection === 'Dashboard'?<div className="flex p-2 justify-center w-full cursor-pointer hover:bg-gray-100" onClick={() => {navigate('/')}}>LandingPage</div>:
                    <div className="flex p-2 justify-center w-full cursor-pointer hover:bg-gray-100" onClick={() => {navigate('/Dashboard')}}>Dashboard</div>
                    }
                    <div className="flex p-2 justify-center w-full cursor-pointer hover:bg-gray-100" onClick={handleLogout}>Logout</div>
                    <div className="flex p-2 justify-center w-full cursor-pointer hover:bg-gray-100" onClick={()=>setMenuPopup(false)}>Close</div>
                </div> : null}
                {/* <button className="w-max h-max px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-800 text-white" onClick={() => navigate('/Dashboard')}>Dashboard</button>
                <button className="w-max h-max px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-800 text-white cursor-pointer" onClick={handleLogout}>Logout</button> */}
            </div> : <button className="w-max h-max px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-800 text-white" onClick={() => navigate('/Login')}>Login</button>
            }

        </div>
    )
}

export default Navbar;