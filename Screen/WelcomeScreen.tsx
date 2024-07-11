import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    // Navegar a la pantalla de login
    navigation.navigate('LoginScreen');
  };

  const handleRegisterPress = () => {
    // Navegar a la pantalla de registro
    navigation.navigate('RegistroScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WelcomeScreen</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#8e44ad' }]} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#8e44ad' }]} onPress={handleRegisterPress}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.developedBy}>Desarrollado por Jahir Paredes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1', // Color de fondo del contenedor principal
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  developedBy: {
    fontSize: 14,
    color: '#2c3e50', // Color de texto "Desarrollado por Jahir Paredes"
  },
});
