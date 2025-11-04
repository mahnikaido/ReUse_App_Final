import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getResourceById } from '../../services/resources';
import { SafeAreaView } from 'react-native-safe-area-context';
 
const ResourceDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      const data = await getResourceById(id);
      setResource(data);
    };
    fetchResource();
  }, [id]);

  if (!resource) return <Text>Carregando...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome: {resource.name}</Text>
      <Text>Descrição: {resource.description}</Text>
      <Text>Quantidade: {resource.quantity}</Text>
    </View>
  );
};

export default ResourceDetailScreen;
