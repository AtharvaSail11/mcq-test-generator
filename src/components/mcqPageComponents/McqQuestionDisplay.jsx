import { useEffect, useState } from "react";
import { mcqQuestions } from "./dummyData/McqQuestions";
import ResultDisplay from "./ResultDisplay";
import { Clock,ChevronLeft,ChevronRight } from "lucide-react";

const McqQuestionDisplay=()=>{
    const [question,setQuestion]=useState(0);
    const [selectedAnswer,setSelectedAnswer]=useState([]);
    const [currentQuestionData,setCurrentQuestionData]=useState(mcqQuestions[question]);
    const [submitted,setSubmitted]=useState(false);
    const [correctAnswer,setCorrectAnswer]=useState(0);
    const [incorrectAnswer,setIncorrectAnswer]=useState(0);

        const calculateAnswer = () =>{
        mcqQuestions.forEach((item,index)=>{
            console.log("currentAnswer:",item.options[selectedAnswer[index]])
            if(item.options[selectedAnswer[index]]===item.correctAnswer){
                setCorrectAnswer(prev=>prev+1);
            }else{
                setIncorrectAnswer(prev=>prev+1);
            }
        })
    }

    const handleOptionSelection = (index) =>{
        setSelectedAnswer((prev)=>{
            let updatedAnswers=[...prev];
            updatedAnswers[question]=index;
            return updatedAnswers;
        });
    }

    const handlePrev=()=>{
        if(question > 0){
            setQuestion((prev)=>prev-1);
        }  
    }

    const handleNext=()=>{
        if(question < mcqQuestions.length -1){
            setQuestion((prev)=>prev+1);
        }
    }

    const handleSubmit=()=>{
        console.log('handleSubmit was clicked!');
        calculateAnswer();
        setSubmitted(true)
    }

    useEffect(()=>{
        console.log("question:",question);
        setCurrentQuestionData(mcqQuestions[question]);
    },[question])

    if(submitted){
        return(
            <ResultDisplay selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} incorrectAnswer={incorrectAnswer} />
        )
    }

    return(
        <div className="flex justify-center items-center h-full w-full p-5">
            <div className="flex flex-col gap-10 justify-center items-center h-[98%] w-[60%]">
                <div className="flex justify-center items-center h-[20%] w-[30%] rounded-lg border shadow-sm text-card-foreground">
                    <Clock/>
                    <div className="flex flex-col mx-2 gap-1">
                        <p>Time Remaining</p>
                        <p className="text-3xl font-semibold">2:00</p>
                    </div>

                </div>

                <div className="flex flex-col p-10 items-center w-full bg-white border-2 border-gray-400 rounded-lg">
                    <p className="text-2xl font-semibold mb-5">{currentQuestionData?.question}</p>
                    <div className="flex flex-col gap-5 w-full">
                        {currentQuestionData.options.map((option,index)=>(
                        <div className={`flex gap-2 px-5 py-4 w-full h-max border-2 border-black cursor-pointer ${(selectedAnswer[question] === index && "border-blue-700")} hover:border-blue-700 rounded-2xl`} key={index} onClick={()=>{handleOptionSelection(index)}}>
                            <div className={`flex justify-center items-center h-7 w-7 rounded-full border-2 ${(selectedAnswer[question] === index && "bg-blue-700 border-blue-700")} border-black hover:border-blue-700`}>
                                <div className="bg-white rounded-full h-[50%] w-[50%]"></div>
                            </div>
                            <p className="text-xl">{option}</p>
                        </div>
                    ))}
                        
                    </div>

                </div>

                <div className="flex w-full justify-between">
                    <button className="flex justify-center gap-4 relative min-w-40 bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl p-4 m-0.5 cursor-pointer" onClick={()=>{handlePrev()}}>
                        <ChevronLeft/>
                        Previous
                    </button>

                    

                    <button className="flex justify-center gap-4 relative min-w-40 bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl p-4 m-0.5 cursor-pointer" onClick={question === (mcqQuestions.length -1)?()=>{handleSubmit()}:()=>{handleNext()}}>
                        {question === (mcqQuestions.length -1)?"Submit":"Next"}
                        <ChevronRight/>
                    </button>

                    {/* {question === (mcqQuestions.length -1)?<button className="relative w-max bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl px-4 py-1 m-0.5 cursor-pointer" onClick={()=>{handleSubmit()}}>Submit</button>:<button className="relative w-max bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl px-4 py-1 m-0.5 cursor-pointer" onClick={()=>{handleNext()}}>Next</button>} */}

                </div>
                
            </div>
            
            {/* <div className="flex flex-col">
                <p>Time Remaining:</p>
                <p>Question:{question+1}/{mcqQuestions.length}</p>
            </div>
            <div>
                <p className="font-semibold">{currentQuestionData?.question}</p>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    {currentQuestionData.options.map((option,index)=>(
                    <button className={`relative w-max border border-black ${(selectedAnswer[question] === index && 'bg-blue-800 text-white border-blue-800')} font-semibold rounded-xl px-4 py-1 m-0.5 cursor-pointer`} key={index} onClick={()=>{handleOptionSelection(index)}}>
                        <p>{option}</p>
                    </button>
                    ))}
                </div>
                <div className="flex">
                    <button className="" onClick={()=>{handlePrev()}}>Prev</button>
                    {question === (mcqQuestions.length -1)?<button className="relative w-max bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl px-4 py-1 m-0.5 cursor-pointer" onClick={()=>{handleSubmit()}}>Submit</button>:<button className="relative w-max bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl px-4 py-1 m-0.5 cursor-pointer" onClick={()=>{handleNext()}}>Next</button>}
                </div>
            </div> */}
        </div>
    )
}

export default McqQuestionDisplay;