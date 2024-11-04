import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ImageBackground, Modal, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Components/globalContext';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { loading, login } = useContext(AuthContext);

  const emailBorderWidth = useSharedValue(1);
  const passwordBorderWidth = useSharedValue(1);

  const handleLogin = () => {
    if (!email || !password) {
      showModal('Veuillez remplir tous les champs.');
      return;
    }
    login(email, password);
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordModalVisible(true);
  };

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const emailStyle = useAnimatedStyle(() => {
    return {
      borderBottomWidth: withTiming(emailBorderWidth.value, { duration: 300 }),
    };
  });

  const passwordStyle = useAnimatedStyle(() => {
    return {
      borderBottomWidth: withTiming(passwordBorderWidth.value, { duration: 300 }),
    };
  });

  return (
    <ImageBackground source={require('../assets/Images/back10.png')} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'Android' ? 'padding' : undefined}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Connexion</Text>
          <Animated.View style={[styles.inputContainer, emailStyle]}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#666"
              onChangeText={(text) => setEmail(text)}
              onFocus={() => (emailBorderWidth.value = 2)}
              onBlur={() => (emailBorderWidth.value = 1)}
              accessibilityLabel="Email"
            />
          </Animated.View>
          <Animated.View style={[styles.inputContainer, passwordStyle]}>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry={!showPassword}
              placeholderTextColor="#666"
              onChangeText={(text) => setPassword(text)}
              onFocus={() => (passwordBorderWidth.value = 2)}
              onBlur={() => (passwordBorderWidth.value = 1)}
              accessibilityLabel="Mot de passe"
            />
            <TouchableOpacity
              style={styles.showPasswordIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Connexion</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isForgotPasswordModalVisible}
            onRequestClose={() => setIsForgotPasswordModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Veuillez saisir votre numéro de téléphone :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Numéro de téléphone"
                  keyboardType="numeric"
                  placeholderTextColor="#666"
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                    onPress={() => setIsForgotPasswordModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#007BFF' }]}
                    onPress={handleLogin}
                  >
                    <Text style={[styles.modalButtonText, { color: '#fff' }]}>Confirmer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={hideModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>{modalMessage}</Text>
                <TouchableOpacity onPress={hideModal}>
                  <Text style={styles.modalCloseButton}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  innerContainer: { width: '100%', maxWidth: 400 },
  title: { fontSize: 28, fontWeight: '600', marginBottom: 32, color: '#2471a3', textAlign: 'center' },
  inputContainer: { width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ddd' },
  input: { flex: 1, height: 40, paddingLeft: 8, fontSize: 16, color: '#333' },
  showPasswordIcon: { padding: 8 },
  loginButton: { backgroundColor: '#2471a3', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  disabledButton: { backgroundColor: '#aac4e5' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  forgotPassword: { marginTop: 16, color: '#2471a3', fontSize: 14, textAlign: 'center' },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalView: { backgroundColor: 'white', borderRadius: 12, padding: 24, alignItems: 'center', width: '80%' },
  modalText: { fontSize: 16, color: '#333', marginBottom: 16, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  modalButton: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  modalCloseButton: { marginTop: 16, fontSize: 16, color: '#3F51B5', fontWeight: '600' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }
});

export default LoginPage;
