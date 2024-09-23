import { Stack } from "expo-router";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function AjustesLayout() {
	const insets = useSafeAreaInsets();
	return (
		<SafeAreaProvider style={{ marginTop: insets.top }}>
			<Stack
				screenOptions={{
					headerShown: false,
					headerStyle: {
						backgroundColor: "#f4511e",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {},
				}}
			></Stack>
		</SafeAreaProvider>
	);
}
