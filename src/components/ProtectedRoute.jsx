import { useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute=({children,currentUser,loading})=>{
    if(loading){
        return <div>Loading...</div>
    }

    if(!currentUser){
        return <Navigate to={'/'} replace/>
    }

    return children
}

export default ProtectedRoute