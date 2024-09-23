import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { Ellipse, Svg } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styled } from "nativewind";
import RegistroMovil from "../../components/formularios/RegistroMovil";

export default function SignUp() {
	return (
		<View className="h-screen relative">
			<Svg className="w-full h-1/5 absolute top-0">
				<Ellipse cx="70" cy="5" ry="89" rx="103" fill="#FFB236" />
				<Ellipse cx="180" cy="-20" ry="89" rx="103" fill="#0071CE" />
			</Svg>
			<View className="h-3/5 z-10 mt-24 mb-auto">
				<RegistroMovil />
			</View>
			<Svg className="w-full h-1/5 absolute bottom-0">
				<Pressable className="w-fit absolute mx-auto mt-2 ml-5 bg-red-600 p-4 rounded-3xl z-10">
					<Text className="text-xl font-bold text-white">Solicitar Ayuda</Text>
				</Pressable>
				<Ellipse cx="350" cy="120" ry="115" rx="134" fill="#0071CE" />
				<Ellipse cx="220" cy="140" ry="89" rx="103" fill="#FFB236" />
			</Svg>
		</View>
	);
}
