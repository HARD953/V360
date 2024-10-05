import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Splashscreen = () => {
  return (
    <View style={{flex:1,justifyContent:'center',backgroundColor:'blue'}}>
      <ActivityIndicator size="small" color="green"/>
    </View>
  )
}

export default Splashscreen