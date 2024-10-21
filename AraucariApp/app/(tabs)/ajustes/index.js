import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Image, TouchableOpacity, ScrollView } from "react-native";
import Modal from "react-native-modal"; // Importa el componente Modal
import * as DocumentPicker from 'expo-document-picker'; // Importa el picker de documentos
import { FontSizeProvider, FontSizeContext } from '../context/contexto';
import * as ImagePicker from 'expo-image-picker';  // Importa el picker de imágenes
import { API_URL } from '@env';


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
            const response = await fetch(`${API_URL}/api/notificaciones/`);
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

    // Función para seleccionar un documento
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            console.log("DocumentPicker result:", result); // Depuración del resultado
    
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const { uri, name, mimeType } = result.assets[0]; // Accede al primer archivo en el array 'assets'
                console.log("Selected file:", uri, name, mimeType);  // Verifica si los datos del archivo son correctos
    
                const formData = new FormData();
                formData.append('nombre', name);
                formData.append('archivo', {
                    uri: uri,
                    name: name,
                    type: mimeType || 'application/octet-stream',
                });
    
                // Enviar al backend
                const response = await fetch(`${API_URL}/api/subir_documento/`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                const data = await response.json();
                console.log('Response from backend:', data);  // Verifica la respuesta del backend
    
                if (response.ok) {
                    alert("Archivo subido con éxito");
                } else {
                    alert("Error al subir el archivo");
                }
            } else {
                console.log("Document picking cancelled or failed");
            }
        } catch (error) {
            console.error("Error uploading document:", error);
        }
    };
    
    // Función para capturar una foto
    const takePhoto = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'Se requiere acceso a la cámara');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const { uri } = result.assets[0];
                const name = uri.split('/').pop();
                const mimeType = 'image/jpeg';  // Asumimos que la imagen es JPEG

                uploadFile(uri, name, mimeType);
            } else {
                console.log("Photo capture cancelled");
            }
        } catch (error) {
            console.error("Error capturing photo:", error);
        }
    };

    // Función para subir el archivo o foto al servidor
    const uploadFile = async (uri, name, mimeType) => {
        try {
            const formData = new FormData();
            formData.append('nombre', name);
            formData.append('archivo', {
                uri: uri,
                name: name,
                type: mimeType,
            });

            const response = await fetch(`${API_URL}/api/subir_documento/`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();
            if (response.ok) {
                alert("Archivo subido con éxito");
            } else {
                alert("Error al subir el archivo");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    
    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
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
                                style={{
                                    backgroundColor: fontSize === 14 ? "#eab308" : "#0071ce",
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 9999
                                }}
                            >
                                <Text style={{ fontSize }} className="text-white font-bold text-center">Pequeña</Text>
                            </Pressable>

                            <Pressable 
                                onPress={() => updateFontSize("Mediano")} 
                                style={{
                                    backgroundColor: fontSize === 20 ? "#eab308" : "#0071ce",
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 9999,
                                    marginTop: 8
                                }}
                            >
                                <Text style={{ fontSize }} className="text-white font-bold text-center">Mediano</Text>
                            </Pressable>

                            <Pressable 
                                onPress={() => updateFontSize("Grande")} 
                                style={{
                                    backgroundColor: fontSize === 28 ? "#eab308" : "#0071ce",
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 9999,
                                    marginTop: 8
                                }}
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
                
                {/* Botón para añadir archivo */}
                <View className="bg-white p-4 m-4 rounded-lg shadow-lg border border-gray-300">
                    <TouchableOpacity onPress={pickDocument} className="bg-muni-50 rounded-full p-2">
                        <Text style={{ fontSize }} className="text-white font-bold text-center text-xl">Añadir Archivo</Text>
                    </TouchableOpacity>
                </View>
                {/* Botón para capturar una foto */}
                <View className="bg-white p-4 m-4 rounded-lg shadow-lg border border-gray-300">
                    <TouchableOpacity onPress={takePhoto} className="bg-muni-50 rounded-full p-2">
                        <Text style={{ fontSize }} className="text-white font-bold text-center text-xl">Tomar Foto</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
