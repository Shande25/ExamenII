import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../Screen/WelcomeScreen';
import { LoginScreen } from '../Screen/LoginScreen';
import RegistroScreen from '../Screen/RegistroScreen';
import { OperacionScreen } from '../Screen/OperacionScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HistorialScreen } from '../Screen/HistorialScreen';
import { PerfilScreen } from '../Screen/PerfilScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Tab.Screen name="OperacionScreen" component={OperacionScreen} />
      <Tab.Screen name="Historial" component={HistorialScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main"component={TabNavigator}options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistroScreen" component={RegistroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
