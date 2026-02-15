import Title from "../components/landingPageComponents/Title";
import GeneratorSection from "../components/landingPageComponents/GeneratorSection";
import Navbar from "../components/navbar/Navbar";
import McqMainPage from "./McqMainPage";
import TestGeneratorPopup from "../components/landingPageComponents/TestGeneratorPopup";
import { useContext, useEffect, useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";
import { McqTestContext } from "../contexts/McqTestContext";

const LandingPage = () => {
    const currentSection = 'LandingPage'
    const {state}=useContext(McqTestContext);

    return (
            state.mainMcqPage ? <McqMainPage/> :
            <div className="relative h-full w-full bg-gradient-to-tl from-blue-50 to to-blue-100">
                <ToastContainer/>
                <Navbar currentSection={currentSection}/>
                <div className="flex flex-col h-full w-full justify-center items-center">
                    <Title />
                    <GeneratorSection/>
                    {state.testGeneratorPopup ? <TestGeneratorPopup/> : null}
                </div>
            </div>
    )
}

export default LandingPage;