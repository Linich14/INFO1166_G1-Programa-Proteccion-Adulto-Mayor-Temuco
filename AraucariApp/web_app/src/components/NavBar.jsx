import React, {useState} from 'react'

/*
Dividi el navbar en 3 secciones, el div de arriba que contiene la imagen, 
el div central con la lista de accesos y
el div de abajo que mostrara el perfil y nombre de usuario
 */

function NavBar ({ onOptionClick, persona }) { {

  // funcion que se encarga de enviar el parametro option al componente padre
  const handleOptionClick = (option) => {
    //console.log(option);
    onOptionClick(option); // el parametro option se envia al componente padre
  };

  return (
    <nav className="h-screen flex flex-col justify-between ">
      <div className=" text-white p-4 flex justify-center">
        <img src="../../Logo.png" alt="Logo Municipalidad de Temuco" className='' />
      </div>

      <div className="flex flex-col items-center ">
        <ul >
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('home')} ><img src="../../public/home.png" alt="" className=' ' /></a></li>
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('menu')} ><img src="../../public/menu.png" alt="" /></a></li>
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('notificacion')} ><img src="../../public/mensaje.png" alt="" className='h-7' /></a></li>
          <li className="mb-5"><a href="#" onClick={() => handleOptionClick('historial')} ><img src="../../public/historial.png" alt="" className='h-7' /></a></li>
        </ul>
      </div>

      <div className=" text-white p-4 flex flex-col justify-center">
        <img src={persona.photo} alt="" className='w-30 h-30' />
        <a href="#" onClick={() => handleOptionClick('perfil')}><p className='text-lg hover:text-gray-300 text-center'>{persona.nombre 
        + " " + persona.apellido}</p></a>
      </div>
    </nav>
  );
};
}
export default NavBar;
