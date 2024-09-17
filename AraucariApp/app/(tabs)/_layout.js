import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: "white",
					marginHorizontal: 20,
					marginBottom: 10,
					elevation: 0,
					borderRadius: 10,
				},
				tabBarItemStyle: {
					borderRadius: 10,
					backgroundColor: "#0071CE",
					paddingVertical: 5,
				},
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "#9D9D9D",
				tabBarLabelStyle: {
					fontSize: 12,
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
							size={24}
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
						<MaterialCommunityIcons name="briefcase" size={24} color={color} />
					),
					tabBarBadgeStyle: { backgroundColor: "#fff000" },
				}}
			/>
			<Tabs.Screen name="tab_bar" options={{ href: null }} />
			<Tabs.Screen name="index" options={{ href: null }} />
		</Tabs>
	);
}
