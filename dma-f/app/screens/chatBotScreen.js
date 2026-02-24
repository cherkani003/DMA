import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { OPENAI_API_KEY } from '../../environments';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons} from '@expo/vector-icons';

const ChatBotScreen = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'You are a medical assistant who tries to give symptoms diagnosis for users with diabetes, also when the users sends their first message, ask the user if they have diabetes, if they say no just give them the symptoms diagnosis, but if they say yes tell then what is their diabetes type , then provide them with symptoms diagnosis and take notes of their diabetes type.', sender: 'system' }
    ]);
    const [inputText, setInputText] = useState('');

    // Function to handle sending a message
    const sendMessage = async () => {
        if (inputText.trim() === '') return;

        const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages([...messages, userMessage]);
        setInputText('');

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [
                    ...messages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text })),
                    { role: 'user', content: userMessage.text }
                ],
                max_tokens: 150,
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            const botMessage = { id: Date.now(), text: response.data.choices[0].message.content.trim(), sender: 'bot' };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error('Error sending message: ', error);
            const errorMessage = { id: Date.now(), text: 'Error occurred while trying to fetch response.', sender: 'bot' };
            setMessages([...messages, userMessage, errorMessage]);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="robot-happy" size={30} color="white" style={styles.icon} />
                <Text style={styles.headerText}>SYMPTOMS CHECKER</Text>
            </View>
            <View style={styles.container}>
            <ScrollView style={styles.messagesContainer}>
    {messages.filter(message => message.sender !== 'system').map(message => (
        <View key={message.id} style={message.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text>{message.text}</Text>
        </View>
    ))}
</ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type your message here..."
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF0F5', 
    },
    header: {
        backgroundColor: '#FF1493',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 10,  
    },
    messagesContainer: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#FFF0F5'
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#e0e0e0', 
        backgroundColor: '#fff', 
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20, 
        padding: 10,
        fontSize: 16, 
        backgroundColor: '#ffffff', 
    },
    userMessage: {
        alignSelf: 'flex-end',
        marginVertical: 5,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#FF2683',
        color: '#FF2683', 
        borderRadius: 20,
        maxWidth: '80%',
        elevation: 2, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    botMessage: {
        alignSelf: 'flex-start',
        marginVertical: 5,
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#FFF0F5', 
        borderRadius: 20,
        maxWidth: '80%',
        elevation: 2, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    sendButton: {
        padding: 10,
        backgroundColor: '#FF2683', 
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#ffffff', 
        fontSize: 16,
    },
});

export default ChatBotScreen;
