import { useEffect, useState } from "react";
import { mcqQuestions } from "./dummyData/McqQuestions";
import ResultDisplay from "./ResultDisplay";

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
        <div className="flex flex-col justify-center w-full p-5">
            <div className="flex flex-col">
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
                    <button className="relative w-max bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl px-4 py-1 m-0.5 cursor-pointer" onClick={()=>{handlePrev()}}>Prev</button>
                    {question === (mcqQuestions.length -1)?<button className="relative w-max bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl px-4 py-1 m-0.5 cursor-pointer" onClick={()=>{handleSubmit()}}>Submit</button>:<button className="relative w-max bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl px-4 py-1 m-0.5 cursor-pointer" onClick={()=>{handleNext()}}>Next</button>}
                </div>
            </div>
        </div>
    )
}

export default McqQuestionDisplay;