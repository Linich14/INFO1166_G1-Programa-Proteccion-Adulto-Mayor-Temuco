// src/components/tab_bar.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './home'; // Ajusta la ruta si es necesario

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Servicios') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Volver') {
            iconName = focused ? 'arrow-back-circle' : 'arrow-back-circle-outline';
          }

          return <Ionicons name={iconName} size={35} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderRadius: 25,
          height: 80,
          paddingHorizontal: 20,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 5,
          left: 10,
          right: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarItemStyle: {
          backgroundColor: '#0071CE',
          borderRadius: 20,
          marginHorizontal: 4,
          padding: 5,
          marginVertical: 6,
        },
        tabBarLabelStyle: {
          fontSize: 17,
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          justifyContent: 'center',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Volver" component={Home} /> {/* Home esta de ejemplo o para empezar el home en ese archivo.
                                                        Agregar los demas cuando esten listos xd */}
    </Tab.Navigator>
  );
}
