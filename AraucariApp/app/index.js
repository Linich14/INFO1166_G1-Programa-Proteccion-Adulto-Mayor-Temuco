import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex items-center">
      <Text className="text-red-600">Content is in safe area.</Text>
    </SafeAreaView>
  );
}
