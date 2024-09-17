import { useState } from 'react'
import NavBar from './components/NavBar'
import Dashboard_PrestadorServicios from './components/Dashboard-PrestadorServicios'
import Login from './views/Login'
import AutorizarUsuario from './components/AutorizarUsuario'
function App() {
  return (
    
    <div className="grid grid-cols-[auto_1fr] min-h-screen">
        <div className="fixed h-screen top-0 left-0">
          <NavBar />
        </div>
        <div className="ml-[100px] col-span-2">
          {/*Aquí irán los dashbaord: (De ejemplo está el de prestador de servicios.)*/}
          {/*<Dashboard_PrestadorServicios />*/}
          <AutorizarUsuario/>
        </div>
    </div>
        
        
    
  )
}

export default App
