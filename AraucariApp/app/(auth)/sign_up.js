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
import { Svg } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styled } from "nativewind";

export default function SignUp() {
  const ViewStyled = styled(View);
  const StyledIcon = styled(MaterialIcons)
  return (
    <View className="h-screen bg-blue-200">
      <View className="h-1/5">
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="h-3/5 bg-red-200"
      >
        <Text className="ml-auto p-5 bg-zinc-200 rounded rounded-l-full px-7">
          Registro
        </Text>
        <TouchableWithoutFeedback
          className="h-full w-full"
          onPress={Keyboard.dismiss}
        >
          <ViewStyled className="w-5/6 border border-black rounded-r-3xl h-max bg-[#F2F2F2]">
            <Pressable className="flex flex-row items-center border-b" children>
              <StyledIcon name="person-2" className="text-3xl" />
              <TextInput placeholder="Nombre" className="w-max"/>
            </Pressable>
            <Pressable className="flex flex-row items-center border-b" children>
              <MaterialIcons name="person-2" size={24} />
              <TextInput placeholder="Nombre" />
            </Pressable>

            <Pressable className="flex flex-row items-center" children>
              <MaterialIcons name="person-2" size={24} />
              <TextInput placeholder="Nombre" />
            </Pressable>
          </ViewStyled>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View className="h-1/5"></View>
    </View>
  );
}
