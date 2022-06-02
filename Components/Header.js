import { useNavigation } from '@react-navigation/native'
import React from 'react'
import Icon from 'react-native-vector-icons/Octicons';
import {Text,View,StyleSheet,Pressable} from 'react-native'

const Header = () => {
    const navigation = useNavigation()
  return (
    <>
       <View style={style.container}>
            <View style={style.edit}>
                <Text style={style.editbtn}>Edit</Text>
                <Pressable style={style.icon} >
                    <Icon name='dot' color='white' size={11} />
                    <Icon name='dot' color='white' size={11} style={{marginTop:-2.5}}/>
                </Pressable>
            </View>
            
       </View>
    </>
  )
}
const style = StyleSheet.create({
    container:{
        height:70,
        backgroundColor:'#1a1a1a',
    },
    edit:{
        display:'flex',
        flexDirection:'row',
        padding:20,
        marginTop:3
    },
    editbtn:{
        color:'white',
        fontSize:14,
        fontWeight:'700',
        flex:1
    },
    icon:{
        display:'flex',
        flexDirection:'column'
    },
    screenbtndiv:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:-4
    },
    screenbtn:{
        backgroundColor:'transparent',
        color:'white',
        // borderBottomColor:'#005ef5',
        // borderBottomWidth:2
    },
    btntext:{
        padding:10,
        fontSize:16.3,
        fontWeight:'700',
        color:'white'
    }

})
export default Header