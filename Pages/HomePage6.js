import React, { useState, useEffect,useContext } from 'react';
import { 
  SafeAreaView, 
  ScrollView,
  StyleSheet, 
  TextInput, 
  Text, 
  View, 
  Dimensions, 
  TouchableOpacity, 
  Modal, 
  Pressable 
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Switch } from 'react-native';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import { MaterialIcons } from '@expo/vector-icons';
import Font from "../constants/Font";
import * as Animatable from 'react-native-animatable'; // Import Animatable
const { height, width } = Dimensions.get("screen");
import { AuthContext } from '../Components/globalContext';

export default function HomPage1({ navigation,route }) {
  // State declarations
  
  const [nombreface, setNombreface] = useState(null);
  const [nombresupport, setNombresupport] = useState(null);
  const [marque, setMarque] = useState('');
  const [marque1, setMarque1] = useState([]);
  const [site, setSite] = useState('');
  const [site1, setSite1] = useState([]);
  const [typeSupport, setTypeSupport] = useState('');
  const [typeSupport1, setTypeSupport1] = useState([]);
  const [canal, setCanal] = useState('');
  const [canal1, setCanal1] = useState([]);
  const [etatSupport, setEtatSupport] = useState('');
  const [etatSupport1, setEtatSupport1] = useState([]);
  const [visibilite, setVisibilite] = useState('');
  const [visibilite1, setVisibilite1] = useState([]);
  const [surface, setSurface] = useState(null);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [switchEnabled1, setSwitchEnabled1] = useState(false);
  
  const { userInfo } = useContext(AuthContext);
  const authToken = userInfo ? userInfo.access : null;


  // State for modal management
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [currentField, setCurrentField] = useState('');

  const isFieldFilled = (value) => value.length > 0;

  // Fetch data from API with token
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apitest.visitrack360.com/api/quartiersco/', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        
        setMarque1(response.data.marques.map((item) => ({ key: item, value: item })));
        // setVillage1(response.data.village.map((item) => ({ key: item, value: item })));
        // setQuartier1(response.data.quartiers.map((item) => ({ key: item, value: item })));
        setTypeSupport1(response.data.type_supports.map((item) => ({ key: item, value: item })));
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [authToken]);

  // Fetch data from API
  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url);
      const formattedData = response.data.results.map((item) => ({
        key: item.id.toString(),
        value:  item.canal || item.etat || item.visibilite || item.site 
      }));
      setter(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [searchText, setSearchText] = useState('');

 
 // Fetch data on component mount


  useEffect(() => {
    fetchData('https://apitest.visitrack360.com/api/canal/', setCanal1);
    fetchData('https://apitest.visitrack360.com/api/etat/', setEtatSupport1);
    fetchData('https://apitest.visitrack360.com/api/site/', setSite1);
    fetchData('https://apitest.visitrack360.com/api/visibilite/', setVisibilite1);
  }, []);

  // Switch management functions
  const toggleSwitch = () => {
    setSwitchEnabled(prev => !prev);
    if (!switchEnabled) {
      setTypeSupport(''); // Reset Type Support
      setSurface(''); // Reset Surface
    }
  };

  const toggleSwitch1 = () => {
    setSwitchEnabled1(prev => !prev);
    if (!switchEnabled1) {
      setQuartier(''); // Reset Quartier
    }
  };

  // Open modal for selection
  const openModal = (field, data) => {
    setCurrentField(field);
    setSelectedList(data);
    setModalVisible(true);
  };

  // Select an item from the list and close modal
  const selectItem = (item) => {
    switch (currentField) {
      case 'entreprise':
        setEntreprise(item);
        break;
      case 'marque':
        setMarque(item);
        break;
      case 'village':
        setVillage(item);
        break;
      case 'quartier':
        setQuartier(item);
        break;
      case 'typeSupport':
        setTypeSupport(item);
        break;
      case 'canal':
        setCanal(item);
        break;
      case 'etatSupport':
        setEtatSupport(item);
        break;
      case 'site':
        setSite(item);
        break;
      case 'visibilite':
        setVisibilite(item);
        break;
      default:
        break;
    }
    setModalVisible(false);
  };
  // Navigate to next page

  // Navigate to next page
  const navigateToHomePage2 = () => {
    const { previousRouteName } = route.params;
    let params;
  
    // Définir les paramètres en fonction de la route précédente
    
    // Données additionnelles
    const dataFromHomePageAdd = {
      marque,
      typeSupport,
      surface,
      canal,
      etatSupport,
      visibilite,
      site,
      nombreface,
      nombresupport
    };

    if (previousRouteName === "HomPage5") {
      const { dataFromHomePage1,dataFromHomePage2,dataFromHomePage5 } = route.params;
      params = { previousRouteName,dataFromHomePageAdd,dataFromHomePage2, dataFromHomePage1, dataFromHomePage5 };
    } else {
      const { dataFromHomePage1,dataFromHomePage2, dataFromHomePage3, dataFromHomePage4, dataFromHomePage5 } = route.params;
      params = { previousRouteName,dataFromHomePageAdd,dataFromHomePage2, dataFromHomePage1, dataFromHomePage3, dataFromHomePage4, dataFromHomePage5 };
    }
    // Naviguer vers HomPage7 avec les paramètres définis
    navigation.navigate('HomPage7', params);
  };
  
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Ajout d'un autre support à ce site</Text>
          </View>
          {/* Frame for fields */}
          <View style={styles.frame}>
            <View style={styles.champ}>
              {/* Input Fields */}
              <View style={styles.saisi}>
                <Pressable style={styles.selectBox} onPress={() => openModal('marque', marque1)}>
                  <Text>{marque || 'Marque ...'}</Text>
                </Pressable>
              </View>
              <View style={styles.saisi}>
              {!switchEnabled && (
                    <Pressable style={styles.selectBox} onPress={() => openModal('typeSupport', typeSupport1)}>
                      <Text>{typeSupport || 'Type support ...'}</Text>
                    </Pressable>
                  )}
                  {switchEnabled && (
                    <>
                      <TextInput
                        style={styles.inputs}
                        placeholder='Type support ...'
                        placeholderTextColor={Colors.darkText}
                        value={typeSupport}
                        onChangeText={setTypeSupport}
                      />
                      <TextInput
                        style={styles.inputs}
                        placeholder='Surface ...'
                        placeholderTextColor={Colors.darkText}
                        value={surface}
                        onChangeText={setSurface}
                        keyboardType='numeric'
                      />

                      <TextInput
                        style={styles.inputs}
                        placeholder='Nombre de face ...'
                        placeholderTextColor={Colors.darkText}
                        value={nombreface}
                        onChangeText={setNombreface}
                        keyboardType='numeric'
                      />
                    </>
                  )}
                <Switch
                  value={switchEnabled}
                  onValueChange={toggleSwitch}
                  style={{ marginTop: 10 }}
                />
                <TextInput
                style={styles.inputs}
                placeholder='Nombre de support ...'
                placeholderTextColor={Colors.darkText}
                value={nombresupport}
                onChangeText={setNombresupport}
                keyboardType='numeric'
              />
              </View>
              <View style={styles.saisi}>
                <Pressable style={styles.selectBox} onPress={() => openModal('canal', canal1)}>
                  <Text>{canal || 'Canal ...'}</Text>
                </Pressable>
              </View>
              <View style={styles.saisi}>
                <Pressable style={styles.selectBox} onPress={() => openModal('etatSupport', etatSupport1)}>
                  <Text>{etatSupport || 'Etat support ...'}</Text>
                </Pressable>
              </View>
              <View style={styles.saisi}>
                <Pressable style={styles.selectBox} onPress={() => openModal('site', site1)}>
                  <Text>{site || 'Site ...'}</Text>
                </Pressable>
              </View>
              <View style={styles.saisi}>
                <Pressable style={styles.selectBox} onPress={() => openModal('visibilite', visibilite1)}>
                  <Text>{visibilite || 'Visibilite ...'}</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.btn1}>
              <TouchableOpacity style={styles.btn} onPress={navigateToHomePage2}>
                  <Text style={styles.btntxt}>Suivant </Text>
                  <MaterialIcons name="navigate-next" style={styles.iconeNext} />
                </TouchableOpacity>
          </View>
            {/* Modal for selection */}
        <Modal animationType="none" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <Animatable.View
              animation="zoomIn" // Use zoomIn animation for modal appearance
              duration={300} // Duration of the animation
              style={styles.modalContent}
            >
              <Text style={styles.modalTitle}>{`Sélectionnez ${currentField}`}</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher..."
                placeholderTextColor={Colors.darkText}
                onChangeText={setSearchText}
              />
              <ScrollView style={styles.scrollView}>
                {selectedList
                  .filter(item => item.value.toLowerCase().includes(searchText.toLowerCase()))
                  .map((item) => (
                    <Pressable key={item.key} onPress={() => selectItem(item.value)}>
                      <Text style={styles.modalText}>{item.value}</Text>
                    </Pressable>
                  ))}
              </ScrollView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Fermer</Text>
              </Pressable>
            </Animatable.View>
          </View>
        </Modal>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

