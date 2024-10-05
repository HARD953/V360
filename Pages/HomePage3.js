import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, Title, Provider as PaperProvider } from 'react-native-paper';
import SignatureScreen from 'react-native-signature-canvas';
import { MaterialIcons } from '@expo/vector-icons';

import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';

export default function HomePage3({ navigation, route }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [contact, setContact] = useState('');
  const [signatureKey, setSignatureKey] = useState(Math.random());
  const [signature, setSignature] = useState('');

  const signatureRef = useRef(null);

  const handleSignature = (signature) => {
    setSignature(signature);
   // Vous pouvez gérer la signature comme nécessaire
  };

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clearSignature();
      setSignature(''); // Réinitialiser la signature dans l'état
      setSignatureKey(Math.random()); // Réinitialiser la clé pour forcer la réinitialisation de SignatureScreen
    }
  };
  const handleSave = async () => {
    if (signatureRef.current) {
        Alert.alert('Succès', 'La signature a été enregistrée avec succès!');
      try {
        const savedSignature = await signatureRef.current.readSignature();
        if (savedSignature) {
          setSignature(savedSignature);
          Alert.alert('Succès', 'La signature a été enregistrée avec succès!');
        } else {
          console.log('Aucune signature à enregistrer.');
        }
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la signature:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement de la signature.');
      }
    } else {
      Alert.alert('Erreur', 'Veuillez ajouter une signature avant d\'enregistrer.');
    }
  };

  const { dataFromHomePage1, dataFromHomePage2 } = route.params || {};

  const handleSubmit = () => {
    const dataFromHomePage3 = {
      nom,
      prenom,
      contact,
      signature
    };
    navigation.navigate('HomePage4', { dataFromHomePage1, dataFromHomePage2, dataFromHomePage3 });
  };

  return (
    <PaperProvider>
      
      <SafeAreaView style={styles.container}>
        
        <View style={styles.formContainer}>
          <Title style={styles.title}>Consentement responsable espace</Title>
          <TextInput
            label="Nom ..."
            value={nom}
            onChangeText={setNom}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Prénom ..."
            value={prenom}
            onChangeText={setPrenom}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Contact ..."
            value={contact}
            onChangeText={setContact}
            style={styles.input}
            mode="outlined"
            keyboardType='numeric'
          />
          <View style={styles.signatureContainer}>
            <SignatureScreen
              key={signatureKey} // Utilisation de la clé pour réinitialiser le composant
              ref={signatureRef}
              onOK={handleSignature}
              onClear={handleClear}
              descriptionText="Signature"
              clearText="Effacer"
              confirmText="Confirmer"
              webStyle={styles.signatureWebStyle}
            />
          </View>
          
          <View style={styles.buttonsContainer}>
            <Button mode="contained" onPress={handleClear} style={styles.clearButton}>
              Effacer la signature
            </Button>
            <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
              Enregistrer
            </Button>
          </View>
        </View>
        <View style={styles.btn1}>
          <TouchableOpacity style={styles.btns} onPress={handleSubmit}>
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
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom:5,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  signatureContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  signatureWebStyle: `
    .m-signature-pad {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
    .m-signature-pad--body {
      border: none;
      border-radius: 10px;
      background-color: #f8f8f8;
    }
    .m-signature-pad--footer {
      display: none;
      margin: 0px;
    }
  `,
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: '#d32f2f',
    width: '45%',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    width: '45%',
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5D6D7E',
    padding: 10,
    borderRadius: 5,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
  },
  btn1: {
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
    paddingTop:7
  },
  btns: {
    backgroundColor: '#5D6D7E',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
    width:'86%',
    height:'130%'
  },
  btntxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: FontSize.medium,
    fontFamily: Font['poppins-bold'],
    fontWeight: '800'
  },
  iconeNext: {
    fontSize: 26,
    color: 'white',
  },
});
