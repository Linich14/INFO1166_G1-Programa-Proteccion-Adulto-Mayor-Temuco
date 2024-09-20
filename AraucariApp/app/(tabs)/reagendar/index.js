import React, { useState } from "react";
import { View, Text, Alert, Touchable, TouchableOpacity} from "react-native";
import { Button } from "react-native-paper";
import Calendario from "../agenda/calendario_agenda"; // Asegúrate de tener el componente de Calendario
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Servicio() {
  const { servicio } = useLocalSearchParams();
  const [fecha, setFecha] = useState(new Date());

  const horarioAgendado = () => {
    Alert.alert(
      `Agendado para ${servicio}`,
      `El día ${fecha.getDate()} de ${fecha.getMonth() + 1}`,
      [{ text: "Continuar" }]
    );
  };

  return (
    <SafeAreaView className="w-full h-screen">
      {/* Calendario siempre visible */}
      <View className="bg-muni-50 py-2">
        <View className="rounded-full bg-white mx-auto w-2/3">
          <Text className="text-2xl font-bold text-gris-50 text-center px-1">
            Reagendar
          </Text>
        </View>
        <View className="bg-muni-50 py-2 rounded-b-2xl">
        <Calendario actualizarFecha={setFecha} />
        </View>
    </View>
    </SafeAreaView>
  );
}
