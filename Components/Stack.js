import { useRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Contact from './Contact'
import SinglePage from './SinglePage'

const Stack = () => {
    
    const Stack = createStackNavigator()
    const route = useRoute()
    console.log(route.name)
  return (
    <>
    
        <Stack.Navigator>
            <Stack.Screen name='contact' component={Contact} options={{headerShown:false}}/>
            <Stack.Screen name='single'  component={SinglePage} options={{headerShown:false}} />
        </Stack.Navigator>
    </>
  )
}

export default Stack