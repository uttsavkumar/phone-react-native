import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Keypad from './Keypad';
import Contact from './Contact';

const Main = () => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <>
            <Tab.Navigator screenOptions={{

                tabBarStyle: { backgroundColor: '#1a1a1a', },
            }}>
                <Tab.Screen component={Keypad} options={{ tabBarLabelStyle: { color: 'white', fontSize: 15.3, fontWeight: '700', textTransform: 'capitalize' }, tabBarIndicatorStyle: { width: 60, marginLeft: 59 } }} name="Phone" />
                <Tab.Screen component={Contact} options={{ tabBarLabelStyle: { color: 'white', fontSize: 15.3, fontWeight: '700', textTransform: 'capitalize' }, tabBarIndicatorStyle: { width: 60, marginLeft: 59 } }} name="Contact" />

            </Tab.Navigator>

          
        </>
    )
}

export default Main