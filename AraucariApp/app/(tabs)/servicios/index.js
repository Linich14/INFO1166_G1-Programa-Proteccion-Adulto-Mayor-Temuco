import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import BotonServicio from "../../../components/BotonServicio";
import { API_URL } from '@env';

export default function Index() {
	const [servicios, setServicios] = useState([]);
	const [loading, setLoading] = useState(true);

	const listaImagenes = {
		Abogado: require("../../../assets/ServiciosIcons/Abogado.png"),
		"Asistente social": require("../../../assets/ServiciosIcons/Asistente_Social.png"),
		Fonoaudiologo: require("../../../assets/ServiciosIcons/Fonoaudiologo.png"),
		Kinesiologia: require("../../../assets/ServiciosIcons/Kinesiologo.png"),
		Peluqueria: require("../../../assets/ServiciosIcons/Peluqueria.png"),
		Podologo: require("../../../assets/ServiciosIcons/Podologo.png"),
		Psicologia: require("../../../assets/ServiciosIcons/Psicologia.png"),
		"Salida Terreno": require("../../../assets/ServiciosIcons/Salida_Terreno.png"),
	};

	const coloresServicio = {
		Abogado: 'bg-blue-500',
		"Asistente social": 'bg-green-500',
		Fonoaudiologo: 'bg-red-500',
		Kinesiologia: 'bg-yellow-500',
		Peluqueria: 'bg-purple-500',
		Podologo: 'bg-pink-500',
		Psicologia: 'bg-teal-500',
		"Salida Terreno": 'bg-orange-500',
	};

	useEffect(() => {
		fetch(`${API_URL}/api/servicios/nombres`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setServicios(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching services:", error);
				setLoading(false);
			});
	}, []);

	const borderReturn = (index) => {
		return index % 2 === 0 ? "border-b-2 border-r-2" : "border-b-2";
	};

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#00B2FF" />
			</View>
		);
	}

	return (
		<View className="h-screen">
			<View className="mb-3 bg-muni-50 py-2">
				<View className="rounded-full bg-white mx-auto w-2/3">
					<Text className="text-2xl font-bold text-gris-50 text-center px-2a">
						Lista de Servicios
					</Text>
				</View>
			</View>
			<View className="w-9/12 flex-row flex-wrap mx-auto border-2 rounded-2xl overflow-hidden">
				{servicios.map((servicio, index) => {
					const colorFondo = coloresServicio[servicio.nombre] || 'bg-white'; // Color por defecto si no se encuentra el servicio
					return (
						<BotonServicio
							textClassName={`w-1/2 h-20 ${borderReturn(index)} ${colorFondo}`}
							url={`/servicios/${servicio.nombre}`}
							dirImagen={listaImagenes[servicio.nombre] || listaImagenes["Default"]}
							nombre={servicio.nombre}
							key={servicio.id}
						/>
					);
				})}
			</View>
		</View>
	);
}
