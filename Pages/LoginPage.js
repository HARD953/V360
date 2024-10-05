import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ImageBackground, Modal, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Components/globalContext';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] = useState(false);
  const [resetPasswordConfirmation, setResetPasswordConfirmation] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { loading, login } = useContext(AuthContext);

  const emailBorderWidth = useSharedValue(1);
  const passwordBorderWidth = useSharedValue(1);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    login(email, password); // Assuming login context handles the login process
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

  const handleResetPassword = async () => {
    try {
      // Logique de réinitialisation du mot de passe ici...

      // Si la réinitialisation réussit :
      showModal('Réinitialisation du mot de passe réussie !');
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe :', error);
      // Si la réinitialisation échoue :
      showModal('Échec de la réinitialisation du mot de passe');
    }
  };

  const emailStyle = useAnimatedStyle(() => {
    return {
      borderBottomWidth: withTiming(emailBorderWidth.value, {
        duration: 300,
      }),
    };
  });

  const passwordStyle = useAnimatedStyle(() => {
    return {
      borderBottomWidth: withTiming(passwordBorderWidth.value, {
        duration: 300,
      }),
    };
  });

  return (
    <ImageBackground source={require('../assets/Images/back10.png')} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'Android' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'Android' ? 0 : 0}
      >
      <View style={styles.container}>
        <Text style={styles.title}>Audit de visibilité</Text>
        <Animated.View style={[styles.inputContainer, emailStyle]}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#333"
            onChangeText={(text) => setEmail(text)}
            onFocus={() => (emailBorderWidth.value = 2)}
            onBlur={() => (emailBorderWidth.value = 1)}
          />
        </Animated.View>
        <Animated.View style={[styles.inputContainer, passwordStyle]}>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={!showPassword}
            placeholderTextColor="#333"
            onChangeText={(text) => setPassword(text)}
            onFocus={() => (passwordBorderWidth.value = 2)}
            onBlur={() => (passwordBorderWidth.value = 1)}
          />
          <TouchableOpacity
            style={styles.showPasswordIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#333" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Connexion</Text>
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
              {!resetPasswordConfirmation ? (
                <>
                  <Text style={styles.modalText}>Veuillez saisir votre numéro de téléphone :</Text>
                  <TextInput
                    style={styles.input1}
                    placeholder="Numéro de téléphone"
                    keyboardType="numeric"
                    placeholderTextColor="#333"
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                      onPress={() => setIsForgotPasswordModalVisible(false)}
                    >
                      <Text style={styles.modalButtonText}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, { backgroundColor: '#3F51B5' }]}
                      onPress={handleResetPassword}
                    >
                      <Text style={[styles.modalButtonText, { color: '#fff' }]}>Confirmer</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <Text style={styles.modalText}>Votre mot de passe a été réinitialisé avec succès !</Text>
              )}
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={hideModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalContent}>
              <Text>{modalMessage}</Text>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#3F51B5',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  showPasswordIcon: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 16,
    color: '#3F51B5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 16,
    fontSize: 16,
    color: '#3F51B5',
    fontWeight: 'bold',
  },
});

export default LoginPage;
