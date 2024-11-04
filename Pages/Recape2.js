import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from '../Components/globalContext';
import { Alert } from 'react-native';

const RecapPage2 = ({ navigation, route }) => {
  // Récupérer les données transmises depuis les écrans précédents
  const { previousRouteName, dataFromHomePage2,dataFromHomePageAdd2, dataFromHomePageAdd, dataFromHomePage1, dataFromHomePage3, dataFromHomePage4, dataFromHomePage5 } = route.params;

  const latitude = parseFloat(dataFromHomePageAdd2['latitude']);
  const longitude = parseFloat(dataFromHomePageAdd2['longitude']);
  const latitudeFixed = isNaN(latitude) ? 5.308616 : latitude;
  const longitudeFixed = isNaN(longitude) ? -4.0176568 : longitude;
  const { userInfo } = useContext(AuthContext);
  const headers = { 'Authorization': `Bearer ${userInfo.access}` };

  // Récupérer le nom de la route précédente
 
  // const handleSubmit = async () => {
  //         const handleNaN = (value, defaultValue = 0) => {
  //           return isNaN(value) ? defaultValue : value;
  //         };
  //       try {
  //         const formData1 = new FormData();
  //         if (previousRouteName == "HomPage5")
  //         {
  //         formData1.append('nomsite', dataFromHomePage1['nomsite']);
  //         formData1.append('village', dataFromHomePage1['village']);
  //         formData1.append('quartier', dataFromHomePage1['quartier']);
  //         formData1.append('Marque', dataFromHomePageAdd['marque']);
  //         formData1.append('type_support', dataFromHomePageAdd['typeSupport']);
  //         formData1.append('surface', handleNaN(surface));
  //         formData1.append('nombre_support', handleNaN(parseFloat(dataFromHomePageAdd['nombresupport'])));
  //         formData1.append('nombre_face', handleNaN(parseFloat(dataFromHomePageAdd['nombreface'])));
  //         formData1.append('surfaceODP', handleNaN(parseFloat(dataFromHomePageAdd2['SurfaceODP'])));
  //         formData1.append('canal', dataFromHomePageAdd['canal']);
  //         formData1.append('etat_support', dataFromHomePageAdd['etatSupport']);
  //         formData1.append('typesite', dataFromHomePageAdd['site']);
  //         formData1.append('visibilite', dataFromHomePageAdd['visibilite']);
  //         formData1.append('duree', handleNaN(parseFloat(dataFromHomePageAdd2['duree'])));
  //         formData1.append('ODP', dataFromHomePageAdd2['value1']);
  //         formData1.append('AP', dataFromHomePageAdd2['AP']);
  //         formData1.append('APA', dataFromHomePageAdd2['APA']);
  //         formData1.append('APT', dataFromHomePageAdd2['APT']);
  //         formData1.append('AE', dataFromHomePageAdd2['AE']);
  //         formData1.append('AEA', dataFromHomePageAdd2['AEA']);
  //         formData1.append('AET', dataFromHomePageAdd2['AET']);
  //         formData1.append('anciennete', dataFromHomePageAdd2['value3']);
  //         formData1.append('description', dataFromHomePage5['emplacementExact']);
  //         formData1.append('observation', dataFromHomePage5['observation']);
  //         formData1.append('tauxCommune', dataFromHomePage5['isTauxCommune']);
  //         formData1.append('tauxRegion', dataFromHomePage5['isTauxRegion']);
  //         formData1.append('tauxDistrict', dataFromHomePage5['isTauxDistrict']);
  //         formData1.append('latitude', latitudeFixed);
  //         formData1.append('longitude', longitudeFixed);
  //         if (dataFromHomePageAdd2['image']) {
  //           formData1.append('image_support_s', {
  //             uri: dataFromHomePageAdd2['image'],
  //             type: 'image/jpeg',
  //             name: 'image.jpg',
  //           });
  //         }
  //       }
  //   else {
  //         formData1.append('nomsite', dataFromHomePage1['nomsite']);
  //         formData1.append('village', dataFromHomePage1['village']);
  //         formData1.append('quartier', dataFromHomePage1['quartier']);
  //         formData1.append('Marque', dataFromHomePageAdd['marque']);
  //         formData1.append('type_support', dataFromHomePageAdd['typeSupport']);
  //         formData1.append('surface', handleNaN(surface));
  //         formData1.append('nombre_support', handleNaN(parseFloat(dataFromHomePageAdd['nombresupport'])));
  //         formData1.append('nombre_face', handleNaN(parseFloat(dataFromHomePageAdd['nombreface'])));
  //         formData1.append('surfaceODP', handleNaN(parseFloat(dataFromHomePageAdd2['SurfaceODP'])));
  //         formData1.append('canal', dataFromHomePageAdd['canal']);
  //         formData1.append('etat_support', dataFromHomePageAdd['etatSupport']);
  //         formData1.append('typesite', dataFromHomePageAdd['site']);
  //         formData1.append('visibilite', dataFromHomePageAdd['visibilite']);
  //         formData1.append('duree', handleNaN(parseFloat(dataFromHomePageAdd2['duree'])));
  //         formData1.append('ODP', dataFromHomePageAdd2['value1']);
  //         formData1.append('AP', dataFromHomePageAdd2['AP']);
  //         formData1.append('APA', dataFromHomePageAdd2['APA']);
  //         formData1.append('APT', dataFromHomePageAdd2['APT']);
  //         formData1.append('AE', dataFromHomePageAdd2['AE']);
  //         formData1.append('AEA', dataFromHomePageAdd2['AEA']);
  //         formData1.append('AET', dataFromHomePageAdd2['AET']);
  //         formData1.append('anciennete', dataFromHomePageAdd2['value3']);
  //         formData1.append('description', dataFromHomePage5['emplacementExact']);
  //         formData1.append('observation', dataFromHomePage5['observation']);
  //         formData1.append('tauxCommune', dataFromHomePage5['isTauxCommune']);
  //         formData1.append('tauxRegion', dataFromHomePage5['isTauxRegion']);
  //         formData1.append('tauxDistrict', dataFromHomePage5['isTauxDistrict']);
  //         formData1.append('latitude', latitudeFixed);
  //         formData1.append('longitude', longitudeFixed);
  //         if (dataFromHomePage2['image']) {
  //           formData1.append('image_support_s', {
  //             uri: dataFromHomePage2['image'],
  //             type: 'image/jpeg',
  //             name: 'image.jpg',
  //           });
    
  //         }
  //         formData1.append('Rnom', dataFromHomePage3['nom']);
  //         formData1.append('Rprenom', dataFromHomePage3['prenom']);
  //         formData1.append('Rcontact', dataFromHomePage3['contact']);
  //         formData1.append('Snom', dataFromHomePage4['nom1']);
  //         formData1.append('Sprenom', dataFromHomePage4['prenom1']);
  //         formData1.append('Scontact', dataFromHomePage4['contact1']);
    
  //           if (dataFromHomePage3['signature']) {
  //             formData1.append('signature', {
  //               uri: dataFromHomePage3['signature'],
  //               type: 'image/jpeg',
  //               name: 'signature.jpg',
  //             });
  //           }
  //           if (dataFromHomePage4['signature1']) {
  //             formData1.append('signature1', {
  //               uri: dataFromHomePage4['signature1'],
  //               type: 'image/jpeg',
  //               name: 'signature1.jpg',
  //             });
  //         }
  //   }
  //         const response = await axios.post(
  //           'https://apitest.visitrack360.com/api/collectedata/',
  //           formData1,
  //           {
  //             headers: {
  //               'Content-Type': 'multipart/form-data',
  //               'Authorization': `Bearer ${userInfo.access}`,
  //             },
  //           }
  //         );
  //         console.log(formData1);
  //         if (response.status === 201) {
  //           console.log('Données soumises avec succès');
  //           // Affiche l'alerte pour demander si l'utilisateur souhaite continuer
  //           Alert.alert(
  //             "Succès",
  //             "Les données ont été soumises avec succès. Souhaitez-vous ajouter un autre support à ce site?",
  //             [
  //               {
  //                 text: "Non",
  //                 onPress: () => navigation.replace('SplashScreens')
  //               },
  //               {
  //                 text: "Oui",
  //                 onPress: () => {
  //                   // Détermine les paramètres en fonction de previousRouteName
  //                   if (previousRouteName === "HomPage5") {
  //                     navigation.navigate("HomPage6", {
  //                       previousRouteName,
  //                       dataFromHomePage1,
  //                       dataFromHomePage2,
  //                       dataFromHomePage5
  //                     });
  //                   } else {
  //                     navigation.navigate("HomPage6", {
  //                       previousRouteName,
  //                       dataFromHomePage1,
  //                       dataFromHomePage2,
  //                       dataFromHomePage3,
  //                       dataFromHomePage4,
  //                       dataFromHomePage5
  //                     });
  //                   }
  //                 }
  //               }
  //             ]
  //           );
  //         }
  //       } catch (error) {
  //         console.error('Erreur lors de la soumission des données :', error);
  //       }
  //     };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const handleNaN = (value, defaultValue = 0) => {
        return isNaN(value) ? defaultValue : value;
      };

      if (previousRouteName == "HomPage5")
      {
      formData.append('nomsite', dataFromHomePage1['nomsite']);
      formData.append('village', dataFromHomePage1['village']);
      formData.append('quartier', dataFromHomePage1['quartier']);
      formData.append('Marque', dataFromHomePageAdd['marque']);
      formData.append('type_support', dataFromHomePageAdd['typeSupport']);
      formData.append('surface', handleNaN(parseFloat(dataFromHomePageAdd['surface'])));
      formData.append('nombre_support', handleNaN(parseFloat(dataFromHomePageAdd['nombresupport'])));
      formData.append('nombre_face', handleNaN(parseFloat(dataFromHomePageAdd['nombreface'])));
      formData.append('surfaceODP', handleNaN(parseFloat(dataFromHomePageAdd2['SurfaceODP'])));
      formData.append('canal', dataFromHomePageAdd['canal']);
      formData.append('etat_support', dataFromHomePageAdd['etatSupport']);
      formData.append('typesite', dataFromHomePageAdd['site']);
      formData.append('visibilite', dataFromHomePageAdd['visibilite']);
      formData.append('duree', handleNaN(parseFloat(dataFromHomePageAdd2['duree'])));
      formData.append('ODP', dataFromHomePageAdd2['value1']);
      formData.append('AP', dataFromHomePageAdd2['AP']);
      formData.append('APA', dataFromHomePageAdd2['APA']);
      formData.append('APT', dataFromHomePageAdd2['APT']);
      formData.append('AE', dataFromHomePageAdd2['AE']);
      formData.append('AEA', dataFromHomePageAdd2['AEA']);
      formData.append('AET', dataFromHomePageAdd2['AET']);
      formData.append('anciennete', dataFromHomePageAdd2['value3']);
      formData.append('description', dataFromHomePage5['emplacementExact']);
      formData.append('observation', dataFromHomePage5['observation']);
      formData.append('tauxCommune', dataFromHomePage5['isTauxCommune']);
      formData.append('tauxRegion', dataFromHomePage5['isTauxRegion']);
      formData.append('tauxDistrict', dataFromHomePage5['isTauxDistrict']);
      formData.append('latitude', latitudeFixed);
      formData.append('longitude', longitudeFixed);
      if (dataFromHomePageAdd2['image']) {
        formData.append('image_support_s', {
          uri: dataFromHomePageAdd2['image'],
          type: 'image/jpeg',
          name: 'image.jpg',
          });
        }
     }
     
