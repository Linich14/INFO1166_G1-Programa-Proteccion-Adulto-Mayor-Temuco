import { useState ,useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert
} from "react-native";
import { styled } from "nativewind";
import { MaterialIcons, Feather ,MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '@env';

const StyledText = styled(Text);

export default function Home() {
  const [rut, setRut] = useState("");
  const [rutSinFormato, setRutSinFormato] = useState(""); // Variable para el RUT sin formato
  const contador = useRef([]);

  // Función para agregar dígitos al campo RUT
  const handleKeyPress = (value) => {
    // Guardar el RUT sin formato (sin puntos y guiones)
    setRutSinFormato((prevRut) => prevRut + value);

    setRut((prevRut) => {
      let nuevoRut = prevRut + value;
      let tamano = contador.current.length + 1;

      // Agregar puntos y guion automáticamente
      if (tamano === 2 || tamano === 5) {
        nuevoRut += ".";
      } else if (tamano === 8) {
        nuevoRut += "-";
      }

      // Actualizar el contador y el RUT
      contador.current.push(value);
      return nuevoRut;
    });
  };

  // Función para eliminar el último dígito
  const handleDelete = () => {
    setRut((prevRut) => {
      let nuevoRut = prevRut.slice(0, -1);
      contador.current.pop();

      // Eliminar puntos y guion si es necesario
      if (nuevoRut.length === 3 || nuevoRut.length === 7) {
        contador.current.pop();
        nuevoRut = nuevoRut.slice(0, -1);
      }

      return nuevoRut;
    });

    // Actualizar el RUT sin formato
    setRutSinFormato((prevRut) => prevRut.slice(0, -1));
  };


  const marcarEntrada = async () => {
    try {
      const response = await fetch(`${API_URL}/api/servicios/marcar-asistencia/${rutSinFormato}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: true }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Entrada registrada', 'La asistencia fue marcada correctamente.');
      } else {
        Alert.alert('Error', 'Hubo un problema al marcar la asistencia.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Hubo un error al enviar la solicitud.');
    }
  };

  
  return (
    <SafeAreaView className="flex-1 bg-gray-300">
      {/* Cabecera con el saludo y ajustes */}
      <View className="flex-row justify-between items-center bg-[#0060AF] py-2">
        <View className="bg-white py-2 rounded-r-full px-3">
          <Text className="text-black text-xl font-bold px-2">
            Bienvenido, Elliot Mardones
          </Text>
        </View>
        <TouchableOpacity className="bg-yellow-500 rounded-l-full p-2">
          <View className="items-center">
            <MaterialIcons name="settings" size={24} color="white" />
          </View>
          <Text className="text-white">Ajustes</Text>
        </TouchableOpacity>
      </View>

      {/* Imagen del logo */}
      <View className="items-center">
        <View className="p-5 bg-white mt-3 rounded-[32px]">
          <Image
            source={require('../../../assets/Logocolor.png')}
            style={{ width: 180, height: 117 }}
          />
        </View>
      </View>

      {/* Campo de entrada de RUT */}
      <View className="p-1 mt-2">
        <View className="px-16 flex flex-row">
          <TextInput
            editable={false}
            value={rut}
            placeholder="12.345.678-9"
            className="text-2xl font-bold flex-1 text-black bg-white rounded-l-[12px] text-center"
          />
          <TouchableOpacity
            onPress={handleDelete}
            className="bg-white rounded-r-[12px] items-center py-3 px-4"
          >
            <Feather name="delete" color="blue" size={30} />
          </TouchableOpacity>
        </View>
        <View className="p-2">
          <Text className="text-center">Digite su Rut y presione Entrar</Text>
        </View>
      </View>

      {/* Teclado numérico personalizado */}
      <View className="items-center">
        <View className="flex flex-row">
          {[1, 2, 3].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => handleKeyPress(num.toString())}
              className="bg-white m-1 border w-[80px] h-[60px] items-center justify-center rounded-lg"
            >
              <Text className="text-2xl">{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex flex-row">
          {[4, 5, 6].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => handleKeyPress(num.toString())}
              className="bg-white m-1 w-[80px] border h-[60px] items-center justify-center rounded-lg"
            >
              <Text className="text-2xl">{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex flex-row">
          {[7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => handleKeyPress(num.toString())}
              className="bg-white m-1 w-[80px] border h-[60px] items-center justify-center rounded-lg"
            >
              <Text className="text-2xl">{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex flex-row">
          <TouchableOpacity
            onPress={() => handleKeyPress("-")}
            className="bg-white m-1 w-[80px] border h-[60px] items-center justify-center rounded-lg"
          >
            <Text className="text-2xl">-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleKeyPress("0")}
            className="bg-white m-1 w-[80px] border h-[60px] items-center justify-center rounded-lg"
          >
            <Text className="text-2xl">0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleKeyPress("K")}
            className="bg-white m-1 w-[80px] border h-[60px] items-center justify-center rounded-lg"
          >
            <Text className="text-2xl">K</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="items-center mt-1">
        <TouchableOpacity onPress={marcarEntrada} className="bg-green-500 rounded-[12px] w-[200px] py-2 flex flex-row items-center justify-center border-2 border-white">
          <Text className="text-white text-xl font-bold text-center pr-6">Entrar</Text>
          <MaterialCommunityIcons name="check-decagram-outline" size={40} color="white" className=""/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
