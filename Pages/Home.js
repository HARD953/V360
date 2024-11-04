import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Font from "../constants/Font";
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';

// Import the authentication context
import { AuthContext } from '../Components/globalContext';

const { height, width } = Dimensions.get("screen");

const Home = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(true);
  const [elementsRecenses, setElementsRecenses] = useState([]);
  const [etatRecenses, setEtatRecenses] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialSelectedElement, setInitialSelectedElement] = useState([]);

  // Get the authentication token from the authentication context
  const { userInfo } = useContext(AuthContext);
  const authToken = userInfo ? userInfo.access : null;

  const images = [
    require("../assets/Images/oranges.jpeg"),
  ];

  const handleEdit = (field, value) => {
    setSelectedElement(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };
  
  const patchData = async (id, updatedData) => {
    try {
      await axios.patch(`https://apitest.visitrack360.com/api/donneescollectees/${id}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      // Gérer l'erreur ici
      throw error; // Vous pouvez choisir de rejeter à nouveau l'erreur pour la gérer ailleurs
    }
  };
  
  // Function to handle saving changes
  const handleSave = async () => {
    if (selectedElement) {
      console.log(selectedElement)
      const updatedData = {};
      // Filtrer les champs modifiés et les ajouter à updatedData
      Object.keys(selectedElement).forEach(key => {
        if (selectedElement[key] !== initialSelectedElement[key]) {
          updatedData[key] = selectedElement[key];
        }
      });
      console.log(updatedData)
      // Si aucun champ n'a été modifié, ne pas envoyer la requête PATCH
      if (Object.keys(updatedData).length === 0) {
        console.log('Aucune modification détectée.');
        setModalVisible(false);
        return;
      }
      await patchData(selectedElement.id, updatedData);
      setModalVisible(false);
    }
  };
  const openEditDialog = (element) => {
    setSelectedElement(element);
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apitest.visitrack360.com/api/agent/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (Array.isArray(response.data.results)) {
          setElementsRecenses(response.data.results);
        } else {
          console.error('Invalid response format: expected an array');
        }
      } catch (error) {
        setError('Error fetching data from API');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apitest.visitrack360.com/api/statbyetat/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.data) {
          setEtatRecenses(response.data);
        } else {
          console.error('Invalid response format: expected an array');
        }
      } catch (error) {
        setError('Error fetching data from API');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const toggleMapVisibility = async () => {
    if (currentLocation) {
      setMapVisible(!mapVisible);
    } else {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setCurrentLocation(location);
          setMapVisible(true);
        }
      } catch (error) {
        setError('Error getting location');
      }
    }
  };

  const renderCarouselItem = ({ item }) => {
    return (
      <View style={styles.carouselContainer}>
        <Image style={styles.carouselImage} source={item} />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1A6DB2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* Map and Image Carousel */}
          <View style={styles.mapContainer}>
            {mapVisible ? (
              <View style={styles.imageView}>
                  <Text style={[styles.collecte,{'fontWeight':'800'}]}>Nombre de support collecté</Text>
                  <Text style={[styles.collecte,{'fontWeight':'800'}]}>{etatRecenses["nombre_support_total"]}</Text>
                  {/* <View style={styles.rowCarre}>
                      <View style={styles.carre}>
                        <TouchableActionBox
                          onPress={() => navigation.navigate('HomPage1')}
                          icon="ios-albums"
                          text="Affiche"
                        />
                      </View>
                    </View> */}
                    <View style={styles.direct}>
                        <View style={styles.carre}>
                        <TouchableActionBox1
                          // onPress={() => navigation.navigate('HomPage1')}
                          icon="check-circle-outline"
                          text="Bon"
                          data={etatRecenses["nombre_support_bon"]}
                        />
                        </View>
                        <View style={styles.carre1}>
                       <TouchableActionBox1
                          // onPress={() => navigation.navigate('HomPage1')}
                          icon="error-outline"
                          text="Détérioré"
                          data={etatRecenses["nombre_support_deteriore"]}
                        />
                        </View>
                        <View style={styles.carre2}>
                       <TouchableActionBox1
                          // onPress={() => navigation.navigate('HomPage1')}
                          icon="warning-amber"
                          text="Défraichis"
                          data={etatRecenses["nombre_support_defraichis"]}
                        />
                        </View>
                    </View>
              </View>
            ) : (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: currentLocation?.coords.latitude || 0,
                  longitude: currentLocation?.coords.longitude || 0,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: currentLocation?.coords.latitude || 0,
                    longitude: currentLocation?.coords.longitude || 0,
                  }}
                  title="You are here"
                />
              </MapView>
            )}
          </View>

          {/* Action Boxes */}
          <View style={styles.row}>
            <View style={styles.rightView}>
              <TouchableActionBox
                onPress={() => navigation.navigate('HomPage1')}
                icon="announcement"
                text="Collecte des supports"
              />
            </View>
            <View style={styles.rightViewB}>
              <TouchableActionBox
                onPress={toggleMapVisibility}
                icon="my-location"
                text="Localisation"
              />
            </View>
          </View>

          {/* Voir Tout Button */}
          <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('Voir')}>
            <Text style={styles.buttonText}>Aujourd'hui </Text>
            <Text style={styles.buttonText}>Voir tout  </Text>
          </TouchableOpacity>
          {/* Elements Recenses */}
          <View style={styles.elementsRecensesContainer}>
  {elementsRecenses.length > 0 ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      {elementsRecenses.map((element, index) => (
        <TouchableElement
          key={index}
          onPress={() => openEditDialog(element)}
          imageUri={element.image_support}
          commune={element.commune}
          description={element.description}
          canal={element.canal}
          typeSupport={element.type_support}
          TSP={element.TSP}
          latitude={element.latitude}
          surface={element.surface}
          Marque={element.Marque}
          etatSupport={element.etat_support}
          visibilite={element.visibilite}
          ODP={element.ODP}
          ODPValue={element.ODP_value}
          longitude={element.longitude}
        />
      ))}
    </ScrollView>
  ) : (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>Aucune donnée trouvée</Text>
    </View>
  )}
</View>
          {/* Edit Element Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Modifications</Text>
                <ElementEditForm
                  selectedElement={selectedElement}
                  handleEdit={handleEdit}
                  handleSave={handleSave}
                  imageUri={selectedElement?.image_support} 
                  closeModal={() => setModalVisible(false)}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView> 
  );
};

const TouchableActionBox = ({ onPress, icon, color, text }) => (
  <TouchableOpacity onPress={onPress} style={[styles.box, { backgroundColor: color }]}>
    <View style={styles.iconContainer}>
      <MaterialIcons name={icon} size={50} color="#2471a3"/>
    </View>
    <Text style={styles.boxText}>{text}</Text>
  </TouchableOpacity>
);

const TouchableActionBox1 = ({ onPress, icon, color, text,data }) => (
  <TouchableOpacity onPress={onPress} style={[styles.box1, { backgroundColor: color }]}>
    <View>
      <MaterialIcons name={icon} size={20} color="white" /> 
    </View>
    <Text style={styles.boxText1}>{data}</Text>
    <Text style={styles.boxText1}>{text }</Text>
  </TouchableOpacity>
);

const TouchableElement = ({
  onPress,
  imageUri,
  commune,
  description,
  canal,
  typeSupport,
  TSP,
  latitude,
  surface,
  Marque,
  etatSupport,
  visibilite,
  ODP,
  ODPValue,
  longitude,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.elementRecense}>
    {/* Image */}
    <Image style={styles.recenseImage} source={{ uri: imageUri }} />

    {/* Details */}
    <View style={styles.detailsContainer}>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Commune:</Text>
        <Text style={styles.detailValue}>{commune}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Emplacement:</Text>
        <Text style={styles.detailValue}>{description}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Canal:</Text>
        <Text style={styles.detailValue}>{canal}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Type Support:</Text>
        <Text style={styles.detailValue}>{typeSupport}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Dimension:</Text>
        <Text style={styles.detailValue}>{surface}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Marque:</Text>
        <Text style={styles.detailValue}>{Marque}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>État Support:</Text>
        <Text style={styles.detailValue}>{etatSupport}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Visibilité:</Text>
        <Text style={styles.detailValue}>{visibilite}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>TSP:</Text>
        <Text style={styles.detailValue}>{TSP}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>ODP:</Text>
        <Text style={styles.detailValue}>{ODP ? 'Oui' : 'Non'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>ODP Value:</Text>
        <Text style={styles.detailValue}>{ODPValue}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Latitude:</Text>
        <Text style={styles.detailValue}>{latitude}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Longitude:</Text>
        <Text style={styles.detailValue}>{longitude}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ElementEditForm = ({ selectedElement, handleEdit, handleSave, closeModal,imageUri }) => {

  const [newImageUri, setNewImageUri] = useState(null);

  const handleEditImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    setNewImageUri(pickerResult.uri);
  };

  useEffect(() => {
    if (newImageUri) {
      handleEdit('image_support', newImageUri);
    }
  }, [newImageUri]);

   return (
  <View style={styles.inputContainer}>
    {/* First Column */}
    <View style={styles.column}>
      <TextInput
        style={styles.inputField}
        value={selectedElement?.commune}
        onChangeText={(text) => handleEdit('commune', text)}
        placeholder="Commune"
      />
      <TextInput
        style={styles.inputField}
        value={selectedElement?.description}
        onChangeText={(text) => handleEdit('description', text)}
        placeholder="Emplacement"
      />
      <TextInput
        style={styles.inputField}
        value={selectedElement?.canal}
        onChangeText={(text) => handleEdit('canal', text)}
        placeholder="Canal"
      />
      <TextInput
        style={styles.inputField}
        value={selectedElement?.type_support}
        onChangeText={(text) => handleEdit('type_support', text)}
        placeholder="Type Support"
      />
      <TextInput
        style={styles.inputField}
        value={selectedElement?.TSP}
        onChangeText={(text) => handleEdit('TSP', text)}
        placeholder="TSP"
      />
      <TextInput
        style={styles.inputField}
        value={selectedElement?.latitude}
        onChangeText={(text) => handleEdit('latitude', text)}
        placeholder="Latitude"
      />
    </View>

    {/* Second Column */}
    <View style={styles.column}>
      <TextInput
        style={styles.inputField}
        value={selectedElement?.surface}
        onChangeText={(text) => handleEdit('surface', text)}
        placeholder="Dimension"
      />
      <TextInput
        style={styles.inputField}
        value={selectedElement?.Marque}
        onChangeText={(text) => handleEdit('Marque', text)}
        placeholder="Marque"
      />
      <TextInput
        style={styles.inputField}
        value={selectedElement?.etat_support}
        onChangeText={(text) => handleEdit('etat_support', text)}
        placeholder="État Support"
      />
      <TextInput
        style={styles.inputField}
        value={selectedElement?.visibilite}
        onChangeText={(text) => handleEdit('visibilite', text)}
        placeholder="Visibilité"
      />
      <TextInput
        style={styles.inputField}
        value={selectedElement?.ODP_value}
        onChangeText={(text) => handleEdit('ODP_value', text)}
        placeholder="ODP Value"
        keyboardType='numeric'
      />
      <TextInput
        style={styles.inputField}
        value={selectedElement?.longitude}
        onChangeText={(text) => handleEdit('longitude', text)}
        placeholder="Longitude"
        keyboardType='numeric'
      />
    </View>

    {/* Save and Cancel Buttons */}
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.editButton} onPress={handleSave} >
      <Text style={styles.editButtonText}>Save</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
      <Text style={styles.cancelButtonText}>Cancel</Text>
    </TouchableOpacity>
    <Image style={styles.modalImage} source={{ uri: imageUri }} />
    <TouchableOpacity
          style={styles.editImageButton}
          onPress={handleEditImage}
        >
          <Text style={styles.editImageButtonText}>Edit</Text>
        </TouchableOpacity>
    </View>
  </View>
)};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',

    },
    button: {
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    buttonText: {
      color: '#154360',
      fontWeight:'600',
      fontSize: FontSize.medium,
    },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FontSize.medium,
    color: 'red',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    // height: height*1.13
  },
  mapContainer: {
    height: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#154360',
    backgroundColor:'white',
    width:'97%',
    borderWidth:1,
    marginVertical:10,
    borderRadius:Spacing,
    borderColor:'#2471a3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 2, // Pour Android
  },
  collecte: {
    fontSize: 15,
    fontWeight:'bold',
    color:'#2E4053',
    marginBottom:10
  },
  carouselContainer: {
    flex: 1,
  },
  carouselImage: {
    height: '100%',
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '1%',
    borderRadius: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '97%',
    margin: 10,
    height:'12%'
  },
  rightView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderColor: '#2471a3', // Ajout du borderColor
    borderWidth: 0, // Ajout de la largeur de la bordure
    borderRadius:10,
    backgroundColor:'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Pour Android
  },
  rightViewB: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderColor: '#2471a3', // Ajout du borderColor
    borderWidth: 0, // Ajout de la largeur de la bordure
    borderRadius:10,
    backgroundColor:'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Pour Android
  },

  direct:{
    flexDirection:'row',
    width:'70%',
    height:'40%',
  },
  // rowCarre: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: '25%',
  //   margin: 10,
  //   height:'25%'
  // },
  carre: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderColor: '#2471a3', // Ajout du borderColor
    borderWidth: 0,
    // borderColor: 'green', // Ajout du borderColor
    // borderWidth: 2, // Ajout de la largeur de la bordure
    borderRadius:5,
    backgroundColor:'#2ECC71',
    shadowOffset: {
      width: 0,
      height: 2,
      },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Pour Android
  },

  carre1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderColor: '#607D8B', // Ajout du borderColor
    borderWidth: 0,
    // borderColor: 'green', // Ajout du borderColor
    // borderWidth: 2, // Ajout de la largeur de la bordure
    borderRadius:5,
    backgroundColor:'#F39C12',
    shadowOffset: {
      width: 0,
      height: 2,
      },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Pour Android
  },
  carre2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderColor: '#607D8B', // Ajout du borderColor
    borderWidth: 0,
    // borderColor: 'green', // Ajout du borderColor
    // borderWidth: 2, // Ajout de la largeur de la bordure
    borderRadius:5,
    backgroundColor:'#C0392B',
    shadowOffset: {
      width: 0,
      height: 2,
      },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Pour Android
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  box: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    backgroundColor: '#099138',
    borderRadius: Spacing,
  },
  box1: {
    width: '115%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    backgroundColor: 'black',
    borderRadius: 50,
  },
  iconContainer: {
    borderRadius: Spacing,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 2,
    shadowOffset: {
      width: 0,
      height: 2,
      },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Pour Android
  },
  boxRed: {
    backgroundColor: '#055093',
  },
  boxText: {
    color: 'black',
    fontSize: FontSize.small,
    marginTop: 5,
    fontWeight:'bold'
  },
  boxText1: {
    color: 'white',
    fontSize: 14,
    
    fontWeight:'600'
  },
  elementsRecensesContainer: {
    justifyContent: 'flex-end', // Aligner à droite
  },
  buttonContainer: {
    marginRight: 'auto', // Mettre à gauche autant que possible pour pousser le bouton à droite
  },

  elementsRecensesText: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: '#141716',
    marginBottom: 10,
  },
  elementRecense: {
    backgroundColor: '#ECEFF1',
    borderRadius: 5,
    padding: 10,
    marginLeft:15,
    elevation: 3,
    borderWidth: 0,
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.50,
    // shadowRadius: 3.84,
    // elevation: 5, // Pour Android
  },
  recenseImage: {
    width: 200,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15, // Ajouter un espacement entre chaque paire de détails
    borderWidth: 0, // Ajouter une bordure basse
  },
  detailLabel: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: '#154360',
    marginRight: 10, // Ajouter un espacement entre l'étiquette et la valeur
  },
  detailValue: {
    fontSize: FontSize.medium,
    color: '#141716',
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailText: {
    fontSize: FontSize.small,
    fontWeight:'800',
    marginBottom: 10,
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  column: {
    flex: 1,
    marginRight: 10, // Espace entre les colonnes
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    flexDirection: 'column', // Utilisez flexDirection: 'column' pour disposer les éléments en colonnes
    alignItems: 'center', // Alignez les éléments au centre de la colonne
    width:'95%',
  },
  
  modalTitle: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  inputField: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  
  editButton: {
    backgroundColor: '#099138',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  editButtonText: {
    color: 'white',
    fontSize: FontSize.medium,
    fontWeight: 'bold',
  },
  
  cancelButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  cancelButtonText: {
    color: 'white',
    fontSize: FontSize.medium,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3, // Pour l'ombre sur Android
    shadowColor: '#000', // Ombre sur iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  googleButtonText: {
    color: 'white',
    fontSize: FontSize.medium,
    fontWeight: 'bold',
  },
  modalImage: {
    width: 100, // Ajustez en fonction de vos besoins
    height: 100, // Ajustez en fonction de vos besoins
    borderRadius: 5,
    marginTop: 10,
  },
  editImageButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  editImageButtonText: {
    color: 'white',
    fontSize: FontSize.medium,
    fontWeight: 'bold',
  },

  infoBox: {
    backgroundColor: '#3498db', // Couleur de fond de la boîte d'informations
    padding: 10, // Rembourrage interne de la boîte d'informations
    borderRadius: 8, // Bordure arrondie de la boîte d'informations
    alignItems: 'center', // Alignement du contenu au centre
    justifyContent: 'center', // Alignement du contenu au centre
    marginBottom: 10, // Marge inférieure pour espacement
  },
  infoText: {
    color: '#ffffff', // Couleur du texte à l'intérieur de la boîte d'informations
    fontSize: FontSize.medium, // Taille de la police du texte
    fontWeight: 'bold',
    fontFamily: Font['poppins-regular'], // Poids de la police en gras
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: FontSize.medium,
    color: Colors.darkText,
    fontFamily: Font['poppins-regular'],
  },
});

export default Home;
