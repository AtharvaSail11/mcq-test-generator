import { useState, useContext, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { UserContext } from "../../contexts/UserContext";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { LoaderIcon } from "lucide-react";


const Dashboard = () => {
    const currentUser = useContext(UserContext);
    const [userName, setUserName] = useState(null);
    const [nameLoading, setNameLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();
    const currentSection = 'Dashboard';

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
            setNameLoading(false);
        }

    }

    const getSavedTestData = async () => {
        try {
            if (currentUser) {
                const mcqTestCollectionRef = collection(db, 'mcqTestData');
                const mcqTestQuery = query(mcqTestCollectionRef, where('userId', '==', currentUser.uid));
                const savedTestSnapshot = await getDocs(mcqTestQuery);
                if (!savedTestSnapshot.empty) {
                    const savedTestData = savedTestSnapshot.docs.map((item) => {
                        return item.data()
                    });
                    console.log('savedTestData:', savedTestData)

                    setTableData(savedTestData);
                }
            }
        } catch (error) {
            console.log('error while getting saved test data:', error.message)
        } finally {
            setDataLoading(false);
        }
    }



    useEffect(() => {
        if (currentUser) {
            getUserData();
            getSavedTestData();
        }
    }, [currentUser])
    return (
        <div className="flex bg-gray-100 flex-col h-screen w-full">
            <Navbar currentSection={currentSection} />
            <div className="flex flex-col gap-5 h-full px-60 w-full">
                <div className="flex justify-between w-full h-max">
                    <p className="font-medium text-2xl">Welcome, {nameLoading ? 'Loading...' : userName}</p>
                    <button className="w-max h-max px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-800 text-white">+ New Assessment</button>
                </div>
                <table className="relative">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>Name</th>
                            <th>Score</th>
                            <th>Attempted At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {dataLoading ? <div className="flex absolute w-full justify-center"><LoaderIcon /></div> : <tbody>
                        {tableData.map((item, index) => (
                            <tr className="text-center border-b border-b-gray-300" key={`row-${index}`}>
                                <td>{item.testName}</td>
                                <td>{item.score}</td>
                                <td>{new Date(item?.submittedAt).toDateString()}</td>
                                <td>
                                    <button className="w-max h-max px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-800 text-white">View Results</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>}



                </table>

            </div>
        </div>
    )
}

export default Dashboard