import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import "../constants/styles.css"

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex items-center">
      <Text className="text-black">Content is in safe area.</Text>
    </SafeAreaView>
  );
}
