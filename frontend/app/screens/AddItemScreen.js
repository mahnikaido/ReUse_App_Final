import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ItemsContext } from '../context/ItemsContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddItemScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addItem } = useContext(ItemsContext);

  const [photo, setPhoto] = useState(route.params?.photo || null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 📸 Recebe a imagem da câmera via params
  React.useEffect(() => {
    if (route.params?.photo) {
      setPhoto(route.params.photo);
    }
  }, [route.params?.photo]);

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'Por favor, insira um título para o item.');
      return;
    }

    addItem({
      name: title,
      description: description || 'Sem descrição',
      image: photo?.uri || null,
    });

    Alert.alert('Sucesso', 'Item adicionado com sucesso!');
    navigation.navigate('Início');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        {/* 🔹 Pré-visualização da imagem */}
        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.preview} />
        ) : (
          <View style={styles.emptyPreview}>
            <Ionicons name="image-outline" size={48} color="#aaa" />
            <Text style={{ color: '#aaa', marginTop: 8 }}>Nenhuma imagem selecionada</Text>
          </View>
        )}

        {/* 🔹 Botão para abrir a câmera */}
        <TouchableOpacity
          style={[styles.button, styles.cameraButton]}
          onPress={() => navigation.navigate('Camera')}
        >
          <Ionicons name="camera" size={20} color="#fff" />
          <Text style={styles.buttonText}>Abrir Câmera</Text>
        </TouchableOpacity>

        {/* 🔹 Inputs */}
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Cadeira de escritório"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Ex: Em bom estado, cor preta..."
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* 🔹 Botão de salvar */}
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleAdd}>
          <Ionicons name="checkmark" size={20} color="#fff" />
          <Text style={styles.buttonText}>Salvar Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  form: { padding: 20 },
  label: { fontWeight: '600', marginTop: 16, color: '#333' },
  input: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 14,
    marginTop: 20,
  },
  cameraButton: {
    backgroundColor: '#2B6EF6',
  },
  saveButton: {
    backgroundColor: '#28A745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  emptyPreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
