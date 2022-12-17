import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import React from 'react'
import axios from 'axios'

import { apiAdress } from '../../src/api/apiAddress'
import { AuthContext } from '../../src/context/AuthContext'
import color from '../../src/color'
import { Entypo, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

const ManagementReviewScreen = () => {
  const {userInfo} = useContext(AuthContext)
  const [review, setreview] = useState([])

  const undefined_image = 'react-native-app/assets/untitled_place.png'

  const getAllReview = async (user_id) => {
    await axios.get(apiAdress + 'getAllPostByUser/' + JSON.stringify(user_id))
    .then((response) => {
      setreview(response.data.data)
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    getAllReview(userInfo.user.id)
  }, [])
  
  return (
    <ScrollView>
        <View style= {styles.listMedia}>
          <View style={{marginHorizontal:3, marginVertical: 3}}>
            {
              !review ? 
              <Text style={{fontFamily: 'nunito_semibold', marginHorizontal: 5, marginVertical: 5}}>Chưa có bài viết</Text>  : 
              review.map((item) => 
                <View key={item.id} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginHorizontal:3, marginVertical: 3}}>
                
                  <View>
                    <Image resizeMode='cover' style= {{width: 100, height: 100}}    
                        source={item.media_title ? {uri: item.media_title} : require(undefined_image)}
                    />
                  </View>

                  <View style={{marginLeft: 10}}>
                    <Text style={{fontFamily: 'nunito_semibold'}}>{item.title}</Text>
                    <Text style={{fontFamily: 'Nunito_400Regular'}}><Fontisto name="date"/> {item.post_created_at}</Text>
                    <Text style={{fontFamily: 'Nunito_400Regular'}}><Entypo name="heart" color={color.red}/> {item.vote}</Text>
                  </View>

                </View>
              )
            }
          </View>
          
        </View>
    </ScrollView>
  )
}

export default ManagementReviewScreen

const styles = StyleSheet.create({
  listMedia: {
    backgroundColor: color.white
  }
})