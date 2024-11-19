// Gestión de usuarios
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Historialcompleto() {

    // C: Para crear el nuevo usuario
    const [newUsuario, setNewUsuario] = useState({
        rut: '',
        nombre: '',
        apellido: '',
        sector: '',
        direccion: '',
        nacimiento: '',
        email: '',
        telefono: '',
        nacionalidad: '',
        password: '',
    });

    // Modal para controlar la visibilidad del componente 'Crear Usuario'
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Para leer los usuarios registros (R)
    const [usuarios, setUsuarios] = useState([]); 

    // R: Solicitud obtiene los usuarios registrados
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/auth/get_usuarios/')
            .then(response => {
                console.log('Datos recibidos:', response.data);
                setUsuarios(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los usuarios:', error);
            });
    }, []);    

    return (
        <div>

            {/* Contenedor principal  */}
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">

                {/* Titulo y botón de añadir usuario */}
                <div className="flex items-center justify-between border border-gray-20 mt-2 p-2 rounded-md shadow-sm">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            Gestión de usuarios
                        </h3>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <button onClick={toggleModal} className="px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-400 ">Añadir Usuario</button>
                    </div>
                </div>

                {/* Tabla de usuarios */}
                <div className="mt-4 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Usuario</th>
                                <th className="py-3 px-6">Rut</th>
                                <th className="py-3 px-6">Sector</th>
                                <th className="py-3 px-6">Dirección</th>
                                <th className="py-3 px-6">Telefono</th>
                                <th className="py-3 px-6"></th>

                            </tr>
                        </thead>
                        {/* Renderización de usuarios */}
                        <tbody className="text-gray-600 divide-y">
                            {
                                usuarios.slice().reverse().map(usuario => (
                                    <tr key={usuario.id}>
                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                            <div>
                                                <span className="block text-gray-700 text-sm font-medium">{usuario.nombre}{' '}{usuario.apellido}{" ("}{usuario.nacionalidad}{")"}</span>
                                                <span className="block text-gray-700 text-xs">{usuario.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{usuario.rut}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{usuario.sector}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{usuario.direccion}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{usuario.telefono}</td>

                                        {/* Botones para editar y eliminar*/}
                                        <td className="text-right px-6 whitespace-nowrap">
                                            <button className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Editar
                                            </button>
                                            <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}