import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../UI/Toast";

const apiIp = import.meta.env.VITE_API_IP;

export default function InvitarCalendario() {
	const [visibilidad, setVisibilidad] = useState(false);
	const [respuesta, setRespuesta] = useState({ mensaje: "", tipo: "" });

	const [formData, setFormData] = useState({
		idCalendario: "",
		email: "",
		rol: "",
	});

	const [calendarios, setCalendarios] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${apiIp}/api/calendario/invitar/`,
				formData
			);

			setRespuesta(response.data);
			setVisibilidad(true);
		} catch (error) {
			console.error("Error al enviar el formulario:", error);
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
				<label htmlFor="id" className="block text-gray-700 font-bold mb-2">
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
				<label htmlFor="email" className="block text-gray-700 font-bold mb-2">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Ingrese el email"
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="rol" className="block text-gray-700 font-bold mb-2">
					Rol
				</label>
				<select
					id="rol"
					name="rol"
					value={formData.rol}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
				>
					<option value="" disabled>
						Selecciona un rol
					</option>
					<option value="owner">Propietario</option>
					<option value="writer">Escritor</option>
					<option value="reader">Lector</option>
				</select>
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
