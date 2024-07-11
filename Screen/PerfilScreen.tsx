import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth, db } from '../Config/Config';
import { onValue, ref } from 'firebase/database';

export const PerfilScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const userRef = ref(db, `usuarios/${userId}`);
        const unsubscribeUser = onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          setUsername(userData.username);
          setEmail(userData.email);
          setPhoneNumber(userData.phoneNumber);
        });

        return () => {
          unsubscribeUser();
        };
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.profileTitle}>Perfil del usuario activo</Text>
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Información de Perfil</Text>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Nombre de usuario:</Text>
            <Text style={styles.infoValue}>{username}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Correo electrónico:</Text>
            <Text style={styles.infoValue}>{email}</Text>
          </View>
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Mantener Actualizados los Datos</Text>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Correo electrónico:</Text>
            <Text style={styles.infoValue}>{email}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Número de teléfono:</Text>
            <Text style={styles.infoValue}>{phoneNumber}</Text>
          </View>
        </View>
      </View>
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
  profileSection: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    width: 150,
  },
  infoValue: {
    fontSize: 16,
  },
});
