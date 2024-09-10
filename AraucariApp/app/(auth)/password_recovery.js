import React, { useEffect, useState } from "react";
import { Text, View, Pressable, TextInput, BackHandler } from "react-native";
import { Ellipse, Svg } from "react-native-svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styled } from "nativewind";

export default function passwordRecovery() {
	const StyledIcon = styled(MaterialIcons);

	const [correo, setCorreo] = useState("");
	const [codigo, setCodigo] = useState("");
	const [contraseña, setContraseña] = useState("");
	const [repitaContraseña, setRepitaContraseña] = useState("");
	const [mostrar, setMostrar] = useState(false);

	useEffect(() => {
		const accionRetroceso = () => {
			if (mostrar) {
				setMostrar(false);
				setCorreo("");
				return true;
			}
			return false;
		};

		const retrocesoHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			accionRetroceso
		);

		return () => retrocesoHandler.remove();
	}, [mostrar]);

	return (
		<View className="h-screen relative">
			<Svg className="w-full h-1/5 absolute top-0">
				<Ellipse cx="70" cy="5" ry="89" rx="103" fill="#FFB236" />
				<Ellipse cx="180" cy="-20" ry="89" rx="103" fill="#0071CE" />
			</Svg>

			<View className="flex items-center h-3/5 my-auto">
				<Text className="text-2xl font-bold text-gris-50">
					Recuperar Contraseña
				</Text>

				{mostrar ? (
					<View className="flex flex-col ">
						<Text className="text-center mt-2 text-lg text-gris-50">
							Ingrese el codigo que le llego al correo
						</Text>
						<View className="flex flex-col w-full items-center justify-center gap-3">
							<Pressable
								className="flex flex-row items-center border px-2 border-gris-100 rounded-lg w-5/6"
								children
							>
								<StyledIcon name="pin" className="text-3xl text-gris-50 mr-2" />
								<TextInput
									placeholder="Codigo"
									textContentType="cc-number"
									onChangeText={setCodigo}
									value={codigo}
									maxLength={6}
									className="flex-1 pr-3 py-2 text-lg text-gris-50"
									keyboardType="numeric"
								/>
							</Pressable>

							<Pressable
								className="flex flex-row items-center border px-2 border-gris-100 rounded-lg w-5/6 "
								children
							>
								<StyledIcon
									name="lock"
									className="text-3xl text-gris-50 mr-2"
								/>
								<TextInput
									placeholder="Contraseña Nueva"
									className="flex-1 pr-3 py-2 text-lg text-gris-50"
									onChangeText={setContraseña}
									textContentType="password"
									secureTextEntry={true}
									editable={false}
									value={contraseña}
								/>
							</Pressable>
							<Pressable
								className="flex flex-row items-center border px-2 border-gris-100 rounded-lg w-5/6 "
								children
							>
								<StyledIcon
									name="lock"
									className="text-3xl text-gris-50 mr-2"
								/>
								<TextInput
									placeholder="Repita Contraseña"
									className="flex-1 pr-3 py-2 text-lg text-gris-50"
									onChangeText={setRepitaContraseña}
									textContentType="password"
									secureTextEntry={true}
									value={repitaContraseña}
								/>
							</Pressable>
						</View>
						<Pressable className="w-fit bg-muni-50 p-3 px-6 rounded-full items-center mb-1 mt-4">
							<Text className="text-white font-bold text-xl">
								Verificar Codigo
							</Text>
						</Pressable>
					</View>
				) : (
					<View>
						<Text className="text-center mt-2 text-lg text-gris-50 mb-2">
							Ingrese correo electronico
						</Text>
						<Pressable
							className="flex flex-row items-center border px-2 border-gris-100 rounded-lg w-5/6 "
							children
						>
							<StyledIcon name="lock" className="text-3xl text-gris-50 mr-2" />
							<TextInput
								placeholder="Correo"
								className="flex-1 pr-3 py-2 text-lg text-gris-50"
								onChangeText={setCorreo}
								textContentType="email"
								value={correo}
							/>
						</Pressable>
						<View className="flex flex-col mx-auto mt-2 mb-auto">
							<Pressable
								className="w-fit bg-muni-50 p-3 px-6 rounded-full items-center mb-1"
								onPress={() => setMostrar(!mostrar)}
							>
								<Text className="text-white font-bold text-xl">
									Recuperar Contraseña
								</Text>
							</Pressable>
						</View>
					</View>
				)}
			</View>

			<Svg className="w-full h-1/5 absolute bottom-0">
				<Pressable className="w-fit absolute mx-auto mt-2 ml-5 bg-red-600 p-4 rounded-3xl z-10">
					<Text className="text-xl font-bold text-white">Solicitar Ayuda</Text>
				</Pressable>
				<Ellipse cx="350" cy="120" ry="115" rx="134" fill="#0071CE" />
				<Ellipse cx="220" cy="140" ry="89" rx="103" fill="#FFB236" />
			</Svg>
		</View>
	);
}
