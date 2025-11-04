import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { addResource } from '../../services/resources';

export default function AddScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async () => {
    if (!name || !description) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    await addResource({ name, description, quantity: Number(quantity) || 1 });
    Alert.alert('Sucesso', 'Recurso adicionado!');
    setName(''); setDescription(''); setQuantity('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Recurso</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Descrição" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Quantidade" value={quantity} onChangeText={setQuantity} style={styles.input} keyboardType="numeric" />
      <Button title="Salvar" onPress={handleSubmit} color="#1e88e5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 12 },
});

