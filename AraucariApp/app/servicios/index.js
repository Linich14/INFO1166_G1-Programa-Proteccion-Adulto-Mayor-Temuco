import { View, Text, Pressable } from "react-native";
import BotonServicio from "../../components/BotonServicio";

export default function Index() {
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
				<BotonServicio
					textClassName="w-1/2 h-20 border-r-2 border-b-2 bg-[#00B2FF]"
					url="/servicios/Peluqueria"
					nombre="Peluqueria"
				/>
				<BotonServicio
					textClassName="w-1/2 h-20 border-b-2 bg-white"
					url="/servicios/Kinesiologia"
					nombre="Kinesiologia"
				/>
				<BotonServicio
					textClassName="w-1/2 h-20 border-r-2 border-b-2 bg-[#FF6060]"
					url="/servicios/Abogado"
					nombre="Abogado"
				/>
				<BotonServicio
					textClassName="w-1/2 h-20 border-b-2 bg-[#FF7D04]"
					url="/servicios/Podologia"
					nombre="Podologia"
				/>
				<BotonServicio
					textClassName="w-1/2 h-20 border-r-2 border-b-2 bg-[#E1F352]"
					url="/servicios/Asitente Social"
					nombre="Asistente Social"
				/>
				<BotonServicio
					textClassName="w-1/2 h-20 border-b-2 bg-[#4D8B1E]"
					url="/servicios/Psicologia"
					nombre="Psicologia"
				/>
				<BotonServicio
					textClassName="w-1/2 h-20 border-r-2 bg-[#908D8D]"
					url="/servicios/Fonoaudiologia"
					nombre="Fonoaudiologia"
				/>
				<BotonServicio
					textClassName="w-1/2 h-20 bg-[#322CDB]"
					url="/servicios/SalidaTerreno"
					nombre="Salida a Terreno"
				/>
			</View>
		</View>
	);
}
