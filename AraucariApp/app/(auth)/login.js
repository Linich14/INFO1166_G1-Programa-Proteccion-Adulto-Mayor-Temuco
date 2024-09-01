import { useRef, useState } from "react";
import { Link } from "expo-router";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styled } from "nativewind";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Svg, { Ellipse } from "react-native-svg";

export default function Login() {
  const userInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [name, onChangeName] = useState("");
  const [password, onChangepassword] = useState("");

  const createTwoButtonAlert = () => {
    Alert.alert(
      "Se a iniciado sesion",
      `Su nombre es ${name} \ncontraseña ${password}`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Continuar", onPress: () => console.log("OK Pressed") },
      ],
    );
  };

  const StyledText = styled(Text);

  return (
    <View className="h-screen ">
      <Svg className="w-full h-1/5 ">
        <Ellipse
          cx="70"
          cy="5"
          ry="89"
          rx="103"
          fill="#FFB236"
        />
        <Ellipse
          cx="180"
          cy="-20"
          ry="89"
          rx="103"
          fill="#0071CE"
        />
      </Svg>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="h-3/5 flex flex-col "
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="h-full flex flex-col">
            <StyledText
              className="text-black p-2 px-12 mt-2 ml-auto rounded-l-full text-2xl font-bold"
              style={{ backgroundColor: "#E4E4E4", elevation: 5 }}
            >
              Inicio de Sesión
            </StyledText>
            <View className="flex flex-col w-4/6 mb-2 mt-auto">
              <Pressable
                onPress={() =>
                  userInputRef.current && userInputRef.current.focus()}
                className="flex flex-row border-2 border-[#8A8A8A] py-2 px-4 rounded-tr-lg bg-[#F2F2F2]"
              >
                <MaterialIcons name="person" size={24} color={"black"} />
                <TextInput
                  ref={userInputRef}
                  onChangeText={onChangeName}
                  value={name}
                  placeholder="Usuario"
                  className="text-xl font-bold ml-3"
                />
              </Pressable>

              <Pressable
                onPress={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()}
                className="flex flex-row border-2 border-[#8A8A8A] py-2 px-4 rounded-br-lg"
              >
                <MaterialIcons name="lock" size={24} color={"black"} />
                <TextInput
                  ref={passwordInputRef}
                  onChangeText={onChangepassword}
                  value={password}
                  placeholder="Contraseña"
                  className="text-xl font-bold ml-3"
                />
              </Pressable>
              <Link
                className="w-fit ml-auto text-blue-600 underline underline-offset-3"
                href="password_recovery"
              >
                <Text>¿Olvidaste tu contraseña?</Text>
              </Link>
            </View>
            <View className="flex flex-col mx-auto mb-auto">
              <Pressable
                className="w-fit bg-muni-50 p-3 px-5 rounded-full items-center mb-1"
                onPress={createTwoButtonAlert}
              >
                <Text className="text-white font-bold text-xl">
                  Iniciar Sesion
                </Text>
              </Pressable>
              <Pressable
                className="w-fit bg-muni-50 p-3 px-5 rounded-full items-center"
                children
              >
                <Link href="sign_up" className="text-white font-bold text-xl">
                  Registrarse
                </Link>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View className="flex h-1/5 relative" keyboardVerticalOffset={200}>
        <Pressable className="w-fit absolute mx-auto mt-2 ml-5 bg-red-600 p-4 rounded-3xl z-10">
          <Text className="text-xl font-bold text-white">Solicitar Ayuda</Text>
        </Pressable>
        <Svg className="w-full h-full">
          <Ellipse
            cx="350"
            cy="120"
            ry="115"
            rx="134"
            fill="#0071CE"
          />
          <Ellipse
            cx="220"
            cy="140"
            ry="89"
            rx="103"
            fill="#FFB236"
          />
        </Svg>
      </View>
    </View>
  );
}
