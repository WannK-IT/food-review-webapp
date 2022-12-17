import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import axios from "axios"
import { useState, useEffect, useContext } from 'react'
import { apiAdress } from '../../src/api/apiAddress'
import { AuthContext } from '../../src/context/AuthContext'
import color from '../../src/color'

const ManagementMediaScreen = () => {

  const WIDTH = (Dimensions.get('window').width)
  const HEIGHT = (Dimensions.get('window').height)

  const {userInfo} = useContext(AuthContext)
  const [media, setMedia] = useState([])

  const getAllMedia = async (idUser) => {
    await axios.get(apiAdress + 'getAllMedia/' + JSON.stringify(idUser)).then((response) => {
      setMedia(response.data.data)
      console.log(response.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getAllMedia(userInfo.user.id)
  }, [])
  

  return (
    <ScrollView style={{backgroundColor: color.white}}>
      <View style= {styles.listMedia}>
        {
          !media ? 
          <Text style={{fontFamily: 'nunito_semibold', marginHorizontal: 5, marginVertical: 5}}>Chưa có bài viết</Text> : 
          media.map((media) => 
            <View key={media.id} style={{width: 130, height: 130, marginHorizontal:3, marginVertical: 3}} >
              <Image resizeMode='cover' style= {{flex:1 , width: undefined, height: undefined}}    
                source={{uri: media.title}}
              />
            </View>
          )
        }
        
      </View>
    </ScrollView>
  )
}

export default ManagementMediaScreen

const styles = StyleSheet.create({
  listMedia: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: color.white
  }
})