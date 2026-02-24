import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './app/navigation/TabNavigator'; 
import AuthNavigator from './app/navigation/AuthNavigator';
import MapScreen from './app/screens/MapView/MapScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider style={styles.safeAreaProvider}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="TabNavigator" 
            component={TabNavigator} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaProvider: {
    flex: 1, 
    backgroundColor: '#FADADD', 
  },
});

export default App;
