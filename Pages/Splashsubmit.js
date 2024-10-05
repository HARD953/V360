import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SplashScreens = ({ navigation }) => {
  // Ajoutez une logique ici, si nécessaire, pour gérer le comportement du splash screen

  useEffect(() => {
    // Utilisez un délai pour simuler l'affichage du splash screen pendant un certain temps
    const splashTimer = setTimeout(() => {
      // Naviguez vers l'écran de confirmation ou tout autre écran approprié
      navigation.replace('Home'); // Remplacez 'ConfirmationScreen' par le nom de l'écran de destination
    }, 2000); // 2000 ms (2 secondes)

    return () => {
      clearTimeout(splashTimer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <MaterialIcons name="check-circle" size={80} color="white" />
      <Text style={styles.text}>Données soumises avec succès</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF', // Couleur de fond personnalisée
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SplashScreens;
