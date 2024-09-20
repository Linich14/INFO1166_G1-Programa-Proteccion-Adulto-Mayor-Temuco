import React from 'react';
import { Link } from 'expo-router';
import {
	Text,
  TouchableOpacity,
	View,
  Image
} from "react-native";
import { styled } from "nativewind";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledText = styled(Text);

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-300">
        <View className="flex-row justify-between items-center bg-[#0060AF] py-2">
          <View className="bg-white py-2 rounded-r-full px-3">
            <Text className="text-black text-xl font-bold px-2">
              Bienvenido, Señor George Soto
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
                <Text className="text-center">Peluqeria con el señor/a {'\n'} Pedro Sanchez</Text>
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
        <View className="bg-white py-2 rounded-r-full mb-4 mr-28">
            <Text className="text-black text-xl font-bold px-2 text-center">
            ¿Qué quieres hacer?
            </Text>
        </View>
        <View className="flex-row justify-between">

          <View className= "pl-4 p-1 items-center flex-1">
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

          <View className= "p-4 items-center flex-1 mr-2">
            <Text className="text-center text-black font-bold text-base">Consulta los servicios que puedes atenderte en tu zona</Text>
          </View>

          <View className="p-4 items-center flex-1 ml-2">
            <Text className="text-center text-black font-bold text-base">Consulta tu agenda para ver tus horas recientes o por atenderte</Text>
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
}
