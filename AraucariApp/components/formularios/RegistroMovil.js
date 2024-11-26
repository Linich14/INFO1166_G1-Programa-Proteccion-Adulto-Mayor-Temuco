import * as React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styled } from "nativewind";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { API_URL } from "@env";

export default function RegistroMovil() {
  const StyledIcon = styled(MaterialIcons);

  const [formData, setFormData] = React.useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    password: "",
    repeatPassword: "",
    telefono: "",
    direccion: "",
    nacimiento: new Date(),
    sector: null,
    nacionalidad: null,
  });

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const createTwoButtonAlert = () => {
    Alert.alert(
      "Registro exitoso",
      `Nombre: ${formData.nombre} \nApellido: ${formData.apellido} \nCorreo: ${
        formData.correo
      } \nTeléfono: ${formData.telefono} \nDirección: ${
        formData.direccion
      } \nFecha de Nacimiento: ${formData.nacimiento.toLocaleDateString()} \nSector: ${
        formData.sector
      } \nNacionalidad: ${formData.nacionalidad}`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Continuar", onPress: () => console.log("OK Pressed") },
      ]
    );
  };

  const sectorOptions = [
    { label: "Centro", value: "CE" },
    { label: "Amanecer", value: "AM" },
    { label: "El Carmen", value: "EC" },
    { label: "Labranza", value: "LA" },
    { label: "Pedro de Valdivia", value: "PV" },
    { label: "Poniente", value: "PO" },
    { label: "Pueblo Nuevo", value: "PN" },
    { label: "Santa Rosa", value: "SR" },
  ];

  const nacionalidadOptions = [
    { label: "Chileno", value: "CL" },
    { label: "Extranjero", value: "EX" },
  ];

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || formData.nacimiento;

    // Formatear la fecha como YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split("T")[0];

    handleChange("nacimiento", formattedDate);
  };

  const handleSubmit = async () => {
    try {
      if (formData.password !== formData.repeatPassword) {
        Alert.alert("Error", "Las contraseñas no coinciden");
        return;
      }

      const respuesta = await axios.post(
        `${API_URL}/api/auth/registro/`,
        formData
      );
      // Aquí puedes manejar la respuesta después de un registro exitoso
      console.log("Registro exitoso:", respuesta.data);
      Alert.alert("Éxito", "Registro exitoso");
    } catch (error) {
      // Manejo de errores
      console.log("Error al registrar:", error.response.data);
      Alert.alert(
        "Error",
        "Ocurrió un error al registrar, por favor intente de nuevo."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <Text
          className="text-gris-50 p-2 px-16 ml-auto rounded-l-full text-2xl font-bold mb-auto"
          style={{ backgroundColor: "#E4E4E4", elevation: 10 }}
        >
          Registro
        </Text>

        <View
          className="w-5/6 border-2 border-gris-100 rounded-r-3xl h-max"
          style={{ backgroundColor: "#EBEBEB" }}
        >
          <Pressable className="flex flex-row items-center border-b-2 border-gris-100 gap-1">
            <StyledIcon name="person-2" className="text-3xl text-gris-50" />
            <TextInput
              placeholder="Nombre"
              className="flex-1 pr-3 py-2 text-lg text-gris-50"
              onChangeText={(value) => handleChange("nombre", value)}
              value={formData.nombre}
            />
          </Pressable>

          <Pressable className="flex flex-row items-center border-b-2 border-gris-100 gap-1">
            <StyledIcon name="person-2" className="text-3xl text-gris-50" />
            <TextInput
              placeholder="Apellido"
              className="flex-1 pr-3 py-2 text-lg text-gris-50"
              onChangeText={(value) => handleChange("apellido", value)}
              value={formData.apellido}
            />
          </Pressable>

          <Pressable className="flex flex-row items-center border-b-2 border-gris-100 gap-1">
            <StyledIcon name="person-2" className="text-3xl text-gris-50" />
            <TextInput
              placeholder="Rut"
              className="flex-1 pr-3 py-2 text-lg text-gris-50"
              onChangeText={(value) => handleChange("rut", value)}
              value={formData.rut}
              maxLength={9}
              keyboardType="numeric"
            />
          </Pressable>

          <Pressable className="flex flex-row items-center border-b-2 border-gris-100 gap-1">
            <StyledIcon name="email" className="text-3xl text-gris-50" />
            <TextInput
              placeholder="Correo"
              className="flex-1 pr-3 py-2 text-lg text-gris-50"
              onChangeText={(value) => handleChange("email", value)}
              value={formData.email}
            />
          </Pressable>

          <Pressable className="flex flex-row items-center border-b-2 border-gris-100 gap-1">
            <StyledIcon name="phone" className="text-3xl text-gris-50" />
            <TextInput
              placeholder="Teléfono"
              className="flex-1 pr-3 py-2 text-lg text-gris-50"
              onChangeText={(value) => handleChange("telefono", value)}
              value={formData.telefono}
              keyboardType="numeric"
              maxLength={8}
            />
          </Pressable>

          <Pressable className="flex flex-row items-center border-b-2 border-gris-100 gap-1">
            <StyledIcon name="location-on" className="text-3xl text-gris-50" />
            <TextInput
              placeholder="Dirección"
              className="flex-1 pr-3 py-2 text-lg text-gris-50"
              onChangeText={(value) => handleChange("direccion", value)}
              value={formData.direccion}
            />
          </Pressable>

          <View className="text-black border-b-2 border-gris-100">
            <RNPickerSelect
              onValueChange={(value) => handleChange("sector", value)}
              items={sectorOptions}
              placeholder={{ label: "Seleccione su sector", value: null }}
              style={{
                inputIOS: {
                  color: "gray",
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  backgroundColor: "#EBEBEB",
                },
                inputAndroid: {
                  color: "gray",
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  backgroundColor: "#EBEBEB",
                },
                placeholder: {
                  color: "#565656",
                },
              }}
            />
          </View>

          <View className="text-black border-b-2 border-gris-100">
            <RNPickerSelect
              onValueChange={(value) => handleChange("nacionalidad", value)}
              items={nacionalidadOptions}
              placeholder={{ label: "Seleccione nacionalidad", value: null }}
              style={{
                inputIOS: {
                  color: "gray",
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  backgroundColor: "#EBEBEB",
                },
                inputAndroid: {
                  color: "gray",
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  backgroundColor: "#EBEBEB",
                },
                placeholder: {
                  color: "#565656",
                },
              }}
            />
          </View>

          <Pressable
            className="flex flex-row items-center border-b-2 border-gris-100 gap-1"
            onPress={showDatePickerHandler}
          >
            <StyledIcon
              name="calendar-today"
              className="text-3xl text-gris-50"
            />
            <Text className="flex-1 pr-3 py-2 text-lg text-gris-50">
              {`Fecha de Nacimiento: ${new Date(
                formData.nacimiento
              ).toLocaleDateString()}`}
            </Text>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={
                formData.nacimiento ? new Date(formData.nacimiento) : new Date()
              }
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <Pressable className="flex flex-row items-center border-b-2 border-gris-100 gap-1">
            <StyledIcon name="lock" className="text-3xl text-gris-50" />
            <TextInput
              placeholder="Contraseña"
              className="flex-1 pr-3 py-2 text-lg text-gris-50"
              onChangeText={(value) => handleChange("password", value)}
              value={formData.password}
              secureTextEntry={true}
            />
          </Pressable>

          <Pressable className="flex flex-row items-center border-gris-100 gap-1">
            <StyledIcon name="lock" className="text-3xl text-gris-50" />
            <TextInput
              placeholder="Repita Contraseña"
              className="flex-1 pr-3 py-2 text-lg text-gris-50"
              onChangeText={(value) => handleChange("repeatPassword", value)}
              value={formData.repeatPassword}
              secureTextEntry={true}
            />
          </Pressable>
        </View>

        <View className="flex flex-col mx-auto mt-2 mb-auto">
          <Pressable
            className="w-fit bg-muni-50 p-3 px-6 rounded-full items-center mb-1"
            onPress={handleSubmit} // Cambiar a handleSubmit
          >
            <Text className="text-white font-bold text-xl">Registrarse</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
