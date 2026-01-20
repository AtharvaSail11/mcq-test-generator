import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { auth } from "../../config/firebase";

const Navbar = () => {
    const currentUser = useContext(UserContext);
    const navigate = useNavigate()

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/')
    }
    return (
        <div className="flex items-center justify-between h-[10%] w-full px-4">
            <p>McqGenerator</p>
            {currentUser ? <div className="flex gap-2">
                <button className="w-max h-max px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-800 text-white" onClick={() => navigate('/Dashboard')}>Dashboard</button>
                <button className="w-max h-max px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-800 text-white cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>:<button className="w-max h-max px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-800 text-white" onClick={() => navigate('/Login')}>Login</button>  
            }
        </div>
    )
}

export default Navbar;