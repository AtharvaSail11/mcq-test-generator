import Title from "../components/landingPageComponents/Title";
import GeneratorSection from "../components/landingPageComponents/GeneratorSection";
import Navbar from "../components/navbar/Navbar";
import McqMainPage from "./McqMainPage";
import { useState } from "react";

const LandingPage=()=>{
    const [mainMcqPage,setMainMcqPage]=useState(false);
    const [questionData,setQuestionData]=useState([]);
    const [testDuration, setTestDuration] = useState(null);
    const [testName, setTestName] = useState(null);
    const currentSection='LandingPage'



    return(
        mainMcqPage?<McqMainPage questionData={questionData} testDuration={testDuration} testName={testName}/>:
        <div className="h-full w-full">
            <Navbar currentSection={currentSection}/>
            <Title/>
            <GeneratorSection setMainMcqPage={setMainMcqPage} setQuestionData={setQuestionData} setTestDuration={setTestDuration} setTestName={setTestName}/>
        </div>
    )
}

export default LandingPage;