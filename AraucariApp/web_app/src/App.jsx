import React, { useState,useContext } from 'react'
import NavBar from './components/NavBar'
import Dashboard_PrestadorServicios from './components/Dashboard-PrestadorServicios'
import AutorizarUsuario from './components/AutorizarUsuario'
import PerfilMunicipal from './components/PerfilMunicipal'
import CrearNotificacion from './components/CrearNotificacion'
import Historialcompleto from './components/Historialcompleto'
import AdminPanel from './components/AdminPanel'
import AdminCalendario from './components/AdminCalendario'
import { UserContext } from './components/userContext';

function App({  }) {
  const { userData } = useContext(UserContext);
  //console.log(userData)
  // estado del componente, inicializado en null
  const [selectedOption, setSelectedOption] = useState(null);

  // funcion que se encarga de enviar el parametro option al componente padre
  const handleOptionChange = (option) => {
    setSelectedOption(option); 
    //console.log(selectedOption)
  };
  return (
    
    <div className="grid grid-cols-[auto_1fr] min-h-screen  ">
        <div className="fixed h-screen top-0 left-0 ">
          <NavBar onOptionClick={handleOptionChange} municipal={userData} />
        </div>
        <div className="ml-[100px] col-span-2 ">
          {selectedOption == null && <PerfilMunicipal municipal={userData} />}
          {selectedOption == 'perfil' && <PerfilMunicipal  />}
          {selectedOption == 'home' && <Dashboard_PrestadorServicios />}
          {selectedOption == 'menu' && <AutorizarUsuario />}
          {selectedOption == 'notificacion' && <CrearNotificacion />}
          {selectedOption == 'historial' && <Historialcompleto />}
          {selectedOption == 'adminpanel' && <AdminPanel />}
          {selectedOption == 'adminCalendario' && <AdminCalendario />}
        </div>
    </div>
        
        
    
  )
}

export default App;
