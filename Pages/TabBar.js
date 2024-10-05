import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
import HomePage1 from './HomePage1'; // Assurez-vous d'importer correctement votre composant HomePage1
import HomPage2 from './HomePage2';

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
      <Tab.Navigator initialRouteName='HomePage1'>
        <Tab.Screen name="HomePage1" component={HomePage1} />
        <Tab.Screen name="HomPage2" component={HomPage2} />
        
      </Tab.Navigator>
  );
}
