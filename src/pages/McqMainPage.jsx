import McqQuestionDisplay from "../components/mcqPageComponents/McqQuestionDisplay";
const McqMainPage=({questionData,testDuration,testName})=>{
    return(
        <div className="min-h-full h-max w-full bg-blue-50">
            <McqQuestionDisplay questionData={questionData} testDuration={testDuration} testName={testName}/>
        </div>
    )
}

export default McqMainPage;