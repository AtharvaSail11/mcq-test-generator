import { useCallback, useEffect, useState,useContext } from "react";
import ResultDisplay from "./ResultDisplay";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import ProgressBar from "./components/ProgressBar";
import TestTimer from "./components/TestTimer";
import { calculateAnswer } from "../utils/calculationUtilities";
import { McqTestContext } from "../../contexts/McqTestContext";


const McqQuestionDisplay = ({retestPage,setRetestPage }) => {
    const {state}=useContext(McqTestContext);
    const [question, setQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [currentQuestionData, setCurrentQuestionData] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [loading, setLoading] = useState(true);
    const [incorrectAnswer, setIncorrectAnswer] = useState(0);
    const [mcqQuestions, setMcqQuestions] = useState([]);



    useEffect(() => {
        if (state.questionData) {
            setMcqQuestions(state.questionData)
        }
    }, [state.questionData]);



    const handleOptionSelection = (index) => {
        setSelectedAnswer((prev) => {
            let updatedAnswers = [...prev];
            updatedAnswers[question] = index;
            return updatedAnswers;
        });
    }

    const handlePrev = () => {
        if (question > 0) {
            setQuestion((prev) => prev - 1);
        }
    }

    const handleNext = () => {
        if (question < mcqQuestions.length - 1) {
            setQuestion((prev) => prev + 1);
        }
    }


    const handleSubmit = () => {
        calculateAnswer(mcqQuestions,selectedAnswer,setCorrectAnswer,setIncorrectAnswer);
        setSubmitted(true)
    };

    useEffect(() => {
        if (mcqQuestions) {
            setCurrentQuestionData(mcqQuestions[question]);
        }
    }, [question]);

    useEffect(() => {
        if (mcqQuestions) {
            setCurrentQuestionData(mcqQuestions[question]);
            setLoading(false);
        }
    }, [mcqQuestions])


    if (loading) {
        return (<p>Loading...</p>)
    }

    if (submitted) {
        return (
            <ResultDisplay selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} incorrectAnswer={incorrectAnswer} retestPage={retestPage} setRetestPage={setRetestPage}/>
        )
    }

    return (
        <div className="flex justify-center items-center h-full w-full p-5">
            <div className="flex flex-col gap-5 lg:gap-10 justify-center items-center h-[98%] w-11/12 md:w-[60%]">

                <TestTimer Time={Number(state.testDuration) * 60 * 1000} handleSubmit={handleSubmit} />

                <ProgressBar attemptedQuestions={selectedAnswer.length} totalQuestions={mcqQuestions.length} question={question} />

                <div className="flex flex-col p-5 lg:p-10 h-110 md:h-max overflow-y-auto items-center w-full bg-white border-2 border-gray-400 rounded-lg">
                    <p className="text-base lg:text-2xl font-semibold mb-5">{currentQuestionData?.question}</p>
                    <div className="flex flex-col gap-5 w-full">
                        {currentQuestionData?.options?.map((option, index) => index < 4 && (
                            <div className={`flex gap-2 px-2.5 py-2 lg:px-5 lg:py-4 w-full h-max border-2 border-black cursor-pointer ${(selectedAnswer[question] === index && "border-blue-700")} hover:border-blue-700 rounded-2xl`} key={index} onClick={() => { handleOptionSelection(index) }}>
                                <div className={`flex justify-center items-center h-7 w-7 invisible lg:visible rounded-full border-2 ${(selectedAnswer[question] === index && "bg-blue-700 border-blue-700")} border-black hover:border-blue-700`}>
                                    <div className="bg-white rounded-full h-[50%] w-[50%]"></div>
                                </div>
                                <p className="text-xs lg:text-xl">{option}</p>
                            </div>
                        ))}

                    </div>

                </div>

                <div className="flex w-full justify-between">
                    <button className="flex justify-center items-center gap-4 relative w-max h-max text-sm lg:text-base bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl p-4 m-0.5 cursor-pointer" onClick={() => { handlePrev() }}>
                        <ChevronLeft />
                        Previous
                    </button>



                    <button className="flex justify-center items-center gap-4 relative w-max h-max text-sm lg:text-base bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl p-4 m-0.5 cursor-pointer" onClick={question === (mcqQuestions.length - 1) ? () => { handleSubmit() } : () => { handleNext() }}>
                        {question === (mcqQuestions.length - 1) ? "Submit" : "Next"}
                        <ChevronRight />
                    </button>


                </div>

            </div>

        </div>
    )
}

export default McqQuestionDisplay;