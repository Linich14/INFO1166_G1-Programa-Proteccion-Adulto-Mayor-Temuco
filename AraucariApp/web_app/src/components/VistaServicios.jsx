import React, { useState, useEffect } from 'react';

import BarraBusqueda from './BarraBusqueda';
import BtnAccionesTabla from './AccionesTabla';
//import BotonesCrud from './BotonesCrud';
import CrearServicio from './CrearServicio';
import PopupOpciones from './Popup';

function VistaServicios() {
	const [servicios, setServicios] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [selectedService, setSelectedService] = useState(null);
	const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
	const [isEditing, setIsEditing] = useState(false);


	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/servicios/servicios_detalle/')
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setServicios(data);
			})
			.catch(error => console.error('Error fetching services:', error));
	}, []);

	const handleAddService = (newService) => {
		// Asegúrate de que el nuevo servicio tenga el mismo formato que los servicios existentes
		const formattedService = {
			id: newService.id,
			nombre_prestador: newService.nombre_prestador, // Ajusta esto según el formato de tu respuesta
			nombre_servicio: newService.nombre_servicio,
		};
		setServicios([...servicios, formattedService]);
	};

	const handlePopupOpen = (service, event) => {
		if (event && event.target) {
			const rect = event.target.getBoundingClientRect();
			setPopupPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
			setSelectedService(service);
			setShowPopup(true);
		}
	};

	const handlePopupClose = () => {
		setShowPopup(false);
		setSelectedService(null);
		setIsEditing(false);
	};

	const handleEliminar = () => {
		// Lógica para eliminar el servicio
		console.log('Eliminar servicio:', selectedService.id);

		fetch(`http://127.0.0.1:8000/api/servicios/Listarservicios/${selectedService.id}/`, {
			method: 'DELETE',
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				setServicios(servicios.filter(servicio => servicio.id !== selectedService.id));
				handlePopupClose();
			})
			.catch(error => console.error('Error eliminando el servicio:', error));
	};


	const handleActualizar = () => {
		// Lógica para actualizar el servicio
		console.log('Actualizar servicio:', selectedService);
		setIsEditing(true);
		handlePopupClose();
	};

	const handleSaveUpdate = (updatedService) => {
		fetch(`http://127.0.0.1:8000/api/servicios/actualizar_servicio/${updatedService.id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedService)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				setServicios(servicios.map(servicio => (servicio.id === data.id ? data : servicio)));
				setIsEditing(false);
			})
			.catch(error => console.error('Error actualizando el servicio:', error));
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900 p-3 antialiased">
			<div className="mx-auto max-w-screen-xl px-4 lg:px-12">
				{/*Espacio donde se encuentra Barra de busqueda*/}
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidde">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<BarraBusqueda /> {/*Barra de busqueda*/}
						{/*Apartado de opciones con botones (Filtro y acciones)*/}
						<div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
							<button
								className="flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
								onClick={() => setShowModal(true)}>
								{/* <svg className="h-3.5 w-3.5 mr-2" xmlns="http://www.w3.org/2000/svg">
									<path clip-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
								</svg> */}
								Añadir Servicio
							</button>
							<BtnAccionesTabla />
						</div>
					</div>
					{/* Tabla que mostrará los servicios  */}
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-4 py-4">ID</th>
									<th scope="col" className="px-4 py-3">Prestador</th>
									<th scope="col" className="px-4 py-3">Serivicio</th>
									<th scope="col" className="px-4 py-3">
										<span className="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							{/*Aquí se crearán  */}
							<tbody>
								{servicios.map(servicio => (
									<tr key={servicio.id} className={`border-b dark:border-gray-700 ${isEditing && selectedService && selectedService.id === servicio.id ? 'bg-yellow-100' : ''}`}>
										<th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{servicio.id}</th>
										<td className="px-4 py-3">
											{isEditing && selectedService && selectedService.id === servicio.id ? (
												<input
													type="text"
													value={selectedService.nombre_prestador}
													onChange={(e) => setSelectedService({ ...selectedService, nombre_prestador: e.target.value })}
													className="w-full px-3 py-2 border rounded"
												/>
											) : (
												servicio.nombre_prestador
											)}
										</td>
										<td className="px-4 py-3">
											{isEditing && selectedService && selectedService.id === servicio.id ? (
												<input
													type="text"
													value={selectedService.nombre_servicio}
													onChange={(e) => setSelectedService({ ...selectedService, nombre_servicio: e.target.value })}
													className="w-full px-3 py-2 border rounded"
												/>
											) : (
												servicio.nombre_servicio
											)}
										</td>
										<td className="px-4 py-3 flex items-center justify-end">
											{isEditing && selectedService && selectedService.id === servicio.id ? (
												<button
													className="px-4 py-2 bg-blue-500 text-white rounded"
													onClick={() => handleSaveUpdate(selectedService)}
												>
													Guardar
												</button>
											) : (
												<button
													className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
													type="button"
													onClick={(event) => handlePopupOpen(servicio, event)}
												>
													<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
														<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
													</svg>
												</button>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div>
				{showModal && (
					<CrearServicio
						onClose={() => setShowModal(false)}
						onSave={handleAddService}
					/>
				)}
				{showPopup && (
					<PopupOpciones
						onClose={handlePopupClose}
						onEliminar={handleEliminar}
						onActualizar={handleActualizar}
						position={popupPosition}
						
					/>
				)}
			</div>
		</section>
	)
}
export default VistaServicios;