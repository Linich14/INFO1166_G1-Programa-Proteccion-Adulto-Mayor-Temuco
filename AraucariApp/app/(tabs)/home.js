import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { styled } from "nativewind";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from "react-native-modal"; // Importa el componente Modal
import { API_URL } from '@env';


const StyledText = styled(Text);

export default function Home() {
  const [notifications, setNotifications] = useState([]); // Estado para manejar notificaciones
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0); // Índice de notificación actual
  const [isModalVisible, setModalVisible] = useState(false);

  // Función para obtener las notificaciones desde el backend
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notificaciones/`);
      const data = await response.json();
      setNotifications(data);
      if (data.length > 0) {
        setModalVisible(true); // Muestra el modal si hay notificaciones
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Llamar a la función al cargar el componente
  }, []);

  const hideModal = () => {
    if (currentNotificationIndex < notifications.length - 1) {
      setCurrentNotificationIndex(currentNotificationIndex + 1); // Pasa a la siguiente notificación
    } else {
      setModalVisible(false); // Cierra el modal si no hay más notificaciones
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-300">
      <View className="flex-row justify-between items-center bg-[#0060AF] py-2">
        <View className="bg-white py-2 rounded-r-full px-3">
          <Text className="text-black text-xl font-bold px-2">
            Bienvenido, George Soto
          </Text>
        </View>
        <Link href="/ajustes" asChild>
          <TouchableOpacity className="bg-yellow-500 rounded-l-full p-2">
            <View className="items-center">
              <MaterialIcons name="settings" size={24} color="white" />
            </View>
            <Text className="text-white">Ajustes</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View className="bg-muni-50 rounded-b-2xl py-1 pb-2">
        <View className="bg-white rounded-r-full py-1 my-1 mr-28">
          <Text className="font-bold text-center">Tienes estas horas pendientes</Text>
        </View>
        <View className="p-1 px-4">
          <View className="bg-white flex flex-row items-center space-x-2 p-1 py-2 rounded-[32px]">
            <View className="items-center bg-yellow-500 rounded-[32px] p-3 ml-3">
              <Text className="text-white font-bold text-2xl">19</Text>
              <Text className="text-white font-bold">Septiembre</Text>
            </View>
            <View className="pl-4 place-content-center">
              <Text className="text-center font-bold">Lunes 19 de Septiembre</Text>
              <Text className="text-center">Peluqueria con el señor/a {'\n'} Pedro Sanchez</Text>
              <Text className="font-bold underline text-center">18:30 hrs</Text>
            </View>
          </View>
        </View>
        <View className="p-1 px-4">
          <View className="bg-white flex flex-row items-center space-x-2 p-1 py-2 rounded-[32px]">
            <View className="items-center bg-[#018E11] rounded-[32px] p-3 ml-3">
              <Text className="text-white font-bold text-2xl">21</Text>
              <Text className="text-white font-bold">Septiembre</Text>
            </View>
            <View className="pl-4 place-content-center">
              <Text className="text-center font-bold">Miercoles 21 de Septiembre</Text>
              <Text className="text-center">Podologia con el señor/a {'\n'} Elliot Mardones</Text>
              <Text className="font-bold underline text-center">18:30 hrs</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Separa */}
      <View className="mt-6">
        <View className="bg-white py-2 rounded-r-full mr-28">
          <Text className="text-black text-xl font-bold px-2 text-center">
            ¿Qué quieres hacer?
          </Text>
        </View>
        <ScrollView>
          <View className="flex-row justify-between">

            <View className="pl-4 p-1 items-center flex-1">
              <Text className="text-center text-black font-bold text-xl">Buscar Servicios</Text>
            </View>

            <View className="pl-4 p-1 items-center flex-1">
              <Text className="text-center text-black font-bold text-xl">Ver mi agenda</Text>
            </View>
          </View>

          <View className="flex-row justify-between">

            <Link href="/servicios" asChild>
              <TouchableOpacity className="bg-white rounded-lg p-6 items-center flex-1 mx-2">
                <Image 
                  source={require('../../assets/HomeIcons/servicios.png')} 
                  style={{ width: 119, height: 121 }}
                />
              </TouchableOpacity>
            </Link>

            <Link href="/agenda" asChild>
              <TouchableOpacity className="bg-white rounded-lg p-6 items-center flex-1 mx-2 ">
                <Image 
                  source={require('../../assets/HomeIcons/calendario.png')}
                  style={{ width: 130, height: 130 }}
                />
              </TouchableOpacity>
            </Link>

          </View>

          <View className="flex-row justify-between">

            <View className="p-4 items-center flex-1 mr-2">
              <Text className="text-center text-black font-bold text-base">Consulta los servicios que puedes atenderte en tu zona</Text>
            </View>

            <View className="p-4 items-center flex-1 ml-2">
              <Text className="text-center text-black font-bold text-base">Consulta tu agenda para ver tus horas recientes o por atenderte</Text>
            </View>
          </View>
        </ScrollView>

      </View>

      {/* Modal para mostrar notificaciones */}
      {notifications.length > 0 && (
        <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
          <View className="bg-white p-5 rounded">
            {/* Indicador de cantidad de notificaciones en la parte superior izquierda */}
            <Text style={{ position: 'absolute', top: 10, left: 10, fontSize: 18, fontWeight: 'bold' }}>
              {`${currentNotificationIndex + 1}/${notifications.length}`}
            </Text>

            <Text style={{ fontWeight: 'bold', textAlign: 'center', marginTop: 20, fontSize:25 }}>
              {notifications[currentNotificationIndex].titulo || 'Título de la Notificación'}
            </Text>
            <Text style={{ textAlign: 'center', marginVertical: 10, fontSize:15 }}>
              {notifications[currentNotificationIndex].cuerpo || 'Este es el cuerpo de la notificación.'}
            </Text>

            <TouchableOpacity onPress={hideModal} style={{ marginTop: 20 }}>
              <View className="bg-muni-50 p-2 rounded-full">
                <Text style={{ color: 'white', textAlign: 'center', fontSize:20 }}>OK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
