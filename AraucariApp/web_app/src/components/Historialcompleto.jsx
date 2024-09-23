import React from 'react'
import adulto from '../assets/persona'

function Historialcompleto() {
  var persona = new adulto()
  const personas = [persona,persona,persona,persona,persona,persona,persona,persona,persona,persona,persona,persona,persona,persona,persona]

  return (
    <div className="grid  grid-rows-2  bg-[#EBEFF0] h-screen ">
      <div className=' bg-white  p-4 rounded-lg shadow-md  content-center m-4  autorizarusuarioTOP'>
        <div>
          <h1 className='text-3xl font-bold p-1 text-center'>Historial Anual</h1>
        </div>
      </div>
      <div className="grid   p-3  autorizarusuarioAbajo  ">
        <div className="  p-4 bg-white shadow-md rounded-lg ">
          <table className=" w-full  text-center">
            <thead>
              <tr>
                <th className="px-4 py-2">Nombres</th>
                <th className="px-4 py-2">Apellidos</th>
                <th className="px-4 py-2">Rut</th>
                <th className="px-4 py-2">Sector</th>
                <th className="px-4 py-2">Direccion</th>
                <th className="px-4 py-2">Condicion</th>
                <th className="px-4 py-2">Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((persona, index) => (
                <tr key={index} >
                  <td className="border px-4 py-2">{persona.nombre}</td>
                  <td className="border px-4 py-2">{persona.apellido}</td>
                  <td className="border px-4 py-2">{persona.rut}</td>
                  <td className="border px-4 py-2">{persona.sector}</td>
                  <td className="border px-4 py-2">{persona.direccion}</td>
                  <td className="border px-4 py-2">{persona.condicion}</td>
                  <td className="border px-4 py-2 " >  <input type="checkbox" name="" id=""  /> </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Historialcompleto