import { useRef, useState } from "react";
import { jsonrepair } from "jsonrepair";
import { Loader2 } from "lucide-react";


const TestGeneratorPopup = ({ setTestGeneratorPopup, setMainMcqPage, setQuestionData, setTestDuration, setTestName }) => {
    const fileRef = useRef(null);
    const [fileName, setFileName] = useState('Upload File');
    const [numOfQuestions, setNumOfQuestions] = useState(null);
    const [testGenerationType, setTestGenerationType] = useState('JSON');
    const [jsonData, setJsonData] = useState(null);
    const [testLoading, setTestLoading] = useState(false);



    const handleSelect = (e) => {
        e.preventDefault();
        setTestDuration(e.target.value);
    }

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setFileName(files[0].name);
        } else {
            setFileName('Upload File')
        }
    }

    const handleJsonInputChange = (e) => {
        const text = e.target.value;
        setJsonData(text);
    }

    const repairJsonData = (data) => {
        try {
            const jsonData = JSON.parse(data)
            return jsonData;
        } catch (error) {
            console.log(`An error occured! Repairing JSON...`);
            try {
                const repaired = jsonrepair(data);
                console.log('JSON Repaired Successfully!');
                return JSON.parse(repaired);
            } catch (error2) {
                console.log('JSON Data is beyond repair! Ask your LLM Chatbot to Fix it.');
            }

        }
    }

    const handleRequestSending = async () => {
        setTestLoading(true);
        try {
            const file = fileRef.current.files[0];

            const formData = new FormData();
            formData.append('docFile', file);
            formData.append('numberOfQuestions', numOfQuestions);
            formData.append('testDuration', 15);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generateQuestions`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log('data:', data.questions);
            const questionData = data?.questions
            setQuestionData(repairJsonData(JSON.stringify(questionData)));
            setMainMcqPage(true);
        } catch (error) {
            console.log('error while generationg test:', error.message);
        } finally {
            setTestLoading(false)
        }

    }

    const handleJsonTestGeneration = async () => {
        setQuestionData(repairJsonData(jsonData));
        setMainMcqPage(true);
    }

    return (
        <div className="flex absolute h-full w-full z-10 justify-center items-center bg-black/50">
            <div className="flex flex-col gap-10 bg-white shadow-lg max-w-2xl rounded-xl justify-center w-full p-5">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <p className="text-2xl font-bold">Generate Your MCQs</p>
                        <div className="flex h-[30px] w-[30px] p-1.5 mb-2 justify-center items-center bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full" onClick={() => { setTestGeneratorPopup(false) }}><p>x</p></div>
                    </div>
                    <p>Provide your content and set the options to create your test.</p>
                </div>
                <div className="flex justify-around w-full h-max">
                    <button onClick={() => setTestGenerationType('JSON')} className={`relative w-max ${testGenerationType === 'JSON' ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-white text-blue-700'} border border-blue-500 cursor-pointer font-semibold rounded-xl px-1.5 py-2 m-2`}>{"Generate using JSON (Recommended)"}</button>
                    <button onClick={() => setTestGenerationType('AI')} className={`relative w-max ${testGenerationType === 'AI' ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-white text-blue-700'} border border-blue-500 cursor-pointer font-semibold rounded-xl px-1.5 py-2 m-2`}>{"AI generation (limited)"}</button>
                </div>
                {testGenerationType === 'AI' ? (
                    <div className="flex flex-col gap-10 w-full justify-center">
                        <div className="flex flex-col w-full border-2 border-dashed border-gray-400 rounded">
                            <div className="flex flex-col gap-0.5 justify-center items-center w-full">
                                <p className="relative mt-2 font-bold">{fileName}</p>
                                <p className="relative mt-2">{"Upload a .txt, .pdf, or .docx file"}</p>
                                <label className="relative font-semibold min-w-[84px] max-w-[480px] bg-gray-200 hover:bg-gray-300 cursor-pointer text-black rounded-xl px-4 py-2 m-2" htmlFor="file-input">Choose a file</label>
                                <input style={{ display: "none" }} id="file-input" name="file-input" ref={fileRef} type="file" accept="application/pdf, .docx" onChange={handleFileChange} />
                            </div>

                        </div>
                        <div className="flex w-full gap-4">
                            <div className="flex flex-col w-1/2 justify-between">
                                <label htmlFor="required-time1">Test Duration</label>
                                <select className="border border-gray-300 rounded-md" id="required-time1" onChange={handleSelect}>
                                    <option value="">Select</option>
                                    <option value="15" >15 min</option>
                                    <option value="30" >30 min</option>
                                    <option value="60" >1 hour </option>
                                </select>
                            </div>
                            <div className="flex flex-col w-1/2 justify-between">
                                <label htmlFor="questions-num">Number of questions:</label>
                                <input className="border border-gray-300 rounded-md" placeholder="eg:5" type="number" name="questions-num" id="questions-num" onChange={(e)=>setNumOfQuestions(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="testName">Test Name</label>
                            <input className="border border-gray-300" type="text" id="testName" placeholder="Test Name" onChange={(e) => setTestName(e.target.value)} />
                        </div>
                        <button className={`flex justify-center items-center gap-2 relative w-full ${testLoading?'bg-gray-400 hover:bg-gray-500':'bg-blue-500 hover:bg-blue-700'} font-semibold text-white rounded-xl px-1.5 py-2 m-2`} onClick={handleRequestSending} disabled={testLoading}>Generate Test {testLoading && <Loader2 color="#FFFFFF" size="20px" className="animate-spin" />}</button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-10 w-full justify-center">
                        <div className="flex flex-col px-5 py-2 w-full h-[200px] border-2 border-gray-400 rounded overflow-auto">
                            <p className="font-bold">Instructions</p>
                            <ul style={{ listStyleType: 'Disc', marginLeft: '20px' }}>
                                <li><p>Open gemini or any AI chatbot</p></li>
                                <li><p>Upload your files in the chat</p></li>
                                <li>
                                    <p>Paste this Prompt:</p>
                                    <div className="p-2">
                                        <p>{"Generate 20 high-quality, non-trivial MCQs based on the attached file."}</p>
                                        <p>{"Output Requirements:"}</p>
                                        <p>{"1. Return ONLY a valid JSON array of objects."}</p>
                                        <p>{"2. No prose, markdown code blocks, or explanations."}</p>
                                        <p>{"3. Use this JSON schema:"}</p>
                                        <p>{'{ "question": "string", "options": ["string", "string", "string", "string"], "correctAnswer": "string" }'}</p>
                                        <p>{"4. The 'correctAnswer' must exactly match one of the four options."}</p>
                                    </div>
                                </li>
                                <li><p>Click the Generate Test button</p></li>
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="required-time2">Test Duration</label>
                            <select className="border border-gray-300 rounded-md" id="required-time2" onChange={handleSelect}>
                                <option value="">Select</option>
                                <option value="15" >15 min</option>
                                <option value="30" >30 min</option>
                                <option value="60" >1 hour </option>
                            </select>
                            <label htmlFor="testName">Test Name</label>
                            <input className="border border-gray-300" type="text" id="testName" placeholder="Test Name" onChange={(e) => setTestName(e.target.value)} />
                        </div>
                        <textarea className="w-full border-2 border-gray-200" onChange={handleJsonInputChange} placeholder="Paste the JSON Data here"></textarea>
                        <button className="relative w-full bg-blue-500 hover:bg-blue-700 font-semibold text-white rounded-xl px-1.5 py-2 m-2" onClick={handleJsonTestGeneration}>Generate Test</button>
                    </div>)}

            </div>
        </div>

    )
}

export default TestGeneratorPopup;