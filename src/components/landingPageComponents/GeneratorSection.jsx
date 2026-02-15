import { useState,useContext } from "react";
import TestGeneratorPopup from "./TestGeneratorPopup";
import { ArrowRight } from "lucide-react";
import { McqTestContext } from "../../contexts/McqTestContext";


const GeneratorSection=()=>{
   const {dispatch}=useContext(McqTestContext)
    return(
        <div className="flex relative justify-center w-full mt-2">
            <div className=" flex flex-col items-center w-max">
                    <p className="w-max mb-2 text-sm md:text-lg font-bold text-gray-600">START GENERATING MCQ TESTS!</p>
                    <button className="flex gap-2 shadow-[0px_0px_5px_0px_#4a5565] items-center relative w-max bg-blue-500 text-sm hover:bg-blue-700 font-semibold text-white rounded-xl px-5 py-4 md:px-10 md:py-4 m-2 cursor-pointer" onClick={()=>{dispatch({type:'handlePopup',payload:{isOpen:true}})}}>Click here to Generate Test <ArrowRight size={'22px'}/></button>
            </div>
        </div>
    )
}

export default GeneratorSection;