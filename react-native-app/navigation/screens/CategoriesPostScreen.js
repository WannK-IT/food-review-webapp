import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'; 

import color from '../../src/color'
import axios from 'axios';
import { apiAdress } from '../../src/api/apiAddress';
import { ScrollView } from 'react-native-gesture-handler';


const CategoriesPostScreen = ({route, navigation}) => {
  const { category_id } = route.params;
  const [dataCategory, setDataCategory] = useState([])
  const [dataPost, setDataPost] = useState([])

  const getPostMapCategory = async (id_cat) => {
    await axios.get(`${apiAdress}get-post-map-category/${id_cat}`)
    .then((response) => {
      setDataCategory(response.data.data['data_category'][0])
      if(response.data.data['data_posts']){
        setDataPost(response.data.data['data_posts'])
      }
      console.log(dataPost);
    })
  }
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPostMapCategory(JSON.stringify(category_id))
    })
    return unsubscribe;
  }, [navigation])
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>  
          <Feather onPress={() => navigation.goBack()} style={styles.iconBack} name="arrow-left"/>
        </TouchableOpacity>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.headerText}>Danh mục {dataCategory.category_name}</Text>
      </View>
      {/* End Header */}

      <View style={styles.backgroundCategory}>
        <Image resizeMode='cover' source={{uri: dataCategory.image}} style={{width: '100%', height: 200}}/>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
          <Text style={{fontFamily: 'nunito_semibold', fontSize: 25}}>{dataCategory.category_name}</Text>
        </View>
      </View>

      {/* Post */}
      <View style={styles.listPost}>
          {
          !dataPost ? 
          <Text>Chưa có bài viết</Text> : 
          dataPost.map((post, index) => (
            <TouchableOpacity style={[styles.panelPost, styles.shadowBorder]} key={index} onPress={() => navigation.navigate('DetailScreen', {
              idPost: post.id,
              idFoodPlace: post.id_food_place
            })}>
              <Image resizeMode="cover" source={{ uri: post.post_image}} style={styles.image}/>
              <Text style={styles.titlePost}>{post.title}</Text>
          </TouchableOpacity>

          ))}
      </View>
      {/* End Post */} 
    
    </ScrollView>
  )
}

export default CategoriesPostScreen

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  header: {
    height: 50,
    backgroundColor: color.main,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBack: {  
    paddingHorizontal: 8,
    fontSize: 20,
    color: color.white,
  },
    headerText: {
    color: color.white,
    width: 350,
    fontSize: 16,
    fontFamily: 'nunito_bold',
    paddingHorizontal: 10,
  },
  backgroundCategory: {
    width: '100%',
    height: 250
  },
  listPost:{
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  panelPost:{
    width: 190,
    height: 200,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: 10,
  },
  image:{
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  titlePost:{
    flexShrink: 1,
    fontFamily: 'nunito_semibold',
    fontSize: 13,
    paddingTop: 5,
    paddingHorizontal: 8,
    lineHeight: 18
  },
  bottomPanel:{
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  infoUser:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadowBorder:{
    backgroundColor: color.white,
    elevation: 3,
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