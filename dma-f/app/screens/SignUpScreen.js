import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);  // State to manage loading

    const handleSignUp = async () => {
        setLoading(true);  // Set loading state to true
        try {
            const response = await axios.post('http://10.0.2.2:3000/auth/signup', {
                email,
                password,
                firstName,
                lastName,
            });
    
            if (response.data.access_token) {
                console.log("Sign-up successful: access token received");
                Alert.alert("Sign-up successful", "Please Login with your new account");
                navigation.navigate('Login');
            } else {
                console.log("Sign-up failed: access token not received");
                Alert.alert("Error", "Sign-up failed: access token not received");
            }
        } catch (error) {
            let errorMessage = "Sign-up failed due to an unknown error";
            if (error.response) {
                errorMessage = error.response.data.message || JSON.stringify(error.response.data);
                console.error("Sign-up failed with server response:", errorMessage);
            } else if (error.request) {
                errorMessage = "The request was made but no response was received";
                console.error(errorMessage, error.request);
            } else {
                errorMessage = error.message;
                console.error('Error', errorMessage);
            }
            Alert.alert("Error", errorMessage);
        } finally {
            setLoading(false);  // Set loading state to false
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text style={styles.headerText}>CREATE NEW ACCOUNT</Text>
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
                placeholder="First Name"
                style={styles.input}
                autoCapitalize="words"
                onChangeText={setFirstName}
                value={firstName}
            />
            <TextInput
                placeholder="Last Name"
                style={styles.input}
                autoCapitalize="words"
                onChangeText={setLastName}
                value={lastName}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Account'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Return</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FADADD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        paddingBottom: 24,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 40,
        resizeMode: 'contain',
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
        backgroundColor: '#E91E63',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default SignUpScreen;
