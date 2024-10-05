import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from '../Components/globalContext';

const RecapPage = ({ navigation, route }) => {
  // Récupérer les données transmises depuis les écrans précédents
  const { dataFromHomePage1, dataFromHomePage2, dataFromHomePage3, dataFromHomePage4 } = route.params;
  const latitude = parseFloat(dataFromHomePage2['latitude']);
  const longitude = parseFloat(dataFromHomePage2['longitude']);
  const latitudeFixed = isNaN(latitude) ? 5.308616 : latitude;
  const longitudeFixed = isNaN(longitude) ? -4.0176568 : longitude;
  const { userInfo } = useContext(AuthContext);
  const headers = { 'Authorization': `Bearer ${userInfo.access}` };

  // Récupérer le nom de la route précédente
  const previousRouteName = navigation.getState().routes.slice(-2, -1)[0]?.name;

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (previousRouteName == "HomPage2")
      {
      formData.append('entreprise', dataFromHomePage1['entreprise']);
      formData.append('Marque', dataFromHomePage1['marque']);
      formData.append('commune', dataFromHomePage1['commune']);
      formData.append('type_support', dataFromHomePage1['typeSupport']);
      formData.append('surface', dataFromHomePage1['surface']);
      formData.append('surfaceODP', dataFromHomePage2['SurfaceODP']);
      formData.append('canal', dataFromHomePage1['canal']);
      formData.append('etat_support', dataFromHomePage1['etatSupport']);
      formData.append('site', dataFromHomePage1['site']);
      formData.append('visibilite', dataFromHomePage1['visibilite']);
      formData.append('duree', dataFromHomePage1['duree']);
      formData.append('quartier', dataFromHomePage1['quartier']);
      formData.append('description', dataFromHomePage2['emplacementExact']);
      formData.append('observation', dataFromHomePage2['observation']);
      formData.append('ODP', dataFromHomePage2['value1']);
      formData.append('tauxAP', dataFromHomePage2['AP']);
      formData.append('tauxAPA', dataFromHomePage2['APA']);
      formData.append('tauxAPT', dataFromHomePage2['APT']);
      formData.append('tauxAE', dataFromHomePage2['AE']);
      formData.append('tauxAEA', dataFromHomePage2['AEA']);
      formData.append('tauxAET', dataFromHomePage2['AET']);
      formData.append('anciennete', dataFromHomePage2['value3']);
      formData.append('latitude', latitudeFixed);
      formData.append('longitude', longitudeFixed);
      if (dataFromHomePage2['image']) {
        formData.append('image_support', {
          uri: dataFromHomePage2['image'],
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }
    }
else {
  formData.append('entreprise', dataFromHomePage1['entreprise']);
      formData.append('Marque', dataFromHomePage1['marque']);
      formData.append('commune', dataFromHomePage1['commune']);
      formData.append('type_support', dataFromHomePage1['typeSupport']);
      formData.append('surface', dataFromHomePage1['surface']);
      formData.append('surfaceODP', dataFromHomePage2['SurfaceODP']);
      formData.append('canal', dataFromHomePage1['canal']);
      formData.append('etat_support', dataFromHomePage1['etatSupport']);
      formData.append('site', dataFromHomePage1['site']);
      formData.append('visibilite', dataFromHomePage1['visibilite']);
      formData.append('duree', dataFromHomePage1['duree']);
      formData.append('quartier', dataFromHomePage1['quartier']);
      formData.append('description', dataFromHomePage2['emplacementExact']);
      formData.append('observation', dataFromHomePage2['observation']);
      formData.append('ODP', dataFromHomePage2['value1']);
      formData.append('tauxAP', dataFromHomePage2['AP']);
      formData.append('tauxAPA', dataFromHomePage2['APA']);
      formData.append('tauxAPT', dataFromHomePage2['APT']);
      formData.append('tauxAE', dataFromHomePage2['AE']);
      formData.append('tauxAEA', dataFromHomePage2['AEA']);
      formData.append('tauxAET', dataFromHomePage2['AET']);
      formData.append('anciennete', dataFromHomePage2['value3']);

      formData.append('latitude', latitudeFixed);
      formData.append('longitude', longitudeFixed);
      if (dataFromHomePage2['image']) {
        formData.append('image_support', {
          uri: dataFromHomePage2['image'],
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
        'https://api.visitrack360.com/api/collectedata/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userInfo.access}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Données soumises avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission des données :', error);
    }
    navigation.replace('SplashScreens');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Récapitulatif des informations</Text>
        {/* Cadre pour les informations */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Informations générales</Text>  
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Entreprise:</Text>
          <Text style={styles.value}>{dataFromHomePage1["entreprise"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Marque:</Text>
          <Text style={styles.value}>{dataFromHomePage1["marque"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Commune:</Text>
          <Text style={styles.value}>{dataFromHomePage1["commune"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Type de support:</Text>
          <Text style={styles.value}>{dataFromHomePage1["typeSupport"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Surface:</Text>
          <Text style={styles.value}>{dataFromHomePage1["surface"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>SurfaceODP:</Text>
          <Text style={styles.value}>{dataFromHomePage2["SurfaceODP"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Canal:</Text>
          <Text style={styles.value}>{dataFromHomePage1["canal"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>État du support:</Text>
          <Text style={styles.value}>{dataFromHomePage1["etatSupport"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Site:</Text>
          <Text style={styles.value}>{dataFromHomePage1["site"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Visibilité:</Text>
          <Text style={styles.value}>{dataFromHomePage1["visibilite"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Durée:</Text>
          <Text style={styles.value}>{dataFromHomePage1["duree"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Emplacement exact:</Text>
          <Text style={styles.value}>{dataFromHomePage2["emplacementExact"]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Observation:</Text>
          <Text style={styles.value}>{dataFromHomePage2["observation"]}</Text>
        </View>
        </View>
        {/* Cadre pour les options ODP et coordonnées */}
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Options ODP et coordonnées</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>ODP:</Text>
          <Text style={styles.value}>{dataFromHomePage2["value1"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Ancienneté:</Text>
          <Text style={styles.value}>{dataFromHomePage2["value3"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Affiche Peinte:</Text>
          <Text style={styles.value}>{dataFromHomePage2["AP"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Affiche Peinte Alcool:</Text>
          <Text style={styles.value}>{dataFromHomePage2["APA"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Affiche Peinte Tabac:</Text>
          <Text style={styles.value}>{dataFromHomePage2["APT"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Annonce Eclairée:</Text>
          <Text style={styles.value}>{dataFromHomePage2["AE"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Annonce Eclairée Alcool:</Text>
          <Text style={styles.value}>{dataFromHomePage2["AEA"] ? 'Oui' : 'Non'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Annonce Eclairée Tabac:</Text>
          <Text style={styles.value}>{dataFromHomePage2["AET"] ? 'Oui' : 'Non'}</Text>
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

        {previousRouteName !== "HomPage2" && (
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

          <View style={styles.imageContainer1}>
            <View style={styles.imageContainer}>
              {dataFromHomePage2["image"] && (
                <Image
                  source={{ uri: dataFromHomePage2["image"] }}
                  style={styles.image}
                />
              )}
            </View>
          <View style={styles.imageContainer}>
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
          </View>
          </View>
          </View>
        </>
      )}
      {previousRouteName == "HomPage2" && (
        <>
        {/* Cadre pour les images */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Images</Text>

        <View style={styles.imageContainer1}>
          <View style={styles.imageContainer}>
            {dataFromHomePage2["image"] && (
              <Image
                source={{ uri: dataFromHomePage2["image"] }}
                style={styles.image}
              />
            )}
          </View>
        </View>
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
    backgroundColor: '#5D6D7E',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default RecapPage;
