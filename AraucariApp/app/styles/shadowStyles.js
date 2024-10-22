// styles/shadowStyles.js
import { StyleSheet } from 'react-native';

const shadowStyles = StyleSheet.create({
  shadow: {
    // Propiedades de sombra para Android
    elevation: 5,
    shadowColor: '#000',  // Color de sombra para iOS
    shadowOffset: { width: 0, height: 2 },  // Desplazamiento de la sombra
    shadowOpacity: 0.8,  // Opacidad de la sombra
    shadowRadius: 3,  // Radio de la sombra
  },
});

export default shadowStyles;