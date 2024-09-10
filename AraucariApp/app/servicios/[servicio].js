import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function Servicio() {
	const { servicio } = useLocalSearchParams();
	return (
		<View>
			<Text>Servicio de {servicio}</Text>
		</View>
	);
}
