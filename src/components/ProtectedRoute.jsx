import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute=({children,currentUser,loading})=>{
    if(loading){
        return <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex flex-col items-center h-max w-max">
                <Loader2 size='30px' className="animate-spin"/>
                <p className="text-2xl">Please Wait!</p>
            </div>
        </div>
    }

    if(!currentUser){
        return <Navigate to={'/'} replace/>
    }

    return children
}

export default ProtectedRoute