import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Switch,
  Image
} from 'react-native';
import {
  TextInput,
  Title,
  Provider as PaperProvider
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';

export default function HomePage4({ navigation, route }) {
  // State declarations
  const [emplacementExact, setEmplacementExact] = useState('');
  const [observation, setObservation] = useState('');

  // States for switches
  const [isTauxCommune, setIsTauxCommune] = useState(false);
  const [isTauxRegion, setIsTauxRegion] = useState(false);
  const [isTauxDistrict, setIsTauxDistrict] = useState(false);

  // Data from previous pages
  const { dataFromHomePage1, dataFromHomePage2 } = route.params || {};

  const handleSubmit = () => {
    const dataFromHomePage5 = {
      emplacementExact,
      observation,
      isTauxCommune,
      isTauxRegion,
      isTauxDistrict
    };
    navigation.navigate('RecapPage', {
      dataFromHomePage1,
      dataFromHomePage2,
      dataFromHomePage5
    });
  };
  const handleSubmit1 = () => {
    const dataFromHomePage5 = {
      emplacementExact,
      observation,
      isTauxCommune,
      isTauxRegion,
      isTauxDistrict
    };
    navigation.navigate('HomePage3', {
      dataFromHomePage1,
      dataFromHomePage2,
      dataFromHomePage5
    });
  };
  // Handlers to ensure only one switch is active at a time
  const handleTauxCommuneChange = (value) => {
    setIsTauxCommune(value);
    if (value) {
      setIsTauxRegion(false);
      setIsTauxDistrict(false);
    }
  };

  const handleTauxRegionChange = (value) => {
    setIsTauxRegion(value);
    if (value) {
      setIsTauxCommune(false);
      setIsTauxDistrict(false);
    }
  };
  const handleTauxDistrictChange = (value) => {
    setIsTauxDistrict(value);
    if (value) {
      setIsTauxCommune(false);
      setIsTauxRegion(false);
    }
  };
 
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          {dataFromHomePage2?.image && (
            <Image
              source={{ uri: dataFromHomePage2.image[0] }}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.formContainer}>
          <Title style={styles.title}>Autres Informations</Title>
          <TextInput
            label="Description ..."
            value={emplacementExact}
            onChangeText={setEmplacementExact}
            style={styles.input}
            numberOfLines={3}
          />
          <TextInput
            label="Observation ..."
            value={observation}
            onChangeText={setObservation}
            style={styles.input}
            numberOfLines={3}
          />
          {/* Switches for Taux Commune, Taux Région, and Taux District */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Taxe Communale</Text>
            <Switch
              value={isTauxCommune}
              onValueChange={handleTauxCommuneChange}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Taxe Régionale</Text>
            <Switch
              value={isTauxRegion}
              onValueChange={handleTauxRegionChange}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Taxe District</Text>
            <Switch
              value={isTauxDistrict}
              onValueChange={handleTauxDistrictChange}
            />
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.btn1}>
          <TouchableOpacity style={[styles.btns,{"backgroundColor":"#2c3e50"}]} onPress={handleSubmit}>
            <Text style={styles.btntxt}>Terminé</Text>
            <MaterialIcons name="check-circle" style={styles.iconeNext} />
          </TouchableOpacity>
        </View>
        <View style={styles.btn1}>
          <TouchableOpacity style={[styles.btns,{"backgroundColor":"#2471a3"}]} onPress={handleSubmit1}>
            <Text style={styles.btntxt}>Suivant</Text>
            <MaterialIcons name="navigate-next" style={styles.iconeNext} />
          </TouchableOpacity>
          </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    marginHorizontal: 10
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: Spacing * 2,
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  formContainer: {
    paddingHorizontal: Spacing * 2,
    paddingBottom: Spacing * 2,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    marginBottom: Spacing * 2,
    fontSize: FontSize.large,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: Spacing,
    borderBottomWidth:1,
    backgroundColor:'#e7deec'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing,
  },
  switchLabel: {
    fontSize: FontSize.medium,
    color: '#333',
  },
  btn1: {
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
    paddingTop: 15,
    marginVertical:5
  },
  btns: {
    backgroundColor: '#2471a3',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
    width: '100%',
    height: '150%',
  },
  btntxt: {
    color: '#fff',
    fontSize: FontSize.medium,
    fontFamily: Font['poppins-bold'],
    fontWeight: 'bold',
  },
  iconeNext: {
    fontSize: 26,
    color: '#fff',
    marginLeft: Spacing / 2,
  },
});
