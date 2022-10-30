import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import color from '../../color'

const Recommend = (props) => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const urlGetRecommend = 'https://63300ccaf5fda801f8d9deb4.mockapi.io/api/recommend'

  useEffect(() => {
    fetch(urlGetRecommend)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, [])

  return (
    <View style={styles.recommend}>
        <Text style={styles.textRecommend}>Đề xuất cho bạn</Text>
        {
          isLoading ? <ActivityIndicator style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} size="large" color={color.main} /> :
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              data.map((recommend_food, index) => (
                <TouchableOpacity key={index} style={[styles.panelItem, styles.shadowBorder]} onPress={props.directDetailFood}>
                  <Image resizeMode="contain" style={styles.image} source={{uri: 'https://media.foody.vn/res/g95/940490/prof/s/foody-upload-api-foody-mobile-c__media_temp-_-food-200117144919.jpg'}}/>
                  <Text style={styles.title}>{recommend_food.title}</Text>
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
    height: 200,
    marginVertical: 3,
  },
  textRecommend:{
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontWeight: 'bold',
    borderLeftWidth: 6,
    borderLeftColor: color.main,
    fontSize: 15
  },
  panelItem:{
    marginTop: 15,
    marginHorizontal: 5,
    width: 170,
    maxHeight: 150,
    borderColor: color.gray,
    borderWidth: 1,
    borderRadius: 13,
  },
  image:{
    height: 100,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13
  },
  title:{
    flexShrink: 1,
    fontWeight: 'bold',
    fontSize: 13,
    paddingTop: 5,
    paddingHorizontal: 8
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
  }
})
