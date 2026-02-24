import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const NewsArticle = ({ article }) => {
    const handlePress = () => {
        Linking.openURL(article.newsUrl);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <Image source={{ uri: article.images.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{article.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
    title: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NewsArticle;
