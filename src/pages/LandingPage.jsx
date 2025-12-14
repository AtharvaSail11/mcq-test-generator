import Title from "../components/landingPageComponents/Title";
import GeneratorSection from "../components/landingPageComponents/GeneratorSection";
import Navbar from "../components/navbar/Navbar";
import McqMainPage from "./McqMainPage";
import { useState } from "react";

const LandingPage=()=>{
    const [mainMcqPage,setMainMcqPage]=useState(false);
    const [questionData,setQuestionData]=useState([]);

    return(
        mainMcqPage?<McqMainPage questionData={questionData}/>:
        <div className="h-full w-full">
            <Navbar/>
            <Title/>
            <GeneratorSection setMainMcqPage={setMainMcqPage} setQuestionData={setQuestionData}/>
        </div>
    )
}

export default LandingPage;