else {
      formData.append('nomsite', dataFromHomePage1['nomsite']);
      formData.append('village', dataFromHomePage1['village']);
      formData.append('quartier', dataFromHomePage1['quartier']);
      formData.append('Marque', dataFromHomePageAdd['marque']);
      formData.append('type_support', dataFromHomePageAdd['typeSupport']);
      formData.append('surface', handleNaN(parseFloat(dataFromHomePageAdd['surface'])));
      formData.append('nombre_support', handleNaN(parseFloat(dataFromHomePageAdd['nombresupport'])));
      formData.append('nombre_face', handleNaN(parseFloat(dataFromHomePageAdd['nombreface'])));
      formData.append('surfaceODP', handleNaN(parseFloat(dataFromHomePageAdd2['SurfaceODP'])));
      formData.append('canal', dataFromHomePageAdd['canal']);
      formData.append('etat_support', dataFromHomePageAdd['etatSupport']);
      formData.append('typesite', dataFromHomePageAdd['site']);
      formData.append('visibilite', dataFromHomePageAdd['visibilite']);
      formData.append('duree', handleNaN(parseFloat(dataFromHomePageAdd2['duree'])));
      formData.append('ODP', dataFromHomePageAdd2['value1']);
      formData.append('AP', dataFromHomePageAdd2['AP']);
      formData.append('APA', dataFromHomePageAdd2['APA']);
      formData.append('APT', dataFromHomePageAdd2['APT']);
      formData.append('AE', dataFromHomePageAdd2['AE']);
      formData.append('AEA', dataFromHomePageAdd2['AEA']);
      formData.append('AET', dataFromHomePageAdd2['AET']);
      formData.append('anciennete', dataFromHomePageAdd2['value3']);
      formData.append('description', dataFromHomePage5['emplacementExact']);
      formData.append('observation', dataFromHomePage5['observation']);
      formData.append('tauxCommune', dataFromHomePage5['isTauxCommune']);
      formData.append('tauxRegion', dataFromHomePage5['isTauxRegion']);
      formData.append('tauxDistrict', dataFromHomePage5['isTauxDistrict']);
      formData.append('latitude', latitudeFixed);
      formData.append('longitude', longitudeFixed);
      if (dataFromHomePageAdd2['image']) {
        formData.append('image_support_s', {
          uri: dataFromHomePageAdd2['image'],
          type: 'image/jpeg',
          name: 'image.jpg',
          });
        }
      formData.append('Rnom', dataFromHomePage3['nom']);
      formData.append('Rprenom', dataFromHomePage3['prenom']);
      formData.append('Rcontact', dataFromHomePage3['contact']);
      formData.append('Snom', dataFromHomePage4['nom1']);
      formData.append('Sprenom', dataFromHomePage4['prenom1']);
      formData.append('Scontact', dataFromHomePage4['contact1']);

        if (dataFromHomePage3['signature']) {
          formData.append('signature', {
            uri: dataFromHomePage3['signature'],
            type: 'image/jpeg',
            name: 'signature.jpg',
          });
        }
        if (dataFromHomePage4['signature1']) {
          formData.append('signature1', {
            uri: dataFromHomePage4['signature1'],
            type: 'image/jpeg',
            name: 'signature1.jpg',
          });
      }
}
      const response = await axios.post(
        'https://apitest.visitrack360.com/api/collectedata/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userInfo.access}`,
          },
        }
      );
      console.log(`Status: ${response.status}`);
      if (response.status === 201) {
        console.log('Données soumises avec succès');
        // Affiche l'alerte pour demander si l'utilisateur souhaite continuer
        Alert.alert(
          "Succès",
          "Les données ont été soumises avec succès. Souhaitez-vous ajouter un autre support à ce site?",
          [
            {
              text: "Non",
              onPress: () => navigation.replace('SplashScreens')
            },
            {
              text: "Oui",
              onPress: () => {
                // Détermine les paramètres en fonction de previousRouteName
                if (previousRouteName === "HomPage5") {
                  navigation.navigate("HomPage6", {
                    previousRouteName,
                    dataFromHomePage1,
                    dataFromHomePage2,
                    dataFromHomePage5
                  });
                } else {
                  navigation.navigate("HomPage6", {
                    previousRouteName,
                    dataFromHomePage1,
                    dataFromHomePage2,
                    dataFromHomePage3,
                    dataFromHomePage4,
                    dataFromHomePage5
                  });
                }
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Erreur lors de la soumission des données :', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Récapitulatif des informations {dataFromHomePage1["entreprise"]}</Text>
        {/* Cadre pour les informations */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Informations générales</Text>  
        {/* <View style={styles.infoContainer}>
          <Text style={styles.label}>Entreprise:</Text>
          <Text style={styles.value}>{dataFromHomePage1["entreprise"]}</Text>
        </View> */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nom du site:</Text>
          <Text style={styles.value}>{dataFromHomePage1["nomsite"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Marque:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd["marque"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Village:</Text>
          <Text style={styles.value}>{dataFromHomePage1["village"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Quartier:</Text>
          <Text style={styles.value}>{dataFromHomePage1["quartier"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Type de support:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd["typeSupport"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre de face:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd["nombreface"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre de support:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd["nombresupport"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Surface:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd["surface"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>SurfaceODP:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd2["SurfaceODP"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Canal:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd["canal"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>État du support:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd["etatSupport"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Site:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd["site"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Visibilité:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd["visibilite"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Durée:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd2["duree"]}</Text>
        </View>
        {/* <View style={styles.infoContainer}>
          <Text style={styles.label}>Emplacement exact:</Text>
          <Text style={styles.value}>{dataFromHomePage5["emplacementExact"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Observation:</Text>
          <Text style={styles.value}>{dataFromHomePage5["observation"]}</Text>
        </View> */}
        </View>
        {/* Cadre pour les options ODP et coordonnées */}
        
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Options ODP et coordonnées</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>ODP:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd2["value1"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Ancienneté:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd2["value3"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Affiche Peinte:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd2["AP"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Affiche Peinte Alcool:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd2["APA"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Affiche Peinte Tabac:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd2["APT"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Annonce Eclairée:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd2["AE"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Annonce Eclairée Alcool:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd2["AEA"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Annonce Eclairée Tabac:</Text>
          <Text style={styles.value}>{dataFromHomePageAdd2["AET"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Latitude:</Text>
          <Text style={styles.value}>{latitudeFixed}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Longitude:</Text>
          <Text style={styles.value}>{longitudeFixed}</Text>
        </View>
        </View>
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Autres Informations</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Emplacement exact:</Text>
          <Text style={styles.value}>{dataFromHomePage5["emplacementExact"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Observation:</Text>
          <Text style={styles.value}>{dataFromHomePage5["observation"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Taxe communale:</Text>
          <Text style={styles.value}>{dataFromHomePage5["isTauxCommune"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Taxe Régionale:</Text>
          <Text style={styles.value}>{dataFromHomePage5["isTauxRegion"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Taxe du district:</Text>
          <Text style={styles.value}>{dataFromHomePage5["isTauxDistrict"] ? 'Oui' : 'Non'}</Text>
        </View>
        </View>
        {previousRouteName !== "HomPage5" && (
        <>
        {/* Cadre pour les images */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Informations de Consentement</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nom Responsable:</Text>
            <Text style={styles.value}>{dataFromHomePage3["nom"]}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Prenom Responsable:</Text>
            <Text style={styles.value}>{dataFromHomePage3["prenom"]}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Contact Responsable:</Text>
            <Text style={styles.value}>{dataFromHomePage3["contact"]}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nom Superviseur:</Text>
            <Text style={styles.value}>{dataFromHomePage4["nom1"]}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Prenom Superviseur:</Text>
            <Text style={styles.value}>{dataFromHomePage4["prenom1"]}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Contact Superviseur:</Text>
            <Text style={styles.value}>{dataFromHomePage4["contact1"]}</Text>
          </View>
          </View>
          {/* Cadre pour les images */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Images</Text>
          <ScrollView style={styles.imageContainer1} horizontal={true}>
            <View style={styles.imageContainer}>
              {dataFromHomePageAdd2["image"] && (
                <Image
                  source={{ uri: dataFromHomePageAdd2["image"] }}
                  style={styles.image}
                />
              )}
            </View>
          {/* <View style={styles.imageContainer}>
            {dataFromHomePage3["signature"] && (
              <Image
                source={{ uri: dataFromHomePage3["signature"] }}
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.imageContainer}>
            {dataFromHomePage4["signature1"] && (
              <Image
                source={{ uri: dataFromHomePage4["signature1"] }}
                style={styles.image}
              />
            )}
          </View> */}
          </ScrollView>
          </View>
        </>
      )}
      {previousRouteName === "HomPage5" && (
        <>
        {/* Cadre pour les images */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Images</Text>
          <ScrollView style={styles.imageContainer1} horizontal={true}>
        <View style={styles.imageContainer}>
              {dataFromHomePage2["image"] && (
                <Image
                  source={{ uri: dataFromHomePageAdd2["image"]}}
                  style={styles.image}
                />
              )}
            </View>
        </ScrollView>
        </View>
        </>)}
      </ScrollView>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Soumettre</Text>
        <MaterialIcons name="check-circle" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F8F7',
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {},
  submitButton: {
    backgroundColor: '#2471a3',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer1: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 130,
    height: 200,
    resizeMode: 'contain',
  },
  sectionContainer: {
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 3, // Ombre pour la profondeur
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RecapPage2;