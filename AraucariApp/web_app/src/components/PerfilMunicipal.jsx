import React from 'react'
import carnet from '../../public/carnet.svg'


function PerfilMunicipal() {
    class municipal {
        constructor() {
          this.nombre = "Pedro "
          this.apellido = "Sanchez"
          this.rut = "12345678-9"
          this.fnac = "01/01/1980"
          this.edad = "44"
          this.direccion = "San Martin 1234"
          this.sector = "Santa Rosa"
          this.ciudad = "Temuco"
          this.carnet = carnet
        }
      }

    var persona = new municipal()
  return (
    <div className="grid  grid-rows-2  bg-[#EBEFF0] h-screen">

        <div className="grid  grid-rows-2 p-3  ">
                <div className=" row-start-1 flex bg-white  p-3 rounded-lg shadow-md w-1/2 justify-center  m-4 items-center right-20 fixed">
                    <img src={persona.carnet} className='' alt="carnet del adulto mayor" />
                    <h1 className='text-3xl font-bold'>Foto de Carnet</h1>
                </div>
                <div className=" row-start-2 flex bg-white  p-3 rounded-lg shadow-md  m-3 items-center justify-center ">
                        <div className="container  ">
                        <div className="mb-4">
                            <p className="text-gray-700 "><span className="font-bold">Nombres:</span> {persona.nombre}</p>
                            <hr className='h-px  bg-gray-900 border-1'/>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-bold">Apellidos:</span> {persona.apellido}</p>
                            <hr className='h-px  bg-gray-900 border-1'/>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-bold">Rut:</span> {persona.rut}</p>
                            <hr className='h-px  bg-gray-900 border-0'/>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-bold">Edad:</span> {persona.edad}</p>
                            <hr className='h-px  bg-gray-900 border-0'/>
                        </div>

                    </div>
                </div>


        </div>    
        <div className='grid bg-white  p-4 rounded-lg shadow-md  content-center m-4 items-center justify-center h-1/8 bottom-0  w-full fixed'>
   
            <h1 className='text-3xl font-bold text-center'>¡Bienvenido {persona.nombre}!</h1>


            </div>   

    </div>
  )
}

export default PerfilMunicipal