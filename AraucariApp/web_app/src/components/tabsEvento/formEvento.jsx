import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../UI/Toast";

const apiIp = import.meta.env.VITE_API_IP;

export default function FormularioEvento() {
	const [visibilidad, setVisibilidad] = useState(false);
	const [respuesta, setRespuesta] = useState({ mensaje: "", tipo: "" });

	const [formData, setFormData] = useState({
		idCalendario: "",
		nombre: "",
		descripcion: "",
		fechaInicio: "",
		duracionMinutos: 0,
		invitados: [],
		localizacion: "",
		recordatorio: false,
	});

	const [calendarios, setCalendarios] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		try {
			const response = await axios.post(
				`${apiIp}/api/calendario/evento/`,
				formData
			);

			setRespuesta(response.data);
			setVisibilidad(true);
		} catch (error) {
			setRespuesta({ mensaje: "Error al crear el evento", tipo: "error" });
			setVisibilidad(true);
		}
	};

	useEffect(() => {
		const fetchCalendarios = async () => {
			try {
				const response = await axios.get(`${apiIp}/api/calendario/`);
				setCalendarios(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error al cargar los calendarios:", error);
				setLoading(false);
			}
		};

		fetchCalendarios();
	}, []);

	return (
		<form onSubmit={handleSubmit} className="mx-auto bg-white p-2 rounded-md">
			<div className="mb-4">
				<label
					htmlFor="idCalendario"
					className="block text-gray-700 font-bold mb-2"
				>
					Calendario
				</label>
				<select
					id="idCalendario"
					name="idCalendario"
					value={formData.idCalendario}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
				>
					<option value="" disabled>
						{loading ? "Cargando calendarios..." : "Seleccione calendario"}
					</option>
					{!loading &&
						calendarios.map((calendario) => (
							<option key={calendario.id} value={calendario.id}>
								{calendario.nombre}
							</option>
						))}
				</select>
			</div>

			<div className="mb-4">
				<label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
					Nombre
				</label>
				<input
					type="text"
					id="nombre"
					name="nombre"
					value={formData.nombre}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Nombre del calendario"
				/>
			</div>

			<div className="mb-4">
				<label
					htmlFor="descripcion"
					className="block text-gray-700 font-bold mb-2"
				>
					Descripción
				</label>
				<textarea
					id="descripcion"
					name="descripcion"
					value={formData.descripcion}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Descripción del calendario"
				/>
			</div>

			<div className="flex mb-4 gap-2">
				<div className="flex-col mb-4 basis-1/2">
					<label
						htmlFor="fechaInicio"
						className="block text-gray-700 font-bold mb-2"
					>
						Fecha de inicio
					</label>
					<input
						type="datetime-local"
						id="fechaInicio"
						name="fechaInicio"
						value={formData.fechaInicio}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="flex-col mb-4 basis-1/2">
					<label
						htmlFor="duracionMinutos"
						className="block text-gray-700 font-bold mb-2"
					>
						Duración (minutos)
					</label>
					<select
						id="duracionMinutos"
						name="duracionMinutos"
						value={formData.duracionMinutos}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
					>
						<option value="" disabled>
							Selecciona la duración
						</option>
						<option value={15}>15 minutos</option>
						<option value={30}>30 minutos</option>
						<option value={45}>45 minutos</option>
						<option value={60}>60 minutos</option>
					</select>
				</div>
			</div>

			<div className="mb-4">
				<label
					htmlFor="invitados"
					className="block text-gray-700 font-bold mb-2"
				>
					Invitados
				</label>
				<input
					type="text"
					id="invitados"
					name="invitados"
					value={formData.invitados}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Ingrese Email del invitado"
				/>
			</div>

			<div className="mb-4">
				<label
					htmlFor="localizacion"
					className="block text-gray-700 font-bold mb-2"
				>
					Localización
				</label>
				<select
					id="localizacion"
					name="localizacion"
					value={formData.localizacion}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
				>
					<option value="" disabled>
						Selecciona una localización
					</option>
					<option value="Centro">Centro</option>
					<option value="Amanecer">Amanecer</option>
					<option value="ElCarmen">El Carmen</option>
					<option value="Labranza">Labranza</option>
					<option value="PedroDeValdivia">Pedro de Valdivia</option>
					<option value="Poniente">Poniente</option>
					<option value="PuebloNuevo">Pueblo Nuevo</option>
					<option value="SantaRosa">Santa Rosa</option>
				</select>
			</div>

			<div className="mb-4">
				<label
					htmlFor="recordatorio"
					className="block text-gray-700 font-bold mb-2"
				>
					Recordatorio
				</label>
				<input
					type="checkbox"
					id="recordatorio"
					name="recordatorio"
					checked={formData.recordatorio}
					onChange={handleChange}
					className="mr-2"
				/>
				<span>Activar recordatorio</span>
			</div>

			<button
				type="submit"
				className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				Enviar
			</button>
			<Toast
				respuesta={respuesta}
				visibilidad={visibilidad}
				funcVisibilidad={setVisibilidad}
			/>
		</form>
	);
}
