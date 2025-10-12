import { useState } from "react";


const TestGeneratorPopup=()=>{
    const [file,setFile]=useState(null);

    const handleFileChange=(e)=>{
        e.preventDefault();
        const selectedFile=e.target.files[0];
        if(selectedFile){
            setFile(selectedFile.name);
        }
    }

    return(
        <div className="flex flex-col absolute bg-white shadow-lg justify-center w-max p-5">
            <div className=" flex flex-col w-max">
                    <p className="font-bold">Upload Pdf or .docx files</p>
                    <div className="flex w-[400px]">
                        <label className="relative w-max bg-blue-500 hover:bg-blue-700 text-white rounded-xl px-1.5 py-2 m-2" htmlFor="file-input">Choose a file</label>
                        <p className="relative mt-2">{file?file:"No file selected!"}</p>
                        <input style={{display:"none"}} id="file-input" type="file" accept="application/pdf, .docx" onChange={handleFileChange}/> 
                    </div>

            </div>
            <div className="flex flex-col w-max">
                    <p className="font-bold">Test Details</p>
                    <div className="flex w-[150px] justify-between">
                        <label htmlFor="required-time">Time:</label>
                        <select id="required-time">
                            <option value="">Default</option>
                            <option value="15" >15 min</option>
                            <option value="30" >30 min</option>
                            <option value="60" >1 hour </option>
                        </select>
                    </div>
                    <div className="flex w-[400px] justify-between">
                        <label htmlFor="questions-num">Number of questions:</label>
                        <input className="border" type="number" name="questions-num" id="questions-num" />
                    </div>
                    <button className="relative w-max bg-blue-500 hover:bg-blue-700 text-white rounded-xl px-1.5 py-2 m-2">Generate Test</button>
            </div>
        </div>
    )
}

export default TestGeneratorPopup;