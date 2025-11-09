import { useEffect, useState } from "react";
import { mcqQuestions } from "./dummyData/McqQuestions";
import { Clock } from "lucide-react";

const ResultDisplay=({correctAnswer,incorrectAnswer,selectedAnswer})=>{

    return(
        <div className="flex flex-col items-center w-full p-5">
            <div className="flex flex-col items-center w-1/2 h-max">
            <p className="font-semibold text-2xl text-green-500">Correct:{correctAnswer}</p>
            <p className="font-semibold text-2xl text-red-500">Incorrect:{incorrectAnswer}</p>
             </div>

             <div className="flex flex-col justify-center w-1/2 h-max">
            {mcqQuestions.map((questionData,index)=>(
                <div className="flex flex-col justify-center w-full mt-5">
                <div>
                <p className="font-semibold">{questionData.question}</p>
                </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    {questionData.options.map((option,index2)=>(
                    <button className={`flex justify-start relative w-full border border-black ${(option === questionData.correctAnswer && 'bg-green-500 text-white border-green-500')||(selectedAnswer[index] === index2 && 'bg-red-500 text-white border-red-500')} font-semibold rounded-xl px-4 py-1 m-0.5 cursor-pointer`} key={index2}>
                        <p>{option}</p>
                    </button>
                    ))}
                </div>
            </div>
            </div>
            ))}
            </div>
        </div>
    )
}

export default ResultDisplay