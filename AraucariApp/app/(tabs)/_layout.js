import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet, BackHandler, Alert } from "react-native";
import { useEffect } from "react";

export default function TabsLayout() {
	const router = useRouter();

	useEffect(() => {
		const handleBackPress = () => {
			if (router.canGoBack()) {
				router.back();
				return true;
			} else {
				Alert.alert(
					"Confirmar salida",
					"¿Estás seguro de que quieres salir de la aplicación?",
					[
						{
							text: "Cancelar",
							onPress: () => null,
							style: "cancel",
						},
						{
							text: "Salir",
							onPress: () => BackHandler.exitApp(),
							style: "destructive",
						},
					],
				);
				return true;
			}
		};

		const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
		return () => backHandler.remove();
	}, [router]);

	return (
		<View style={styles.container}>
			<Tabs
				initialRouteName="home"
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						backgroundColor: "white",
						elevation: 0,
						height: 65,
						justifyContent: 'space-between',
					},
					tabBarIconStyle: {
						marginTop: 0,
					},
					tabBarItemStyle: {
						borderRadius: 35,
						backgroundColor: "#0071CE",
						marginVertical: 1,
						marginTop: 4,
						marginHorizontal: 4,
					},
					tabBarActiveTintColor: "white",
					tabBarInactiveTintColor: "#9D9D9D",
					tabBarLabelStyle: {
						fontSize: 18,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Inicio",
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="home-outline"
								size={40}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="servicios"
					options={{
						title: "Servicios",
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="briefcase" size={40} color={color} />
						),
					}}
				/>
				{/* Pantallas no usadas */}
				<Tabs.Screen name="index" options={{ href: null }} />
				<Tabs.Screen name="agenda" options={{ href: null }} />
				<Tabs.Screen name="reagendar" options={{ href: null }} />
			</Tabs>
			{/* Botón personalizado de Volver */}
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => {
					if (router.canGoBack()) {
						router.back();
					} else {
						Alert.alert(
							"Confirmar salida",
							"¿Estás seguro de que quieres salir de la aplicación?",
							[
								{
									text: "Cancelar",
									onPress: () => null,
									style: "cancel",
								},
								{
									text: "Salir",
									onPress: () => BackHandler.exitApp(),
									style: "destructive",
								},
							],
						);
					}
				}}
			>
				<MaterialCommunityIcons name="arrow-left" size={24} color="white" />
				<Text style={styles.backButtonText}>Volver</Text>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backButton: {
		position: 'absolute',
		bottom: 10,
		left: '47%',
		transform: [{ translateX: -50 }],
		backgroundColor: '#0071CE',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 25,
		flexDirection: 'row',
		alignItems: 'center',
		elevation: 10,
		borderColor: 'white',
		borderWidth: 1,
	},
	backButtonText: {
		color: 'white',
		fontSize: 16,
		marginLeft: 10,
	},
});
