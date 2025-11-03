import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ItemsProvider } from './app/context/ItemsContext';


import SplashScreen from './app/screens/SplashScreen'; // ✅ novo import
import Tabs from './app/navigation/Tabs';
import LoginScreen from './app/screens/LoginScreen.js';
import CameraScreen from './app/screens/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ItemsProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
<Stack.Screen name="Splash" component={SplashScreen} />
<Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={Tabs} />
            <Stack.Screen name="Camera" component={CameraScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ItemsProvider>
    </GestureHandlerRootView>
  );
}











