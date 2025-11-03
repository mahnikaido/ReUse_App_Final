import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// ✅ Importa corretamente todas as telas
import Home from '../screens/HomeScreen';
import Cadastrar from '../screens/AddItemScreen';
import Recursos from '../screens/ExploreScreen';
import Perfil from '../screens/ProfileScreen';
import Mensagens from '../screens/MessagesScreen'; // <-- importante

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.3,
          borderTopColor: '#ccc',
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Início') iconName = 'home-outline';
          else if (route.name === 'Cadastrar') iconName = 'add-circle-outline';
          else if (route.name === 'Recursos') iconName = 'list-outline';
          else if (route.name === 'Mensagens') iconName = 'chatbubble-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={Home} />
<Tab.Screen name="Cadastrar" component={Cadastrar} />
      <Tab.Screen name="Recursos" component={Recursos} />
      <Tab.Screen name="Mensagens" component={Mensagens} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}



