import React from 'react';
import { Link } from 'expo-router';
import {
	Text,
  TouchableOpacity,
	View,
  Image
} from "react-native";
import { styled } from "nativewind";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledText = styled(Text);
//
export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-300">
        <View className="flex-row justify-between items-center bg-[#0060AF] py-2">
          <View className="bg-white py-2 rounded-r-full px-3">
            <Text className="text-black text-xl font-bold px-2">
              Bienvenido, Señor Elliot Mardones
            </Text>
          </View>
          <TouchableOpacity className="bg-yellow-500 rounded-l-full p-2">
            <View className="items-center">
              <MaterialIcons name="settings" size={24} color="white" className=""/>
            </View>
            <Text className="text-white">Ajustes</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-muni-50 rounded-b-2xl py-1 pb-2">
          <View className="bg-white py-2 rounded-r-full mb-2 mt-1 mr-28">
              <Text className="text-black text-xl font-bold px-2 text-center">
              Control de Asistencia
              </Text>
          </View>
          <View className="flex flex-row items-center justify-center pb-2 my-1">
              <View className="bg-white p-2 rounded-[12px]">
                <View className="p-1 px-2 mx-2 items-center ">
                  <Image className="bg-white rounded-full border-2 border-black"
                  source={require('../../../assets/UsersIcons/avatar.png')}
                  style={{ width: 100, height: 100 }}
                  />
                  <Text className="text-center">Elliot Mardones</Text>
                </View>
              </View>
            <View className="bg-yellow-500 rounded-r-[12px] pt-1">
              <View className="bg-white my-1 p-1 rounded-r-full mr-14">
                <Text className="font-bold text-center">Estado: </Text>
              </View>
              <Text className="p-2 m-1 text-white text-center font-bold text-lg">En servicio</Text>{/*ESTADO DE SERVICIO*/}
            </View>
          </View>
        </View>
        {/* Separa */}
        <View className="bg-white py-2 rounded-r-full mb-2 mt-2 mr-28">
              <Text className="text-black text-xl font-bold px-2 text-center">
              Selecciona una opción
              </Text>
        </View>
        <View className="p-2">
          <View className="bg-white rounded-[16px] p-2">
            <TouchableOpacity className="bg-green-600 p-4 flex flex-row items-center justify-center rounded-[16px] my-2 mb-12 border-2 border-white mx-3">
              <View className="ml-3 p-2 mr-8">
                <MaterialCommunityIcons name="check-decagram-outline" size={60} color="white" className=""/>
              </View>
              <View className="p-2">
                <Text className="text-white text-center font-bold text-2xl">Marcar entrada</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-500 p-4 flex flex-row items-center justify-center rounded-[16px] mx-3 mb-2">
              <View className="p-2 mr-8"> 
                <MaterialIcons name="exit-to-app" size={60} color="white" className=""/>
              </View>
              <View className="p-2">
                <Text className="text-white text-center font-bold text-2xl">Marcar Salida</Text>
              </View>
            </TouchableOpacity>
            
          </View>
        </View>
    </SafeAreaView>
  );
}
