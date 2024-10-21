import React, {useState} from 'react';
import axios from 'axios';

function PerfilMunicipal({municipal }) {
    if(municipal === null || municipal === undefined){
        return null
    } 
    const [usuariomunicipal, setusuariomunicipal] = useState(municipal);
    const [editMode, setEditMode] = useState(false);
  
    const handleEdit = () => {
      setEditMode(true);
    };
  
    const handleCancel = () => {
      setEditMode(false);
      setusuariomunicipal(municipal);
    };
  
    const handleSave = () => {
        const jsonData = JSON.stringify(usuariomunicipal);

        setusuariomunicipal({
            id: municipal.id,
            rut: usuariomunicipal.rut,
            nombre: usuariomunicipal.nombre,
            apellido: usuariomunicipal.apellido,
            privilegios: usuariomunicipal.privilegios,
            cargo: usuariomunicipal.cargo,
            telefono: usuariomunicipal.telefono,
          });
          console.log(usuariomunicipal)
        axios.put(`http://localhost:8000/api/usuarios/${municipal.id}/`, usuariomunicipal)
          .then((response) => {
            console.log(response.data);
            setEditMode(false);
            alert('Datos guardados correctamente');
          })
          .catch((error) => {
           
            console.error(error);
          });
      };

  return (
    <div className="grid  grid-rows-2  bg-[#EBEFF0] h-screen">
      <div className="grid  grid-rows-2 p-3  ">
        <div className=" row-start-1 flex bg-[#FFB236] p-3 rounded-lg shadow-md w-1/3 h-1/5 justify-center  m-4 items-center right-25 fixed">
          <img src="" className='bg-white rounded-full m-2' alt="foto municipal" />
          <h1 className='text-3xl font-bold'>{ municipal.nombre + " "  + municipal.apellido}</h1>
        </div>
        <div className=" row-start-2 flex bg-white  p-3 rounded-lg shadow-md w-1/3  m-3 items-center justify-center h-full">
          <div className="container   ">
            {editMode ? (
              <form>
                <div className="mb-2">
                  <label>Nombres:</label>
                  <input type="text" value={usuariomunicipal.nombre} onChange={(e) => setusuariomunicipal({ ...usuariomunicipal, nombre: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label>Apellidos:</label>
                  <input type="text" value={usuariomunicipal.apellido} onChange={(e) => setusuariomunicipal({ ...usuariomunicipal, apellido: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label>Rut:</label>
                  <input type="text" value={usuariomunicipal.rut} onChange={(e) => setusuariomunicipal({ ...usuariomunicipal, rut: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label>Cargo:</label>
                  <input type="text" value={usuariomunicipal.cargo} onChange={(e) => setusuariomunicipal({ ...usuariomunicipal, cargo: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label>Teléfono:</label>
                  <input type="text" value={usuariomunicipal.telefono} onChange={(e) => setusuariomunicipal({ ...usuariomunicipal, telefono: e.target.value })} />
                </div>
                <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'  onClick={handleSave}>
                  Guardar cambios
                </button>
                <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleCancel}>
                  Cancelar
                </button>
              </form>
            ) : (
              <div>
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
                  <p className="text-gray-700"><span className="font-bold">Teléfono:</span> {municipal.telefono}</p>
                </div>
                <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleEdit}>
                  Editar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilMunicipal