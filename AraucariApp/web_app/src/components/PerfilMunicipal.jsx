import React from 'react';


function PerfilMunicipal({municipal }) {
    if(municipal === null || municipal === undefined){
        return null
    } 

  return (
    <div className="grid  grid-rows-2  bg-[#EBEFF0] h-screen">

        <div className="grid  grid-rows-2 p-3  ">
                <div className=" row-start-1 flex bg-[#FFB236] p-3 rounded-lg shadow-md w-1/3 h-1/5 justify-center  m-4 items-center right-25 fixed">
                    <img src="" className='bg-white rounded-full m-2' alt="foto municipal" />
                    <h1 className='text-3xl font-bold'>{ municipal.nombre + " "  + municipal.apellido}</h1>
                </div>
                <div className=" row-start-2 flex bg-white  p-3 rounded-lg shadow-md w-1/3  m-3 items-center justify-center ">
                        <div className="container   ">
                        <div className="mb-2">
                            <p className="text-gray-700 "><span className="font-bold">Nombres:</span> {municipal.nombre}</p>
                            <hr className='h-px  bg-gray-900 border-1'/>
                        </div>
                        <div className="mb-2">
                            <p className="text-gray-700"><span className="font-bold">Apellidos:</span> {municipal.apellido}</p>
                            <hr className='h-px  bg-gray-900 border-1'/>
                        </div>
                        <div className="mb-2">
                            <p className="text-gray-700"><span className="font-bold">Rut:</span> {municipal.rut}</p>
                            <hr className='h-px  bg-gray-900 border-0'/>
                        </div>
                        <div className="mb-2">
                            <p className="text-gray-700"><span className="font-bold">Cargo:</span> {municipal.cargo}</p>
                            <hr className='h-px  bg-gray-900 border-0'/>
                        </div>
                        <div className="mb-2">
                            <p className="text-gray-700"><span className="font-bold">Telefono:</span> {municipal.telefono}</p>
                            <hr className='h-px  bg-gray-900 border-0'/>
                        </div>

                    </div>
                </div>


        </div>    
        <div className='grid bg-[#FFB236]  p-4 rounded-lg shadow-md  content-center m-4 items-center justify-center h-1/8 bottom-0  w-full fixed'>
   
            <h1 className='text-3xl font-bold text-center '>¡Bienvenido {municipal.nombre}!</h1>


            </div>   

    </div>
  )
}

export default PerfilMunicipal