import { Stack } from "expo-router";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function ServiciosLayout() {
	const insets = useSafeAreaInsets();
	return (
		<SafeAreaProvider style={{ marginTop: insets.top }}>
			<Stack
				screenOptions={{
					headerShown: false,
					headerStyle: {
						backgroundColor: "#D1D5DB",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {},
				}}
			></Stack>
		</SafeAreaProvider>
	);
}
