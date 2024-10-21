import React, { useEffect, useState } from "react";
import axios from "axios";

const apiIp = import.meta.env.VITE_API_IP;

export default function VerCalendarios() {
	const [calendarios, setCalendarios] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState(null);
	const [pagina, setPagina] = useState(0);
	const elementosPorPagina = 4;

	const handleNextPage = () => {
		if (pagina < Math.ceil(calendarios.length / elementosPorPagina) - 1) {
			setPagina(pagina + 1);
		}
	};

	const handlePrevPage = () => {
		if (pagina > 0) {
			setPagina(pagina - 1);
		}
	};

	const handleDelete = async (id) => {
		if (
			window.confirm("¿Estás seguro de que deseas eliminar este calendario?")
		) {
			try {
				await axios.delete(`${apiIp}/api/calendario/?id=${id}`);
				setCalendarios(
					calendarios.filter((calendario) => calendario.id !== id)
				);
			} catch (err) {
				setError("Error al eliminar el calendario");
			}
		}
	};

	useEffect(() => {
		const fetchCalendarios = async () => {
			try {
				const response = await axios.get(`${apiIp}/api/calendario/`);
				setCalendarios(response.data);
				setCargando(false);
			} catch (err) {
				setError("Error al obtener los calendarios");
				setCargando(false);
			}
		};

		fetchCalendarios();
	}, []);

	if (cargando) return <p>Cargando calendarios...</p>;

	if (error) return <p>{error}</p>;

	return (
		<div className="p-1">
			<h1 className="text-center text-2xl font-bold text-blue-500 mb-2">
				Calendarios
			</h1>
			<ul className="list-none">
				{calendarios
					.slice(pagina * elementosPorPagina, (pagina + 1) * elementosPorPagina)
					.map((calendario) => (
						<li
							key={calendario.id}
							className="bg-white mb-3 p-2 rounded-lg shadow-md border-l-4 border border-blue-500"
						>
							<div className="flex items-center place-content-between">
								<strong className="text-lg font-semibold text-gray-800">
									{calendario.nombre}
								</strong>
								<button
									onClick={() => handleDelete(calendario.id)}
									className=" px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
								>
									Eliminar
								</button>
							</div>
							<p className="mt-1 text-gray-600">{calendario.descripcion}</p>
						</li>
					))}
			</ul>
			<div className="flex items-center justify-center space-x-2 mt-4">
				<button
					onClick={handlePrevPage}
					className={`px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-blue-500 hover:text-white ${
						pagina === 0 &&
						"opacity-50 cursor-not-allowed hover:bg-gray-200 hover:text-gray-600"
					}`}
					disabled={pagina === 0}
				>
					Anterior
				</button>

				<span className="text-gray-700 font-medium">
					Página {pagina + 1} de{" "}
					{Math.ceil(calendarios.length / elementosPorPagina)}
				</span>

				<button
					onClick={handleNextPage}
					className={`px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-blue-500 hover:text-white ${
						pagina === Math.ceil(calendarios.length / elementosPorPagina) - 1 &&
						"opacity-50 cursor-not-allowed hover:bg-gray-200 hover:text-gray-600"
					}`}
					disabled={
						pagina === Math.ceil(calendarios.length / elementosPorPagina) - 1
					}
				>
					Siguiente
				</button>
			</div>
		</div>
	);
}
