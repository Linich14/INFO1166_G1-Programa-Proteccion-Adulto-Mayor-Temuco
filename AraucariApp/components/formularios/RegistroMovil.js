import * as React from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Alert,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styled } from "nativewind";

export default function RegistroMovil() {
	const StyledIcon = styled(MaterialIcons);

	const [nombre, setNombre] = React.useState(null);
	const [apellido, setApellido] = React.useState(null);
	const [correo, setCorreo] = React.useState(null);
	const [contraseña, setContraseña] = React.useState(null);
	const [repitaContraseña, setRepitaContraseña] = React.useState(null);

	const createTwoButtonAlert = () => {
		Alert.alert(
			"Se a iniciado sesion",
			`Nombre: ${nombre} \nApellido: ${apellido} \nCorreo: ${correo} \nContraseña: ${contraseña} \nRepita Contraseña: ${repitaContraseña}`,
			[
				{
					text: "Cancelar",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{ text: "Continuar", onPress: () => console.log("OK Pressed") },
			]
		);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1"
			>
				<Text
					className="text-gris-50 p-2 px-16 ml-auto rounded-l-full text-2xl font-bold mb-auto"
					style={{ backgroundColor: "#E4E4E4", elevation: 10 }}
				>
					Registro
				</Text>

				<View
					className="w-5/6 border-2 border-gris-100 rounded-r-3xl h-max"
					style={{ backgroundColor: "#EBEBEB" }}
				>
					<Pressable
						className="flex flex-row items-center border-b-2 border-gris-100 gap-1"
						children
						focus
					>
						<StyledIcon name="person-2" className="text-3xl text-gris-50" />
						<TextInput
							keyboardType="text"
							placeholder="Nombre"
							className="flex-1 pr-3 py-2 text-lg text-gris-50"
							onChangeText={setNombre}
							value={nombre}
						/>
					</Pressable>
					<Pressable
						className="flex flex-row items-center border-b-2 border-gris-100 gap-1"
						children
					>
						<StyledIcon name="person-2" className="text-3xl text-gris-50" />
						<TextInput
							placeholder="Apellido"
							className="flex-1 pr-3 py-2 text-lg text-gris-50"
							onChangeText={setApellido}
							value={apellido}
						/>
					</Pressable>

					<Pressable
						className="flex flex-row items-center border-b-2 border-gris-100 gap-1"
						children
					>
						<StyledIcon name="email" className="text-3xl text-gris-50" />
						<TextInput
							placeholder="Correo"
							className="flex-1 pr-3 py-2 text-lg text-gris-50"
							onChangeText={setCorreo}
							value={correo}
						/>
					</Pressable>

					<Pressable
						className="flex flex-row items-center border-b-2 border-gris-100 gap-1"
						children
					>
						<StyledIcon name="lock" className="text-3xl text-gris-50" />
						<TextInput
							placeholder="Contraseña"
							className="flex-1 pr-3 py-2 text-lg text-gris-50"
							onChangeText={setContraseña}
							value={contraseña}
						/>
					</Pressable>

					<Pressable className="flex flex-row items-center gap-1" children>
						<StyledIcon name="lock" className="text-3xl text-gris-50" />
						<TextInput
							placeholder="Repita Contaseña"
							className="flex-1 pr-3 py-2 text-lg text-gris-50"
							onChangeText={setRepitaContraseña}
							value={repitaContraseña}
						/>
					</Pressable>
				</View>
				<View className="flex flex-col mx-auto mt-2 mb-auto">
					<Pressable
						className="w-fit bg-muni-50 p-3 px-6 rounded-full items-center mb-1"
						onPress={createTwoButtonAlert}
					>
						<Text className="text-white font-bold text-xl">Registrarse</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
}
