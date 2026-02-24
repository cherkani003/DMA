
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChatBotScreen from '../screens/chatBotScreen';
import MapScreen from '../screens/MapView/MapScreen';
import NewsScreen from '../screens/NewsScreen/NewsScreen';

const Stack = createStackNavigator();
const HSNavigator = () => {
  return (
    <Stack.Navigator>
    
    <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AI" 
          component={ChatBotScreen} 
          options={{ headerShown: false }}
        />  
        <Stack.Screen 
          name="MapView" 
          component={MapScreen} 
          options={{ headerShown: false }}
        />  
         <Stack.Screen
            name="News"
            component={NewsScreen}
            options={{ headerShown: false }}
          /> 
        </Stack.Navigator>
  )
}

export default HSNavigator