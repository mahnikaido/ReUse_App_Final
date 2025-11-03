import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getResources } from '@/services/resources';

export default function ResourceDetailScreen() {
  const { id } = useLocalSearchParams();
  const [resource, setResource] = useState<any>(null);

  useEffect(() => {
    const fetchResource = async () => {
      if (!id) return;
      const list = await getResources();
      const data = Array.isArray(list)
        ? list.find((r: any) => String(r.id) === String(id))
        : null;
      setResource(data ?? null);
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
}
