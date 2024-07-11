import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { ref, set } from 'firebase/database';
import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth, db } from '../Config/Config';

export default function RegistroScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegistro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await set(ref(db, `usuarios/${user.uid}`), {
        email: email,
        username: username,
        phoneNumber: phoneNumber
      });

      Alert.alert('Registro exitoso', 'Usuario registrado con éxito.');

      console.log('Usuario registrado y datos guardados en Firebase');
    } catch (error: any) {
      if ((error as AuthError).code === 'auth/email-already-in-use') {
        Alert.alert('Error de registro', 'El correo electrónico ya está en uso. Por favor, use otro.');
        console.error('El correo electrónico ya está en uso');
      } else {
        Alert.alert('Error de registro', 'Ocurrió un error al registrar usuario. Por favor, intenta de nuevo.');
        console.error('Error al registrar usuario:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Celular"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      <Button title="Registrar" onPress={handleRegistro} color="#6A5ACD" />
    </View>
  );
}

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
});
