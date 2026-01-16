import McqQuestionDisplay from "../components/mcqPageComponents/McqQuestionDisplay";
const McqMainPage=({questionData})=>{
    return(
        <div className="min-h-full h-max w-full bg-blue-50">
            <McqQuestionDisplay questionData={questionData}/>
        </div>
    )
}

export default McqMainPage;