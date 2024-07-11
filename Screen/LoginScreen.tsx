import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/Config';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate('OperacionScreen');
      })
      .catch((error) => {
        // Manejo de error al iniciar sesión
        setError('Credenciales incorrectas. Por favor, revisa tu correo y contraseña.');
        console.error('Error al iniciar sesión:', error.message);
      });
  };

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setError(''); // Limpiar el mensaje de error al limpiar los campos
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearFields(); // Limpiar campos al enfocar la pantalla
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
      />
      <Button title="Ingresar" onPress={handleLogin} color="#6A5ACD" />

      {/* Mostrar mensaje de error */}
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});
