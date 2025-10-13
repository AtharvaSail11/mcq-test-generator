import { useEffect, useState } from "react";
import { mcqQuestions } from "./dummyData/McqQuestions";

const ResultDisplay=({correctAnswer,incorrectAnswer,selectedAnswer})=>{

    return(
        <div className="flex flex-col justify-center w-full p-5">
            <p>Correct:{correctAnswer}</p>
            <p>Incorrect:{incorrectAnswer}</p>
            {mcqQuestions.map((questionData,index)=>(
                <div className="flex flex-col justify-center w-full mt-5">
                <div>
                <p className="font-semibold">{questionData.question}</p>
                </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    {questionData.options.map((option,index2)=>(
                    <button className={`relative w-max border border-black ${(option === questionData.correctAnswer && 'bg-green-500 text-white border-green-500')||(selectedAnswer[index] === index2 && 'bg-red-500 text-white border-red-500')} font-semibold rounded-xl px-4 py-1 m-0.5 cursor-pointer`} key={index2}>
                        <p>{option}</p>
                    </button>
                    ))}
                </div>
            </div>
            </div>
            ))}
            
        </div>
    )
}

export default ResultDisplay