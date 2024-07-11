import React, { useState } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, push } from 'firebase/database';

export function OperacionScreen() {
  const navigation = useNavigation();

  const [tipo, setTipo] = useState('');
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleGuardarOperacion = () => {
    // Validar que el monto no sea negativo
    if (parseFloat(monto) < 0) {
      Alert.alert('Error', 'El monto no puede ser negativo.');
      return;
    }

    // Validar si el monto es mayor a $500
    if (parseFloat(monto) > 500) {
      Alert.alert(
        'Confirmación',
        'El monto es mayor a $500. ¿Desea continuar con la transacción?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Continuar',
            onPress: () => guardarOperacion(), // Si el usuario continúa, llamar a guardarOperacion
          },
        ]
      );
    } else {
      guardarOperacion(); // Si el monto es menor o igual a $500, llamar directamente a guardarOperacion
    }
  };

  const guardarOperacion = () => {
    const db = getDatabase();
    const operacionesRef = ref(db, 'operaciones');
    const nuevaOperacion = {
      tipo: tipo,
      monto: parseFloat(monto),
      descripcion: descripcion || 'Sin descripción',
      timestamp: Date.now(),
    };

    push(operacionesRef, nuevaOperacion)
      .then(() => {
        // Limpiar los campos después de guardar con éxito
        setTipo('');
        setMonto('');
        setDescripcion('');
        // Mostrar mensaje de éxito
        Alert.alert('Éxito', 'La operación se realizó con éxito.');
      })
      .catch((error) => {
        console.error('Error al guardar la operación: ', error);
        // Mostrar mensaje de error
        Alert.alert(
          'Error',
          'Ocurrió un error al guardar la operación. Por favor, intenta de nuevo.'
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Operación</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo de operación"
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline={true}
        numberOfLines={4}
      />
      <View style={styles.buttonContainer}>
        <Button title="Ejecutar" onPress={handleGuardarOperacion} color="#6A5ACD"/>
      </View>
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
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});
