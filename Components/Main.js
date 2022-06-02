import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Keypad from './Keypad';
import Contact from './Contact';
import { createStackNavigator } from '@react-navigation/stack';
import Stack from './Stack';
import Header from './Header';
import { useNavigation, useRoute } from '@react-navigation/native';

const Main = () => {
    const Tab = createMaterialTopTabNavigator();
    const navigation = useNavigation()
   
    return (
        <>
            
            <Tab.Navigator screenOptions={{
                tabBarStyle: { backgroundColor: '#1a1a1a', },
            }}>

                <Tab.Screen  component={Keypad} options={{ tabBarLabelStyle: { color: 'white', fontSize: 15.3, fontWeight: '700', textTransform: 'capitalize' }, tabBarIndicatorStyle: { width: 60, marginLeft: 59 } }} name="Phone" />
                <Tab.Screen component={Stack} options={{ tabBarLabelStyle: { color: 'white', fontSize: 15.3, fontWeight: '700', textTransform: 'capitalize' }, tabBarIndicatorStyle: { width: 60, marginLeft: 59 } }} name="Contact" />

            </Tab.Navigator>

          
        </>
    )
}

export default Main