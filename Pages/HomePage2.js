import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity, Dimensions, Image, Modal, Button,ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-switch';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import SignatureScreen from 'react-native-signature-canvas';

const { height, width } = Dimensions.get("screen");

export default function HomPage2({ navigation, route }) {
  const [emplacementExact, setEmplacementExact] = useState('');
  const [observation, setObservation] = useState('');
  const [value1, setValue] = useState(false); // Pour le commutateur ODP

  const [value3, setValue3] = useState(false);
  const [AP, setAP] = useState(false);
  const [APA, setAPA] = useState(false);
  const [APT, setAPT] = useState(false);
  const [AE, setAE] = useState(false);
  const [AEA, setAEA] = useState(false);
  const [AET, setAET] = useState(false);
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [SurfaceODP, setSurfaceODP] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [signature, setSignature] = useState(null);
  const [isSignatureModalVisible, setSignatureModalVisible] = useState(false);

  const [nom1, setNom1] = useState('');
  const [nom2, setNom2] = useState('');
  const [nom3, setNom3] = useState('');

  const data = [
    { key: '1', value: 'Abobo' },
    { key: '2', value: 'Adjamé' },
    { key: '3', value: 'Plateau' },
    { key: '4', value: 'Treichville' },
    { key: '5', value: 'Bassam' },
    { key: '6', value: 'Cocody' },
    { key: '7', value: 'Yopougon' }
  ];

  const handleSignature = (signature) => {
    setSignature(signature);
    setSignatureModalVisible(false);
  };
  
  const handleClear = () => {
    setSignature(null);
  };
  

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log("Veuillez accorder les autorisations de localisation");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});

    setLatitude(currentLocation.coords.latitude);
    setLongitude(currentLocation.coords.longitude);
  };

  const getPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission not granted');
    }
  };

  const pickImage = async () => {
    getPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    getPermission();

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { dataFromHomePage1 } = route.params;

  const handleSubmit = () => {
    const dataFromHomePage2 = {
      SurfaceODP,
      emplacementExact,
      observation,
      value1,
      value3,
      AP,
      APA,
      APT,
      AE,
      AEA,
      AET,
      image,
      latitude,
      longitude,
    };
    navigation.navigate('HomePage3', { dataFromHomePage1, dataFromHomePage2 });
  };

  const handleSubmit1 = () => {
    const dataFromHomePage2 = {
      SurfaceODP,
      emplacementExact,
      observation,
      value1,
      value3,
      AP,
      APA,
      APT,
      AE,
      AEA,
      AET,
      image,
      latitude,
      longitude,
    };
    navigation.navigate('RecapPage', { dataFromHomePage1, dataFromHomePage2 });
  };

  return (
    <SafeAreaView>

      <View style={styles.container}>
        <View style={styles.champ}>
          {value1 && (
            <View style={styles.saisi}>
              <TextInput
                style={styles.inputs}
                placeholder="SurfaceODP"
                placeholderTextColor={Colors.darkText}
                keyboardType='numeric'
                value={SurfaceODP}
                onChangeText={(text) => setSurfaceODP(text)}
              />
            </View>
          )}
          <View style={styles.saisi}>
            <TextInput
              style={styles.inputs}
              placeholder="Emplacement Exat"
              mode="outlined"
              placeholderTextColor={Colors.darkText}
              multiline={true}
              numberOfLines={7}
              onChangeText={(text) => setEmplacementExact(text)}
            />
          </View>
          <View style={styles.saisi}>
            <TextInput
              style={styles.inputs}
              placeholder="Observation"
              mode="outlined"
              placeholderTextColor={Colors.darkText}
              multiline={true}
              numberOfLines={7}
              onChangeText={(text) => setObservation(text)}
            />
          </View>
          <View style={styles.imView1}>
            <View style={styles.swi}>
              <Text style={styles.textOPD}>Nouveau ?</Text>
              <Switch
                value={value3}
                circleSize={20}
                onValueChange={(newValue1) => {
                  setValue3(newValue1);
                }}
                activeText=""
                inActiveText=""
              />
            </View>
            <View style={styles.swi}>
              <Text style={styles.textOPD}>ODP ?</Text>
              <Switch
                value={value1}
                circleSize={20}
                onValueChange={(newValue) => {
                  setValue(newValue);
                }}
                activeText=""
                inActiveText=""
              />
            </View>
            <View style={styles.swi}>
              <Text style={styles.textOPD}>Affiche Peinte ?</Text>
              <Switch
                value={AP}
                circleSize={20}
                onValueChange={(newValue1) => {
                  setAP(newValue1);
                }}
                activeText=""
                inActiveText=""
              />
            </View>
            <View style={styles.swi}>
              <Text style={styles.textOPD}>Affiche Peinte Alcool ?</Text>
              <Switch
                value={APA}
                circleSize={20}
                onValueChange={(newValue1) => {
                  setAPA(newValue1);
                }}
                activeText=""
                inActiveText=""
              />
            </View>
            <View style={styles.swi}>
              <Text style={styles.textOPD}>Affiche Peinte Tabac ?</Text>
              <Switch
                value={APT}
                circleSize={20}
                onValueChange={(newValue1) => {
                  setAPT(newValue1);
                }}
                activeText=""
                inActiveText=""
              />
            </View>
            <View style={styles.swi}>
              <Text style={styles.textOPD}>Annonce Eclairée ?</Text>
              <Switch
                value={AE}
                circleSize={20}
                onValueChange={(newValue1) => {
                  setAE(newValue1);
                }}
                activeText=""
                inActiveText=""
              />
            </View>
            <View style={styles.swi}>
              <Text style={styles.textOPD}>Annonce Eclairée Alcool ?</Text>
              <Switch
                value={AEA}
                circleSize={20}
                onValueChange={(newValue1) => {
                  setAEA(newValue1);
                }}
                activeText=""
                inActiveText=""
              />
            </View>
            <View style={styles.swi}>
              <Text style={styles.textOPD}>Annonce Eclairée Tabac?</Text>
              <Switch
                value={AET}
                circleSize={20}
                onValueChange={(newValue1) => {
                  setAET(newValue1);
                }}
                activeText=""
                inActiveText=""
              />
            </View>
          </View>
          <View style={styles.imView}>
            <View style={styless.buttonsContainer}>
              <TouchableOpacity style={styless.uploadButton} onPress={pickImage}>
                <MaterialIcons name="add-a-photo" style={styless.iconeImage} />
                <Text style={styless.buttonText}>Upload</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styless.uploadButton} onPress={takePhoto}>
                <MaterialIcons name="camera-alt" style={styless.iconeImage} />
                <Text style={styless.buttonText}>Take Picture</Text>
              </TouchableOpacity>
            </View>
            <View style={styless.imageContainer}>
              {image && <Image source={{ uri: image }} style={styless.imagePreview} />}
            </View>
          </View>
          <View style={styles.MapView}>
            <MaterialIcons name="my-location" style={styles.iconeLoc} />
            <View style={styles.coordLoc}>
              <Text>Latitude : {parseFloat(latitude).toFixed(5)} </Text>
              <Text>Longitude : {parseFloat(longitude).toFixed(5)} </Text>
            </View>
            <TouchableOpacity onPress={getLocation} style={styles.getLocationButton}>
              <Text style={styles.getLocationButtonText}>Coordonnée</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn1}>
          <TouchableOpacity style={styles.btnt} onPress={handleSubmit1}>
            <Text style={styles.btntxt}>Terminer</Text>
            <MaterialIcons name="check-circle" style={styles.iconeNext} />
          </TouchableOpacity>
          </View>
          <View style={styles.btn1}>
          <TouchableOpacity style={styles.btns} onPress={handleSubmit}>
            <Text style={styles.btntxt}>Suivant</Text>
            <MaterialIcons name="navigate-next" style={styles.iconeNext} />
          </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
            <Text style={styles.btntxt}>Ouvrir Popup</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => setSignatureModalVisible(true)}>
          <Text style={styles.btntxt}>Signer</Text>
          <MaterialIcons name="edit" style={styles.iconeNext} />
        </TouchableOpacity> */}
        
        </View>
      </View>

      {signature && (
        <View >
          <Image
            source={{ uri: signature }}
            style={styles.signatureImage}
          />
          <Button title="Effacer" onPress={handleClear} />
        </View>
      )}
        <Modal  visible={isSignatureModalVisible} animationType="slide">
          <View style={{height:'70%', paddingTop:'10%'}}>
            <SignatureScreen
              onOK={handleSignature}   
              onEmpty={() => console.log('Empty')}
              descriptionText="Sign"
              clearText="Effacer"
              confirmText="Enregistrer"
              webStyle={styles.signatureCanvas}
            />
            <Button title="Fermer" onPress={() => setSignatureModalVisible(false)} />
          </View>
          
        </Modal>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              // style={styles.inputs}
              placeholder="Nom1"
              placeholderTextColor={Colors.darkText}
              value={nom1}
              onChangeText={(text) => setNom1(text)}
            />
            <TextInput
              // style={styles.inputs}
              placeholder="Nom2"
              placeholderTextColor={Colors.darkText}
              value={nom2}
              onChangeText={(text) => setNom2(text)}
            />
            <TextInput
              // style={styles.inputs}
              placeholder="Nom3"
              placeholderTextColor={Colors.darkText}
              value={nom3}
              onChangeText={(text) => setNom3(text)}
            />
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 14,
    justifyContent: 'center',
    backgroundColor: '#F4F8F7'
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    marginBottom: 20,
    borderStyle: 'dashed',
    borderRadius: Spacing,
    borderColor: '#778',
    margin: 20,
  },
  uploadButton: {
    alignItems: 'flex-start',
    marginVertical: 5
  },
  uploadButtonColumn: {
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  iconeImage: {
    fontSize: 25, // Ajustez la taille de l'icône ici
    color: '#5D6D7E',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  imagePreview: {
    marginBottom: 10,
    width: '100%',
    height: '95%',
    resizeMode: 'contain', // Utilisez "contain" ou "cover" en fonction de vos besoins
    marginTop: 20,
  },
  buttonText: {
    fontWeight: '500'
  },
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width / 14,
    height: height,
  },
  appB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: "8%",
  },
  iconeback: {
    fontSize: 35,
    color: '#5DADE2', // Couleur bleue
  },
  txt: {
    fontSize: FontSize.large,
    color: '#01579B', // Couleur bleue
    fontFamily: Font["poppins-bold"],
    fontWeight: '700',
    marginVertical: Spacing * 2,
    paddingHorizontal: width / 8,
  },
  champ: {
    height: "80%",
    
    justifyContent: 'space-around',
  },
  saisi: {
    height: "8%",
    paddingBottom:'0%',
  },
  inputs: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.medium,
    paddingHorizontal: Spacing * 1.5,
    borderWidth: 0.5,
    borderColor: '#778',
    borderRadius: Spacing * 0.5,
    width: "100%",
    height: "80%",
  },
  inputs1: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.medium,
    padding: Spacing * 1.5,
    borderWidth: 0.5,
    borderColor: '#778',
    borderRadius: Spacing,
    width: "100%",
    borderBottomWidth: 2
  },
  textOPD: {
    fontSize: 15,
    fontFamily: Font["poppins-semiBold"],
    color: 'black',
    fontWeight: 'normal'
  },
  swi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    alignItems: 'center',
    paddingHorizontal: Spacing * 0.5,
    paddingBottom:'1%'
  },
  imView: {
    flexDirection: 'row', // Ajout de flexDirection
    height: "15%",
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 2, // Épaisseur de la bordure augmentée
    borderStyle: 'dashed',
    borderRadius: Spacing,
    borderColor: '#778',
  },
  imView1: {
    flexDirection: 'column', // Ajout de flexDirection
    
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing,
    backgroundColor: '#C0C0C0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 1, // Pour Android

  },
  iconeImage: {
    fontSize: 80,
    color: 'gray', // Couleur grise
  },
  MapView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Spacing,
    borderColor: '#778',
  },
  iconeLoc: {
    fontSize: 50,
    color: 'gray', // Couleur grise
  },
  coordLoc: {
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: "2%",

  },
  btn1: {
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
  },
  btnt: {
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
    width:'100%',
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
  getLocationButton: {
    backgroundColor: '#C0C0C0', // Couleur bleue
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
    height: "90%",
    width: 110, // Hauteur augmentée
    marginVertical: 10, // Espace vertical
  },
  getLocationButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: FontSize.medium,
    fontWeight: 'normal',
  },
  modalContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    height:'10%'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    
    flexDirection: 'column', // Utilisez flexDirection: 'column' pour disposer les éléments en colonnes
    alignItems: 'center', // Alignez les éléments au centre de la colonne
  },
  signatureContainer: {
    // width:'10%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginVertical: 100,
    // backgroundColor:'red'
  },
 signatureImage: {
    
    // resizeMode: 'contain',
    // borderWidth: 1,
    // borderColor: '#000',
  },
  btn1: {
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
 
  },
  btns: {
    backgroundColor: '#5D6D7E',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
    width:'100%',
    height:'130%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'red',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  signatureCanvas: `
   .m-signature-pad {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  .m-signature-pad--body {
    border: 2px  #000;
    border-radius: 10px;
    height: 80vh;
    background-color: #f8f8f8;
  }

`,
});

