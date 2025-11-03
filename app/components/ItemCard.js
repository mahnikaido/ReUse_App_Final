import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ItemCard({ item }) {
  if (!item) return null;

  return (
    <View style={styles.card}>
      {/* Imagem do item */}
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Sem imagem</Text>
        </View>
      )}

      {/* Conteúdo textual */}
      <View style={styles.info}>
        <Text style={styles.title}>{item.name || 'Sem título'}</Text>
        <Text style={styles.description}>
          {item.description || 'Sem descrição'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#E0ECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#6B7C93',
    fontWeight: '600',
  },
  info: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});



