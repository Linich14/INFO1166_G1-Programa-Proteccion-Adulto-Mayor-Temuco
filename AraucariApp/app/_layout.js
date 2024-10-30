import { Stack } from "expo-router";
import { SessionProvider } from "../core/Autentificacion";

export default function RootLayout() {
	return (
		<SessionProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" />
			</Stack>
		</SessionProvider>
	);
}
