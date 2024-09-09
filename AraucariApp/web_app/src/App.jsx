import { useState } from 'react'
import NavBar from './components/NavBar'
import Dashboard from './components/Dashboard' 
function App() {
  

  return (
    
    <div className="grid grid-cols-2 grid-rows-1 gap-4">
        <div className="fixed top-0 left-0 h-screen w-64">
          <NavBar />
        </div>
        <div >
          <Dashboard />
        </div>
    </div>
        
        
    
  )
}

export default App
