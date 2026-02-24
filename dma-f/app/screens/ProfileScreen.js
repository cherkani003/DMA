import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

const ProfileScreen = () => {
    const [image, setImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(null);
    const [bloodType, setBloodType] = useState(null);
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [diabetesType, setDiabetesType] = useState(null);
    const [openGender, setOpenGender] = useState(false);
    const [openBloodType, setOpenBloodType] = useState(false);
    const [openDiabetesType, setOpenDiabetesType] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await fetch('http://10.0.2.2:3000/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const user = await response.json();
                console.log("Fetched user data:", user); // Debug log
                setFirstName(user.firstName || '');
                setLastName(user.lastName || '');
                setAge(user.age ? user.age.toString() : '');
                setGender(user.gender);
                setBloodType(user.bloodType);
                setWeight(user.weight ? user.weight.toString() : '');
                setHeight(user.height ? user.height.toString() : '');
                setDiabetesType(user.diabetesType);
            } else {
                const errorData = await response.json();
                console.error('Error fetching user data:', errorData);
                Alert.alert('Error', 'Failed to fetch user information');
            }
        } catch (error) {
            console.error('Error fetching user information:', error);
            Alert.alert('Error', 'Failed to fetch user information');
        }
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.cancelled) {
                setImage(result.uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
            });
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Failed to log out');
        }
    };

    const handleEditProfile = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const payload = {
                age: age ? parseInt(age) : undefined,
                gender,
                bloodType,
                weight: weight ? parseInt(weight) : undefined,
                height: height ? parseInt(height) : undefined,
                diabetesType,
            };

            const response = await fetch('http://10.0.2.2:3000/users', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                Alert.alert('Success', 'Profile updated successfully');
                fetchUserInfo();
            } else {
                const errorData = await response.json();
                console.error('Error updating profile:', errorData);
                Alert.alert('Error', 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
                {image ? <Image source={{ uri: image }} style={styles.image} /> :
                    <FontAwesome name="user-circle" size={50} color="#FFF" />}
            </TouchableOpacity>
            <Text style={styles.header}>{firstName} {lastName}</Text>
            <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Age"
                keyboardType="numeric"
                placeholderTextColor="#aaa"
            />
            <View style={[styles.dropdownWrapper, openGender && styles.activeDropdown]}>
                <DropDownPicker
                    open={openGender}
                    value={gender}
                    items={[
                        { label: 'Male', value: 'MALE' },
                        { label: 'Female', value: 'FEMALE' },
                        { label: 'Other', value: 'OTHER' },
                    ]}
                    setOpen={setOpenGender}
                    setValue={setGender}
                    style={styles.input}
                    dropDownContainerStyle={styles.dropdown}
                    placeholder="Select Gender"
                    placeholderStyle={{ color: '#aaa' }}
                />
            </View>
            <View style={[styles.dropdownWrapper, openBloodType && styles.activeDropdown]}>
                <DropDownPicker
                    open={openBloodType}
                    value={bloodType}
                    items={[
                        { label: 'A+', value: 'A_POSITIVE' },
                        { label: 'A-', value: 'A_NEGATIVE' },
                        { label: 'B+', value: 'B_POSITIVE' },
                        { label: 'B-', value: 'B_NEGATIVE' },
                        { label: 'AB+', value: 'AB_POSITIVE' },
                        { label: 'AB-', value: 'AB_NEGATIVE' },
                        { label: 'O+', value: 'O_POSITIVE' },
                        { label: 'O-', value: 'O_NEGATIVE' },
                    ]}
                    setOpen={setOpenBloodType}
                    setValue={setBloodType}
                    style={styles.input}
                    dropDownContainerStyle={styles.dropdown}
                    placeholder="Select Blood Type"
                    placeholderStyle={{ color: '#aaa' }}
                />
            </View>
            <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                placeholder="Height (cm)"
                keyboardType="numeric"
                placeholderTextColor="#aaa"
            />
            <View style={[styles.dropdownWrapper, openDiabetesType && styles.activeDropdown]}>
                <DropDownPicker
                    open={openDiabetesType}
                    value={diabetesType}
                    items={[
                        { label: 'Type 1', value: 'TYPE1' },
                        { label: 'Type 2', value: 'TYPE2' },
                        { label: 'Gestational', value: 'GESTATIONAL' },
                    ]}
                    setOpen={setOpenDiabetesType}
                    setValue={setDiabetesType}
                    style={styles.input}
                    dropDownContainerStyle={styles.dropdown}
                    placeholder="Select Diabetes Type"
                    placeholderStyle={{ color: '#aaa' }}
                />
            </View>
            <TouchableOpacity onPress={handleEditProfile} style={styles.Button}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.Button}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF0F5',
    },
    header: {
        fontSize: 24,
        color: '#FF1493',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ff69b4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ff69b4',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#FFC0CB',
        color: '#000',
    },
    dropdownWrapper: {
        width: '80%',
        marginBottom: 15,
        zIndex: 1,
    },
    activeDropdown: {
        zIndex: 1000,
    },
    dropdown: {
        borderColor: '#ff69b4',
        borderWidth: 1,
        borderRadius: 10,
    },
    Button: {
        backgroundColor: '#FF1493',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 150,
        height: 50,
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    }
});

export default ProfileScreen;
