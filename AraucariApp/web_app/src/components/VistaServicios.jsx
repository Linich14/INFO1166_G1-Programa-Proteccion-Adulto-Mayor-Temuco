import React, { useState } from 'react';

import BarraBusqueda from './BarraBusqueda';
import BtnAccionesTabla from './AccionesTabla';
import BotonesCrud from './BotonesCrud';

function VistaServicios() {

	return (
		<section className="bg-gray-50 dark:bg-gray-900 p-3 antialiased">
			<div className="mx-auto max-w-screen-xl px-4 lg:px-12">
				{/*Espacio donde se encuentra Barra de busqueda*/}
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidde">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<BarraBusqueda /> {/*Barra de busqueda*/}
						{/*Apartado de opciones con botones (Filtro y acciones)*/}
						<div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
							<button className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
								<svg className="h-3.5 w-3.5 mr-2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path clip-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
								</svg>
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
									<th scope="col" className="px-4 py-3">Servicio</th>
									<th scope="col" className="px-4 py-3">Prestador</th>
									<th scope="col" className="px-4 py-3">Estado</th>
									<th scope="col" className="px-4 py-3">
										<span className="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							{/*Aquí se crearán  */}
							<tbody>
								<tr className="border-b dark:border-gray-700">
									<th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">123adc</th>
									<td className="px-4 py-3">Piscologia</td>
									<td className="px-4 py-3">Jorgito Verdugo</td>
									<td className="px-4 py-3">Activo</td>
									<td className="px-4 py-3 flex items-center justify-end">
										<button className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
											<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
											</svg>
										</button>
										< BotonesCrud />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	)
}
export default VistaServicios;