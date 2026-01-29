import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ResultDisplay = ({ correctAnswer, incorrectAnswer, selectedAnswer, mcqQuestions, testName, testDuration }) => {
    const navigate = useNavigate()
    const storeMcqTestData = async () => {
        try {
            const collectionRef = collection(db, 'mcqTestData');
            const data = {
                questionData: mcqQuestions,
                selectedAnswers: selectedAnswer,
                testName: testName,
                testDuration: testDuration,
                testId: nanoid(12),
                score: `${correctAnswer}/${correctAnswer + incorrectAnswer}`,
                submittedAt: new Date().toISOString(),
                userId: auth.currentUser.uid
            }
            await addDoc(collectionRef, data);
            toast.success('Saved the Test Results Successfully');
        } catch (error) {
            toast.error('Error while Saving Test Results');
            console.log('error:', error.message);
        }

    };

    return (
        <div className="flex flex-col items-center w-full p-5">
            <ToastContainer />
            <div className="flex flex-col items-center w-1/2 h-max">
                <p className="font-semibold text-2xl text-green-500">Correct:{correctAnswer}</p>
                <p className="font-semibold text-2xl text-red-500">Incorrect:{incorrectAnswer}</p>
            </div>

            <div className="flex flex-col justify-center w-1/2 h-max">
                {mcqQuestions.map((questionData, index) => (
                    <div className="flex flex-col justify-center w-full mt-5">
                        <div>
                            <p className="font-semibold">{questionData.question}</p>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col">
                                {questionData.options.map((option, index2) => (
                                    <button className={`flex justify-start relative w-full border border-black ${(option === questionData.correctAnswer && 'bg-green-500 text-white border-green-500') || (selectedAnswer[index] === index2 && 'bg-red-500 text-white border-red-500')} font-semibold rounded-xl px-4 py-1 m-0.5 cursor-pointer`} key={index2}>
                                        <p>{option}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>



            <div className="flex flex-col items-center">
                {auth?.currentUser?.uid && (
                    <button className='flex justify-start relative w-max border bg-blue-500 text-white border-blue-500 font-semibold rounded-xl px-4 py-1 m-0.5 cursor-pointer' onClick={storeMcqTestData}>
                        <p>Save</p>
                    </button>
                )}
                <button className='flex justify-start relative w-max border bg-blue-500 text-white border-blue-500 font-semibold rounded-xl px-4 py-1 m-0.5 cursor-pointer' onClick={() => navigate('/Dashboard')}>
                    <p>Dashboard</p>
                </button>
            </div>



        </div>
    )
}

export default ResultDisplay