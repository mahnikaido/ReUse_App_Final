import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Simula um pequeno carregamento
        await new Promise(resolve => setTimeout(resolve, 1200));

        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          console.log('🔐 Token encontrado, redirecionando para MainTabs...');
          navigation.replace('MainTabs');
        } else {
          console.log('🚪 Nenhum token, indo para Login.');
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('❌ Erro ao verificar token:', error);
        navigation.replace('Login');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ReUse</Text>
      <Text style={styles.subtitle}>Carregando...</Text>
      <ActivityIndicator size="large" color="#2E2E2E" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: '800',
    color: '#2E2E2E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});