import { SelectList } from 'react-native-dropdown-select-list'
import axios from "axios";
import React, { useState,useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';
// import { AuthContext } from '../Components/globalContext';

import Colors from '../constants/Colors';
import Font from "../constants/Font";
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';

import { Switch } from 'react-native';

const { height, width } = Dimensions.get("screen");

export default function HomPage1({ navigation }) {

  const [entreprise, setEntreprise] = useState('');
  const [entreprise1, setEntreprise1] = useState('');
  const [marque1, setMarque1] = useState('');
  const [marque, setMarque] = useState('');
  const [commune, setCommune] = useState('');
  const [commune1, setCommune1] = useState('');
  const [site, setSite] = useState('');
  const [site1, setSite1] = useState('');
  const [typeSupport, setTypeSupport] = useState('');
  const [typeSupport1, setTypeSupport1] = useState([]);
  const [surface, setSurface] = useState('');
  const [canal, setCanal] = useState('');
  const [canal1, setCanal1] = useState('');
  const [etatSupport, setEtatSupport] = useState('');
  const [etatSupport1, setEtatSupport1] = useState('');
  const [visibilite, setVisibilite] = useState('');
  const [visibilite1, setVisibilite1] = useState('');
  const [duree, setDuree] = useState('');
  const [quartier, setQuartier] = useState('');
  const [quartier1, setQuartier1] = useState('');
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [switchEnabled1, setSwitchEnabled1] = useState(false);

  // const { userInfo } = useContext(AuthContext);
  // const authToken = userInfo ? userInfo.access : null;

  const toggleSwitch = () => {
    setSwitchEnabled((prevState) => !prevState);
    if (!switchEnabled) {
      setTypeSupport(''); // Réinitialiser le champ Type Support
      setSurface(''); // Réinitialiser le champ Surface
    }
  };

  const toggleSwitch1 = () => {
    setSwitchEnabled1((prevState) => !prevState);
    if (!switchEnabled1) {
      setQuartier(''); // Réinitialiser le champ Type Support
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.visitrack360.com/api/fquartier/');
        const formattedData = response.data.map((item) => ({
          label: item.quartier,  // Utilisez "label" pour SelectList
          value: item.quartier,  // Utilisez "value" pour SelectList
        }));
        setQuartier1(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.visitrack360.com/api/marque/');
        const formattedData = response.data.results.map((item) => ({
          key: item.id.toString(),
          value: item.marque,
        }));
        setMarque1(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchDataR = async () => {
      try {
        const response = await axios.get('https://api.visitrack360.com/api/entreprises/');
        const formattedData = response.data.results.map((item) => ({
          value: item.entreprise,
        }));
        setEntreprise1(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataR();
  }, []);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get('https://api.visitrack360.com/api/canal/');
        const formattedData = response.data.results.map((item) => ({
          key: item.id.toString(),
          value: item.canal,
        }));
        setCanal1(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData1();
  }, []);
  
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://api.visitrack360.com/api/etat/');
        const formattedData = response.data.results.map((item) => ({
          key: item.id.toString(),
          value: item.etat,
        }));
        setEtatSupport1(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData2();
  }, []);
  useEffect(() => {
    const fetchData4 = async () => {
      try {
        const response = await axios.get('https://api.visitrack360.com/api/site/');
        const formattedData = response.data.results.map((item) => ({
          key: item.id.toString(),
          value: item.site,
        }));
        setSite1(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData4();
  }, []);

  //   fetchData4();
  // }, []);
  
  // useEffect(() => {
  //   const fetchData5 = async () => {
  //     try {
  //       const response = await axios.get('https://api.visitrack360.com/api/type/');
  //       const formattedData = response.data.results.map((item) => ({
  //         key: item.id.toString(),
  //         value: item.type,
  //       }));
  //       setTypeSupport1(formattedData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData5();
  // }, []);
  
  useEffect(() => {
    const fetchData6 = async () => {
      try {
        const response = await axios.get('https://api.visitrack360.com/api/visibilite/');
        const formattedData = response.data.results.map((item) => ({
          key: item.id.toString(),
          value: item.visibilite,
        }));
        setVisibilite1(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData6();
  }, []);

  useEffect(() => {
    const fetchData10 = async () => {
      try {
        const response = await axios.get('https://api.visitrack360.com/api/commune/');
        const formattedData = response.data.results.map((item) => ({
          key: item.id.toString(),
          value: item.commune,
        }));
        setCommune1(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData10();
  }, []);

  useEffect(() => {
    const fetchData00 = async () => {
      try {
        const response = await axios.get('https://api.visitrack360.com/api/supports/');
        const formattedData = response.data.results.map((item) => ({
          key: item.id.toString(),
          value: item.type_support,
        }));
        setTypeSupport1(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData00();
  }, []);

  const entrepri=[
    {key:'1',value:'Commercial'},
    {key:'2',value:'Non Commercial'}
  ]

  // const marq=[
  //   {key:'1',value:'Orange'},
  //   {key:'2',value:'Moov'},
  //   {key:'3',value:'MTN'}
  // ]

  const comm = [
    { key: '1', value: 'Abobo' },
    { key: '2', value: 'Adjamé' },
    { key: '3', value: 'Plateau' },
    { key: '4', value: 'Treichville' },
    { key: '5', value: 'Bassam' },
    { key: '6', value: 'Cocody' },
    { key: '7', value: 'Yopougon' },
  ]
  const types=[
    {key:'1',value:'Abri bâche'},
    {key:'2',value:'Affiche'},
    {key:'3',value:'Arche'},
    {key:'4',value:'Banderole'},
    {key:'5',value:'Barrière brandée'},
    {key:'6',value:'Chevalets'},
    {key:'7',value:'Cube'},
    {key:'8',value:'Guirlandes'},
  ]

  // const site=[
  //   {key:'1',value:'Commercial'},
  //   {key:'2',value:'Non Commercial'}
  // ]
  
  // const canals=[
  //   {key:'1',value:'Agence'},
  //   {key:'2',value:'Boutique'},
  //   {key:'3',value:'Franchise'},
  //   {key:'4',value:'Magasin'},
  //   {key:'5',value:'Mini Franchise'},
  //   {key:'6',value:'Mûr'}
  // ]
  // const etats=[
  //   {key:'1',value:'Bon'},
  //   {key:'2',value:'Défraichis'},
  //   {key:'3',value:'Détérioré'}
  // ]
  // const visibile=[
  //   {key:'1',value:'Bonne'},
  //   {key:'2',value:'Dégradé'},
  //   {key:'3',value:'Moyenne'},
  //   {key:'4',value:'Obstruée'}
  // ]
  
  const navigateToHomePage2 = () => {
    const dataFromHomePage1 = {
      entreprise,
      marque,
      commune,
      typeSupport,
      surface,
      canal,
      etatSupport,
      visibilite,
      duree,
      site,
      quartier,
    };
    navigation.navigate('HomPage2', { dataFromHomePage1 });
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <View style={styles.container}>
          <View style={styles.champ}>
            <View style={styles.saisi} >
              <SelectList
              placeholder='Entreprise ...'
              placeholderTextColor={Colors.darkText}
              setSelected={(val) => setEntreprise(val)}
              data={entreprise1}
              save="value"
              value={entreprise}
              onChangeText={setEntreprise}
            />
            </View>
            <View style={styles.saisi} >
              <SelectList
              placeholder='Marque ...'
              placeholderTextColor={Colors.darkText}
              setSelected={(val) => setMarque(val)}
              data={marque1}
              save="value"
              value={marque}
              onChangeText={setMarque}
            />
            </View>
            <SelectList
              placeholder='Commune ...'
              placeholderTextColor={Colors.darkText}
              setSelected={(val) => setCommune(val)}
              data={commune1}
              save="value"
              value={commune}
              onChangeText={setCommune}
            />
            
            <View style={styles.saisi} >
              {!switchEnabled1 && (<SelectList
              placeholder='Quartier ...'
              placeholderTextColor={Colors.darkText}
              setSelected={(val) => setQuartier(val)}
              data={quartier1}
              save="value"
              value={quartier}
              onChangeText={setQuartier}
            />)}

            {switchEnabled1 && (
              <View style={styles.saisi}>
                <TextInput
                  style={styles.inputs}
                  placeholder='Quartier ...'
                  placeholderTextColor={Colors.darkText}
                  keyboardType='text'
                  value={quartier}
                  onChangeText={setQuartier}
                />
              </View>
            )}
            <Switch
                value={switchEnabled1}
                onValueChange={toggleSwitch1}
                style={{ marginTop: 10 }}
              />
            </View>
             {/* Champ Type Support */}
              {!switchEnabled && (
                <SelectList
                  placeholder='Type support ...'
                  placeholderTextColor={Colors.darkText}
                  setSelected={(val) => setTypeSupport(val)}
                  data={typeSupport1}
                  save="value"
                  value={typeSupport}
                  onChangeText={setTypeSupport}
                />
              )}
            {switchEnabled && (
              <View style={styles.saisi}>
                <TextInput
                  style={styles.inputs}
                  placeholder='Type support 2'
                  placeholderTextColor={Colors.darkText}
                  keyboardType='text'
                  value={typeSupport}
                  onChangeText={setTypeSupport}
                />
              </View>
            )}
            {/* Champ Surface */}
              {switchEnabled && (
                <View style={styles.saisi}>
                  <TextInput
                    style={styles.inputs}
                    placeholder='Surface'
                    placeholderTextColor={Colors.darkText}
                    keyboardType='numeric'
                    value={surface}
                    onChangeText={setSurface}
                  />
                </View>
              )}
              <Switch
                value={switchEnabled}
                onValueChange={toggleSwitch}
                style={{ marginBottom: 10 }}
              />
            <SelectList
              placeholder='Canal ...'
              placeholderTextColor={Colors.darkText}
              setSelected={(val) => setCanal(val)}
              data={canal1}
              save="value"
              value={canal}
              onChangeText={setCanal}
            />
            <SelectList
              placeholder='Etat support ...'
              placeholderTextColor={Colors.darkText}
              setSelected={(val) => setEtatSupport(val)}
              data={etatSupport1}
              save="value"
              value={etatSupport}
              onChangeText={setEtatSupport}
            />

            <SelectList
              placeholder='Site ...'
              placeholderTextColor={Colors.darkText}
              setSelected={(val) => setSite(val)}
              data={site1}
              save="value"
              value={site}
              onChangeText={setVisibilite}
            />
            
            <SelectList
              placeholder='Visibilité ...'
              placeholderTextColor={Colors.darkText}
              setSelected={(val) => setVisibilite(val)}
              data={visibilite1}
              save="value"
              value={visibilite}
              onChangeText={setVisibilite}
            />
            <View style={styles.saisi} >
              <TextInput
                style={styles.inputs}
                placeholder='Durée'
                placeholderTextColor={Colors.darkText}
                keyboardType='numeric'
                value={duree}
                onChangeText={setDuree}  
              />
            </View>
          </View>
          <View style={styles.btn1}>
          <TouchableOpacity style={styles.btn} onPress={navigateToHomePage2}>
              <Text style={styles.btntxt}>Suivant </Text>
              <MaterialIcons name="navigate-next" style={styles.iconeNext} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width / 14,
    height: height,
    backgroundColor:'#F2F3F4'
  },
  appB: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '8%'

  },
  iconeback: {
    fontSize: 40,
    color: Colors.primary
  },
  txt: {
    // fontSize: FontSize.large,
    // color: Colors.primary,
    // fontFamily: Font["poppins-bold"],
    // fontWeight: '400',
    // // marginVertical: Spacing * 2,
    // paddingHorizontal: 2
    flexDirection:'row',
  },
  champ: {
    height: '80%',
    justifyContent: 'space-around',
    // backgroundColor: "#767"
  },
  saisi: {
    // height: "8%"
  },
  inputs: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.medium,
    padding: Spacing * 1.5,
    borderWidth: 0.5,
    borderColor: '#778',
    borderRadius: Spacing,
    width: "100%",
    borderBottomWidth:2
  },
  label: {
    fontSize: FontSize.small,
    marginVertical: height / 100
  },
  select: {
    borderWidth: 0.5,
    fontSize: FontSize.medium,
    borderColor: '#778',
  },
  btn1: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderRadius: Spacing,
  },
  btn: {
    backgroundColor: '#5D6D7E',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderRadius: Spacing,
    width:'30%'
  },
  btntxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: FontSize.medium,
    fontFamily: Font['poppins-bold'],
    fontWeight: '800'
  },
  iconeNext: {
    fontSize: 32,
    color: 'white',

  },
});
