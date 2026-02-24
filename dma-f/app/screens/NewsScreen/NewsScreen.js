import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { NEWS_API_KEY } from '../../../environments';
import NewsArticle from './Newsarticle';

const NewsScreen = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchNews = async () => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://google-news13.p.rapidapi.com/health',
            params: {lr: 'en-US'},
            headers: {
                'X-RapidAPI-Key': 'NEWS_API_KEY' , //remove '' to activate
                'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const filteredArticles = response.data.items
                .filter(article => article.title.toLowerCase().includes('health'))
                .slice(0, 10);
            setArticles(filteredArticles);
        } catch (error) {
            console.error('Error fetching health news:', error);
            setError('Failed to load news.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView>
                        <View style={styles.header}>
                            <MaterialIcons name="medical-information" size={30} color="white" style={styles.icon} />
                            <Text style={styles.headerText}>  Health News </Text>
                        </View>
                        {articles.map((article, index) => (
                            <NewsArticle key={index} article={article} />
                        ))}
                    </ScrollView>
                </SafeAreaView>
            )}
            {error ? <Text>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF0F5'
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5'
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
});

export default NewsScreen;
