import React, { useState } from "react";
import { VerificarIcon, CancelarIcon, SalirIcon } from "./SVG/AutorizarIcons";
import axios from "axios";

const apiIp = import.meta.env.VITE_API_IP;

function AutorizarUsuario({ usuario, setValores, calculadorEdad }) {
	// estado del componente, inicializado en falso y el mensaje vacío
	const [showPopup, setShowPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState("");
	const [persona, setPersona] = useState(usuario);

	//funcion para el pop up autorizar, se activa cuando se da click en el boton
	const handleAutorizar = async () => {
		try {
			const respuesta = await axios.patch(`${apiIp}/api/auth/usuariosLista/`, {
				...persona,
				autorizado: 1,
			});
			console.log(respuesta.data);
			if (respuesta === 200) {
				setValores(null);
			}
		} catch (error) {
			console.error(error);
		}
		setPopupMessage(`Confirmacion de Autorizacion`);
	};

	// popup para denegar
	const handleDenegar = async () => {
		try {
			let { rut } = persona;
			const respuesta = await axios.delete(`${apiIp}/api/auth/usuariosLista/`, {
				data: { rut },
			});
			console.log(respuesta.data);
			if (respuesta === 200) {
				setValores(null);
			}
		} catch (error) {
			console.error(error);
		}
		setPopupMessage(`Confirmacion de Denegacion`);
	};

	return (
		<div className="grid grid-cols-1 grid-rows-2 h-full">
			<div className="grid grid-cols-2 bg-white p-4 rounded-lg shadow-sm content-center autorizarusuarioTOP justify-center">
				<div className="text-center self-center">
					<h1 className="text-3xl font-bold p-1">Validacion de Usuario</h1>
				</div>
				<div className="flex justify-end">
					<button
						className="flex bg-[#0071CE] rounded-lg text-white p-2 items-center text-3xl font-bold m-2 gap-2"
						onClick={handleAutorizar}
					>
						<VerificarIcon />
						Autorizar
					</button>
					<button
						className="flex bg-[#0071CE] rounded-lg text-white p-2 items-center text-3xl font-bold m-2 gap-2"
						onClick={handleDenegar}
					>
						<CancelarIcon />
						Denegar
					</button>
				</div>
			</div>
			<div className="grid grid-cols-2 grid-rows-6  autorizarusuarioAbajo pt-2 -mt-64">
				<div className="row-span-2 container mx-auto p-4 bg-white shadow-sm rounded-lg">
					<h2 className="text-2xl font-bold mb-4">Datos Personales</h2>
					<div className="mb-4">
						<p className="text-gray-700 pb-1">
							<span className="font-bold pr-2">Nombres:</span> {persona.nombre}
						</p>
						<hr className="h-px  bg-gray-900 border-1" />
					</div>
					<div className="mb-4">
						<p className="text-gray-700 pb-1">
							<span className="font-bold pr-2">Apellidos:</span>{" "}
							{persona.apellido}
						</p>
						<hr className="h-px  bg-gray-900 border-1" />
					</div>
					<div className="mb-4">
						<p className="text-gray-700 pb-1">
							<span className="font-bold pr-2">Rut:</span> {persona.rut}
						</p>
						<hr className="h-px  bg-gray-900 border-1" />
					</div>
					<div className="mb-4">
						<p className="text-gray-700 pb-1">
							<span className="font-bold pr-2">Edad: </span>{" "}
							{calculadorEdad(persona.nacimiento)}
						</p>
						<hr className="h-px  bg-gray-900 border-1" />
					</div>
					<div className="mb-4">
						<p className="text-gray-700 pb-1">
							<span className="font-bold pr-2">F. Nac.:</span>{" "}
							{persona.nacimiento}
						</p>
						<hr className="h-px  bg-gray-900 border-1" />
					</div>
				</div>

				<div className="col-start-1 row-span-1 mt-3">
					<div className="container mx-auto p-4 bg-white shadow-sm rounded-lg">
						<div className="mb-4">
							<p className="text-gray-700 pb-1">
								<span className="font-bold pr-2">Direccion: </span>{" "}
								{persona.direccion}
							</p>
							<hr className="h-px  bg-gray-900 border-1" />
						</div>
						<div className="mb-4">
							<p className="text-gray-700 pb-1">
								<span className="font-bold pr-2">Sector: </span>{" "}
								{persona.sector}
							</p>
							<hr className="h-px  bg-gray-900 border-1" />
						</div>
						<div className="">
							<p className="text-gray-700 pb-1">
								<span className="font-bold pr-2">Ciudad: </span>{" "}
								{persona.ciudad}
							</p>
							<hr className="h-px  bg-gray-900 border-1" />
						</div>
					</div>
				</div>

				<div className="col-start-1 row-span-1 mt-3">
					<div className="container mx-auto p-4 bg-white shadow-sm rounded-lg">
						<div className="mb-4">
							<p className="text-gray-700 pb-1">
								<span className="font-bold pr-2">Discapacidad: </span>{" "}
								{persona.condicion}
							</p>
							<hr className="h-px  bg-gray-900 border-1" />
						</div>
						<div className="">
							<p className="text-gray-700 pb-1">
								<span className="font-bold pr-2">Condicion: </span>{" "}
								{persona.condicion}
							</p>
							<hr className="h-px  bg-gray-900 border-1" />
						</div>
					</div>
				</div>

				<div className="col-start-2 row-start-1 row-span-2 flex bg-white ml-3 rounded-lg shadow-sm items-center justify-center pt-2 ">
					<img className="" alt="" />
					<h1 className="text-3xl font-bold">Foto de Carnet</h1>
				</div>
				{/*
				{showPopup && (
					<div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
						<div className="flex flex-col bg-white rounded-lg p-4 ">
							<h2 className="text-2xl font-bold mb-3">{popupMessage}</h2>

							<p className="text-gray-700 font-bold">Datos del usuario:</p>
							<ul className="pb-2 pl-2 ">
								<li>
									<span className="font-bold">Nombre:</span> {persona.nombre}
								</li>
								<li>
									<span className="font-bold">Apellido:</span>{" "}
									{persona.apellido}
								</li>
								<li>
									<span className="font-bold">RUT:</span> {persona.rut}
								</li>
								<li>
									<span className="font-bold">Fecha de nacimiento:</span>{" "}
									{persona.nacimiento}
								</li>
								<li>
									<span className="font-bold">Edad:</span>{" "}
									{calculadorEdad(persona.nacimiento)}
								</li>
								<li>
									<span className="font-bold">Dirección:</span>{" "}
									{persona.direccion}
								</li>
								<li>
									<span className="font-bold">Sector:</span> {persona.sector}
								</li>
								<li>
									<span className="font-bold">Ciudad:</span> {persona.ciudad}
								</li>
								<li>
									<span className="font-bold">Discapacidad:</span>{" "}
									{persona.discapacidad}
								</li>
								<li>
									<span className="font-bold">Condición:</span>{" "}
									{persona.condicion}
								</li>
							</ul>
							<div className="flex gap-3 mx-auto">
								<button
									className="bg-[#0071CE] rounded-lg text-white p-2 items-center text-2xl font-bold"
									onClick={handleAutorizar}
								>
									Aceptar
								</button>
								<button
									className="bg-[#0071CE] rounded-lg text-white p-2 items-center text-2xl font-bold"
									onClick={() => setShowPopup(false)}
								>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				)}*/}
			</div>
		</div>
	);
}

export default AutorizarUsuario;
