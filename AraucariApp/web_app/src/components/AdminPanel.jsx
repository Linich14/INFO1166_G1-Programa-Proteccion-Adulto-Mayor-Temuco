import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
function AdminPanel() {
  const [Municipal, setMunicipal] = useState({
    id: uuidv4(),
    rut: '',
    nombre: '',
    apellido: '',
    privilegios: 1,
    cargo: '',
    telefono: '',
    contraseña: ''
  });

  const [Prestador, setPrestador] = useState({
    id: uuidv4(),
    rut: '',
    nombre: '',
    apellido: '',
    privilegios: 2,
    trabajo: '',
    correo:'',
    fnac:'',
    telefono: '',
    contraseña: ''
  });

  const [tipoUsuario, setTipoUsuario] = useState('municipal');

  const handleChange = (e) => {
    if (tipoUsuario === 'municipal') {
      setMunicipal({ ...Municipal, [e.target.name]: e.target.value });
    } else {
      setPrestador({ ...Prestador, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tipoUsuario === 'municipal') {
        Municipal.contraseña = Municipal.rut;
        console.log(Municipal);
        const response = await axios.post('http://localhost:8000/municipales/', Municipal);
        console.log(response.data);
      } else {
        Prestador.contraseña = Prestador.rut;
        console.log(Prestador);
        const response = await axios.post('http://localhost:8000/prestadores/', Prestador);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    setMunicipal({
      id: uuidv4(),
      rut: '',
      nombre: '',
      apellido: '',
      privilegios: 1,
      cargo: '',
      telefono: '',
      contraseña: ''
    });
    setPrestador({
      rut: '',
      nombre: '',
      apellido: '',
      privilegios: 2,
      trabajo: '',
      correo:'',
      fnac:'',
      telefono: '',
      contraseña: ''
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center">
        <div className="w-full max-w-xs ">
          <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} className="w-full mb-4 bg-[#f5f5f5] rounded py-2 px-3">
            <option value="municipal">Municipal</option>
            <option value="prestador">Prestador</option>
          </select>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rut">
                Rut:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="rut"
                value={tipoUsuario === 'municipal' ? Municipal.rut : Prestador.rut}
                onChange={handleChange}
                placeholder="Ingrese el rut"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="nombre"
                value={tipoUsuario === 'municipal' ? Municipal.nombre : Prestador.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                Apellido:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="apellido"
                value={tipoUsuario === 'municipal' ? Municipal.apellido : Prestador.apellido}
                onChange={handleChange}
                placeholder="Ingrese el apellido"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cargo">
                Cargo/Trabajo:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="cargo"
                value={tipoUsuario === 'municipal' ? Municipal.cargo : Prestador.trabajo}
                onChange={handleChange}
                placeholder="Ingrese el cargo/Trabajo"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                Teléfono:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="telefono"
                value={tipoUsuario === 'municipal' ? Municipal.telefono : Prestador.telefono}
                onChange={handleChange}
                placeholder="Ingrese el teléfono"
              />
            </div>

            {tipoUsuario === 'prestador' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Correo:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  value={Prestador.email}
                  onChange={handleChange}
                  placeholder="Ingrese el correo"
                />
                
              </div>
              
            )}
                        {tipoUsuario === 'prestador' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fnac">
                  Fecha de Nacimiento:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  name="fnac"
                  value={Prestador.fnac}
                  onChange={handleChange}
                  placeholder="Ingrese el correo"
                />
                
              </div>
              
            )}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;