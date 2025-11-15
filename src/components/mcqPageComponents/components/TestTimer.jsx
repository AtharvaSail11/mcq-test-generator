import { Clock } from "lucide-react"
import { useState,useEffect, useRef } from "react";


const TestTimer=({Time,handleSubmit})=>{
    const [totalTime,setTotalTime]=useState(Time);


    const getTotalTime=()=>{
        const totalSeconds=Math.floor(totalTime/1000);
        const totalMinutes=Math.floor(totalSeconds/60);
        const currentHours=Math.floor(totalMinutes/60);

        const currentSeconds=Math.floor(totalSeconds % 60)
        const currentMinutes=Math.floor(totalMinutes % 60);

        return `${currentHours ? currentHours+":":""}${currentMinutes}:${currentSeconds}`;
    }


    useEffect(()=>{
        const timer=setInterval(()=>{
                setTotalTime((prevTime)=>{
            const newTime=prevTime - 1000;

            if(newTime < 1){
                clearInterval(timer);
                handleSubmit(); 
                return 0;
            }

            return newTime;
        });  

    },1000);
        
        return ()=>clearInterval(timer);
    },[totalTime])

    return(
        <div className="flex justify-center items-center h-[20%] w-[30%] rounded-lg border shadow-sm text-card-foreground">
                    <Clock/>
                    <div className="flex flex-col mx-2 gap-1">
                        <p>Time Remaining</p>
                        <p className="text-3xl font-semibold">{getTotalTime()}</p>
                    </div>

                </div>
    )
}

export default TestTimer;