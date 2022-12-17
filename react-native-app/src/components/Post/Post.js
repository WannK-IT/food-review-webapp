import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import axios from "axios";

import color from "../../color";
import { callAxios } from "../../api/callAxios";
import { apiAdress, storagePost, storageUser } from "../../api/apiAddress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {firebase} from "../../../config"

const Post = (props) => {
  const [dataPost, setDataPost] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [isLoading, setLoading] = useState(true)

  const urlGetPosts = apiAdress + 'posts';
  const user_undefined = 'react-native-app/assets/user_undefined.jpg'

  const fetchPosts = async () => {
    await axios.get(urlGetPosts)
    .then((response) => {
      setDataPost(response.data.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log('Lỗi: ' + error);
    })
  }

  // const fetchImageAvatar = async (image) => {
  //   let avatar = ''
  //   await firebase.storage().ref('avatar/' + image).getDownloadURL().then((result) => {
  //     avatar = result
  //   })

  //   return avatar
  // }

  useEffect(() => {
    const unsubscribe = props.directDetailFood.addListener('focus', () => {
      fetchPosts();
    })
    return unsubscribe;
  }, [props.directDetailFood])
  
  return (
    <View style={styles.post}>
      <Text style={{fontFamily: 'nunito_semibold', fontSize: 16, marginLeft: 10, marginTop: 10}}>REVIEW DÀNH CHO BẠN</Text>
      {/* Post */}
      <View style={styles.listPost}>
          {
          isLoading ? <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 300}} size="large" color={color.main} /> :

          dataPost.map((post) => (
            <TouchableOpacity style={[styles.panelPost, styles.shadowBorder]} key={post.id} onPress={() => props.directDetailFood.navigate('DetailScreen',{
              idPost: post.id,
              idFoodPlace: post.id_food_place
            })}>
              <Image resizeMode="cover" source={{ uri: post.image}} style={styles.image}/>
              <Text style={styles.titlePost}>{post.title}</Text>
              <View style={styles.bottomPanel}>
                <View style={styles.infoUser}>
                  <Image resizeMode="contain" source={(post.avatar) ? {uri: post.avatar} : require(user_undefined)} style={{width: 30, height: 30, borderRadius: 30/2, borderWidth: 1}}/>
                  <Text style={{paddingHorizontal: 8, fontSize: 10, color: color.black, fontFamily: 'nunito_normal'}}>{post.fullname}</Text>
                </View>

                <View style={styles.rate}>
                  <Text style={{fontSize: 10, fontFamily: 'nunito_normal'}}>♥ {post.vote}</Text>
                </View>
              </View>
          </TouchableOpacity>

          ))}
      </View>
      {/* End Post */} 
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  post: {
    marginVertical: 10,
    backgroundColor: color.white
  },
  category: {
    flexDirection: "row",
    marginLeft: 15
  },
  itemCat: {
    paddingRight: 30,
    color: color.black,
    fontFamily: "nunito_semibold",
  },

  // Item active category
  itemCatActive: {
    color: color.main,
    textDecorationLine: "underline",
  },
  // End Active category

  listPost:{
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  panelPost:{
    width: 190,
    height: 250,
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
 
});
