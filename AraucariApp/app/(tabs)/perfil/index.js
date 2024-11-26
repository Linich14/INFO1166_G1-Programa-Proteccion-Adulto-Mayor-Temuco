import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	Text,
	TouchableOpacity,
	View,
	Image,
	ScrollView,
	Modal,
	TextInput,
	Alert,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { styled } from "nativewind";
import {
	MaterialIcons,
	Feather,
	MaterialCommunityIcons,
	FontAwesome,
	AntDesign,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "@env";
import * as ImagePicker from "expo-image-picker";
import shadowStyles from "../../styles/shadowStyles";
import { useSession } from "../../../core/Autentificacion";

//
export default function Home() {
	const StyledIcon = styled(MaterialIcons);
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [nombresito, setNombresito] = useState("");
	const [numero, setNumero] = useState("");
	const [correo, setCorreo] = useState("");
	const [nacimiento, setNacimiento] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false); // Nuevo modal para editar datos
	const [image, setImage] = useState(null); // Estado para manejar la imagen seleccionada
	const [reload, setReload] = useState(false);

	const { usuario, session } = useSession();

	// Función para abrir la galería
	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled) {
				const { uri } = result.assets[0];
				const name = uri.split("/").pop(); // Extraer el nombre del archivo de la URI
				const mimeType = "image/jpeg"; // Asumimos que la imagen es JPEG, puedes ajustar si es necesario

				uploadImage(uri, name, mimeType); // Llamar a la función para subir la imagen
			} else {
				console.log("Selección de imagen cancelada");
			}
		} catch (error) {
			console.error("Error al seleccionar imagen:", error);
		}
	};

	// Función para capturar una foto
	const takePhoto = async () => {
		try {
			const { status } = await ImagePicker.requestCameraPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permiso denegado", "Se requiere acceso a la cámara");
				return;
			}

			let result = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled) {
				const { uri } = result.assets[0];
				const name = uri.split("/").pop(); // Extraer el nombre del archivo de la URI
				const mimeType = "image/jpeg"; // Asumimos que la imagen es JPEG, puedes ajustar si es necesario

				uploadImage(uri, name, mimeType); // Llamar a la función para subir la imagen
			} else {
				console.log("Captura de foto cancelada");
			}
		} catch (error) {
			console.error("Error al capturar foto:", error);
		}
	};

	// Función para subir la imagen al servidor
	const uploadImage = async (uri, name, mimeType) => {
		session2 = JSON.parse(session);
		console.log(session2.accessToken);
		try {
			const formData = new FormData();
			formData.append("fotoperfil", {
				uri: uri,
				name: name,
				type: mimeType,
			});

			const response = await fetch(
				`${API_URL}/api/usuario/subir_foto_perfil/`,
				{
					method: "POST",
					body: formData,
					headers: {
						"Content-Type": "multipart/form-data",
						'Authorization': `Bearer ${session2.accessToken}`
					},
				}
			);

			const data = await response.json();

			// Verifica la respuesta del backend
			if (response.ok) {
				// Ahora, solo concatenamos la ruta de la imagen, sin la base
				const fotoPerfilUrl = data.fotoperfil_url;
				setImage(fotoPerfilUrl); // Asignamos la nueva URL de la imagen al estado
				console.log(fotoPerfilUrl);
				alert("Imagen subida con éxito");
			} else {
				alert("Error al subir la imagen");
			}
		} catch (error) {
			console.error("Error al subir la imagen:", error);
		}
	};

	const GetUsuario = async () => {
		const session2 = JSON.parse(session); // Asegurarse de que la sesión esté deserializada
		try {
			const response = await fetch(
				`${API_URL}/api/usuario/usuario/`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${session2.accessToken}`,
					},
				}
			);
	
			const data = await response.json();
	
			if (response.ok) {
				// Guardar los datos obtenidos en AsyncStorage
				await AsyncStorage.setItem(
					"perfil",
					JSON.stringify({
						nombre: data.nombre,
						apellido: data.apellido,
						telefono: data.telefono,
						email: data.email,
						nacimiento: data.nacimiento,
					})
				);
				return data; // Devuelve los datos obtenidos si todo está correcto
			} else {
				// Manejo de errores específicos devueltos por el servidor
				const errorMsg = data.error || "No se pudo obtener los datos del usuario.";
				Alert.alert("Error", errorMsg);
				return null; // Retorna null en caso de error
			}
		} catch (error) {
			console.error("Error al obtener los datos:", error);
			Alert.alert("Error", "Hubo un error al obtener los datos.");
			return null; // Retorna null en caso de error
		}
	};

	const actualizarDatos = async () => {
		session2 = JSON.parse(session);
		try {
			const response = await fetch(
				`${API_URL}/api/usuario/actualizar_usuario/`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						'Authorization': `Bearer ${session2.accessToken}`
					},
					body: JSON.stringify({
						nombre: nombre,
						apellido: apellido,
						telefono: numero,
						email: correo,
					}),
				}
			);
	
			const data = await response.json();
	
			if (response.ok) {
				Alert.alert("Éxito", "Datos actualizados correctamente");
				setEditModalVisible(false); // Cerrar el modal después de la actualización
	
				// Recargar datos desde el servidor y actualizar el estado local
				const usuarioActualizado = await GetUsuario();
				if (usuarioActualizado) {
					setNombre(usuarioActualizado.nombre);
					setApellido(usuarioActualizado.apellido);
					setNumero(usuarioActualizado.telefono);
					setCorreo(usuarioActualizado.email);
					setNacimiento(usuarioActualizado.nacimiento || "");
				}
			} else {
				const errorMsg = data.error || "No se pudo actualizar los datos.";
				Alert.alert("Error", errorMsg);
			}
		} catch (error) {
			console.error("Error al actualizar los datos:", error);
			Alert.alert("Error", "Hubo un error al actualizar los datos.");
		}
	};

	const cargarPerfil = async () => {
		try {
			const perfilGuardado = await AsyncStorage.getItem("perfil");
			if (perfilGuardado) {
				const perfil = JSON.parse(perfilGuardado);
				setNombre(perfil.nombre || "");
				setApellido(perfil.apellido || "");
				setNumero(perfil.telefono || "");
				setCorreo(perfil.email || "");
				setNacimiento(perfil.nacimiento || ""); // Asigna la fecha de nacimiento
				setNombresito(`${perfil.nombre || ""} ${perfil.apellido || ""}`);
			}
		} catch (error) {
			console.error("Error al cargar el perfil:", error);
			Alert.alert("Error", "No se pudo cargar el perfil.");
		}
	};
	// Llama a cargarPerfil en useEffect para cargar los datos al iniciar la app
	useEffect(() => {
		GetUsuario()
		// En caso de que el usuario esté autenticado, cargar el perfil
		if (usuario) {
			cargarPerfil();
		}
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-gray-300">
			<View className="flex-row justify-between items-center bg-[#0060AF] py-2">
				<View
					className="bg-white py-2 rounded-r-full px-3"
					style={shadowStyles.shadow}
				>
					<Text className="text-black text-xl font-bold px-2">
						Bienvenido, {nombre || "Cargando..."} {apellido}
					</Text>
				</View>
				<TouchableOpacity
					className="bg-yellow-500 rounded-l-full p-2"
					style={shadowStyles.shadow}
				>
					<View className="items-center">
						<MaterialIcons
							name="settings"
							size={24}
							color="white"
							className=""
						/>
					</View>
					<Text className="text-white">Ajustes</Text>
				</TouchableOpacity>
			</View>
			<View className="bg-muni-50 rounded-b-2xl py-1 pb-2">
				<View
					className="bg-white py-2 rounded-r-full mb-2 mt-1 mr-28"
					style={shadowStyles.shadow}
				>
					<Text className="text-black text-xl font-bold px-2 text-center">
						Perfil de Usuario
					</Text>
				</View>
				<View className="flex flex-col items-center justify-center pb-2 my-1">
					<View
						className="bg-white p-2 rounded-[12px]"
						style={shadowStyles.shadow}
					>
						<View className="p-1 px-2 mx-2 items-center">
							<View className="flex flex-row static">
								<Image
									className="bg-white rounded-full border-2 border-black"
									source={
										image
											? { uri: image }
											: require("../../../assets/UsersIcons/avatar.png")
									}
									style={{ width: 100, height: 100 }}
								/>
								<TouchableOpacity
									onPress={() => setModalVisible(true)}
									className="bg-yellow-500 rounded-full p-2 absolute"
								>
									<FontAwesome name="pencil" color="white" size={16} />
								</TouchableOpacity>
							</View>
							<Text className="text-center">{nombresito || "Cargando..."}</Text>
						</View>
					</View>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => setModal(false)} // Cerrar el modal al presionar fuera
					>
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "rgba(0, 0, 0, 0.6)",
							}}
						>
							<View className="bg-white p-4 rounded-md">
								<Text className="text-lg font-bold mb-4">
									Cambiar foto de perfil
								</Text>
								<TouchableOpacity
									className="bg-blue-500 p-2 rounded-[32px] mb-2"
									onPress={pickImage}
								>
									<Text className="text-white text-center">
										Elegir de la galería
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									className="bg-blue-500 p-2 rounded-[32px] mb-2"
									onPress={takePhoto}
								>
									<Text className="text-white text-center">Tomar una foto</Text>
								</TouchableOpacity>
								<TouchableOpacity
									className="bg-red-500 p-2 rounded-[32px] mb-2"
									onPress={() => setModalVisible(false)}
								>
									<Text className="text-white text-center">Cancelar</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
					<View>
						<View className="">
							<TouchableOpacity
								className="bg-[#D42B2B] p-2 rounded-[32px] border border-white flex flex-row mt-2"
								style={shadowStyles.shadow}
							>
								<Feather name="lock" color="white" size={16} />
								<Text className="text-white ml-2">Cambiar Contraseña</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
			{/* Separa */}
			<View className="p-2">
				<View
					className="bg-white p-2 rounded-[12px]"
					style={shadowStyles.shadow}
				>
					<View className="p-2 ml-2 flex flex-row justify-between">
						<Text className="font-bold text-2xl">Informacion de la cuenta</Text>
						<TouchableOpacity
							onPress={() => setEditModalVisible(true)}
							className="bg-yellow-500 rounded-full p-2 ml-2"
							style={shadowStyles.shadow}
						>
							<View className="px-4">
								<FontAwesome name="pencil" color="white" size={16} />
							</View>
						</TouchableOpacity>
					</View>
					<Modal
						animationType="slide"
						transparent={true}
						visible={editModalVisible}
						onRequestClose={() => setEditModalVisible(false)} // Cerrar el modal al presionar fuera
					>
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "rgba(0, 0, 0, 0.6)",
							}}
						>
							<KeyboardAvoidingView
								style={{
									backgroundColor: "white",
									padding: 20,
									borderRadius: 10,
								}}
								behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajuste para iOS y Android
							>
								<View className="bg-white p-6 rounded-md">
									<View className="flex flex-row items-center">
										<Text className="text-lg font-bold mb-4 mr-10">
											Editar Información
										</Text>
										<TouchableOpacity
											onPress={() => setEditModalVisible(false)}
											className="bg-red-500 rounded-full p-2 text-center items-center"
										>
											<AntDesign name="close" color="white" size={16} />
										</TouchableOpacity>
									</View>

									<Text className="font-bold">Nombre</Text>
									<TextInput
										className="rounded-full border p-2 m-1"
										value={nombre}
										onChangeText={setNombre}
									/>
									<Text className="font-bold">Apellido</Text>
									<TextInput
										className="rounded-full border p-2 m-1"
										value={apellido}
										onChangeText={setApellido}
									/>

									<Text className="font-bold">Teléfono</Text>
									<TextInput
										className="rounded-full border p-2 m-1"
										value={numero}
										onChangeText={setNumero}
										keyboardType="numeric"
									/>

									<Text className="font-bold">Correo</Text>
									<TextInput
										className="rounded-full border p-2 m-1"
										value={correo}
										onChangeText={setCorreo}
										keyboardType="email-address"
									/>

									<TouchableOpacity
										onPress={actualizarDatos}
										className="bg-blue-500 p-2 rounded-[32px] mb-2"
									>
										<Text className="text-white text-center">Actualizar</Text>
									</TouchableOpacity>
								</View>
							</KeyboardAvoidingView>
						</View>
					</Modal>
					<ScrollView className="p-4">
						<View className="flex flex-row p-1 mb-2">
							<StyledIcon name="person" className=" text-black" size={40} />
							<View className="ml-6">
								<Text>Nombre</Text>
								<Text className="font-bold text-xl">
									{nombre || "Cargando..."}
								</Text>
							</View>
							<View className="ml-8">
								<Text>Apellido</Text>
								<Text className="font-bold text-xl">
									{apellido || "Cargando..."}
								</Text>
							</View>
						</View>
						<View className="flex flex-row p-1 mb-2">
							<Feather name="phone-call" size={40} />
							<View className="ml-6">
								<Text>Numero</Text>
								<Text className="font-bold text-xl">
									{numero || "Cargando..."}
								</Text>
							</View>
						</View>
						<View className="flex flex-row p-1 mb-2">
							<MaterialCommunityIcons name="email" size={40} />
							<View className="ml-6">
								<Text>Correo</Text>
								<Text className="font-bold text-xl">
									{correo || "Cargando..."}
								</Text>
							</View>
						</View>
						<View className="flex flex-row p-1 mb-2">
							<FontAwesome name="birthday-cake" size={40} />
							<View className="ml-6">
								<Text>Fecha de nacimiento</Text>
								<Text className="font-bold text-2xl">
									{nacimiento || "Cargando..."}
								</Text>
							</View>
						</View>
					</ScrollView>
				</View>
			</View>
		</SafeAreaView>
	);
}
