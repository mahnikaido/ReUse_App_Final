import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {

    setLoading(true);

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response) throw new Error("Sem resposta da API — verifique sua conexão.");

      const data = await response.json();
      console.log("📬 Status da resposta:", response.status);
      console.log("📦 Resposta da API:", data);

      // ✅ Se API funcionar
      if (response.ok && data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        navigation.replace('MainTabs');
        return;
      }

      // ⚙️ Fallback local (caso API falhe)
      if (email === 'teste@reuse.com' && password === '123456') {
        await AsyncStorage.setItem('userToken', 'fake-token-123');
        navigation.replace('MainTabs');
        return;
      }

      Alert.alert('Erro', 'Credenciais inválidas.');
    } catch (error) {
      console.log("❌ Erro ao conectar à API:", error);
      Alert.alert('Erro', 'Não foi possível conectar à API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ReUse</Text>
      <Text style={styles.subtitle}>Conecte-se e reaproveite com propósito</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.hint}>Use: teste@reuse.com / 123456</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2', // cinza claro (Figma)
    padding: 24,
  },
  logo: {
    fontSize: 42,
    fontWeight: '800',
    color: '#2E2E2E', // cinza escuro
    marginBottom: 8,
  },
  subtitle: {
    color: '#555',
    fontSize: 16,
    marginBottom: 40,
  },
  input: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2E2E2E',
    paddingVertical: 14,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  hint: {
    marginTop: 20,
    fontSize: 14,
    color: '#777',
  },
});


