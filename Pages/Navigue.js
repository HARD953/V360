import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import { StyleSheet,View,Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../Components/globalContext';
import HomPage1 from './HomePage1';
import HomPage2 from './HomePage2';
import HomePage3 from './HomePage3';
import HomePage4 from './HomePage4';
import Home from './Home';
import RecapPage from './Recape';
import ProfilePage from './Profile';
import SplashScreens from './Splashsubmit';
import Voir from './Voir';
import LoginPage from './LoginPage';
// import YourComponent1 from './Pages/Coordonne';
  
const Stack = createStackNavigator();


const CustomHeaderTitle = ({ title }) => (
  <View style={styles.headerTitleContainer}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

export default function Navigue({ navigation }) {
  const { loading,logout }=useContext(AuthContext)

  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen 
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: '#5D6D7E',
              },
            headerTintColor: '#5D6D7E',
            headerRight: () => (
              <Ionicons
                name="log-out-outline" 
                size={30}
                color="white"
                style={{ marginRight: 20 }}
                onPress={() => {
                  logout()
                }}
              />
            ),
            headerLeft: () => (
              <Text style={styles.headerTitle}> Visitrack 360 </Text>
            ),
          })}
        />
        <Stack.Screen name="HomPage1" component={HomPage1} options={({ navigation }) => ({
                        title: '',
                        headerShown: true,
                        headerStyle: {
                        backgroundColor: '#5D6D7E',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                        headerRight: () => (
                        <Ionicons
                            name="log-out-outline"
                            size={30}
                            color="white"
                            style={{ marginRight: 20 }}
                            onPress={() => {
                              logout()
                    }}
                />
                ),
        })}/>
        <Stack.Screen name="HomPage2" component={HomPage2} options={({ navigation }) => ({
                        title: '',
                        headerStyle: {
                        backgroundColor: '#5D6D7E',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                        headerRight: () => (
                        <Ionicons
                            name="log-out-outline"
                            size={30}
                            color="white"
                            style={{ marginRight: 20 }}
                            onPress={() => {
                            logout()
                    }}
                />
                ),
        })}/>
        <Stack.Screen name="HomePage3" component={HomePage3} options={({ navigation }) => ({
                        
                        title: '',
                        headerStyle: {
                        backgroundColor: '#5D6D7E',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                        headerRight: () => (
                        <Ionicons
                            name="log-out-outline"
                            size={30}
                            color="white"
                            style={{ marginRight: 20 }}
                            onPress={() => {
                            logout()
                    }}
                />
                ),
        })}/>
        <Stack.Screen name="HomePage4" component={HomePage4} options={({ navigation }) => ({
                        
                        title: '',
                        headerStyle: {
                        backgroundColor: '#5D6D7E',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                        headerRight: () => (
                        <Ionicons
                            name="log-out-outline"
                            size={30}
                            color="white"
                            style={{ marginRight: 20 }}
                            onPress={() => {
                            logout()
                    }}
                />
                ),
        })}/>
        <Stack.Screen name="RecapPage" component={RecapPage} options={({ navigation }) => ({
                        
                        title: '',
                        headerStyle: {
                        backgroundColor: '#5D6D7E',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                        headerRight: () => (
                        <Ionicons
                            name="log-out-outline"
                            size={30}
                            color="white"
                            style={{ marginRight: 20 }}
                            onPress={() => {
                            logout()
                    }}
                />
                ),
        })}/>
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={({ navigation }) => ({
                        title: 'Lanfiatech',
                        headerStyle: {
                        backgroundColor: '#5D6D7E',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                        
                        headerRight: () => (
                        <Ionicons
                            name="log-out-outline"
                            size={30}
                            color="white"
                            style={{ marginRight: 20 }}
                            onPress={() => {
                            logout()
                    }}
                />
                
                ),
        })}/>
        <Stack.Screen name="Voir" component={Voir} options={({ navigation }) => ({
                        title: 'Lanfiatech',
                        headerStyle: {
                        backgroundColor: '#5D6D7E',
                        },
                        headerTintColor: 'white',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                        
                        headerRight: () => (
                        <Ionicons
                            name="log-out-outline"
                            size={30}
                            color="white"
                            style={{ marginRight: 20 }}
                            onPress={() => {
                            logout()
                    }}
                />
                
                ),
        })}/>
        
        <Stack.Screen name="SplashScreens" component={SplashScreens} options={{ headerShown: false }}/>
      </Stack.Navigator> 
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    // Ajoutez un décalage à gauche selon votre préférence
    justifyContent:'flex-start'
  },
  headerTitle: {
    fontSize: 18, // Ajustez la taille de la police selon votre préférence
    fontWeight: 'bold',
    color: '#D0D3D4',
    marginLeft:15
  },
});
