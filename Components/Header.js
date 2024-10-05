import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FloatingHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', // Couleur de fond du header
    paddingHorizontal: 16, // Marge horizontale
    paddingVertical: 10, // Marge verticale
    borderBottomWidth: 1, // Bordure inférieure
    borderBottomColor: '#ccc', // Couleur de la bordure
    position: 'absolute', // Position absolue pour rester en haut
    top: 0, // Aligner le haut avec le haut de l'écran
    left: 0, // Aligner la gauche avec la gauche de l'écran
    right: 0, // Aligner la droite avec la droite de l'écran
  },
  title: {
    fontSize: 20, // Taille de la police
    fontWeight: 'bold', // Gras
  },
});

export default FloatingHeader;
