import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MedicationReminderScreen = () => {
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [foodTiming, setFoodTiming] = useState('');
  const [notes, setNotes] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [meds, setMeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getMeds();
  }, []);

  const getMeds = async () => {
    setIsLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get('http://10.0.2.2:3000/meds', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setMeds(response.data);
    } catch (err) {
      setError('Failed to fetch medications');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteMedication = async (medId) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      await axios.delete(`http://10.0.2.2:3000/meds/${medId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      alert('Medication deleted successfully!');
      getMeds(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete medication:', error);
      alert('Failed to delete medication: ' + (error.response?.data.message || error.message));
    }
  };

  const handleAddMedication = async () => {
    const formattedEndDate = endDate.toISOString().split('T')[0] + "T00:00:00.000Z";
    const payload = {
      name: medName,
      dosage: dosage,
      frequency: frequency,
      foodTiming: foodTiming,
      notes: notes,
      endDate: formattedEndDate
    };

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      await axios.post('http://10.0.2.2:3000/meds', payload, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      alert('Medication added successfully!');
      resetForm();
      getMeds();
    } catch (error) {
      alert('Failed to add medication: ' + (error.response?.data.message || error.message));
    }
  };

  const resetForm = () => {
    setMedName('');
    setDosage('');
    setFrequency('');
    setFoodTiming('');
    setNotes('');
    setEndDate(new Date());
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Icon name="medkit" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.headerText}>MEDICATION REMINDER</Text>
        </View>
        <Card containerStyle={styles.medCard}>
          <TextInput
            style={styles.input}
            onChangeText={setMedName}
            value={medName}
            placeholder="Medication Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setDosage}
            value={dosage}
            placeholder="Dosage (e.g., 2 pills)"
          />
          <TextInput
            style={styles.input}
            onChangeText={setFrequency}
            value={frequency}
            placeholder="Frequency"
          />
          <TextInput
            style={styles.input}
            onChangeText={setFoodTiming}
            value={foodTiming}
            placeholder="Food Timing"
          />
          <TextInput
            style={styles.input}
            onChangeText={setNotes}
            value={notes}
            placeholder="Additional Notes"
          />
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowEndDatePicker(true)}>
            <Text>{`End Date: ${endDate.toLocaleDateString()}`}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DatePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onChangeEndDate}
            />
          )}
          <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
            <Icon name="plus" size= {20} color="#fff" />
            <Text style={styles.addButtonText}>Add reminder</Text>
          </TouchableOpacity>
        </Card>
        <View>
          <Text style={styles.titleText}>Previous</Text>
        </View>
        <MedsList meds={meds} onDelete={deleteMedication} />
      </ScrollView>
    </SafeAreaView>
  );
};

const MedsList = ({ meds, onDelete }) => {


  return (
    <View>
      
      {meds.map((med, index) => (
        <Card key={index} containerStyle={styles.medCard}>
          <Text style={styles.input}>Name: {med.name} </Text>
          <Text style={styles.input}>Dosage: {med.dosage}</Text>
          <Text style={styles.input}>Frequency: {med.frequency}</Text>
          <Text style={styles.input}>Food Timing: {med.foodTiming}</Text>
          <Text style={styles.input}>Notes: {med.notes}</Text>
          <Text style={styles.input}>End Date: {new Date(med.endDate).toLocaleDateString()} </Text>
          <TouchableOpacity
            onPress={() => onDelete(med.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF0F5',
  },
  header: {
    backgroundColor: '#FF1493',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginRight: 10
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 24, 
    fontStyle: 'italic',
    color: '#B76CFC',
    marginTop: 20,
    marginLeft: 10,
},

  input: {
    backgroundColor: '#FFC0CB',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  dateInput: {
    backgroundColor: '#FFC0CB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#FF1493',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  medCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
 
});

export default MedicationReminderScreen;
