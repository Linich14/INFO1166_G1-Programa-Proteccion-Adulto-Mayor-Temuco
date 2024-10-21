import React, { useState } from "react";
import axios from "axios";
import Toast from "../UI/Toast";

const apiIp = import.meta.env.VITE_API_IP;

export default function FormCalendario() {
	const [visibilidad, setVisibilidad] = useState(false);
	const [respuesta, setRespuesta] = useState({ mensaje: "", tipo: "" });

	const [formData, setFormData] = useState({
		nombre: "",
		descripcion: "",
		color: "8",
	});

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
			const response = await axios.post(`${apiIp}/api/calendario/`, formData);
			setRespuesta(response.data);
			setVisibilidad(true);
		} catch (error) {
			setRespuesta({ mensaje: "Error al enviar el formulario", tipo: "error" });
			setVisibilidad(true);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mx-auto bg-white p-2 rounded-md ">
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
					placeholder="Ingrese el nombre del calendario"
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
					placeholder="Escribe una descripción"
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="color" className="block font-bold mb-2">
					Color
				</label>
				<select
					id="color"
					name="color"
					value={formData.color}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
				>
					<option value="8">Azul oscuro</option>
					<option value="9">Gris claro</option>
					<option value="10">Gris oscuro</option>
					<option value="11">Rojo</option>
					<option value="12">Rosa</option>
					<option value="13">Verde claro</option>
					<option value="14">Verde oscuro</option>
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
