import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, Title, Provider as PaperProvider } from 'react-native-paper';
import SignatureScreen from 'react-native-signature-canvas';
import { MaterialIcons } from '@expo/vector-icons';
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';

export default function HomePage4({ navigation, route }) {
  const [nom1, setNom1] = useState('');
  const [prenom1, setPrenom1] = useState('');
  const [contact1, setContact1] = useState(''); 
  const [signatureKey, setSignatureKey] = useState(Math.random());
  const [signature1, setSignature1] = useState('');

  const signatureRef = useRef(null);
  const handleSignature = (signature) => {
    setSignature1(signature);
  };

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clearSignature();
      setSignature1(''); // Réinitialiser la signature dans l'état
      setSignatureKey(Math.random()); // Réinitialiser la clé pour forcer la réinitialisation de SignatureScreen
    }
  };
  const handleSave = async () => {
    if (signatureRef.current) {
        Alert.alert('Succès', 'La signature a été enregistrée avec succès!');
      try {
        const savedSignature = await signatureRef.current.readSignature();
        if (savedSignature) {
          setSignature1(savedSignature);
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

  const { dataFromHomePage1, dataFromHomePage2,dataFromHomePage3,dataFromHomePage5 } = route.params || {};

  const handleSubmit = () => {
    const dataFromHomePage4 = {
      nom1,
      prenom1,
      contact1,
      signature1
    };
    navigation.navigate('RecapPage', { dataFromHomePage1, dataFromHomePage2, dataFromHomePage3,dataFromHomePage4, dataFromHomePage5});
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Title style={styles.title}>Consentement superviseur</Title>
          <TextInput
            label="Nom ..."
            value={nom1}
            onChangeText={setNom1}
            style={styles.input}
            
          />
          <TextInput
            label="Prénom ..."
            value={prenom1}
            onChangeText={setPrenom1}
            style={styles.input}
            
          />
          <TextInput
            label="Contact ..."
            value={contact1}
            onChangeText={setContact1}
            style={styles.input}
            
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
            <Text style={styles.btntxt}>Terminé</Text>
            <MaterialIcons name="check-circle" style={styles.iconeNext} />
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
    backgroundColor:'#e7deec'
  },
  signatureContainer: {
    width: '100%',
    height: 270,
    marginBottom: Spacing * 2,
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
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Spacing,
  },
  clearButton: {
    backgroundColor: '#d32f2f',
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    width: '48%',
  },
  btnContainer: {
    marginTop: Spacing * 3,
    alignItems: 'center',
  },
  btn1: {
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
    paddingTop: 15,
  },
  btns: {
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
    width:'90%',
    height:'150%'
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
