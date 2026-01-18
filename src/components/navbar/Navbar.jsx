import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Navbar=()=>{
    const currentUser = useContext(UserContext);
    const navigate=useNavigate()
    return(
        <div className="flex items-center justify-between h-[10%] w-full px-4">
            <p>McqGenerator</p>
            {currentUser?<button className="w-max h-max px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-800 text-white" onClick={()=>navigate('/Dashboard')}>Dashboard</button>:
            <button className="w-max h-max px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-800 text-white" onClick={()=>navigate('/Login')}>Login</button>}
        </div>
    )
}

export default Navbar;