import { useRef, useState } from "react";


const TestGeneratorPopup=({setTestGeneratorPopup,setMainMcqPage,setQuestionData})=>{
    const fileRef=useRef(null);
    const [fileName,setFileName]=useState('Upload File');
    const [testDuration,setTestDuration]=useState(null);
    const [numOfQuestions,setNumOfQuestions]=useState(null);



    const handleSelect=(e)=>{
        e.preventDefault();
        console.log('selectedDuration:',testDuration);
        setTestDuration(e.target.value);
    }

    const handleFileChange=(e)=>{
        const files=e.target.files;
        console.log("selectedFile",files[0].name);
        if(files.length > 0){
            setFileName(files[0].name);
        }else{
            setFileName('Upload File')
        }
    }

    const handleRequestSending=async()=>{
        const file=fileRef.current.files[0];

        const formData=new FormData();
        formData.append('docFile',file);
        formData.append('numberOfQuestions',2);
        formData.append('testDuration',15);
        const response=await fetch('http://localhost:3000/api/generateQuestions',{
            method:'POST',
            body:formData
        });

        const data=await response.json();
        const questionData=data?.questions?.questions
        setQuestionData(questionData)
        // setMainMcqPage(true);
    }

    return(
        <div className="flex flex-col gap-10 absolute bg-white shadow-lg max-w-2xl rounded-xl justify-center w-full p-5">
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <p className="text-2xl font-bold">Generate Your MCQs</p>
                    <div className="flex h-[30px] w-[30px] p-1.5 mb-2 justify-center items-center bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full" onClick={()=>{setTestGeneratorPopup(false)}}><p>x</p></div>
                </div>
                <p>Provide your content and set the options to create your test.</p>
            </div>
            <div className=" flex flex-col w-full border-2 border-dashed border-gray-400 rounded">
                    <div className="flex flex-col gap-0.5 justify-center items-center w-full">
                        <p className="relative mt-2 font-bold">{fileName}</p>
                        <p className="relative mt-2">{"Upload a .txt, .pdf, or .docx file"}</p>
                        <label className="relative font-semibold min-w-[84px] max-w-[480px] bg-gray-200 hover:bg-gray-300 cursor-pointer text-black rounded-xl px-4 py-2 m-2" htmlFor="file-input">Choose a file</label>
                        <input style={{display:"none"}} id="file-input" name="file-input" ref={fileRef} type="file" accept="application/pdf, .docx" onChange={handleFileChange}/> 
                    </div>

            </div>
            <div className="flex w-full gap-4">
                    <div className="flex flex-col w-1/2 justify-between">
                        <label htmlFor="required-time">Test Duration</label>
                        <select className="border border-gray-300 rounded-md" id="required-time" onChange={handleSelect}>
                            <option value="">Select</option>
                            <option value="15" >15 min</option>
                            <option value="30" >30 min</option>
                            <option value="60" >1 hour </option>
                        </select>
                    </div>
                    <div className="flex flex-col w-1/2 justify-between">
                        <label htmlFor="questions-num">Number of questions:</label>
                        <input className="border border-gray-300 rounded-md" placeholder="eg:5" type="number" name="questions-num" id="questions-num" />
                    </div>
            </div>
            <button className="relative w-full bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl px-1.5 py-2 m-2" onClick={handleRequestSending}>Generate Test</button>
        </div>
    )
}

export default TestGeneratorPopup;