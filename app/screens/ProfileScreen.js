// app/screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [userToken, setUserToken] = useState(null);

  // 🔍 Busca o token salvo para exibir informações da sessão
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    };
    getToken();
  }, []);

  // 🚪 Função de logout
  const handleLogout = async () => {
    Alert.alert('Sair da conta', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim, sair',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileBox}>
        <Ionicons name="person-circle-outline" size={100} color="#666" />
        <Text style={styles.name}>Olá, ReUser 👋</Text>
        <Text style={styles.email}>
          {userToken ? 'Sessão ativa ✅' : 'Não autenticado'}
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7', alignItems: 'center', justifyContent: 'center', padding: 24 },
  profileBox: { alignItems: 'center', marginBottom: 60 },
  name: { fontSize: 24, fontWeight: '700', color: '#111', marginTop: 12 },
  email: { fontSize: 14, color: '#666', marginTop: 4 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  logoutText: { color: '#fff', fontWeight: '700', marginLeft: 8, fontSize: 16 },
});

