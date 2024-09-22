import React, { useContext } from "react";
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { FontSizeProvider, FontSizeContext } from '../context/contexto';

export default function App() {
    return (
        <FontSizeProvider>
            <Index />
        </FontSizeProvider>
    );
}

function Index() {
    const { fontSize, updateFontSize } = useContext(FontSizeContext); // Uso del contexto

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
        </View>
    );
}
