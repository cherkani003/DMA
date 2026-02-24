import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    // Function to handle opening URLs
    const handlePress = (url) => {
        Linking.openURL(url).catch(err => {
            console.error("Failed to open URL:", err);
            Alert.alert("Error", "Failed to open URL");
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Image source={require('../../assets/dmaLogo.png')} style={styles.logo} resizeMode="contain" />
                
                <Text style={styles.titleText}>Summary</Text>
                
                <View style={styles.buttonContainer}>
                    <Button
                        title="Show Health Data"
                        buttonStyle={styles.button}
                        onPress={() => navigation.navigate('Metrics')}
                    />
                    <Button
                        title="Start AI Diagnosis (inaccurate)"
                        buttonStyle={styles.button}
                        onPress={() => navigation.navigate('AI')}
                    />
                    <Button
                        title="Find Closest Medical Center"
                        buttonStyle={styles.button}
                        onPress={() => navigation.navigate('MapView')}
                    />
                </View>

                <Card containerStyle={styles.card}>
                    <Text style={styles.cardTitle}>Set up Medications</Text>
                    <Text>All your medication in one place. Set your schedule, and track what you take.</Text>
                    <Button title="Add a Medication" buttonStyle={styles.innerButton} onPress={() => navigation.navigate('Meds')} />
                </Card>
                
                <Card containerStyle={styles.card}>
                    <Text style={styles.cardTitle}>Set up Health Metrics</Text>
                    <Text>Enter manually your daily metrics to keep track of everyday's metrics and intake.</Text>
                    <Button title="Get Started" buttonStyle={styles.innerButton} onPress={() => navigation.navigate('Metrics')} />
                </Card>
                
                <Card containerStyle={styles.card}>
                    <Text style={styles.cardTitle}>Latest Health News</Text>
                    <Text>Stay updated with the latest health news and trends. Get daily articles and insights to keep you informed about your health and wellness.</Text>
                    <Button title="Read Latest News" buttonStyle={styles.innerButton} onPress={() => navigation.navigate('News')} />
                </Card>

                <Card containerStyle={styles.articleCard}>
                    <Image source={require('../../assets/article1.png')} style={styles.articleImage} />
                    <Text style={styles.articleTitle}>Meal Plan for Diabetes</Text>
                    <Button
                        title="Learn More"
                        buttonStyle={styles.innerButton}
                        onPress={() => handlePress('https://www.eatingwell.com/category/4291/meal-plans-for-diabetes/')}
                    />
                </Card>

                <Card containerStyle={styles.articleCard}>
                    <Image source={require('../../assets/article2.png')} style={styles.articleImage} />
                    <Text style={styles.articleTitle}>What is Type 2 Diabetes?</Text>
                    <Button
                        title="Learn More"
                        buttonStyle={styles.innerButton}
                        onPress={() => handlePress('https://www.news-medical.net/health/What-is-Type-2-Diabetes.aspx')}
                    />
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        padding: 20,
    },
    logo: {
        width: '100%',
        height: 100,
        marginBottom: 20,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#B76CFC',
        marginBottom: 20,
        marginLeft: 10,
    },
    buttonContainer: {
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#ff69b4',
        borderRadius: 20,
        marginBottom: 10,
    },
    card: {
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#ffb6c1',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    innerButton: {
        backgroundColor: '#ff1493',
        borderRadius: 10,
        marginTop: 10,
    },
    articleCard: {
        borderRadius: 10,
        padding: 0,
        overflow: 'hidden',
    },
    articleImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#ffb6c1',
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginTop: 10,
        marginBottom: 10,
        lineHeight: 24,
        textAlign: 'center',
    },
});

export default HomeScreen;
