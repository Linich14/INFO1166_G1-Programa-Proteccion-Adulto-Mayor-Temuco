import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../constants/styles.css";
import { Link, Redirect } from "expo-router";

export default function Index() {
  const auth = false;

  if (!auth) {
    return <Redirect href="(auth)/login" />;
  }

  return (
    <SafeAreaView className="flex items-center">
      <Link href="/(auth)/login">Inicio de Cesion</Link>
      <Text className="text-black">Content is in safe area.</Text>
    </SafeAreaView>
  );
}
