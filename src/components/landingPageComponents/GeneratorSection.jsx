import { useState } from "react";
import TestGeneratorPopup from "./TestGeneratorPopup";


const GeneratorSection=({setMainMcqPage,setQuestionData})=>{
    const [testGeneratorPopup,setTestGeneratorPopup]=useState(false);

    return(
        <div className="flex justify-center w-full mt-2">
            <div className=" flex flex-col items-center w-max">
                    <p className="w-max mb-2 font-bold">Start Generating Mcq Tests!</p>
                    <button className="relative w-max bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl px-4 py-2.5 m-2 cursor-pointer" onClick={()=>{setTestGeneratorPopup(true)}}>Click here to Generate Test</button>
            </div>
            {testGeneratorPopup?<TestGeneratorPopup setTestGeneratorPopup={setTestGeneratorPopup} setMainMcqPage={setMainMcqPage} setQuestionData={setQuestionData}/>:null}
        </div>
    )
}

export default GeneratorSection;