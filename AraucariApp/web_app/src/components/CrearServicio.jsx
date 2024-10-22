import React, { useState, useEffect } from 'react';

function CrearServicio({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        prestadorID: '',
        nombre: '',
        tipo: '',
        direccion: '',
        descripcion: '',
        disponibilidad: ''
    });

    const [prestadores, setPrestadores] = useState([]);

    // Obtenemos a los prestadores de servicios
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/servicios/ListarPrestadores/')
            .then(response => response.json())
            .then(data => {
                setPrestadores(data);
            })
            .catch(error => console.error('Error fetching prestadores:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/servicios/crear_servicio/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Servicio creado:', data);
            onSave(data); // Llama a la función onSave para actualizar la lista de servicios
            onClose(); // Cierra el modal
        })
        .catch(error => console.error('Error creando el servicio:', error));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Crear Servicio</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Prestador</label>
                        <select
                            name="prestadorID"
                            value={formData.prestadorID}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="">Seleccione un prestador</option>
                            {prestadores.map(prestador => (
                                <option key={prestador.id} value={prestador.id}>
                                    {prestador.nombre} {prestador.apellido}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tipo</label>
                        <input
                            type="text"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Disponibilidad</label>
                        <input
                            type="date"
                            name="disponibilidad"
                            value={formData.disponibilidad}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CrearServicio;