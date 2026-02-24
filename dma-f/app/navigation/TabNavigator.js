import { Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MetricsScreen from '../screens/MetricsScreen';
import MedsScreen from '../screens/MedsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { FontAwesome, FontAwesome5  } from '@expo/vector-icons';
import HSNavigator from './HSNavigator';



const Tab= createBottomTabNavigator ();
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" 
    screenOptions={{headerShown : false,
      tabBarActiveTintColor: '#F7C6E8',
      tabBarInactiveBackgroundColor : '#FF2683'}}>
      <Tab.Screen name="HomeScreen" component={HSNavigator}
      options={{tabBarIcon:(color,size)=> 
      (<FontAwesome name="heart" size={24} color="#F7C6E8" />),
      tabBarLabel:()=> (
        <Text style= {{color: '#F7C6E8'}}>Home</Text>
      )}} />

      <Tab.Screen name="Metrics" component={MetricsScreen}
       options={{tabBarIcon:(color,size)=> 
        (<FontAwesome name="heartbeat" size={24} color="#F7C6E8" />),
        tabBarLabel:()=> (
          <Text style= {{color: '#F7C6E8'}}>Metrics</Text>
        )}}/>
      <Tab.Screen name="Meds" component={MedsScreen} 
      options={{tabBarIcon:(color,size)=> 
        (<FontAwesome5 name="pills" size={24} color="#F7C6E8" />),
        tabBarLabel:()=> (
          <Text style= {{color: '#F7C6E8'}}>Meds</Text>
        )}}/>
      <Tab.Screen name="Profile" component={ProfileScreen}
      options={{tabBarIcon:(color,size)=> 
        (<FontAwesome5 name="user-edit" size={24} color="#F7C6E8" />),
        tabBarLabel:()=> (
          <Text style= {{color: '#F7C6E8'}}>Profile</Text>
        )}}
       />
    </Tab.Navigator>
  );
}

export default TabNavigator