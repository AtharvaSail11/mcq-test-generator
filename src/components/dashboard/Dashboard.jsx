import { useState, useContext, useEffect } from "react";
import { auth,db } from "../../config/firebase";
import { UserContext } from "../../contexts/UserContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const currentUser = useContext(UserContext);
    const [userName, setUserName] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);
    const navigate=useNavigate();

    const getUserData = async () => {
        try {
            if (currentUser) {
                const collectionRef = collection(db, 'userData');
                const userDocRef = doc(collectionRef, currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists) {
                    const fullName = userDoc.data().fullName
                    setUserName(fullName);
                }
            }
        } catch (error) {
            console.log('error while fetching user data:', error.message);
        } finally {
            setDataLoading(false);
        }

    }

    const handleLogout=async()=>{
        await auth.signOut();
        navigate('/')
    }

    useEffect(() => {
        if(currentUser){
            getUserData()
        }
    }, [currentUser])
    return (
        <div>
            <p>Welcome {dataLoading ? 'Loading...' : userName}</p>
            <button className="border-2 border-black cursor-pointer" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard