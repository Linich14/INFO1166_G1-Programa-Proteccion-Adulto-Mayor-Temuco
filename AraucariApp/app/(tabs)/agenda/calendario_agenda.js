import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener Ionicons instalado

// Configuración de la localización en español
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

export default function CalendarioSoloVista() {
  // Fechas que quieres marcar
  const fechasMarcadas = {
    '2024-09-19': { selected: true, marked: true, selectedColor: '#FFB236' },
    '2024-09-21': { selected: true, marked: true, selectedColor: '#018E11' },
  };

  return (
    <View>
      <Calendar
        // Deshabilitar la selección de fechas
        onDayPress={() => {}}
        markedDates={fechasMarcadas} // Marcar las fechas
        disableAllTouchEventsForDisabledDays={true} // Deshabilitar interactividad
        theme={{
          todayTextColor: '#FFB236',
          textDayFontWeight: 'bold',
          textDayFontSize: 17,
          selectedDayTextColor: '#FFFFFF',
          calendarBackground: 'muni-50', // Fondo azul para el calendario
          monthTextColor: '#FFFFFF',
          textSectionTitleColor: '#FFFFFF',
          arrowColor: '#FFFFFF',
          dayTextColor: '#FFFFFF',
          textDisabledColor: '#B0B0B0',
          textMonthFontWeight: 'bold',
          textMonthFontSize: 20,
        }}
        firstDay={1} // Comienza la semana desde el lunes
        monthFormat={'yyyy MMMM'} // Muestra el mes en formato 'Año Mes'
        renderHeader={(date) => {
          // Personalizar el encabezado con los nombres de los meses en español
          const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ];
          return (
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {monthNames[date.getMonth()]} {date.getFullYear()}
              </Text>
            </View>
          );
        }}
        renderArrow={(direction) => (
          <View style={styles.arrowContainer}>
            <Ionicons
              name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
              size={24}
              color="#0071CE" // Color azul para las flechas
            />
          </View>
        )}
        renderDay={(day, state) => {
          return (
            <View
              style={[
                styles.dayContainer,
                state === 'disabled' && styles.disabledDay,
                state === 'today' && styles.todayDay,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  state === 'selected' && styles.selectedDay,
                ]}
              >
                {day.day}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  arrowContainer: {
    backgroundColor: '#FFFFFF', // Fondo blanco para las flechas
    borderRadius: 50, // Hacer las esquinas redondeadas
    padding: 5, // Espaciado interno para que no esté pegada la flecha al borde
  },
  dayContainer: {
    backgroundColor: '#0071CE', // Fondo azul para los días del calendario
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Borde redondeado
    width: 40, // Ancho fijo para que el borderRadius se aplique correctamente
    height: 40, // Altura fija para que el borderRadius se aplique correctamente
  },
  dayText: {
    color: '#FFFFFF', // Color del texto de los días
  },
  selectedDay: {
    color: '#FFB236', // Color del texto del día seleccionado
  },
  todayDay: {
    borderWidth: 2,
    borderColor: '#FFB236', // Borde para el día de hoy
    borderRadius: 10, // Asegura que el día de hoy tenga borderRadius
  },
  disabledDay: {
    backgroundColor: '#B0B0B0', // Fondo para los días deshabilitados
  },
});
