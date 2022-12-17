import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import React from 'react'
import axios from 'axios'

import { apiAdress } from '../../src/api/apiAddress'
import { AuthContext } from '../../src/context/AuthContext'
import color from '../../src/color'
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const ManagementPlaceScreen = () => {
  const {userInfo} = useContext(AuthContext)
  const [foodPlace, setfoodPlace] = useState([])

  const undefined_image = 'react-native-app/assets/untitled_place.png'

  const getAllFoodPlace = async (user_id) => {
    await axios.get(apiAdress + 'getAllFoodPlaceByUser/' + JSON.stringify(user_id))
    .then((response) => {
      setfoodPlace(response.data.data)
      console.log(response.data.data);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    getAllFoodPlace(userInfo.user.id)
  }, [])
  
  return (
      <ScrollView>
        <View style= {styles.listMedia}>
          <View style={{marginHorizontal:3, marginVertical: 3}}>
            {
              !foodPlace ? 
              <Text style={{fontFamily: 'nunito_semibold', marginHorizontal: 5, marginVertical: 5}}>Chưa có địa điểm</Text>  : 
              foodPlace.map((item) => 
                <View key={item.id} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginHorizontal:3, marginVertical: 3}}>
                
                  <View>
                    <Image resizeMode='cover' style= {{width: 100, height: 100}}    
                        source={item.avatar ? {uri: item.avatar} : require(undefined_image)}
                    />
                  </View>

                  <View style={{marginLeft: 10}}>
                    <Text style={{fontFamily: 'nunito_semibold'}}>{item.place_name}</Text>
                    <Text style={{fontFamily: 'Nunito_400Regular'}}><Entypo name="location-pin"/>{item.address}</Text>
                    <Text style={{fontFamily: 'Nunito_400Regular'}}><MaterialCommunityIcons name="city"/>{item.city}</Text>
                  </View>

                </View>
              )
            }
          </View>
          
        </View>
    </ScrollView>
  )
}

export default ManagementPlaceScreen

const styles = StyleSheet.create({
  listMedia: {
    backgroundColor: color.white
  }
})