import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'

import color from '../../color'
import { apiAdress } from '../../api/apiAddress'
import axios from 'axios'

const Recommend = (props) => {
  const [categories, setCategories] = useState([])
  const [isLoading, setLoading] = useState(true)
  const urlCategories = apiAdress + 'categories'

  useEffect(() => {
    axios.get(urlCategories)
    .then((response) => {
      setCategories(response.data.data)
      setLoading(false)
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <View style={styles.recommend}>
        <Text style={styles.textRecommend}>Đề xuất cho bạn</Text>
        {
          isLoading ? <ActivityIndicator style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} size="large" color={color.main} /> :
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              categories.map((recommend_food, index) => (
                <TouchableOpacity key={index} style={[styles.panelItem, styles.shadowBorder]} onPress={() => props.directDetailFood.navigate('CategoriesPostScreen',{
                  category_id: recommend_food.id
                })}>
                  <ImageBackground resizeMode="cover" style={styles.image} source={{uri: recommend_food.image}}>
                    <View style={styles.contrastImage}>
                    </View>
                  </ImageBackground>
                  <Text style={styles.textTitle}>{recommend_food.category_name}</Text>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        }
    </View>
  )
}

export default Recommend

const styles = StyleSheet.create({
  recommend:{
    height: 150,
    marginVertical: 3,
    backgroundColor: color.white
  },
  textRecommend:{
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontFamily: 'nunito_semibold',
    borderLeftWidth: 6,
    borderLeftColor: color.main,
    fontSize: 15,
  },
  panelItem:{
    marginTop: 15,
    marginHorizontal: 5,
    width: 150,
    maxHeight: 150,
    borderColor: color.gray,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5
  },
  image:{
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden'
  },
  contrastImage: {
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  shadowBorder:{
    backgroundColor: color.white,
    elevation: 5,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    borderRadius: 8,
  },
  textTitle:{
    position: 'absolute', 
    color: color.white, 
    bottom: 5,
    left: 8,
    fontSize: 15,
    fontFamily: 'nunito_lightbold',
    textShadowColor: '#000', 
    textShadowOffset: 
      { width: 0.3, 
        height: 0.3 
      }, 
    textShadowRadius: 10
  }
})
