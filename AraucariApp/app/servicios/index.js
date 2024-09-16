import { View, Text, Pressable } from "react-native";
import BotonServicio from "../../components/BotonServicio";
import { list } from "postcss";

export default function Index() {
	const servicios = [
		["Peluqueria", "bg-[#00B2FF]"],
		["Kinesiologo", "bg-white"],
		["Abogado", "bg-[#FF6060]"],
		["Podologo", "bg-[#FF7D04]"],
		["Asistente_Social", "bg-[#E1F352]"],
		["Psicologia", "bg-[#4D8B1E]"],
		["Fonoaudiologo", "bg-[#908D8D]"],
		["Salida_Terreno", "bg-[#322CDB]"],
	];

	const borderReturn = (index) => {
		if (index % 2 == 0) {
			return "border-b-2 border-r-2";
		} else {
			return "border-b-2";
		}
	};

	const listaImagenes = {
		Abogado: require("../../assets/ServiciosIcons/Abogado.png"),
		Asistente_Social: require("../../assets/ServiciosIcons/Asistente_Social.png"),
		Fonoaudiologo: require("../../assets/ServiciosIcons/Fonoaudiologo.png"),
		Kinesiologo: require("../../assets/ServiciosIcons/Kinesiologo.png"),
		Peluqueria: require("../../assets/ServiciosIcons/Peluqueria.png"),
		Podologo: require("../../assets/ServiciosIcons/Podologo.png"),
		Psicologia: require("../../assets/ServiciosIcons/Psicologia.png"),
		Salida_Terreno: require("../../assets/ServiciosIcons/Salida_Terreno.png"),
	};

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
				{servicios.map((servicio, index) => (
					<BotonServicio
						textClassName={`w-1/2 h-20 ${borderReturn(index)} ${servicio[1]}`}
						url={`/servicios/${servicio[0]}`}
						dirImagen={listaImagenes[servicio[0]]}
						nombre={servicio[0].replace("_", " ")}
						key={index}
					/>
				))}
			</View>
		</View>
	);
}
