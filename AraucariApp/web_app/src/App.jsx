import React, { useState } from 'react'
import NavBar from './components/NavBar'
import Dashboard_PrestadorServicios from './components/Dashboard-PrestadorServicios'
import AutorizarUsuario from './components/AutorizarUsuario'

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option); 
    //console.log(selectedOption)
  };
  return (
    
    <div className="grid grid-cols-[auto_1fr] min-h-screen">
        <div className="fixed h-screen top-0 left-0">
          <NavBar onOptionClick={handleOptionChange} />
        </div>
        <div className="ml-[100px] col-span-2">
          
          {/*Aquí irán los dashbaord: (De ejemplo está el de prestador de servicios.)*/}
          {selectedOption == 'home' && <Dashboard_PrestadorServicios/>}
          {selectedOption == 'menu' && <AutorizarUsuario/>}
        </div>
    </div>
        
        
    
  )
}

export default App
