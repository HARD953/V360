import 'react-native-gesture-handler';
import React from 'react';
import { AuthProvider } from './Components/globalContext';
import Navigators from './Components/Navigators';

// import YourComponent1 from './Pages/Coordonne';

const App = () => {
  return (
    <AuthProvider>
      <Navigators />
    </AuthProvider>  
  )
}
export default App
