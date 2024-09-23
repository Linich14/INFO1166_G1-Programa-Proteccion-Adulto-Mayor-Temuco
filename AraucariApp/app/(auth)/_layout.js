import { Stack } from "expo-router";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function AuthLayout() {
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
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				<Stack.Screen name="login" />
				<Stack.Screen name="sign_up" />
				<Stack.Screen name="password_recovery" />
			</Stack>
		</SafeAreaProvider>
	);
}
