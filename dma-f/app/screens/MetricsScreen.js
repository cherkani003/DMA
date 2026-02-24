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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const MetricsScreen = () => {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [bloodSugar, setBloodSugar] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [a1cLevel, setA1cLevel] = useState('');
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [fiber, setFiber] = useState('');
  const [vitamins, setVitamins] = useState('');
  const [minerals, setMinerals] = useState('');

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get('http://10.0.2.2:3000/metrics', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setMetrics(response.data);
    } catch (err) {
      setError('Failed to fetch metrics');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addMetric = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const payload = {
        bloodSugar: parseFloat(bloodSugar),
        bloodPressure,
        a1cLevel: a1cLevel ? parseFloat(a1cLevel) : undefined,
        exerciseDuration: exerciseDuration ? parseInt(exerciseDuration) : undefined,
        exerciseType,
        waterIntake: waterIntake ? parseInt(waterIntake) : undefined,
        protein: protein ? parseInt(protein) : undefined,
        fat: fat ? parseInt(fat) : undefined,
        fiber: fiber ? parseInt(fiber) : undefined, 
        vitamins,
        minerals
      };
      await axios.post('http://10.0.2.2:3000/metrics', payload, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      alert('Metric added successfully!');
      resetForm();
      fetchMetrics();
    } catch (error) {
      alert('Failed to add metric: ' + (error.response?.data.message || error.message));
    }
  };

  const deleteMetric = async (metricId) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      await axios.delete(`http://10.0.2.2:3000/metrics/${metricId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      alert('Metric deleted successfully!');
      fetchMetrics();
    } catch (error) {
      console.error('Failed to delete metric:', error);
      alert('Failed to delete metric: ' + (error.response?.data.message || error.message));
    }
  };

  const resetForm = () => {
    setBloodSugar('');
    setBloodPressure('');
    setA1cLevel('');
    setExerciseDuration('');
    setExerciseType('');
    setWaterIntake('');
    setProtein('');
    setFat('');
    setFiber('');
    setVitamins('');
    setMinerals('');
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
        <FontAwesome  name="heartbeat" size={24} color="white" style={styles.icon} />
          <Text style={styles.headerText}>TRACK YOUR METRICS</Text>
        </View>
        <View>
          <Text style={styles.titleText}>For Today</Text>
        </View>
        <Card containerStyle={styles.card}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            onChangeText={setBloodSugar}
            value={bloodSugar}
            placeholder="Blood Sugar (mg/dL)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setBloodPressure}
            value={bloodPressure}
            placeholder="Blood Pressure"
          />
          </View>
          <View style={styles.row}>
          <TextInput
            style={styles.input}
            onChangeText={setA1cLevel}
            value={a1cLevel}
            placeholder="A1C Level (%)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setExerciseDuration}
            value={exerciseDuration}
            placeholder="Exercise Duration (minutes)"
            keyboardType="numeric"
          />
          </View>
          <View style={styles.row}>
          <TextInput
            style={styles.input}
            onChangeText={setExerciseType}
            value={exerciseType}
            placeholder="Exercise Type"
          />
          <TextInput
            style={styles.input}
            onChangeText={setWaterIntake}
            value={waterIntake}
            placeholder="Water Intake (ml)"
            keyboardType="numeric"
          />
          </View>
          <View style={styles.row}>
          <TextInput
            style={styles.input}
            onChangeText={setProtein}
            value={protein}
            placeholder="Protein (g)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setFat}
            value={fat}
            placeholder="Fat (g)"
            keyboardType="numeric"
          />
          </View>
          <View style={styles.row}>
          <TextInput
            style={styles.input}
            onChangeText={setFiber}
            value={fiber}
            placeholder="Fiber (g)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={setVitamins}
            value={vitamins}
            placeholder="Vitamins "
          />
          </View>
          <View style={styles.row}>
          <TextInput
            style={styles.input}
            onChangeText={setMinerals}
            value={minerals}
            placeholder="Minerals "
          />
          <TouchableOpacity style={styles.button} onPress={addMetric}>
          <FontAwesome name="plus-circle" size={24} color="white" />
          </TouchableOpacity>
          </View>
        </Card>
        <View>
          <Text style={styles.titleText}>Previous</Text>
        </View>
        
        {/* List of metrics */}
        {metrics.map((metric, index) => (
          
          <Card key={index} containerStyle={styles.card}>
            <View style={styles.row}>
            <Text style={styles.input}>Blood Sugar: {metric.bloodSugar}</Text>
            <Text style={styles.input}>Blood Pressure: {metric.bloodPressure}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.input}>A1C Level: {metric.a1cLevel}</Text>
            <Text style={styles.input}>Exercise Duration: {metric.exerciseDuration}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.input}>Exercise Type: {metric.exerciseType}</Text>
            <Text style={styles.input}>Water Intake: {metric.waterIntake}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.input}>Protein: {metric.protein}</Text>
            <Text style={styles.input}>Fat: {metric.fat}</Text>
            <Text style={styles.input}>Fiber: {metric.fiber}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.input}>Vitamins: {metric.vitamins}</Text>
            <Text style={styles.input}>Minerals: {metric.minerals}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMetric(metric.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>
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
    padding: 20,
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
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,  
  },
  titleText: {
    fontSize: 24, 
    fontStyle: 'italic',
    color: '#B76CFC',
    marginTop: 20,
    marginLeft: 10,
},
  card: {
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
  input: {
    backgroundColor: '#FFC0CB',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    flex: 1,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#FF1493',  
  padding: 10,
  borderRadius: 15,  
  alignItems: 'center',  
  justifyContent: 'center',  
  width: 50,  
  height: 50,  
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MetricsScreen;
