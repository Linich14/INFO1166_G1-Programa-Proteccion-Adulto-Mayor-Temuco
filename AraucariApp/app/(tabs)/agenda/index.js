import React, { useState } from "react";
import { View, Text, Alert} from "react-native";
import { Button } from "react-native-paper";
import Calendario from "./calendario_agenda"; // Asegúrate de tener el componente de Calendario
import { useLocalSearchParams } from "expo-router";

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
    <View className="w-full h-screen">
      {/* Calendario siempre visible */}
      <View className="bg-muni-50 py-2">
        <View className="rounded-full bg-white mx-auto w-2/3">
          <Text className="text-2xl font-bold text-gris-50 text-center px-1">
            Calendario
          </Text>
        </View>
        <View className="bg-muni-50 py-2 rounded-b-2xl">
        <Calendario actualizarFecha={setFecha} />
      </View>
        <View className="p-1 px-4">
            <View className="bg-white flex flex-row items-center space-x-2 p-1 py-2 rounded-[32px]">
              <View className="items-center bg-yellow-500 rounded-[32px] p-2 basis-1/5 ml-3">
                <Text className="text-white font-bold text-2xl">19</Text>
                <Text className="text-white font-bold">Agosto</Text>
              </View>
              <View className="pl-12 items-center">
                <Text className="text-center font-bold">Lunes 19 de agosto</Text>
                <Text className="text-center">Peluqeria con el señor/a {'\n'} Pedro Sanchez</Text>
                <Text className="font-bold underline text-center">18:30 hrs</Text>
              </View>
            </View>
          </View>
          <View className="p-1 px-4">
            <View className="bg-white flex flex-row items-center space-x-2 p-1 py-2 rounded-[32px]">
              <View className="items-center bg-[#018E11] rounded-[32px] p-2 basis-1/5 ml-3">
                <Text className="text-white font-bold text-2xl">21</Text>
                <Text className="text-white font-bold">Agosto</Text>
              </View>
              <View className="pl-12 items-center">
                <Text className="text-center font-bold">Miercoles 21 de agosto</Text>
                <Text className="text-center">Podologia con el señor/a {'\n'} Elliot Mardones</Text>
                <Text className="font-bold underline text-center">18:30 hrs</Text>
              </View>
            </View>
          </View>
      </View>
    </View>
  );
}
