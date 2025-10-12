import { useState } from "react";


const GeneratorSection=()=>{
    const [file,setFile]=useState(null);

    const handleFileChange=(e)=>{
        e.preventDefault();
        const selectedFile=e.target.files[0];
        if(selectedFile){
            setFile(selectedFile.name);
        }
    }

    return(
        <div className="flex justify-center w-full mt-2">
            <div className=" flex flex-col items-center w-max">
                    <p className="w-max mb-2">Upload a PDF or .docx file to Generate Test</p>
                    <label className="relative w-max bg-blue-500 text-white rounded-xl px-1.5 py-2 m-2 cursor-pointer" htmlFor="file-input">Choose a file</label>
                    <p className="relative mt-2">{file?file:"No file selected!"}</p>
                    <input style={{display:"none"}} id="file-input" type="file" accept="application/pdf, .docx" onChange={handleFileChange}/> 
            </div>
        </div>
    )
}

export default GeneratorSection;