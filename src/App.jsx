import { useState } from 'react'
import McqMainPage from './pages/McqMainPage'
import LandingPage from './pages/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-screen box-border'>
        <McqMainPage/>
        {/* <LandingPage/> */}
    </div>
  )
}

export default App
