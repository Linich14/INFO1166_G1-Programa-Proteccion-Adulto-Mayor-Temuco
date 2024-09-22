import React, { useState } from "react";
import { View, Text, Alert, Touchable, TouchableOpacity} from "react-native";
import { Button } from "react-native-paper";
import { Link } from 'expo-router';
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
    const CancelarCita = () => {
      Alert.alert(
        "Cancelar Cita",
        "¿Estás seguro de que deseas cancelar la cita?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancelado"),
            style: "cancel"
          },
          {
            text: "Sí",
            onPress: () => console.log("Cita cancelada")
          }
        ],
        { cancelable: true }
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
        
      </View>
      <View className="p-1 px-4">
          <View className="bg-white flex flex-row items-center space-x-2 p-1 py-2 rounded-[32px] pb-3">
              <View className="items-center bg-yellow-500 rounded-[32px] p-3 ml-3">
                <Text className="text-white font-bold text-2xl">19</Text>
                <Text className="text-white font-bold">Septiembre</Text>
              </View>
              <View className="">
                <Text className="font-bold">Lunes 19 de Septiembre</Text>
                <Text className="">Peluqueria con el señor/a {'\n'}Pedro Sanchez</Text>
                <Text className="font-bold underline">18:30 hrs</Text>
              </View>
          </View>
          <View className="flex flex-row justify-end px-2 absolute bottom-0 right-0">
              <Link href="../reagendar" asChild>
                <TouchableOpacity className="bg-yellow-500 py-2 px-2 rounded-full border border-white mr-1">
                        <Text className="text-white text-center">Reagendar</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity className="bg-red-500 p-2 rounded-full border border-white" onPress={CancelarCita}>
                <Text className="text-white text-center">Cancelar</Text>
              </TouchableOpacity>
          </View>
        </View>
          <View className="p-1 px-4">
            <View className="bg-white flex flex-row items-center space-x-2 p-1 py-2 rounded-[32px] pb-3">
              <View className="items-center bg-[#018E11] rounded-[32px] p-3 ml-3">
                <Text className="text-white font-bold text-2xl">21</Text>
                <Text className="text-white font-bold">Septiembre</Text>
              </View>
              <View className="">
                <Text className="font-bold">Miercoles 21 de Septiembre</Text>
                <Text className="">Podologia con el señor/a {'\n'}Elliot Mardones</Text>
                <Text className="font-bold underline">18:30 hrs</Text>
              </View>
            </View>
            <View className="flex flex-row justify-end px-2 absolute bottom-0 right-0">
              <Link href="../reagendar" asChild>
                <TouchableOpacity className="bg-yellow-500 py-2 px-2 rounded-full border border-white mr-1">
                        <Text className="text-white text-center">Reagendar</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity className="bg-red-500 p-2 rounded-full border border-white" onPress={CancelarCita}>
                <Text className="text-white text-center">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
    </View>
  );
}
