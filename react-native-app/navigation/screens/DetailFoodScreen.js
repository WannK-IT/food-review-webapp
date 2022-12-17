import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'; 

import color from '../../src/color';
import axios from 'axios';
import { apiAdress } from '../../src/api/apiAddress';

const WIDTH = (Dimensions.get('window').width)
const HEIGHT = (Dimensions.get('window').height)

const DetailFoodScreen = ({route, navigation}) => {
  const [imgActive, setImgActive] = useState(0)
  const [dataPost, setDataPost] = useState([])

  const { idPost, idFoodPlace } = route.params;

  const user_undefined = 'react-native-app/assets/user_undefined.jpg'
  const user_fullname = dataPost.user_fullname
  const user_avatar = dataPost.user_avatar

  
  const post_created_at = dataPost.post_created_at
  const post_image = dataPost.image_post
  const post_title = dataPost.post_title
  const post_rate = dataPost.post_rate
  const post_content = dataPost.post_content
  const post_vote = dataPost.post_vote

  const place_food_undefined = 'react-native-app/assets/untitled_place.png'
  const place_food_address = dataPost.place_food_address
  const place_food_name = dataPost.place_food_name
  const place_food_avatar = dataPost.place_food_avatar
  const place_food_rate = dataPost.place_food_ratePlace
  const place_food_total = dataPost.place_food_countPlace


  const onchange = (nativeEvent) => {
    if(nativeEvent){
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      setImgActive(slide);
    }
  }

  const directBack = () => {
    navigation.goBack();
  }

  const getSinglePost = async (post_id) => {
    await axios.get(`${apiAdress}get-single-post/${post_id}`)
    .then((response) => {
      setDataPost(response.data.data[0])
    }).catch(error => console.log(error))
  }

  useEffect(() => {
    getSinglePost(idPost)
  }, [])
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>  
          <Feather onPress={() => directBack()} style={styles.iconBack} name="arrow-left"/>
        </TouchableOpacity>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.headerText}>{post_title}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={true}>

        {/* User */}
        <View style={styles.user}>
          <View style={styles.infoUser}>
            <Image resizeMode="contain" source={user_avatar ? {uri: user_avatar} : require(user_undefined)} style={{width: 40, height: 40, borderRadius: 40/2, borderWidth: 1}}/>
            <View>
              <Text style={{paddingHorizontal: 8, fontSize: 13, color: color.black, fontFamily: 'nunito_semibold', paddingBottom: 3}}>{user_fullname}</Text>
              <Text style={{paddingHorizontal: 8, fontSize: 10, color: color.grayOriginal, fontFamily: 'nunito_normal'}}>{post_created_at}  •  {place_food_name} - {place_food_address}</Text>
            </View>
          </View>
        </View>
        {/* End User */}

        <View style={styles.wrapImageFood}>
          <ScrollView
            onScroll={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator = {false}
            pagingEnabled
            horizontal
            style={styles.wrapImageFood}>
              {
                // images.map((img) =>
                //   <Image key={img.id} resizeMode='contain' source={{uri: img.url}} style={styles.wrapImageFood}/>
                // )
                <Image resizeMode='contain' source={{uri: post_image}} style={styles.wrapImageFood}/>
              }
          </ScrollView>
          {/* <View style={styles.wrapNumberImg}>
            <Text style={styles.wrapPageNumber}>
              {(imgActive + 1)}/{images.length}
            </Text>
          </View> */}
        </View>

        <View style={styles.content}>
          <Text style={{fontFamily: 'nunito_bold', fontSize: 18}}>{post_title}</Text>
          <Text style={{paddingVertical: 8, fontSize: 13}}>
          <Entypo name="star" style={{fontSize: 13, color: color.main}}/> <Text style={{fontFamily: 'nunito_semibold'}}>{post_rate}</Text>/5 điểm
          </Text>

          <Text style={{lineHeight: 25, fontFamily: 'nunito_normal'}}>{post_content}</Text>
        </View>

        <TouchableOpacity style={styles.wrapFoodPlace}>
          <Image style={styles.imgFoodPlace} source={place_food_avatar ? {uri: place_food_avatar} : require(place_food_undefined)}/>

          <View style={styles.infoFoodPlace}>
            <Text style={{fontFamily: 'nunito_bold', fontSize: 13}}>{place_food_name}</Text>
            <Text style={{fontSize: 12, fontFamily: 'nunito_normal'}}>{place_food_address}</Text>
            <Text style={{fontSize: 12}}>
              <Entypo name="star" style={{color: color.main}}/>
              <Text style={{fontFamily: 'nunito_semibold'}}> {place_food_rate}
              </Text>/5 điểm ({place_food_total} bài review) 
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.reacts}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity>
                <Ionicons style={{fontSize: 25, color: color.main}} name='heart-outline'/>
              </TouchableOpacity>
              <Text style={{fontSize: 13, paddingLeft: 5, color: color.grayOriginal, fontFamily: 'nunito_normal'}}>{post_vote} người thích</Text>
            </View>
            <Text style={{fontSize: 13, color: color.grayOriginal, fontFamily: 'nunito_normal'}}>2 bình luận</Text>
          </View>

          <Text style={{fontSize: 15, marginVertical: 20, fontFamily: 'nunito_semibold'}}>Bình luận</Text>

          <View style={{marginBottom: 100}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Image resizeMode='contain' source={user_avatar ? {uri: user_avatar} : require(user_undefined)} style={{width: 40, height: 40, borderRadius: 24}}/>
              <TextInput style={{paddingHorizontal: 15, width: '85%', height: 40, backgroundColor: color.grayBackgroundImg, borderRadius: 20, fontFamily: 'nunito_semibold'}} placeholder="Viết bình luận..."/>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default DetailFoodScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  user:{
    paddingVertical: 10,
    paddingLeft: 10
  },
  infoUser:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapImageFood:{
    backgroundColor: color.grayBackgroundImg,
    width: WIDTH,
    height: HEIGHT - 250,
  },
  wrapNumberImg:{
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    right: 20,
  },
  wrapPageNumber:{
    color: color.white,
    fontFamily: 'nunito_semibold',
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(108, 104, 98, .5)'
  },
  content:{
    paddingVertical: 10,
    paddingLeft: 10
  },

  wrapFoodPlace:{
    flexDirection: 'row',
    alignSelf: 'center',
    width: WIDTH - 20,
    height: 100,
    backgroundColor: color.grayBackgroundImg,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  imgFoodPlace:{
    width: 70,
    height: 70,
    borderRadius: 7
  },
  infoFoodPlace:{
    width: WIDTH - 120,
    paddingLeft: 20,
  },

  reacts:{
    width: WIDTH - 20,
    marginHorizontal: 10,
  },
  header:{
    height: 50,
    backgroundColor: color.main,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBack:{  
    paddingHorizontal: 8,
    fontSize: 20,
    color: color.white,
  },
  headerText:{
    color: color.white,
    width: 350,
    fontSize: 16,
    fontFamily: 'nunito_bold',
    paddingHorizontal: 10,
    
  }
});