// Styles for components
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width / 20,
    height: height,
    backgroundColor:'#F2F3F4',
    marginVertical: 20
  },
  header: {
    backgroundColor: 'white', // Adjust color as needed
    padding: Spacing.medium,
    borderRadius: Spacing.small,
    alignItems: 'center',
    marginBottom: Spacing.medium,
    height:'4%',
    justifyContent:'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0,
  },
  headerText: {
    color: 'black',
    fontSize: FontSize.large,
    fontWeight: 'bold',
  },
  btn1: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderRadius: Spacing,
  },
  btn: {
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: Spacing,
    width:'30%',
    height:'150%'
  },
  btntxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: FontSize.medium,
    fontFamily: Font['poppins-bold'],
    fontWeight: '800'
  },
  frame: {
    flex: 1,
    padding: Spacing.small,
  },
  champ: {
    marginVertical: Spacing.medium,
  },
  saisi: {
    marginBottom: Spacing.small,
  },
  inputs: {
    height: 50,
    borderBottomWidth:1,
    borderColor: Colors.border,
    borderRadius: 2,
    paddingHorizontal: Spacing.small,
    fontSize: FontSize.medium,
    marginVertical: '2%'
  },
  selectBox: {
    height: 50,
    borderBottomWidth:1,
    borderColor: Colors.border,
    borderRadius: 2,
    justifyContent: 'center',
    paddingHorizontal: Spacing.small,
    marginVertical: '3%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.large,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: Colors.primary,
    marginTop:20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    marginBottom: 15, // Adjust spacing as needed
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: '60%', // Adjust height as needed
    width: '100%', // Ensures the scroll view takes full width
  },
  
  searchInput: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    paddingHorizontal: Spacing.small,
    marginBottom: 20,
    width: '100%',
  },
  filledField: {
    backgroundColor: '#E6F7FF', // Soft color effect when the field is filled
  },
});
