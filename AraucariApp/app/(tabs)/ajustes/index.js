import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal"; // Importa el componente Modal
import { FontSizeProvider, FontSizeContext } from '../context/contexto';

export default function App() {
    return (
        <FontSizeProvider>
            <Index />
        </FontSizeProvider>
    );
}

function Index() {
    const { fontSize, updateFontSize } = useContext(FontSizeContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [notifications, setNotifications] = useState([]); // Estado para almacenar las notificaciones
    const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice de la notificación actual

    // Función para obtener las notificaciones desde el backend
    const fetchNotifications = async () => {
        try {
            const response = await fetch('http://192.168.1.19:8000/api/notificaciones/');
            const data = await response.json();
            setNotifications(data); // Almacena todas las notificaciones
            console.log(data); // Verifica la respuesta
            setCurrentIndex(0); // Reinicia el índice al comienzo
            if (data.length > 0) {
                setModalVisible(true); // Muestra el modal solo si hay notificaciones
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    // Función para mostrar las notificaciones
    const showNotifications = () => {
        fetchNotifications(); // Llama a la función para obtener las notificaciones
    };

    // Función para cerrar el modal
    const hideModal = () => {
        setModalVisible(false);
    };

    // Función para ir a la siguiente notificación
    const nextNotification = () => {
        if (currentIndex < notifications.length - 1) {
            setCurrentIndex(currentIndex + 1); // Aumenta el índice para mostrar la siguiente notificación
        } else {
            hideModal(); // Cierra el modal si no hay más notificaciones
        }
    };

    return (
        <View className="w-full h-screen">
            <View className="bg-muni-50 py-2">
                <View className="rounded-full bg-white mx-auto w-2/3">
                    <Text style={{ fontSize }} className="font-bold text-gris-50 text-center px-1">
                        Ajustes
                    </Text>
                </View>
            </View>

            <View className="flex p-2 px-2 bg-white border border-black">
                <View className="mx-auto w-2/3">
                    <Text style={{ fontSize }} className="font-bold text-gris-50 text-center px-1">
                        Accesibilidad
                    </Text>
                </View>
            </View>

            <View className="bg-white p-4 m-4 rounded-lg shadow-lg border border-gray-300">
                <View className="rounded-full w-full items-center mb-4 bg-muni-50">
                    <Text style={{ fontSize }} className="text-white font-bold text-center">Tamaño de letra</Text>
                </View>

                <View className="flex flex-row">
                    <Image 
                        source={require("../ajustes/rec/letra.png")}  // Aquí usas la imagen importada correctamente
                        style={{ width: 100, height: 100 }} 
                    />

                    <View className="ml-4 pl-10">
                        <Pressable 
                            onPress={() => updateFontSize("Pequeña")} 
                            className={`px-4 py-2 rounded-full ${fontSize === 14 ? "bg-yellow-500" : "bg-blue-500"}`}
                        >
                            <Text style={{ fontSize }} className="text-white font-bold text-center">Pequeña</Text>
                        </Pressable>

                        <Pressable 
                            onPress={() => updateFontSize("Mediano")} 
                            className={`px-4 py-2 mt-2 rounded-full ${fontSize === 20 ? "bg-yellow-500" : "bg-blue-500"}`}
                        >
                            <Text style={{ fontSize }} className="text-white font-bold text-center">Mediano</Text>
                        </Pressable>

                        <Pressable 
                            onPress={() => updateFontSize("Grande")} 
                            className={`px-4 py-2 mt-2 rounded-full ${fontSize === 28 ? "bg-yellow-500" : "bg-blue-500"}`}
                        >
                            <Text style={{ fontSize }} className="text-white font-bold text-center">Grande</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <View className="flex p-2 px-2 bg-white border border-black">
                <View className="mx-auto w-2/3">
                    <Text style={{ fontSize }} className="font-bold text-gris-50 text-center px-1">
                        Cuenta
                    </Text>
                </View>
            </View>

            <View className="bg-white p-4 m-4 rounded-lg shadow-lg border border-gray-300">
                <TouchableOpacity className="bg-red-600 rounded-full p-2">
                    <Text style={{ fontSize }} className="text-white font-bold text-center text-xl">Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>

            {/* Botón "Notificame" que muestra las notificaciones */}
            <View className="bg-white p-4 m-4 rounded-lg shadow-lg border border-gray-300">
                <TouchableOpacity
                    onPress={showNotifications} // Llama a la función al presionar
                    className="bg-muni-50 rounded-full p-2"
                >
                    <Text style={{ fontSize }} className="text-white font-bold text-center text-xl">Notificame</Text>
                </TouchableOpacity>
            </View>

            {/* Modal para las notificaciones */}
            <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
                <View className="bg-white p-5 rounded">
                    {notifications.length > 0 ? (
                        <>
                            <Text style={{ fontSize, textAlign: 'left', marginBottom: 10 }}>
                                {currentIndex + 1}/{notifications.length} {/* Muestra el índice actual y el total */}
                            </Text>
                            <Text style={{ fontSize, fontWeight: 'bold', textAlign: 'center' }}>
                                {notifications[currentIndex].titulo}
                            </Text>
                            <Text style={{ fontSize, textAlign: 'center', marginVertical: 10 }}>
                                {notifications[currentIndex].cuerpo}
                            </Text>
                        </>
                    ) : (
                        <Text>No hay notificaciones.</Text>
                    )}
                    <TouchableOpacity onPress={nextNotification} style={{ marginTop: 20 }}>
                        <View className="bg-muni-50 p-2 rounded-full">
                            <Text style={{ fontSize, color: 'white', textAlign: 'center' }}>OK</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
