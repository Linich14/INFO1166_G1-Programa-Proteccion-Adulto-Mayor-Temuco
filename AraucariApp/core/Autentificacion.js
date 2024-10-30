import { useContext, createContext } from "react";
import { useStorageState } from "./useStorageState";
import { setStorageItemAsync } from "./useStorageState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios from "axios";

const AuthContext = createContext({
	signIn: () => null,
	signOut: () => null,
	session: null,
	usuario: null,
	isLoading: false,
});

export function useSession() {
	const value = useContext(AuthContext);
	if (process.env.NODE_ENV !== "production") {
		if (!value) {
			throw new Error("useSession must be wrapped in a <SessionProvider />");
		}
	}

	return value;
}

export function SessionProvider({ children }) {
	const [[isLoading, session], setSession] = useStorageState("session");

	const signIn = async (accessToken, refreshToken) => {
		try {
			// Aquí podrías validar el token o hacer una llamada a tu API si es necesario

			// Almacenar los tokens en el estado de sesión

			const response = await axios.get(`${API_URL}/api/auth/usuario/`, {
				headers: {
					Authorization: `Bearer ${accessToken}`, // Se envía el token en el encabezado
				},
			});
			const usuario = response.data;
			console.log("Usuario:", usuario);

			const sessionData = {
				accessToken,
				refreshToken,
				usuarioData: usuario,
			};
			setSession(JSON.stringify(sessionData)); // Actualizar el estado de sesión

			// Guardar los tokens en el almacenamiento
			await setStorageItemAsync("accessToken", accessToken);
			await setStorageItemAsync("refreshToken", refreshToken);
			await AsyncStorage.setItem("perfil", JSON.stringify(usuario));
		} catch (error) {
			console.error("Error durante el inicio de sesión:", error);
		}
	};

	const signOut = async () => {
		// Limpiar la sesión y eliminar los tokens del almacenamiento
		setSession(null);
		await setStorageItemAsync("accessToken", null);
		await setStorageItemAsync("refreshToken", null);
	};

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				session,
				usuario: session ? JSON.parse(session).usuarioData : null,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
