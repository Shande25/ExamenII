import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

export const HistorialScreen = () => {
  const [operaciones, setOperaciones] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const operacionesRef = ref(db, 'operaciones');

    const unsubscribe = onValue(operacionesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const operacionesArray = Object.values(data);
        setOperaciones(operacionesArray.reverse()); 
      } else {
        setOperaciones([]);
      }
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  const renderOperacion = ({ item }) => {
    const isSelected = item === selectedItem;

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => setSelectedItem(isSelected ? null : item)} 
      >
        <Text style={styles.itemText}>Tipo: {item.tipo}</Text>
        <Text style={styles.itemText}>Monto: {item.monto}</Text>
        {isSelected && item.descripcion && <Text style={styles.itemText}>Descripción: {item.descripcion}</Text>}
        {isSelected && <Text style={styles.itemText}>Fecha: {new Date(item.timestamp).toLocaleString()}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Operaciones</Text>
      <FlatList
        data={operaciones}
        renderItem={renderOperacion}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  selectedItem: {
    backgroundColor: '#F0F0F0', // Cambia el color de fondo cuando se selecciona
    borderWidth: 2,
    borderColor: '#AAA', // Agrega un borde al elemento seleccionado
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
});
