import database from '@react-native-firebase/database'
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'

const SinglePage = ({ route }) => {
  const [value, setValue] = useState(route.params.id)
  const [sdata, setData] = useState('')

  useEffect(() => {
    database().ref(`contact/${value}`).once('value', function (snapshot) {
      setData(snapshot)
    })
  }, [])
  console.log(sdata.name)
  return (
    <>
      <View>
       
        <Text>{sdata.name}</Text>
        <Text>sjhbdhba</Text>
      </View>
    </>
  )
}

export default SinglePage