import axios from "axios";
import React, { useEffect, useState } from "react";

const apiIp = import.meta.env.VITE_API_IP;

export default function VerEventos() {
	const [calendarios, setCalendarios] = useState([]);
	const [calendario, setCalendario] = useState("");
	const [eventos, setEventos] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCalendarios = async () => {
			try {
				const response = await axios.get(`${apiIp}/api/calendario/`);
				setCalendarios(response.data);
				setCargando(false);

				// Selecciona el primer calendario automáticamente
				if (response.data.length > 0) {
					const primerCalendario = response.data[0].id;
					setCalendario(primerCalendario);
					fetchEventos(primerCalendario);
				}
			} catch (err) {
				setError("Error al obtener los calendarios");
				setCargando(false);
			}
		};

		fetchCalendarios();
	}, []);

	const fetchEventos = async (idCalendario) => {
		setCargando(true);
		try {
			const response = await axios.get(
				`${apiIp}/api/calendario/evento/?idCalendario=${idCalendario}`
			);
			setEventos(response.data);
			setCargando(false);
		} catch (err) {
			setError("Error al obtener los eventos");
			setCargando(false);
		}
	};

	const handleChange = (event) => {
		const selectedCalendario = event.target.value;
		setCalendario(selectedCalendario);
		fetchEventos(selectedCalendario);
	};

	return (
		<div className="flex flex-col p-1">
			<div className="flex justify-between items-center w-full mb-2">
				<h1 className="text-2xl font-bold text-blue-500 text-center flex-grow">
					Eventos
				</h1>
				<div className="flex items-center space-x-2">
					<label htmlFor="idCalendario" className="text-gray-700 font-bold">
						Calendario
					</label>
					<select
						id="idCalendario"
						name="idCalendario"
						value={calendario}
						onChange={handleChange}
						className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
					>
						<option value="" disabled>
							{cargando ? "Cargando calendarios..." : "Seleccione calendario"}
						</option>
						{!cargando &&
							calendarios.map((calendario) => (
								<option key={calendario.id} value={calendario.id}>
									{calendario.nombre}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className="">
				{cargando ? (
					<p className="text-gray-500">Cargando eventos...</p>
				) : (
					<ul className="list-none flex flex-col gap-2">
						{eventos.length > 0 ? (
							eventos.map((evento) => (
								<li
									key={evento.id}
									className="bg-white p-2 rounded-lg shadow-md border-l-4 border border-blue-500"
								>
									<div className="flex justify-between">
										<strong className="text-lg font-semibold text-gray-800">
											{evento.nombre}
										</strong>
										<div className="flex flex-row">
											<p className="text-gray-600 mr-5">
												Fecha: {evento.fecha.toString()}
											</p>
											<p className=" text-gray-600">
												{evento.horaInicio} - {evento.horaFin}
											</p>
										</div>
									</div>
									<p className="mt-1 text-gray-600">{evento.descripcion}</p>
									<p className="mt-1 text-gray-600">
										Localización: {evento.localizacion}
									</p>
								</li>
							))
						) : (
							<p className="text-gray-500 text-center">
								No hay eventos disponibles.
							</p>
						)}
					</ul>
				)}
			</div>
		</div>
	);
}
