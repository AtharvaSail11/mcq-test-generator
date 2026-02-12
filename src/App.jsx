import { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import LogIn from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './contexts/UserContext'



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading,setLoading]=useState(true);


    useEffect(() => {
      const handleServerPing=async()=>{
        try{
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/serverPing`);
        }catch(error){
          console.log('error:',error.message);
        }
      }

      handleServerPing();
  
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false)
      });


      return () => unsubscribe()
    }, [])
  return (
    <div className='h-screen w-screen box-border'>
      <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/Login' element={<LogIn/>} />
            <Route path='/SignUp' element={<SignUp/>} />
            <Route path='/Dashboard' element={<ProtectedRoute currentUser={currentUser} loading={loading}>
              <Dashboard />
            </ProtectedRoute>} />

          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

export default App
