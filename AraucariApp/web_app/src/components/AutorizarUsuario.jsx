import React,{useState} from 'react'
import carnet from '../../public/carnet.svg'
import verificar from '../../public/verificar.svg'

function AutorizarUsuario() {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    class adulto {
        constructor() {
          this.nombre = "Felipe Andres"
          this.apellido = "Gonzalez Perez"
          this.rut = "12345678-9"
          this.fnac = "01/01/1960"
          this.edad = "64"
          this.direccion = "San Martin 1234"
          this.sector = "Santa Rosa"
          this.ciudad = "Temuco"
          this.discapacidad = "Si"
          this.condicion = "Movilidad Reducida"
          this.carnet = carnet
        }
      }
    var verifi = verificar
    var persona = new adulto()

    const handleAutorizar = () => {
        setShowPopup(true);
        setPopupMessage(`¿Estás seguro de autorizar a ${persona.nombre} ${persona.apellido}?`);
      };
    const handleDenegar = () => {
        setShowPopup(true);
        setPopupMessage(`¿Quieres denegar a ${persona.nombre} ${persona.apellido}?`);
      };
    
  return (
    <div className="grid grid-cols-1 grid-rows-2  bg-[#EBEFF0] h-screen">
        <div className='grid grid-cols-2 bg-white  p-4 rounded-lg shadow-md  content-center m-4  autorizarusuarioTOP'>
            <div>
                <h1 className='text-3xl font-bold p-1'>Validacion de Usuario</h1>
            </div>
            <div className='flex justify-end'>
                
                <button className='flex bg-[#0071CE] rounded-lg text-white p-2 items-center text-3xl font-bold m-2' onClick={handleAutorizar} ><img src={verifi} alt="check" />Autorizar</button>
                <button className='flex bg-[#0071CE] rounded-lg text-white p-2 items-center text-3xl font-bold m-2' onClick={handleDenegar} ><img src={verifi} alt="check" />Denegar</button>
            </div>
            
        </div>
        <div className="grid grid-cols-2 grid-rows-3 p-3 autorizarusuarioAbajo ">
            <div className="container mx-auto p-4 bg-white shadow-md rounded-lg ">
                <h2 className="text-2xl font-bold mb-4">Datos Personales</h2>
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
                <div className="mb-4">
                    <p className="text-gray-700"><span className="font-bold">F. Nac.:</span> {persona.fnac}</p>
                    <hr className='h-px  bg-gray-900 border-0'/>
                </div>
            </div>


                <div className="col-start-1 row-start-2  p-3   ">
                        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-bold">Direccion |</span> {persona.direccion}</p>
                            <hr className='h-px  bg-gray-900 border-0'/>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-bold">Sector |</span> {persona.sector}</p>
                            <hr className='h-px  bg-gray-900 border-0'/>
                        </div>
                        <div className="">
                            <p className="text-gray-700"><span className="font-bold">Ciudad |</span> {persona.ciudad}</p>
                            <hr className='h-px  bg-gray-900 border-0'/>
                        </div>
                    </div>
                </div>

                <div className="col-start-1 row-start-3 p-3 ">
                    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
                    <div className="mb-4">
                        <p className="text-gray-700"><span className="font-bold">Discapacidad |</span> {persona.condicion}</p>
                        <hr className='h-px  bg-gray-900 border-0'/>
                    </div>
                    <div className="">
                        <p className="text-gray-700"><span className="font-bold">Condicion |</span> {persona.condicion}</p>
                        <hr className='h-px  bg-gray-900 border-0'/>
                    </div>

                </div>
                </div>

                <div className="col-start-2 row-start-1 flex bg-white  p-3 rounded-lg shadow-md  m-3 items-center justify-center ">
                    <img src={persona.carnet} className='' alt="carnet del adulto mayor" />
                    <h1 className='text-3xl font-bold'>Foto de Carnet</h1>
                </div>

                {showPopup && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4">Confirmación</h2>
                <p className="text-gray-700">{popupMessage}</p>
                <p className="text-gray-700">Datos del usuario:</p>
                <ul>
                  <li><span className="font-bold">Nombre:</span> {persona.nombre}</li>
                  <li><span className="font-bold">Apellido:</span> {persona.apellido}</li>
                  <li><span className="font-bold">RUT:</span> {persona.rut}</li>
                  <li><span className="font-bold">Fecha de nacimiento:</span> {persona.fnac}</li>
                  <li><span className="font-bold">Edad:</span> {persona.edad}</li>
                  <li><span className="font-bold">Dirección:</span> {persona.direccion}</li>
                  <li><span className="font-bold">Sector:</span> {persona.sector}</li>
                  <li><span className="font-bold">Ciudad:</span> {persona.ciudad}</li>
                  <li><span className="font-bold">Discapacidad:</span> {persona.discapacidad}</li>
                  <li><span className="font-bold">Condición:</span> {persona.condicion}</li>
                </ul>
                <button className="bg-[#0071CE] rounded-lg text-white p-2 items-center text-3xl font-bold" onClick={() => setShowPopup(false)}>Aceptar</button>
              </div>
            </div>
          )}
        </div>       

    </div>
  )
}

export default AutorizarUsuario