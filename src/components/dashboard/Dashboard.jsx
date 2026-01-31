import { useState, useContext, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { UserContext } from "../../contexts/UserContext";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { Loader2, X } from "lucide-react";
import { calculateAnswer } from "../utils/calculationUtilities";
import McqQuestionDisplay from "../mcqPageComponents/McqQuestionDisplay";


const Dashboard = () => {
    const currentUser = useContext(UserContext);
    const [userName, setUserName] = useState(null);
    const [nameLoading, setNameLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);
    const [resultPopup, setResultPopup] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [incorrectAnswer, setIncorrectAnswer] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [retestPage, setRetestPage] = useState(false);
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
    }, [currentUser]);

    const handleResultPopupClose = () => {
        setSelectedIndex(null);
        setResultPopup(false);
        setCorrectAnswer(null);
        setIncorrectAnswer(null);
    }

    // useEffect(() => {
    //     if (selectedIndex !== null) {
    //         console.log('selectedIndex:', selectedIndex);
    //         console.log('selectedAnswers[0]:', tableData[selectedIndex]?.selectedAnswers[0]);
    //         console.log('question:', tableData[selectedIndex].questionData[0].question);
    //         tableData[selectedIndex].questionData.forEach((questions, index) => {
    //             console.log('Answers:', questions.options[tableData[selectedIndex].selectedAnswers[index]]);
    //             console.log('selectedAnswers:', tableData[selectedIndex].selectedAnswers[index]);
    //         })
    //     }

    // }, [selectedIndex]);

    const handleResultDisplay = (selectedIndex) => {
        if (selectedIndex !== null) {
            setSelectedIndex(selectedIndex);
            calculateAnswer(tableData[selectedIndex].questionData, tableData[selectedIndex].selectedAnswers, setCorrectAnswer, setIncorrectAnswer)
            setResultPopup(true);
        }

    }

    const handleRetest = (index) => {
        setSelectedIndex(index)
        setRetestPage(true);
    }

    if (retestPage) {
        return (
            <McqQuestionDisplay questionData={tableData[selectedIndex].questionData} testDuration={tableData[selectedIndex].testDuration} testName={tableData[selectedIndex].testName} retestPage={retestPage} setRetestPage={setRetestPage} />
        )
    }

    return (
        <div className="flex bg-gray-100 flex-col items-center h-screen w-full">
            <Navbar currentSection={currentSection} />
            <div className="flex mt-[20%] lg:mt-[10%] flex-col items-center gap-5 h-full w-[95%] lg:w-[80%]">
                <div className="flex justify-between w-full h-max">
                    <p className="font-medium text-2xl">Welcome, {nameLoading ? 'Loading...' : userName}</p>
                    {/* <button className="w-max h-max px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-800 text-white">+ New Assessment</button> */}
                </div>
                <table className="w-full relative shadow-[0px_0px_5px_0px_#d1d5dc] overflow-y-scroll">
                    <thead>
                        <tr className="bg-gray-200 text-[10px] md:text-base lg:text-lg">
                            <th className="py-5 mx-2">Name</th>
                            <th className="py-5 mx-2">Score</th>
                            <th className="py-5 mx-2">Attempted At</th>
                            <th className="py-5 mx-2">Action</th>
                        </tr>
                    </thead>
                    {dataLoading ? <tr className="flex absolute w-full justify-center">
                        <td><Loader2 className="animate-spin" /></td>
                    </tr> : <tbody>
                        {tableData.map((item, index) => (
                            <tr className="text-center text-[10px] md:text-base lg:text-lg border-b border-b-gray-300" key={`row-${index}`}>
                                <td className="py-5">{item.testName}</td>
                                <td className="py-5">{item.score}</td>
                                <td className="py-5">{new Date(item?.submittedAt).toDateString()}</td>
                                <td className="flex flex-col gap-2 items-center p-2 lg:p-0">
                                    <button className="w-max h-max px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-800 text-white" onClick={() => {
                                        handleRetest(index)
                                    }}>Retest</button>
                                    <button className="w-max h-max px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-800 text-white" onClick={() => {
                                        console.log('the index is:',index);
                                        handleResultDisplay(index);
                                    }}>View Results</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>}

                </table>

            </div>

            {resultPopup ? (
                <div className="flex absolute h-full w-full z-10 justify-center items-center bg-black/50">
                    <div className="flex flex-col relative items-center h-full w-11/12 lg:w-1/2 p-5 bg-white">
                        <div className="flex w-full px-8 py-2 justify-between">
                            <p className="text-3xl font-semibold">Result</p>
                            <div className="flex h-[30px] w-[30px] justify-center items-center bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full" onClick={() => handleResultPopupClose()}><X size="80%" /></div>

                        </div>
                        <div className="flex flex-col items-center w-full h-full overflow-y-auto">
                            <div className="flex flex-col items-center w-1/2 h-max">
                                <p className="font-semibold text-base lg:text-2xl text-green-500">Correct:{correctAnswer || 0}</p>
                                <p className="font-semibold text-base lg:text-2xl text-red-500">Incorrect:{incorrectAnswer || 0}</p>
                            </div>

                            <div className="flex flex-col justify-center w-11/12 lg:w-1/2 h-max">
                                {tableData[selectedIndex]?.questionData.map((questions, index) => (
                                    <div className="flex flex-col justify-center w-full mt-5">
                                        <div>
                                            <p className="font-semibold text-sm lg:text-base">{questions.question}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-col">
                                                {questions.options.map((option, index2) => (
                                                    <button className={`flex justify-start relative w-full border border-black ${(option === questions.correctAnswer && 'bg-green-500 text-white border-green-500') || (tableData[selectedIndex].selectedAnswers[index] === index2 && 'bg-red-500 text-white border-red-500')} font-semibold rounded-xl px-4 py-1 m-0.5 cursor-pointer`} key={index2}>
                                                        <p className="text-sm lg:text-base">{option}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>) : null}
        </div>
    )
}

export default Dashboard