import { Stack } from "expo-router";
import Home from "./(tabs)/home";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function RootLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
		</Stack>
	);
}
