import React from 'react'

/*
Dividi el navbar en 3 secciones, el div de arriba que contiene la imagen, 
el div central con la lista de accesos y
el div de abajo que mostrara el perfil y nombre de usuario
 */

function NavBar () {
  return (
    <nav className="h-screen flex flex-col justify-between ">
      <div className=" text-white p-4 flex justify-center">
        <img src="../../Logo.png" alt="Logo Municipalidad de Temuco" className='' />
      </div>

      <div className="flex flex-col items-center ">
        <ul >
          <li className="mb-5"><a href="#"  ><img src="../../public/home.png" alt="" className=' ' /></a></li>
          <li className="mb-5"><a href="#" ><img src="../../public/menu.png" alt="" /></a></li>
        </ul>
      </div>

      <div className=" text-white p-4 flex flex-col justify-center">
        <img src="../../avatar.png" alt="" className='w-30 h-30' />
        <p className='text-lg hover:text-gray-300 text-center'>Pedro Sanchez</p>
      </div>
    </nav>
  );
};

export default NavBar