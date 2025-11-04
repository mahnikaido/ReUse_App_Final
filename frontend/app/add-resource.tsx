import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addResource } from '@/services/resources';
import { useRouter } from 'expo-router';

export default function AddResourceScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddResource = async () => {
    if (!name || !description || !quantity) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
      await addResource({ name, description, quantity: Number(quantity) });
      Alert.alert('Sucesso', 'Recurso adicionado!');
      router.back(); // Volta para a tela Home
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível adicionar o recurso.');
      console.error(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="Descrição" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Quantidade" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <Button title="Adicionar Recurso" onPress={handleAddResource} />
    </View>
  );
}

