import Title from "../components/landingPageComponents/Title";
import GeneratorSection from "../components/landingPageComponents/GeneratorSection";
import Navbar from "../components/navbar/Navbar";
import McqMainPage from "./McqMainPage";
import TestGeneratorPopup from "../components/landingPageComponents/TestGeneratorPopup";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const LandingPage = () => {
    const [mainMcqPage, setMainMcqPage] = useState(false);
    const [questionData, setQuestionData] = useState([]);
    const [testDuration, setTestDuration] = useState(null);
    const [testName, setTestName] = useState(null);
    const [testGeneratorPopup,setTestGeneratorPopup]=useState(false);
    const currentSection = 'LandingPage'



    return (
        mainMcqPage ? <McqMainPage questionData={questionData} testDuration={testDuration} testName={testName} /> :
            <div className="relative h-full w-full bg-gradient-to-tl from-blue-50 to to-blue-100">
                <ToastContainer/>
                <Navbar currentSection={currentSection} />
                <div className="flex flex-col h-full border-2 border-black w-full justify-center items-center">
                    <Title />
                    <GeneratorSection setTestGeneratorPopup={setTestGeneratorPopup} />
                    {testGeneratorPopup?<TestGeneratorPopup setTestGeneratorPopup={setTestGeneratorPopup} testDuration={testDuration} setTestDuration={setTestDuration} setTestName={setTestName} testName={testName} setMainMcqPage={setMainMcqPage} setQuestionData={setQuestionData}/>:null}
                </div>
            </div>
    )
}

export default LandingPage;