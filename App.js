import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import Header from './Components/Header';
import Main from './Components/Main';
import { NativeBaseProvider } from 'native-base';

const App = () => {

  return (
    <>
      <NativeBaseProvider>
      <NavigationContainer >
        <Header />
        <Main/>
      </NavigationContainer>
      </NativeBaseProvider>
    </>
  )
}

export default App