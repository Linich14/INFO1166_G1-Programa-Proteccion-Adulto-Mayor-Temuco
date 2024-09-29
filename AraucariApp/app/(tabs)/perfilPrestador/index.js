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
import { MaterialIcons, Feather, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledText = styled(Text);
//
export default function Home() {
  const StyledIcon = styled(MaterialIcons);
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
          <View className="bg-white py-2 rounded-r-full mb-2 mt-1 mr-28">
              <Text className="text-black text-xl font-bold px-2 text-center">
              Perfil de Usuario
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
            <View>
              <View className="bg-yellow-500 rounded-r-[12px] pt-1 mb-2">
                <View className="bg-white my-1 p-1 rounded-r-full mr-14">
                  <Text className="font-bold text-center">Cargo: </Text>
                </View>
                <Text className="p-2 m-1 text-white text-center font-bold text-lg">Podologo</Text>{/*ESTADO DE SERVICIO*/}
              </View>
              <View className="ml-2">
                <TouchableOpacity className="bg-[#D42B2B] p-2 rounded-[32px] border border-white flex flex-row">
                  <Feather name='lock' color="white" size={16}/>
                  <Text className="text-white ml-2">Cambiar Contraseña</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* Separa */}
          <View className="p-2">
            <View className="bg-white p-2 rounded-[12px]">
              <View className="p-2 ml-2"><Text className="font-bold text-2xl">Informacion de la cuenta</Text></View>
              <ScrollView className="p-4">
                <View className="flex flex-row p-1 mb-2">
                  <StyledIcon name="person" className=" text-black" size={40}/>
                  <View className="ml-6">
                    <Text>Nombre</Text>
                    <Text className="font-bold text-xl">Elliot Mardones Arias</Text>
                  </View>
                </View>
                <View className="flex flex-row p-1 mb-2">
                  <Feather name='phone-call' size={40}/>
                  <View className="ml-6">
                    <Text>Numero</Text>
                    <Text className="font-bold text-xl">+56 9 1234 4567</Text>
                  </View>
                </View>
                <View className="flex flex-row p-1 mb-2">
                  <MaterialCommunityIcons name='email' size={40}/>
                  <View className="ml-6">
                    <Text>Correo</Text>
                    <Text className="font-bold text-2xl">correo@outlook.com</Text>
                  </View>
                </View>                
                <View className="flex flex-row p-1 mb-2">
                  <FontAwesome name='birthday-cake' size={40}/>
                  <View className="ml-6">
                    <Text>Fecha de nacimiento</Text>  
                    <Text className="font-bold text-2xl">12-05-1989</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        
      
    </SafeAreaView>
  );
}
