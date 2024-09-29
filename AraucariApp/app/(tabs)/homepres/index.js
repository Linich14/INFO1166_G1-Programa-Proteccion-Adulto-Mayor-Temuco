import React from 'react';
import { Link } from 'expo-router';
import {
	Text,
  TouchableOpacity,
	View,
  Image,
  ScrollView
} from "react-native";
import { styled } from "nativewind";
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledText = styled(Text);
//
export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-300">
        <View className="flex-row justify-between items-center bg-[#0060AF] py-2">
          <View className="bg-white py-2 rounded-r-full px-3">
            <Text className="text-black text-xl font-bold px-2">
              Bienvenido, Elliot Mardones
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
                <Text className="text-center">Cita con el señor/a {'\n'} Juan Llanca</Text>
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
                <Text className="text-center">Cita con el señor/a {'\n'} Javier Monsalvez</Text>
                <Text className="font-bold underline text-center">18:30 hrs</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Separa */}
        <View className="mt-1">
        <View className="items-center mb-2">
          <View className="bg-white flex flex-row rounded-[12px] p-1">
            <Link href="/marcarAsis" asChild>
              <TouchableOpacity className="bg-yellow-500 m-3 py-4 rounded-[12px] w-1/4">
                <View className="items-center">
                  <MaterialIcons name="fingerprint" size={40} color="white" className=""/>
                </View>
                <Text className="text-center text-white">Marcar {'\n'}Asistencia</Text>
              </TouchableOpacity>
            </Link>
            <View className="bg-muni-50 p-1 px-2 mx-2 items-center rounded-[12px]">
              <Image className="bg-white rounded-full border-2 border-white"
              source={require('../../../assets/UsersIcons/avatar.png')}
              style={{ width: 100, height: 100 }}
              />
              <Text className="text-white text-center">Elliot Mardones</Text>
            </View>
            <Link href="/perfilPrestador" asChild>
              <TouchableOpacity className="bg-yellow-500 m-3 py-4 px-5 rounded-[12px] w-1/4">
                <View className="items-center">
                  <FontAwesome6 name="clipboard-user" size={40} color="white" className=""/>
                </View>
                <Text className="text-center text-white p-2">Perfil</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <View className="bg-white py-2 rounded-r-full mr-28">
            <Text className="text-black text-xl font-bold px-2 text-center">
            ¿Qué quieres hacer?
            </Text>
        </View>
        <ScrollView>
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
            source={require('../../../assets/HomeIcons/servicios.png')} 
            style={{ width: 119, height: 121 }}
            />
          </TouchableOpacity>
        </Link>
        
        <Link href="/agenda" asChild>
          <TouchableOpacity className="bg-white rounded-lg p-6 items-center flex-1 mx-2 ">
            <Image 
            source={require('../../../assets/HomeIcons/calendario.png')}
            style={{ width: 130, height: 130 }}
            />
          </TouchableOpacity>
        </Link>

        </View>
        </ScrollView>
        
        
      </View>
    </SafeAreaView>
  );
}
