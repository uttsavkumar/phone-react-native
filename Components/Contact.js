import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Text, Pressable, Image, TouchableOpacity, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Entypo';
import IconFo from 'react-native-vector-icons/FontAwesome';
import IconF from 'react-native-vector-icons/Feather';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import database from '@react-native-firebase/database';
import { Avatar } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { SwipeListView } from 'react-native-swipe-list-view';



const Contact = () => {
  const [modal, setModal] = useState(false)
  const [secondmodal, setSecondModal] = useState(false)

  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [image, setImage] = useState('')
  const [lastName, setLastName] = useState('')
  const [comp, setComp] = useState('')
  const [job, setJob] = useState('')
  const [email, setEmail] = useState('')
  const [birth, setBirth] = useState('')
  const [notes, setNotes] = useState('')
  const [data, setData] = useState([])
  const reset = () => {
    setContact('')
    setName('')
    setImage('')
  }

  const handleModal = () => {
    setModal(!modal)
  }
  const handleSecondModal = () => {
    setSecondModal(!secondmodal)
  }
  const ref = database().ref('contact')

  const handleInsert = () => {
    ref.push().set({
      name: name,
      contact: contact,
      image: image,
      lastName: lastName,
      comp: comp,
      job: job,
      email: email,
      birth: birth,
      notes: notes,

    }).then(() => {
      console.log('success')
      reset()
      setSecondModal(false)
    }).then(() => {
      setModal(false)

    })
  }
  useEffect(() => {
    ref.on('value', function (snapshot) {
      let newdata = []
      snapshot.forEach((childSnapshot) => {
        let single = childSnapshot.val()
        single['key'] = childSnapshot.key
        single['first'] = childSnapshot.val().name[0]
        newdata = [...newdata, single]
      })
      setData(newdata)
    })
  }, [])

  const handleSinglePage = (id) => {
    const data = database().ref(`contact/${id}`).once('value', function (snapshot) {
      console.log(snapshot)
    })
    console.log(id)
  }

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path)
    });
  }
  return (
    <>


      <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        <ScrollView horizontal bounces={false} style={{ zIndex: 1 }}>
          <View style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: '#1a1a1a', width: 360 }}>
            <View style={{ marginTop: 10, marginLeft: 20 }}>
              <TextInput placeholderTextColor={"grey"} style={style.search} placeholder="Search among 111 contact(s)"></TextInput>
            </View>
            <View style={{ borderWidth: .2, marginTop: 15, borderColor: '#3a3a3a' }}></View>
            <Text style={{ marginTop: 10, marginLeft: 20, fontWeight: '700', fontSize: 15 }}>
              A
            </Text>

            {/* <ScrollView bounces={false} showsVerticalScrollIndicator={false}> */}

              <View style={style.list}>
                {/* {data.map((item, key) => (
                  <Pressable key={item.key} onPress={() => handleSinglePage(item.key)}>
                    <View style={{ marginBottom: 15, display: 'flex', flexDirection: 'row' }} >
                      {
                        item.image === "" ?
                          <Avatar style={{ backgroundColor: 'transparent', borderColor: 'white', borderWidth: .1 }} mr="1" mt="1" >
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.first}</Text>
                          </Avatar> :
                          <Avatar style={{ backgroundColor: 'transparent', borderColor: 'white', borderWidth: .1 }} mr="1" mt="1" >
                            <Image source={{ uri: item.image }} style={{ width: 47, height: 47, borderRadius: 50 }} />
                          </Avatar>

                      }
                      <Text style={{ fontSize: 15.5, fontWeight: '600', color: 'white', textAlignVertical: 'center', marginLeft: 20 }}>
                        {item.name}
                      </Text>
                    </View>
                  </Pressable>
                ))} */}

                <SwipeListView
                data={data}
                renderItem={(data, rowMap) => (
                  <View style={style.rowFront}>
                    <Text>I am {data.item.name} in a SwipeListView</Text>
                  </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                  <View style={style.rowBack}>
                   
                    <TouchableOpacity
                      style={[style.backRightBtn, style.backRightBtnRight]}
                      onPress={() => deleteRow(rowMap, data.item.key)}
                    >
                      <Text style={style.backTextWhite}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
                leftOpenValue={100}
                rightOpenValue={-120}
              />


              </View>

            {/* </ScrollView> */}
            <View style={style.footerdiv}>
              <Pressable style={style.footer} onPress={() => handleModal()}>
                <Text style={{ fontSize: 30, alignSelf: 'center', textAlignVertical: 'center', fontWeight: '700', marginTop: 22 }}><IconI name='ios-add' size={22} /></Text>
              </Pressable>
            </View>

            {/* First Model */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modal}

            >
              <View style={style.bottomView}>
                <View style={style.modalView}>
                  <View style={{ display: 'flex', flexDirection: 'row', padding: 30 }}>
                    <Pressable
                      style={style.buttonClose}
                      onPress={() => handleModal()}
                    >
                      <Icon name='cross' size={25} />
                    </Pressable>

                    <Text style={style.modalText}>New Contact</Text>
                    <Pressable onPress={() => handleInsert()}>
                      <Text style={style.modalText}>
                        <IconF name='check' size={22} style={{ color: 'grey' }} />
                      </Text>
                    </Pressable>
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <IconMI name='person-outline' size={22} style={{ marginTop: 11 }} />
                      <TextInput autoFocus={true} placeholderTextColor={"grey"} style={style.name} value={name} onChangeText={(text) => setName(text)} placeholder="Name"></TextInput>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>
                      <IconF name='phone' size={18} style={{ marginTop: 13 }} />
                      <TextInput placeholderTextColor={"grey"} onChangeText={(text) => setContact(text)} value={contact} style={style.name} placeholder="Contact" keyboardType='numeric'></TextInput>
                    </View>


                    <Pressable onPress={handleSecondModal} style={{ padding: 15 }}>
                      <Text style={{ color: '#4382f5', fontSize: 14 }}>Add More Info</Text>
                    </Pressable>
                    {/* SecondModel */}

                    <Modal isVisible={secondmodal}>
                      <View style={{ flex: 1.5, backgroundColor: 'black', width: 360, marginLeft: -20 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
                          <Pressable
                            style={style.buttonClose}
                            onPress={() => handleSecondModal()}
                          >
                            <Icon name='cross' size={25} />
                          </Pressable>

                          <Text style={style.modalText}>New Contact</Text>
                          <Pressable onPress={() => handleInsert()}>
                            <Text style={style.modalText}>
                              <IconF name='check' size={25} style={{ color: 'grey' }} />
                            </Text>
                          </Pressable>
                        </View>
                        {/* FormSecondModel */}
                        <ScrollView>
                          <View style={style.mainsdiv}>

                            <Pressable onPress={handleImage}>
                              {image === "" ?
                                <View style={style.photo}><IconF name='camera' size={20} style={{ color: '#456ebc' }} /></View>
                                :
                                <Image source={{ uri: image }} style={{ width: 70, height: 70, borderRadius: 50 }} />
                              }
                            </Pressable>

                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 25 }}>
                              <IconMI name='person-outline' size={22} style={{ marginTop: 11 }} />
                              <TextInput autoFocus={true} placeholderTextColor={"grey"} style={style.newname} value={name} onChangeText={(text) => setName(text)} placeholder="Name"></TextInput>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 7, marginLeft: 20 }}>
                              <TextInput placeholderTextColor={"grey"} style={style.newname} onChangeText={(text) => setLastName(text)} placeholder="Last Name"></TextInput>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 18 }}>
                              <IconMCI name='office-building-cog-outline' size={18} style={{ marginTop: 14 }} />
                              <TextInput placeholderTextColor={"grey"} style={style.newname} onChangeText={(text) => setComp(text)} placeholder="Company Name"></TextInput>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 7, marginLeft: 20 }}>
                              <TextInput placeholderTextColor={"grey"} style={style.newname} onChangeText={(text) => setJob(text)} placeholder="Job Title"></TextInput>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 18 }}>
                              <IconMCI name='email-outline' size={22} style={{ marginTop: 11 }} />
                              <TextInput placeholderTextColor={"grey"} style={style.newname} onChangeText={(text) => setEmail(text)} placeholder="Email"></TextInput>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 18 }}>
                              <IconF name='phone' size={19} style={{ marginTop: 11 }} />
                              <TextInput placeholderTextColor={"grey"} style={style.newname} keyboardType='numeric' value={contact} onChangeText={(text) => setContact(text)} placeholder="Phone No"></TextInput>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 18 }}>
                              <IconFo name='birthday-cake' size={17} style={{ marginTop: 12 }} />
                              <TextInput placeholderTextColor={"grey"} style={style.newname} onChangeText={(text) => setBirth(text)} placeholder="Birthday"></TextInput>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 18 }}>
                              <IconMI name='notes' size={17} style={{ marginTop: 12 }} />
                              <TextInput placeholderTextColor={"grey"} style={style.newname} onChangeText={(text) => setNotes(text)} placeholder="Notes"></TextInput>
                            </View>

                          </View>
                        </ScrollView>
                      </View>
                    </Modal>


                  </View>
                </View>
              </View>
            </Modal>
          </View>

          {/* <Header /> */}
        </ScrollView>
      </View>
    </>
  )
}
const style = StyleSheet.create({
  mainsdiv: {
    height: 600,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#1a222f',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  container: {
    flex: .190,
    backgroundColor: '#1a1a1a',
  },
  edit: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    marginTop: 3
  },
  editbtn: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    flex: 1
  },
  icon: {

  },
  screenbtndiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  screenbtn: {
    backgroundColor: 'transparent',
    color: 'white',
    // borderBottomColor:'#005ef5',
    // borderBottomWidth:2
  },
  btntext: {
    padding: 10,
    fontSize: 16.3,
    fontWeight: '700',
    color: 'white'
  },
  search: {
    width: 320,
    height: 40,
    marginTop: 5,
    borderWidth: .5,
    backgroundColor: '#3a3a3a',
    borderRadius: 7,
    paddingLeft: 15,
    marginRight: 5,
    color: 'white',
  },
  name: {
    width: 290,
    height: 40,
    borderBottomWidth: 1,
    backgroundColor: '#3a3a3a',
    borderRadius: 7,
    marginLeft: 6,
    paddingLeft: 5,
    color: 'white',
    borderBottomColor: '#373535',
    paddingBottom: 5

  },
  newname: {
    width: 290,
    height: 40,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    borderRadius: 7,
    marginLeft: 6,
    paddingLeft: 5,
    color: 'white',
    borderBottomColor: '#373535',
    paddingBottom: 5

  },
  list: {
    padding: 20,

  },
  footer: {
    width: 70,
    height: 70,
    backgroundColor: '#3a3a3a',
    position: 'relative',
    float: 'right',
    borderRadius: 40
  },
  footerdiv: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    marginRight: 30,
    marginBottom: 10
  },


  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    width: 360,
    marginLeft: -20,
    marginBottom: -40,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 85,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#3a3a3a',
    height: 280

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: 'transparent',
    color: 'white'
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    paddingLeft: 85
  }


    ,
    rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
    },
    backTextWhite: {
      color: '#FFF',
  },  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
})
export default Contact