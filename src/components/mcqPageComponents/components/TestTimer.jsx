import { Clock } from "lucide-react"
import { useState,useEffect, useRef } from "react";


const TestTimer=({handleSubmit})=>{
    const [seconds,setSeconds]=useState(10)
    const [minutes,setMinutes]=useState(0);
    const latestHandleSubmit=useRef(handleSubmit);

    useEffect(()=>{
        latestHandleSubmit.current=handleSubmit
    },[handleSubmit])

    useEffect(()=>{
        const timer=setInterval(()=>{
            setSeconds((prev)=>{
            if(prev === 0 && minutes === 0){
                clearInterval(timer);
                latestHandleSubmit.current();
                return 0;
            }

            if(prev > 0){
                return prev - 1;
            }else{
                setMinutes((prevMinutes)=>{
                    if(prevMinutes > 0){
                        return prevMinutes - 1;
                    }else{
                        return prevMinutes;
                    }
                })
                return 59;
            }

            })
           
        },1000);
        
        return ()=>clearInterval(timer);
    },[minutes])

    return(
        <div className="flex justify-center items-center h-[20%] w-[30%] rounded-lg border shadow-sm text-card-foreground">
                    <Clock/>
                    <div className="flex flex-col mx-2 gap-1">
                        <p>Time Remaining</p>
                        <p className="text-3xl font-semibold">{minutes}:{(seconds < 10 && 0)}{seconds}</p>
                    </div>

                </div>
    )
}

export default TestTimer;