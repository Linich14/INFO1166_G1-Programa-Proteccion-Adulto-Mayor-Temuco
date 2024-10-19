import React, {useState, useEffect} from 'react';
import { Link } from 'expo-router';
import {
	Text,
  TouchableOpacity,
	View,
  Image,
  ScrollView,
  Modal
} from "react-native";
import { styled } from "nativewind";
import { MaterialIcons, Feather, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '@env';
import * as ImagePicker from 'expo-image-picker';

//
export default function Home() {
  const StyledIcon = styled(MaterialIcons);
  const [trabajo, setTrabajo] = useState("");
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [correo, setCorreo] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Estado para manejar el modal
  const [image, setImage] = useState(null); // Estado para manejar la imagen seleccionada

  // Función para obtener los datos del prestador
  const obtenerDatos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/servicios/prestador/Daniel/`);
      const data = await response.json();
      
      if (response.ok) {
        // Asigna los valores obtenidos desde la API
        setNombre(`${data.nombre} ${data.apellido}`);
        setTrabajo(data.trabajo);
        setNumero(data.telefono);
        setCorreo(data.email);
        setNacimiento(data.nacimiento);
      // Verifica si hay una URL para la imagen
      if (data.fotoperfil_url) {
        setImage(data.fotoperfil_url);  // Asigna la URL de la imagen
      }
      } else {
        Alert.alert('Error', 'No se pudo obtener los datos del prestador.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error', 'Hubo un error al obtener los datos.');
    }
  };

  // Llama a la función obtenerDatos al cargar el componente
  useEffect(() => {
    obtenerDatos();
  }, []);  // Solo se ejecuta al montar el componente

  // Función para abrir la galería
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        const name = uri.split('/').pop(); // Extraer el nombre del archivo de la URI
        const mimeType = 'image/jpeg'; // Asumimos que la imagen es JPEG, puedes ajustar si es necesario

        uploadImage(uri, name, mimeType); // Llamar a la función para subir la imagen
      } else {
        console.log("Selección de imagen cancelada");
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
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

      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        const name = uri.split('/').pop(); // Extraer el nombre del archivo de la URI
        const mimeType = 'image/jpeg'; // Asumimos que la imagen es JPEG, puedes ajustar si es necesario

        uploadImage(uri, name, mimeType); // Llamar a la función para subir la imagen
      } else {
        console.log("Captura de foto cancelada");
      }
    } catch (error) {
      console.error("Error al capturar foto:", error);
    }
  };

// Función para subir la imagen al servidor
const uploadImage = async (uri, name, mimeType) => {
  try {
    const formData = new FormData();
    formData.append('fotoperfil', {
      uri: uri,
      name: name,
      type: mimeType,
    });

    const response = await fetch(`${API_URL}/api/servicios/prestador/Daniel/subir_foto_perfil/`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await response.json();

    // Verifica la respuesta del backend
    if (response.ok) {
      // Ahora, solo concatenamos la ruta de la imagen, sin la base
      const fotoPerfilUrl = data.fotoperfil_url;
      setImage(fotoPerfilUrl);  // Asignamos la nueva URL de la imagen al estado
      console.log(fotoPerfilUrl)
      alert("Imagen subida con éxito");
    } else {
      alert("Error al subir la imagen");
    }
  } catch (error) {
    console.error("Error al subir la imagen:", error);
  }
};


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
                <View className="p-1 px-2 mx-2 items-center">
                  <View className="flex flex-row static">
                  <Image
                    className="bg-white rounded-full border-2 border-black"
                    source={image ? { uri: image } : require('../../../assets/UsersIcons/avatar.png')}
                    style={{ width: 100, height: 100 }}
                  />
                  <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-yellow-500 rounded-full p-2 absolute"><FontAwesome name='pencil' color='white' size={16}/></TouchableOpacity>
                  </View>
                  <Text className="text-center">{nombre || "Cargando..."}</Text>
                </View>
              </View>
              <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)} // Cerrar el modal al presionar fuera
            >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
              <View className="bg-white p-4 rounded-md">
                <Text className="text-lg font-bold mb-4">Cambiar foto de perfil</Text>
                <TouchableOpacity className="bg-blue-500 p-2 rounded-[32px] mb-2" onPress={pickImage}><Text className="text-white text-center">Elegir de la galería</Text></TouchableOpacity>
                <TouchableOpacity className="bg-blue-500 p-2 rounded-[32px] mb-2" onPress={takePhoto}><Text className="text-white text-center">Tomar una foto</Text></TouchableOpacity>
                <TouchableOpacity className="bg-red-500 p-2 rounded-[32px] mb-2" onPress={() => setModalVisible(false)}><Text className="text-white text-center" >Cancelar</Text></TouchableOpacity>
              </View>
            </View>
          </Modal>
            <View>
              <View className="bg-yellow-500 rounded-r-[12px] pt-1 mb-2">
                <View className="bg-white my-1 p-1 rounded-r-full mr-14">
                  <Text className="font-bold text-center">Cargo: </Text>
                </View>
                <Text className="p-2 m-1 text-white text-center font-bold text-lg">{trabajo || "Cargando..."}</Text>{/*ESTADO DE SERVICIO*/}
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
                    <Text className="font-bold text-xl">{nombre || "Cargando..."}</Text>
                  </View>
                </View>
                <View className="flex flex-row p-1 mb-2">
                  <Feather name='phone-call' size={40}/>
                  <View className="ml-6">
                    <Text>Numero</Text>
                    <Text className="font-bold text-xl">{numero || "Cargando..."}</Text>
                  </View>
                </View>
                <View className="flex flex-row p-1 mb-2">
                  <MaterialCommunityIcons name='email' size={40}/>
                  <View className="ml-6">
                    <Text>Correo</Text>
                    <Text className="font-bold text-xl">{correo || "Cargando..."}</Text>
                  </View>
                </View>                
                <View className="flex flex-row p-1 mb-2">
                  <FontAwesome name='birthday-cake' size={40}/>
                  <View className="ml-6">
                    <Text>Fecha de nacimiento</Text>  
                    <Text className="font-bold text-2xl">{nacimiento || "Cargando..."}</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
      
    </SafeAreaView>
  );
}
