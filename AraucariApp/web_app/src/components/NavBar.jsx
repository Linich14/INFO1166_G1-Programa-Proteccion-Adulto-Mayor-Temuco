import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
/*
Dividi el navbar en 3 secciones, el div de arriba que contiene la imagen, 
el div central con la lista de accesos y
el div de abajo que mostrara el perfil y nombre de usuario
 */

function NavBar ({ onOptionClick,municipal, handleLogout}) { {
  const navigate = useNavigate();
  if(municipal === null || municipal === undefined){
    return null
  }
  // funcion que se encarga de enviar el parametro option al componente padre
  const handleOptionClick = (option) => {
    //console.log(option);
    onOptionClick(option); // el parametro option se envia al componente padre
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rut');
    navigate('/login');
  };

  return (
    <nav className="h-screen flex flex-col justify-between ">
      <div className=" text-white p-4 flex justify-center">
        
        <img src="../../Logo.png" alt="Logo Municipalidad de Temuco" className='' />
      </div>

      <div className="flex flex-col items-center ">
        <ul >
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('home')} ><img src="/home.png" alt="" className=' ' /></a></li>
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('menu')} ><img src="/menu.png" alt="" /></a></li>
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('VistaServicios')} ><img src="/menu.png" alt="" /></a></li>
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('notificacion')} ><img src="/mensaje.png" alt="" className='h-7' /></a></li>
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('historial')} ><img src="/historial.png" alt="" className='h-7' /></a></li>
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('adminpanel')} ><img src="/historial.png" alt="" className='h-7' /></a></li>
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('adminCalendario')} ><img src="/calendario.png" alt="" className='h-7' /></a></li>
        </ul>
      </div>

      <div className=" text-white p-4 flex flex-col justify-center">
        <img src=" ../../Logo.png" alt="" className='w-30 h-30' />
        <a href="" onClick={() => handleOptionClick('perfil')}><p className='text-lg hover:text-gray-300 text-center'>{
         municipal.nombre + " " + municipal.apellido }</p></a>
      </div>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
    Cerrar sesión
    </button>
    </nav>
  );
};
}
export default NavBar;
