import React, { useState } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import { Button, Chip } from "react-native-paper";
import Calendario from "../../../components/Calendario"; // Asegúrate de tener el componente de Calendario
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styled } from "nativewind";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation

export default function Servicio() {
  const { servicio } = useLocalSearchParams();
  const navigation = useNavigation(); // Hook de navegación
  const [fecha, setFecha] = useState(new Date());
  const [seleccionado, setSeleccionado] = useState(""); // Para la hora seleccionada
  const [visible, setVisible] = useState(true); // Para mostrar/ocultar el calendario

  const horarios = [
    "08:00 AM",
    "08:30 PM",
    "08:45 PM",
    "09:00 PM",
    "09:15 PM",
    "09:30 PM",
    "09:45 PM",
    "10:00 PM",
    "10:15 PM",
  ];
  const desabilitados = [true, true, true, false, false, false, false, false, false];

  const StyledIcon = styled(MaterialIcons);

  const horarioAgendado = () => {
    if (!seleccionado) {
      Alert.alert("Por favor, selecciona una hora.");
      return;
    }
    Alert.alert(
      `Reagendado para ${servicio}`,
      `El día ${fecha.getDate()} de ${fecha.getMonth() + 1} a las ${seleccionado}`,
      [{ text: "Continuar" }]
    );
  };

  const obtenerColor = (desabilitado, seleccionado) => {
    if (desabilitado) return "#9D9D9D";
    else if (seleccionado) return "#FFB236";
    else return "#0071CE";
  };

  return (
    <SafeAreaView className="w-full h-screen">
      {/* Calendario Picker */}
      <View className="bg-muni-50 py-2">
        <View className="rounded-full bg-white mx-auto w-2/3">
          <Text className="text-2xl font-bold text-gris-50 text-center px-1">
            Reagendar Hora
          </Text>
        </View>


        {visible ? (
          <View className="bg-muni-50 py-2 rounded-b-2xl">
            {/* Calendario */}
            <Calendario actualizarFecha={setFecha} />
          </View>
        ) : null}
      </View>

      {/* Selección de horas */}
      <View className="flex-1">
        <View className="bg-white rounded-r-full mr-auto my-2 px-10">
          <Text className="p-1 font-bold text-lg">Horas disponibles</Text>
        </View>

        <View className="flex-row flex-wrap gap-2 justify-center mb-2">
          {horarios.map((horario, index) => (
            <Chip
              key={index}
              selected={seleccionado.includes(horario)}
              className="rounded-[32px]"
              onPress={() => setSeleccionado(horario)}
              showSelectedCheck={false}
              disabled={desabilitados[index]}
              style={{
                backgroundColor: obtenerColor(
                  desabilitados[index],
                  seleccionado.includes(horario)
                ),
              }}
            >
              <Text className="text-white font-bold">{horario}</Text>
            </Chip>
          ))}
        </View>

        {/* Botones Aceptar y Cancelar */}
        <View className="flex flex-row px-10 py-4 justify-between">
          <Button
            className="bg-green-700 px-5"
            onPress={horarioAgendado}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text className="text-white text-xl">Aceptar</Text>
          </Button>
          <Button
            className="bg-red-600 px-5"
            onPress={() => navigation.goBack()} // Usar el hook de navegación para ir atrás
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text className="text-white text-xl">Cancelar</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
