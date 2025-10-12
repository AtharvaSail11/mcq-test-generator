import Title from "../components/landingPageComponents/Title";
import GeneratorSection from "../components/landingPageComponents/GeneratorSection";
import Navbar from "../components/navbar/Navbar";

const LandingPage=()=>{
    return(
        <div className="h-full w-full">
            <Navbar/>
            <Title/>
            <GeneratorSection/>
        </div>
    )
}

export default LandingPage;