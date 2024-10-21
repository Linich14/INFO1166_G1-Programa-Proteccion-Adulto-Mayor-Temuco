import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../constants/styles.css";
import shadowStyles from '../styles/shadowStyles';
import { Link, Redirect } from "expo-router";


export default function Index() {
	const auth = true;

	if (!auth) {
		return <Redirect href="/(auth)/login" />;
	}

	return (
		//<SafeAreaView className="flex items-center">
			//<Link href="/home">Inicio de Cesion</Link>
			//<Text className="text-black">Content is in safe area.</Text>
		//</SafeAreaView>
		<Redirect href={"/(tabs)/home"}></Redirect>
	);
}
