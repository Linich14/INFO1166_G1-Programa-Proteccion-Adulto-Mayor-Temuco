import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import AutorizarUsuario from "../AutorizarUsuario";
import { SalirIcon } from "../SVG/AutorizarIcons";

const apiIp = import.meta.env.VITE_API_IP;

export default function ListaUsuario() {
	const [usuarios, setUsuarios] = useState([]);
	const [datosUsuario, setDatosUsuario] = useState(null);
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState(null);

	function calcularEdad(fechaNacimiento) {
		const hoy = new Date();
		const nacimiento = new Date(fechaNacimiento);

		let edad = hoy.getFullYear() - nacimiento.getFullYear();

		const mes = hoy.getMonth() - nacimiento.getMonth();
		if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
			edad--;
		}
		return edad;
	}

	useEffect(() => {
		const ObtenerUsuarios = async () => {
			try {
				const response = await axios.get(`${apiIp}/api/auth/usuariosLista/`);
				console.log(response.data);
				setUsuarios(response.data);
				setCargando(false);
			} catch (err) {
				setError("Error al obtener los calendarios");
				setCargando(false);
			}
		};

		ObtenerUsuarios();
	}, []);

	if (cargando) return <p>Cargando usuarios...</p>;

	return (
		<div className="flex flex-col bg-[#EBEFF0] h-screen p-4 gap-3 w-full">
			<div className="bg-white h-fit rounded-lg py-4 shadow-md">
				<h1 className="text-3xl font-bold p-1 text-center">
					Autorizacion de Usuarios
				</h1>
			</div>
			<div className="flex bg-white h-fit rounded-lg py-4 shadow-md p-4">
				<div className="flex flex-col w-1/2 max-w-4xl p-6 bg-white border shadow-sm rounded-lg">
					<h2 className="text-2xl font-bold mb-4 self-center">
						Listado de Usuarios
					</h2>
					<table className="min-w-full border-collapse">
						<thead>
							<tr>
								<th className="border-b px-4 py-2 text-left">Nombre</th>
								<th className="border-b px-4 py-2 text-left">Apellido</th>
								<th className="border-b px-4 py-2 text-left">Rut</th>
								<th className="border-b px-4 py-2 text-left">Sector</th>
								<th className="border-b px-4 py-2 text-left">Edad</th>
								<th className="border-b px-4 py-2 text-left">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{usuarios.map((usuario) => (
								<tr key={usuario.id} className="hover:bg-gray-100">
									<td className="border-b px-4 py-2">{usuario.nombre}</td>
									<td className="border-b px-4 py-2">{usuario.apellido}</td>
									<td className="border-b px-4 py-2">{usuario.rut}</td>
									<td className="border-b px-4 py-2">{usuario.sector}</td>
									<td className="border-b px-4 py-2">
										{calcularEdad(usuario.nacimiento)}
									</td>
									<td className="border-b px-4 py-2">
										<button
											onClick={() => setDatosUsuario(usuario)}
											className="text-black rounded-full bg-amber-500 py-1 px-3 hover:underline mr-2 font-bold"
										>
											Validar
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{datosUsuario && (
				<div className="fixed inset-0 flex items-center h-5/6  w-1/2 mx-auto my-auto">
					<button
						className="absolute  top-0 right-0 m-1 bg-white bg-opacity-40 fill-slate-700 rounded-lg text-white items-center text-lg font-bold gap-2"
						onClick={() => setDatosUsuario(null)}
					>
						<SalirIcon />
					</button>

					<div className="rounded-lg shadow-lg p-6 w-full h-full bg-[#EBEFF0]">
						<AutorizarUsuario
							usuario={datosUsuario}
							setValores={setDatosUsuario}
							calculadorEdad={calcularEdad}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
