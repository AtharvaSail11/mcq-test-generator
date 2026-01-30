const ProgressBar=({attemptedQuestions,totalQuestions,question})=>{
    return(
        <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between">
                        <p className="text-sm">Question {question+1} of {totalQuestions}</p>
                        <p className="text-sm">{(attemptedQuestions/totalQuestions)*100}% Complete</p>
                    </div>

                    <div className="w-full h-max rounded bg-blue-300">
                        <div className={`h-2.5 bg-blue-700 rounded`} style={{width:`${(attemptedQuestions/totalQuestions)*100}%`}}></div>
                    </div>

                </div>
    )
}

export default ProgressBar;