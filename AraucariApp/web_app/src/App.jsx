import React, { useState } from 'react'
import NavBar from './components/NavBar'
import Dashboard_PrestadorServicios from './components/Dashboard-PrestadorServicios'
import AutorizarUsuario from './components/AutorizarUsuario'
import PerfilMunicipal from './components/PerfilMunicipal'

import municipal from './assets/municipal'

function App() {

  // estado del componente, inicializado en null
  const [selectedOption, setSelectedOption] = useState(null);


  // funcion que se encarga de enviar el parametro option al componente padre
  const handleOptionChange = (option) => {
    setSelectedOption(option); 
    //console.log(selectedOption)
  };
  return (
    
    <div className="grid grid-cols-[auto_1fr] min-h-screen">
        <div className="fixed h-screen top-0 left-0">
          <NavBar onOptionClick={handleOptionChange} persona={new municipal} />
        </div>
        <div className="ml-[100px] col-span-2">
          {selectedOption == null && <PerfilMunicipal persona={new municipal}/>}
          {selectedOption == 'perfil' && <PerfilMunicipal persona={new municipal} />}
          {/*Aquí irán los dashbaord: (De ejemplo está el de prestador de servicios.)*/}
          {selectedOption == 'home' && <Dashboard_PrestadorServicios/>}
          {selectedOption == 'menu' && <AutorizarUsuario/>}
        </div>
    </div>
        
        
    
  )
}

export default App
