import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import axios from "axios";

import color from "../../color";
import { callAxios } from "../../api/callAxios";
import { apiAdress, storagePost, storageUser } from "../../api/apiAddress";

const Post = (props) => {
  const [dataPost, setDataPost] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [isLoading, setLoading] = useState(true)

  const urlGetPosts = apiAdress + 'posts';
  const urlGetCategoryPosts = apiAdress + 'categories'

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

  const fetchCategories = async () => {
    await axios.get(urlGetCategoryPosts)
    .then((response) => {
      setDataCategory(response.data.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log('Lỗi: ' + error);
    })
  }

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [])

const linkImage = "https://haisanxanh.com/uploads/images/cach-uop-bach-tuoc-nuong.jpg"

  return (
    <View style={styles.post}>
      {/* Category  */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.category}>
          {
            dataCategory.map((category) => (
              <TouchableOpacity key={category.id}>
                <Text style={styles.itemCat}>{category.category_name}</Text>
              </TouchableOpacity>
            ))
          }
          
        </View>
      </ScrollView>
      {/* End Category */}
      {/* Post */}
      <View style={styles.listPost}>
          {
          isLoading ? <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 300}} size="large" color={color.main} /> :
          dataPost.map((post) => (
            <TouchableOpacity style={[styles.panelPost, styles.shadowBorder]} key={post.id} onPress={props.directDetailFood}>
              <Image resizeMode="cover" source={{ uri: storagePost + post.image_food}} style={styles.image}/>
              <Text style={styles.titlePost}>{post.title}</Text>
              <View style={styles.bottomPanel}>
                <View style={styles.infoUser}>
                  <Image resizeMode="contain" source={{uri: storageUser + post.avatar}} style={{width: 30, height: 30, borderRadius: 30/2, borderWidth: 1}}/>
                  <Text style={{paddingHorizontal: 8, fontSize: 10, color: color.black}}>{post.fullname}</Text>
                </View>

                <View style={styles.rate}>
                  <Text style={{fontSize: 10}}>♥ {post.vote}</Text>
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
  },
  category: {
    flexDirection: "row",
    marginLeft: 15
  },
  itemCat: {
    paddingRight: 30,
    color: color.black,
    fontWeight: "bold",
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
    paddingTop: 13,
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
    fontWeight: 'bold',
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
