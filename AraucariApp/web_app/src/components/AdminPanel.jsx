import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
function AdminPanel() {
  const [Municipal, setMunicipal] = useState({
    id: 1,
    rut: '',
    nombre: '',
    apellido: '',
    privilegios: '',
    cargo: '',
    telefono: ''
  });
  const handleChange = (e) => {
    //console.log(e.target.name, e.target.value);
    setMunicipal({ ...Municipal, [e.target.name]: e.target.value });
    //console.log(Municipal); 
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Municipal);
    try {
      const response = await axios.post('http://localhost:8000/municipales/', Municipal);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setMunicipal({
      id: uuidv4(),
      rut: '',
      nombre: '',
      apellido: '',
      privilegios: '',
      cargo: '',
      telefono: ''
    });
  };

  return (
    <div className="grid  grid-rows-2  bg-[#EBEFF0] h-screen ">
      <div className=' bg-white  p-4 rounded-lg shadow-md  content-center m-4  autorizarusuarioTOP'>
        <div>
          <h1 className='text-3xl font-bold p-1 text-center'>Historial Anual</h1>
        </div>
      </div>
      <div className="grid   p-3  autorizarusuarioAbajo  ">
        <div className="  p-4 bg-white shadow-md rounded-lg ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Rut:</label>
              <input
                type="text"
                name="rut"
                value={Municipal.rut}
                onChange={handleChange}
                className="p-2 rounded-lg border border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={Municipal.nombre}
                onChange={handleChange}
                className="p-2 rounded-lg border border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Apellido:</label>
              <input
                type="text"
                name="apellido"
                value={Municipal.apellido}
                onChange={handleChange}
                className="p-2 rounded-lg border border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Privilegios:</label>
              <input
                type="text"
                name="privilegios"
                value={Municipal.privilegios}
                onChange={handleChange}
                className="p-2 rounded-lg border border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Cargo:</label>
              <input
                type="text"
                name="cargo"
                value={Municipal.cargo}
                onChange={handleChange}
                className="p-2 rounded-lg border border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={Municipal.telefono}
                onChange={handleChange}
                className="p-2 rounded-lg border border-gray-400"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;