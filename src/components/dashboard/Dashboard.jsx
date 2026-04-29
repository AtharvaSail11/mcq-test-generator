import { useState, useContext, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { UserContext } from "../../contexts/UserContext";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { Loader2, X, FileQuestion } from "lucide-react";
import { calculateAnswer } from "../utils/calculationUtilities";
import McqQuestionDisplay from "../mcqPageComponents/McqQuestionDisplay";
import { McqTestContext } from "../../contexts/McqTestContext";


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
    const { state, dispatch } = useContext(McqTestContext);
    const navigate = useNavigate();
    const tagArr = ["ai/ml", "python", "cloud-computing", "network-security", "software-engineering"];
    const [filteredData, setFilteredData] = useState([]);
    const [selectedTag, setSelectedTag] = useState('All');
    const currentSection = 'Dashboard';

    const getUserData = async () => {
        setDataLoading(true)
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
            const timer = setTimeout(() => {
                setNameLoading(false);
                clearTimeout(timer);
            }, 500)
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

                    setTableData(savedTestData);
                    setFilteredData(savedTestData);
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

    const handleResultDisplay = (selectedIndex) => {
        if (selectedIndex !== null) {
            setSelectedIndex(selectedIndex);
            calculateAnswer(filteredData[selectedIndex].questionData, filteredData[selectedIndex].selectedAnswers, setCorrectAnswer, setIncorrectAnswer)
            setResultPopup(true);
        }

    }

    const handleRetest = (index) => {
        setSelectedIndex(index)
        dispatch({ type: 'startTest', payload: { questionData: filteredData[index].questionData, testDuration: filteredData[index].testDuration, testName: filteredData[index].testName } })
        setRetestPage(true);
    }

    useEffect(() => {
        if (filteredData) {
            let filtered = filteredData;
            if (selectedTag && selectedTag !== 'All') {
                filtered = tableData.filter((item) => item.tags && item?.tags.includes(selectedTag));
            }else{
                filtered=tableData;
            }
            setFilteredData(filtered);
        }
    }, [selectedTag, filteredData]);

    if (retestPage) {
        return (
            <McqQuestionDisplay retestPage={retestPage} setRetestPage={setRetestPage} />
        )
    }

    return (
        <div className="flex bg-slate-50 flex-col items-center h-screen w-full">
            <Navbar currentSection={currentSection} />
            <div className="flex mt-[20%] lg:mt-[10%] flex-col items-center gap-5 h-max w-[100%] lg:w-[80%]">
                <div className="flex justify-between w-full h-max">
                    <p className="font-semibold text-4xl">Welcome, {nameLoading ? 'Loading...' : userName}</p>
                    {/* <button className="w-max h-max px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-800 text-white">+ New Assessment</button> */}
                </div>
                <select className="w-max p-2 text-black text-sm font-medium bg-white/80 border border-slate-200 rounded-sm" id="tag" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                    <option value={''} disabled hidden>Filter by Tags</option>
                    <option value={'All'}>All</option>
                    {tagArr.map((item, index) => {
                        const arr = item.split('');
                        arr[0] = arr[0].toUpperCase();
                        let tagTitle = arr.join('');
                        return (<option value={item}>
                            {tagTitle}
                        </option>)
                    })}
                </select>
                <div className="max-h-100 self-center rounded-xl border border-slate-200 shadow-[0_4px_12px_0_rgba(0,0,0,0.04)] w-11/12 lg:w-3/4 overflow-y-auto">
                    <table className="w-full bg-white min-h-50 relative">
                        <thead>
                            <tr className="bg-slate-50 sticky top-0 text-slate-500 text-left text-[10px] md:text-base lg:text-sm">
                                <th className="py-5 mx-2 font-medium"><p className="ml-4">NAME</p></th>
                                <th className="py-5 mx-2 font-medium"><p className="ml-2">SCORE</p></th>
                                <th className="py-5 mx-2 font-medium"><p className="ml-2">ATTEMPTED AT</p></th>
                                <th className="py-5 mx-2 font-medium"><p className="ml-2">ACTION</p></th>
                            </tr>
                        </thead>
                        {!dataLoading && filteredData.length > 0 ? <tbody className="divide-y divide-slate-100">
                            {filteredData.map((item, index) => (
                                <tr className="text-[10px] text-left md:text-base lg:text-lg hover:bg-blue-50" key={`row-${index}`}>
                                    <td className="py-5 text-slate-800"><p className="ml-4">{item.testName}</p></td>
                                    <td className="py-5"><p className="text-center text-sm w-max min-w-15 font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-xl">{item.score}</p></td>
                                    <td className="py-5 text-slate-500"><p className="ml-2">{new Date(item?.submittedAt).toDateString()}</p></td>
                                    <td className="flex gap-2 items-center p-2 lg:p-0">
                                        <button className="w-max h-max px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-900 text-white text-sm font-medium cursor-pointer" onClick={() => {
                                            handleRetest(index)
                                        }}>Retest</button>
                                        <button className="w-max h-max px-2 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-blue-700 text-sm font-medium cursor-pointer" onClick={() => {
                                            handleResultDisplay(index);
                                        }}>View Results</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody> : !dataLoading ? <tr className="flex flex-col p-2 absolute w-full justify-center items-center">
                            <td><FileQuestion size={"40px"} /></td>
                            <p className="text-xl lg:text-2xl text-[#1e2e2b] font-semibold">There is nothing to display!</p>
                            <p className="text-md lg:text-lg text-[#1e2e2b]">Saved MCQ test details will be displayed here.</p>
                        </tr> : <tr className="flex flex-col absolute w-full justify-center items-center">
                            <td><Loader2 className="animate-spin" size={"30px"} /></td>
                            <p className="text-2xl">Please Wait!</p>
                        </tr>}

                    </table>
                </div>

            </div>

            {resultPopup ? (
                <div className="flex absolute h-full w-full z-10 justify-center items-center bg-black/50">
                    <div className="flex flex-col relative items-center h-full w-11/12 lg:w-1/2 p-5 bg-white">
                        <div className="flex w-full px-8 py-2 justify-between">
                            <p className="text-3xl font-semibold">Result</p>
                            <div className="flex h-[30px] w-[30px] justify-center items-center bg-slate-200 hover:bg-gray-300 cursor-pointer rounded-full" onClick={() => handleResultPopupClose()}><X size="50%" /></div>

                        </div>
                        <div className="flex flex-col items-center w-full h-full overflow-y-auto">
                            <div className="flex flex-col items-center w-1/2 h-max">
                                <p className="font-semibold text-base lg:text-2xl text-green-500">Correct:{correctAnswer || 0}</p>
                                <p className="font-semibold text-base lg:text-2xl text-red-500">Incorrect:{incorrectAnswer || 0}</p>
                            </div>

                            <div className="flex flex-col justify-center w-11/12 lg:w-1/2 h-max">
                                {filteredData[selectedIndex]?.questionData.map((questions, index) => (
                                    <div className="flex flex-col justify-center w-full mt-5">
                                        <div>
                                            <p className="font-semibold text-sm lg:text-base">{questions.question}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-col">
                                                {questions.options.map((option, index2) => (
                                                    <button className={`flex justify-start relative w-full border border-black ${(option === questions.correctAnswer && 'bg-green-500 text-white border-green-500') || (filteredData[selectedIndex].selectedAnswers[index] === index2 && 'bg-red-500 text-white border-red-500')} font-semibold rounded-xl px-4 py-1 m-0.5 cursor-pointer`} key={index2}>
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