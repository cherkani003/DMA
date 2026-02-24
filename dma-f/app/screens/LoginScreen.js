import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/auth/signin', {
        email,
        password,
      });
      if (response.data.access_token) {
        await AsyncStorage.setItem('accessToken', response.data.access_token);
        navigation.navigate('TabNavigator'); 
      } else {
        // Alert the user without logging sensitive information
        Alert.alert("Login Failed", "The credentials provided are incorrect.");
      }
    } catch (error) {
      // General error handling without exposing sensitive details in logs
      if (error.response) {
        // HTTP-specific responses
        switch (error.response.status) {
          case 401:
            Alert.alert("Login Failed", "Invalid email or password.");
            break;
          case 400:
            Alert.alert("Login Failed", "Bad request. Please check your credentials.");
            break;
          case 500:
            Alert.alert("Server Error", "Please try again later.");
            break;
          default:
            Alert.alert("Login Error", "Something went wrong. Please try again.");
        }
      } else {
        // Non-HTTP errors 
        Alert.alert("Network Error", "Unable to connect to the server. Please check your connection and try again.");
      }
    }
  };
  
  return (
    <View style={styles.container}>
     <Image source={require('../../assets/dmaLogo.png')} style={styles.logo} />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button }
      onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('SignUp')} 
>
  <Text style={styles.buttonText}>Sign Up</Text>
</TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FADADD', // Replace with the exact pink color you want
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // Set your logo styles
    marginBottom: 40,
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#E91E63', // Adjust the button color as needed
    paddingVertical: 10,
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;
