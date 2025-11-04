import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ItemsContext } from '../context/ItemsContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { items, removeItem } = useContext(ItemsContext);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="image-outline" size={40} color="#aaa" />
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeItem(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Itens</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate('Cadastrar')}
        >
          <Ionicons name="add-circle-outline" size={26} color="#2B6EF6" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Lista de itens */}
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cube-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum item cadastrado ainda.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cadastrar')}
            style={styles.addButton}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Adicionar item</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  headerButton: {
    backgroundColor: '#E8F0FE',
    borderRadius: 20,
    padding: 6,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  placeholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 14,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
  },
  description: {
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#FF5C5C',
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#777',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#2B6EF6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
});
