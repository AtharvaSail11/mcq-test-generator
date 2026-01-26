import {useState,useEffect} from "react"
import { auth,db } from "../../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection,addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const LogIn=()=>{
    const navigate=useNavigate();
    const [signInData,setSignInData]=useState({
        email:"",
        password:"",
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setSignInData((prevData)=>({...prevData,[name]:value}))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const userCredentials=await signInWithEmailAndPassword(auth,signInData.email,signInData.password);
            const user=userCredentials.user;
            if(user){
                navigate("/Dashboard")
            }
        }catch(error){
            console.log(error);
        }
    }
    return(
        <div className="flex justify-center items-center h-full w-full bg-gradient-to-tl from-blue-50 to to-blue-100">
           <div className="flex flex-col items-center h-[500px] w-[400px] shadow-lg bg-blue-200/50 rounded-lg">
            <div className="flex justify-center items-center h-[20%] w-full mb-5">
                <p className="text-[40px] font-semibold text-blue-500">Log In</p>
            </div>
            <form className="flex flex-col gap-5 h-[80%] w-[90%] items-center" onSubmit={handleSubmit}>
                <input 
                    className="h-[40px] w-[75%] p-4 rounded-lg mb-2 bg-blue-300" 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Email" 
                    onChange={handleChange}
                    value={signInData.email}
                    required 
                />
                <input 
                    className="h-[40px] w-[75%] p-4 rounded-lg mb-2 bg-blue-300" 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    onChange={handleChange}
                    value={signInData.password}
                    required
                />

                <p className="text-[12px]">Do you have an account? If not, <span className="text-blue-700"><a href="/SignUp">Sign In here</a></span></p>

                <button className="w-[75%] h-max shadow-lg cursor-pointer text-white px-5 py-2 bg-blue-500 rounded-md">Submit</button>
            </form>
           </div>
        </div>
    )
}

export default LogIn;

