import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { Button, Chip } from "react-native-paper";
import Calendario from "../../../components/Calendario";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styled } from "nativewind";

export default function Servicio() {
	const { servicio } = useLocalSearchParams();
	const [visible, setVisible] = useState(true);
	const [seleccionado, setSeleccionado] = useState("");
	const [fecha, setFecha] = useState(new Date());

	const horarios = [
		"08:00 AM",
		"08:30 AM",
		"09:00 AM",
		"09:30 AM",
		"10:00 AM",
		"10:30 AM",
	];
	const desabilitados = [false, true, false, false, false, false];

	const StyledIcon = styled(MaterialIcons);

	const horarioAgendado = () => {
		Alert.alert(
			`Agendado para ${servicio}`,
			`El dia ${fecha.getDate()} de ${fecha.getMonth()} a las ${seleccionado}`,
			[{ text: "Continuar" }]
		);
	};

	const obtenerColor = (desabilitado, seleccionado) => {
		if (desabilitado) return "#9D9D9D";
		else if (seleccionado) return "#FFB236";
		else return "#0071CE";
	};

	return (
		<View className="w-full h-screen">
			<View className="bg-muni-50 py-2">
				<View className="rounded-full bg-white mx-auto w-2/3">
					<Text className="text-2xl font-bold text-gris-50 text-center px-1">
						{servicio}
					</Text>
				</View>
			</View>
			<View className=" flex p-1 px-2 bg-muni-50 border-y-2 border-white">
				<Pressable
					className="flex-row items-center border-white border px-2 mr-auto rounded-full"
					onPress={() => setVisible(!visible)}
				>
					<Text className="text-white text-center ml-1">Seleccionar Fecha</Text>
					{visible ? (
						<StyledIcon
							name="arrow-drop-down"
							className="text-2xl text-white"
						/>
					) : (
						<StyledIcon name="arrow-right" className="text-2xl text-white" />
					)}
				</Pressable>
			</View>
			{visible ? (
				<View className="bg-muni-50 py-2 rounded-b-2xl">
					<Calendario actualizarFecha={setFecha} />
				</View>
			) : (
				<></>
			)}

			<View className="flex-1">
				<View className="bg-white rounded-r-full mr-auto my-2 px-10">
					<Text className="p-1 font-bold text-lg">
						Horas disponibles
					</Text>
				</View>

				<View className="flex-row flex-wrap gap-2 justify-center mb-2">
					{horarios.map((horario, index) => (
						<Chip
							key={index}
							selected={seleccionado.includes(horario)}
							className="rounded-[32px]"
							onPress={() => setSeleccionado(horario)}
							showSelectedCheck={false}
							disabled={desabilitados[index]}
							style={{
								backgroundColor: obtenerColor(
									desabilitados[index],
									seleccionado.includes(horario)
								),
							}}
						>
							<Text className="text-white font-bold">{horario}</Text>
						</Chip>
					))}
				</View>
				<Button
					className="bg-green-700 mx-auto px-3"
					onPress={() => horarioAgendado()}
				>
					<Text className="text-white">Reservar</Text>
				</Button>
			</View>
		</View>
	);
}
