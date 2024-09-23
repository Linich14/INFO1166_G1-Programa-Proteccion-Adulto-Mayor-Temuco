import { useRef, useState } from "react";
import { Link } from "expo-router";
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { styled } from "nativewind";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Svg, { Ellipse } from "react-native-svg";

export default function Login() {
	const StyledIcon = styled(MaterialIcons);

	const userInputRef = useRef(null);
	const passwordInputRef = useRef(null);

	const [name, onChangeName] = useState("");
	const [password, onChangepassword] = useState("");

	const createTwoButtonAlert = () => {
		Alert.alert(
			"Se a iniciado sesion",
			`Su nombre es ${name} \ncontraseña ${password}`,
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

	const StyledText = styled(Text);

	return (
		<View className="h-screen ">
			<Svg className="w-full h-1/5 ">
				<Ellipse cx="70" cy="5" ry="89" rx="103" fill="#FFB236" />
				<Ellipse cx="180" cy="-20" ry="89" rx="103" fill="#0071CE" />
			</Svg>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="h-3/5 flex flex-col "
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View className="h-full flex flex-col">
						<Text
							className="text-black p-2 px-12 mt-2 ml-auto rounded-l-full text-2xl font-bold"
							style={{ backgroundColor: "#E4E4E4", elevation: 5 }}
						>
							Inicio de Sesión
						</Text>

						<View className="flex flex-col w-3/4 mb-2 mt-auto rounded-r-3xl border-2 border-gris-100">
							<Pressable
								onPress={() =>
									userInputRef.current && userInputRef.current.focus()
								}
								className="flex flex-row items-center gap-1 border-b-2 border-gris-100"
							>
								<StyledIcon name="person" className="text-3xl text-gris-50" />
								<TextInput
									keyboardType="text"
									ref={userInputRef}
									onChangeText={onChangeName}
									value={name}
									placeholder="Usuario"
									className="text-xl font-bold flex-1 py-2 text-gris-50"
								/>
							</Pressable>

							<Pressable
								onPress={() =>
									passwordInputRef.current && passwordInputRef.current.focus()
								}
								className="flex flex-row items-center gap-1 "
							>
								<StyledIcon name="lock" className="text-3xl text-gris-50" />
								<TextInput
									keyboardType="text"
									ref={passwordInputRef}
									onChangeText={onChangepassword}
									value={password}
									placeholder="Contraseña"
									className="flex-1 text-xl font-bold py-2 text-gris-50"
								/>
							</Pressable>
						</View>
						<Link
							className="w-fit ml-auto text-lg text-blue-600 underline underline-offset-3 mx-auto"
							href="password_recovery"
						>
							<Text>¿Olvidaste tu contraseña?</Text>
						</Link>
						<View className="flex flex-col mx-auto mb-auto">
							<Pressable
								className="w-fit bg-muni-50 p-3 px-5 rounded-full items-center mb-1"
								onPress={createTwoButtonAlert}
							>
								<Text className="text-white font-bold text-xl">
									Iniciar Sesion
								</Text>
							</Pressable>
							<Pressable
								className="w-fit bg-muni-50 p-3 px-5 rounded-full items-center"
								children
							>
								<Link href="sign_up" className="text-white font-bold text-xl">
									Registrarse
								</Link>
							</Pressable>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
			<View className="flex h-1/5 relative" keyboardVerticalOffset={200}>
				<Pressable className="w-fit absolute mx-auto mt-2 ml-5 bg-red-600 p-4 rounded-3xl z-10">
					<Text className="text-xl font-bold text-white">Solicitar Ayuda</Text>
				</Pressable>
				<Svg className="w-full h-full">
					<Ellipse cx="350" cy="120" ry="115" rx="134" fill="#0071CE" />
					<Ellipse cx="220" cy="140" ry="89" rx="103" fill="#FFB236" />
				</Svg>
			</View>
		</View>
	);
}
