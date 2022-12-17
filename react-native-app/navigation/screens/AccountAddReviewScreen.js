import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import MapView, { Marker } from 'react-native-maps';
import { Entypo, AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import * as ImagePicker from "expo-image-picker";
import Spinner from 'react-native-loading-spinner-overlay';

import { messageToast } from '../../src/functions';
import color from '../../src/color'
import { dataCity } from '../../src/dataGlobal';
import { apiAdress } from '../../src/api/apiAddress';
import { AuthContext } from '../../src/context/AuthContext';
import { firebase } from "../../config"
import { getStringDate } from '../../src/functions';
import { round } from 'react-native-reanimated';


const AccountAddReviewScreen = ({navigation}) => {

  const {userInfo} = useContext(AuthContext)
  const [isModalAddPostVisible, setModalAddPostVisible] = useState(false);
  const [dataFoodPlace, setDataFoodPlace] = useState(null);
  const [dataCategoriesPost, setDataCategoriesPost] = useState(null);
  

  /** Add New Place State */
    const [isModalAddPlaceVisible, setModalAddPlaceVisible] = useState(false);
    const [alertNewPlace, setAlertNewPlace] = useState('');
    const [dataNewPlace, setDataNewPlace] = useState({
      name: '',
      address: '',
      phone: '',
      lowPrice: '',
      highPrice: '',
      timeOpen: '',
      timeClose: '',
      city: '',
      image: '',
    })
    const [isLoadingAddNewPlace, setIsLoadingAddNewPlace] = useState(false); 

  /** End Add New Place State */
  
  /** Add New Post State */
    /** Star Rating */
    const [defaultRating, setDefaultRating] = useState({
      hygiene: 2,
      price: 2,
      taste: 2,
      space: 2,
      service: 2,
    })
    
    const [maxRate, setMaxRate] = useState({
      hygiene: [1, 2, 3, 4, 5],
      price: [1, 2, 3, 4, 5],
      taste: [1, 2, 3, 4, 5],
      space: [1, 2, 3, 4, 5],
      service: [1, 2, 3, 4, 5],
    })

    const starImgFilled = <AntDesign name="star" style={{marginHorizontal: 3, color: color.main }} size={20}/>
    const starImgCorner = <AntDesign name="staro" style={{marginHorizontal: 3 }} size={20}/>
    /** End Star Rating */

    const [dataNewPost, setDataNewPost] = useState({
      title: '',
      content: '',
      vote: 0,
      id_cat_post: '',
      id_user: userInfo.user.id,
      id_food_place: '',
      image: null
    })
    
    const [placeFoodSelected, setPlaceFoodSelected] = useState({
      name: '',
      address: '',
      avatar: ''
    })

  /** End Add New Post State */

  const toggleModalAddPlace = () => {
    setModalAddPlaceVisible(!isModalAddPlaceVisible);
    setAlertNewPlace('')
    setDataNewPlace({
      name: '',
      address: '',
      phone: '',
      lowPrice: '',
      highPrice: '',
      timeOpen: '',
      timeClose: '',
      city: '',
      image: ''
    })
    setIsLoadingAddNewPlace(false)
  };

  const getAllPlaceFood = () => {
    axios.get(apiAdress + 'get-all-food-place')
    .then(response => {
      setDataFoodPlace(response.data.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const getAllCategoriesPost = async () => {
    await axios.get(apiAdress + 'get-category-post')
    .then((response) => {
        var dataRefactor = []
        response.data.data.map((category) => {
          dataRefactor.push({
            key: category.id,
            value: category.category_name
          })
        })
        setDataCategoriesPost(dataRefactor)
    }).catch(error => {
      console.log(error);
    })
  }

  const toggleModalAddPost = () => {
    setModalAddPostVisible(!isModalAddPostVisible);
  };
  
  /** Modal Add Place Part */
  const addNewPlace = async () => {
    if(!dataNewPlace.name || !dataNewPlace.address || !dataNewPlace.phone || !dataNewPlace.lowPrice || !dataNewPlace.highPrice || !dataNewPlace.timeOpen || !dataNewPlace.timeClose || !dataNewPlace.city){
      
      setAlertNewPlace('Vui lòng nhập đầy đủ thông tin địa điểm')
    }else{
      var imageNewPlace = '';

      if(dataNewPlace.image){
        let response = await fetch(dataNewPlace.image)
        let blob = await response.blob();
        imageNewPlace = getStringDate() + '_' + dataNewPlace.image.substring(dataNewPlace.image.lastIndexOf('/') + 1)
        var ref = firebase.storage().ref('place').child(imageNewPlace).put(blob)
        setIsLoadingAddNewPlace(true)
        try {
          await ref
          
        } catch (error) {
          console.log(error);
        }finally{
          await firebase.storage().ref('place/' + imageNewPlace).getDownloadURL().then((result) => {
            imageNewPlace = result
          })
        }
      }

      let config = {
        validateStatus: function(status){
          return true;
        },
        headers: {
          accept : 'application/json',
        }
      }

      let data = {
        place_name: dataNewPlace.name,
        address: dataNewPlace.address,
        city: dataNewPlace.city,
        time_open: dataNewPlace.timeOpen,
        time_close: dataNewPlace.timeClose,
        phone: dataNewPlace.phone,
        low_price: dataNewPlace.lowPrice,
        high_price: dataNewPlace.highPrice,
        avatar: imageNewPlace
      }
      
      await axios.post(apiAdress + 'add-food-place/' + userInfo.user.id, data, config)
      .then((response) => {
        if(response.data.success == true){
          toggleModalAddPlace()
          messageToast('success', 'Thành công', response.data.message, 2500)
        }
      })
      .catch(error => console.log(error.data))

      getAllPlaceFood()
    }
  }

  const addNewPost = async () => {

    if(!dataNewPost.title || !dataNewPost.content || !dataNewPost.id_cat_post || !dataNewPost.id_food_place || !dataNewPost.image){
      messageToast('error', 'Thông báo', 'Hãy điền đầy đủ thông tin cho bài đăng', 2500)
    }else{
        var imageNewPost = [];

        if(dataNewPost.image){
          if(typeof(dataNewPost.image) == 'string'){

            let response = await fetch(dataNewPost.image)
            let blob = await response.blob();
            imageNewPost = getStringDate() + '_' + dataNewPost.image.substring(dataNewPost.image.lastIndexOf('/') + 1)
            var ref = firebase.storage().ref('post').child(imageNewPost).put(blob)
            // setIsLoadingAddNewPlace(true)
            try {
              await ref
              
            } catch (error) {
              console.log(error);
            }finally{
              await firebase.storage().ref('post/' + imageNewPost).getDownloadURL().then((result) => {
                imageNewPost = result
              })
            }
          }else{
            dataNewPost.image.map(async (dataImage) => {
              let response = await fetch(dataImage.uri)
              let blob = await response.blob();
              let imageNewPostTemp = getStringDate() + '_' + dataImage.uri.substring(dataImage.uri.lastIndexOf('/') + 1)
              var ref = firebase.storage().ref('post').child(imageNewPostTemp).put(blob)
              // setIsLoadingAddNewPlace(true)
              try {
                await ref
              } catch (error) {
                console.log(error);
              }
            }) 

            imageNewPost = dataNewPost.image.map((item) => {
              return getStringDate() + '_' + item.uri.substring(item.uri.lastIndexOf('/') + 1)
            })
          }
        }

        let config = {
          validateStatus: function(status){
            return true;
          },
          headers: {
            accept : 'application/json',
          }
        }

        let data = {
          ...dataNewPost, rate: defaultRating, image: imageNewPost
        }

        // Axios post 
        axios.post(apiAdress + 'add-post', data, config)
        .then((response) => {
          if(response.data.success == true){
            navigation.navigate('AccountInfoDrawer')
          }
        }).catch(error => {
          console.log(error);
        })
    }
  }

  /** End Modal Add Place Part */
  const pickImageNewPlace = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setDataNewPlace({...dataNewPlace, image: result.uri})
    }
  };

  const pickImageNewPost = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setDataNewPost({...dataNewPost, image: (!result.selected) ? result.uri : result.selected})
    }
  }; 

  const showImageFoodPlace = (image) => {
    if(!image){
      return <Image resizeMode='contain' style={{width: 100, height: 80, borderRadius: 8, borderWidth: 1}} source={ require('react-native-app/assets/untitled_place.png') }/>
    }else{
      return <Image resizeMode='contain' style={{width: 100, height: 80, borderRadius: 8, borderWidth: 1}} source={{uri : image}}/>
    }
  }

  const showImageNewPost = (image) => {
    if(image){
      return <View style={{flexDirection: 'row', justifyContent: 'center', flexWrap: "wrap"}}>
          {
          typeof(image) == 'string' ? 
            <Image resizeMode='cover' style={{width: 100, height: 100, marginTop: 10}} source={{uri: image}}/> :
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row', marginTop: 10, }}>
              {image.map((item, key) => (
                  <Image key={key} resizeMode="cover" style={{width: 100, height: 100, marginHorizontal: 5}} source={{uri: item.uri}}/>
                ))}
            </ScrollView>
          }
          
        </View>
    }
  }


  useEffect(() => {
    getAllPlaceFood()
    getAllCategoriesPost()
    
  }, [])
    
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
     <View style={styles.header}>

      <Modal isVisible={isModalAddPlaceVisible} onBackdropPress={() =>  setModalAddPlaceVisible(!isModalAddPlaceVisible)}>
        <Spinner visible={isLoadingAddNewPlace}/>
        <ScrollView style={{ flex:1, width: '100%', backgroundColor: color.white}}>
          <View style={{borderBottomWidth: 1, borderBottomColor: color.grayOriginal, paddingVertical: 10, marginVertical: 10, marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontFamily: 'nunito_semibold', fontSize: 18}}>Thêm địa điểm mới</Text>
            <TouchableOpacity style={styles.buttonPost} onPress={() => addNewPlace()}>
              <Text style={{fontFamily: 'nunito_semibold', fontSize: 16, color: color.white}}>Lưu</Text>
            </TouchableOpacity>
          </View>

          {/* If exist Image => Hide pick image, show image picked */}
          {
          !dataNewPlace.image ? 
          <TouchableOpacity style={[styles.part_upload, {marginHorizontal: 20}]} onPress={() => pickImageNewPlace()}>
            <Entypo name="images" size={30} color={color.grayOriginal} />
            <Text style={{fontSize: 14, fontFamily: 'nunito_semibold', paddingLeft: 8, color: color.grayOriginal, fontWeight: 'bold'}}>Thêm hình ảnh địa điểm</Text>
          </TouchableOpacity> : 
          <View style={{flexDirection: 'row', justifyContent: "center"}}>
            <Image resizeMode="contain" style={{width: '100%', height: 150}} source={{uri: dataNewPlace.image}}/>
          </View>
          }
          
          <View style={{marginVertical: 5, marginHorizontal: 20}}>
            {alertNewPlace && <Text style={{fontFamily: 'nunito_semibold', color: color.red}}>{alertNewPlace}</Text>}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10}}>
              <Text style={{fontFamily: 'nunito_semibold', fontSize: 14}}>Tên địa điểm:</Text>
              <TextInput style={{width: 220, height: 30, borderBottomColor:color.gray,borderBottomWidth: 1,fontFamily: 'Nunito_400Regular', fontSize: 14}}
              placeholder='Nhập tên địa điểm'
              onChangeText={(text) => setDataNewPlace({...dataNewPlace, name: text})}
              />
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10}}>
              <Text style={{fontFamily: 'nunito_semibold', fontSize: 14}}>Địa chỉ:</Text>
              <TextInput style={{width: 220, height: 30, borderBottomColor:color.gray,borderBottomWidth: 1,fontFamily: 'Nunito_400Regular', fontSize: 14}}
              placeholder='Nhập địa chỉ'
              onChangeText={(text) => setDataNewPlace({...dataNewPlace, address: text})}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10}}>
              <Text style={{fontFamily: 'nunito_semibold', fontSize: 14}}>Số điện thoại:</Text>
              <TextInput style={{width: 220, height: 30, borderBottomColor:color.gray,borderBottomWidth: 1,fontFamily: 'Nunito_400Regular', fontSize: 14}}
              placeholder='Nhập số điện thoại'
              onChangeText={(text) => setDataNewPlace({...dataNewPlace, phone: text})}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10}}>
              <Text style={{fontFamily: 'nunito_semibold', fontSize: 14}}>Giá thấp nhất:</Text>
              <TextInput style={{width: 220, height: 30, borderBottomColor:color.gray,borderBottomWidth: 1,fontFamily: 'Nunito_400Regular', fontSize: 14}}
              keyboardType="numeric"
              onChangeText={(text) => setDataNewPlace({...dataNewPlace, lowPrice: text})}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10}}>
              <Text style={{fontFamily: 'nunito_semibold', fontSize: 14}}>Giá cao nhất:</Text>
              <TextInput style={{width: 220, height: 30, borderBottomColor:color.gray,borderBottomWidth: 1,fontFamily: 'Nunito_400Regular', fontSize: 14}}
              keyboardType="numeric"
              onChangeText={(text) => setDataNewPlace({...dataNewPlace, highPrice: text})}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10}}>
              <Text style={{fontFamily: 'nunito_semibold', fontSize: 14}}>Khung giờ:</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TextInput style={{width: 95, height: 30, borderBottomColor:color.gray,borderBottomWidth: 1,fontFamily: 'Nunito_400Regular', fontSize: 14}}
                placeholder='Từ'
                onChangeText={(text) => setDataNewPlace({...dataNewPlace, timeOpen: text})}
                />
                <Text style={{marginHorizontal: 10}}> - </Text>
                <TextInput style={{width: 95, height: 30, borderBottomColor:color.gray,borderBottomWidth: 1,fontFamily: 'Nunito_400Regular', fontSize: 14}}
                placeholder='Đến'
                onChangeText={(text) => setDataNewPlace({...dataNewPlace, timeClose: text})}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', aligItems: 'center', marginVertical: 10}}>
              <Text style={{fontFamily: 'nunito_semibold', fontSize: 14}}>Tỉnh thành:</Text>
              <SelectList 
                setSelected={(val) => setDataNewPlace({...dataNewPlace, city: val})} 
                data={dataCity} 
                save="value"
                boxStyles={{borderColor: color.gray, width: 220, fontFamily: 'nunito_lightbold'}}
                placeholder="Chọn tỉnh thành"
              />
            </View>
            
          </View>

          <TouchableOpacity style={[styles.button, {marginBottom: 20}]} onPress={toggleModalAddPlace}>
            <Text style={styles.text}>Quay về</Text>
          </TouchableOpacity>

        </ScrollView>
      </Modal>

  
      <Modal isVisible={isModalAddPostVisible} onBackdropPress={() =>  setModalAddPostVisible(false)}>
        <ScrollView style={{ flex:1, width: '100%', backgroundColor: color.white}}>
          <View style={{borderBottomWidth: 1, borderBottomColor: color.grayOriginal, paddingVertical: 10, marginVertical: 10, marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontFamily: 'nunito_semibold', fontSize: 18}}>Chọn địa điểm</Text>
            <TouchableOpacity style={styles.buttonPost}>
              <Text style={{fontFamily: 'nunito_semibold', fontSize: 16, color: color.white}}>Tìm kiếm</Text>
            </TouchableOpacity>
            
          </View>

            <View style={{marginVertical: 5, marginHorizontal: 20}}>
              {dataFoodPlace && dataFoodPlace.map((valuePlaceFood) => (
                <TouchableOpacity style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center'}} key={valuePlaceFood.id} onPress={() => {
                  setDataNewPost({...dataNewPost, id_food_place: valuePlaceFood.id})
                  setPlaceFoodSelected({...placeFoodSelected, name: valuePlaceFood.place_name, address: valuePlaceFood.address, avatar: valuePlaceFood.avatar})
                  toggleModalAddPost()
                }}>
                  <View style={{marginRight: 10}}>
                    {
                      showImageFoodPlace(valuePlaceFood.avatar)
                    }
                  </View>
                  <View>
                    <Text style={{fontFamily: 'nunito_semibold', fontSize: 16}}>{valuePlaceFood.place_name}</Text>
                    <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 14, color: color.grayOriginal}}>{valuePlaceFood.address}</Text>
                    <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 14}}>{
                      !valuePlaceFood.rate ? 'Chưa có bài review' : 
                      <View>
                        <Text style={{fontFamily: 'Nunito_400Regular'}}>{Math.round((valuePlaceFood.rate / valuePlaceFood.count)*2) / 2 + '/5' + ' sao'}</Text>
                        <Text style={{fontFamily: 'Nunito_400Regular'}}>{valuePlaceFood.count + ' bài review'}</Text>
                      </View>
                    }</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
        </ScrollView>
      </Modal>

      <TouchableOpacity style={[styles.buttonPost, {marginRight: 10}]} onPress={() => toggleModalAddPlace()}>
        <Entypo style={{color: color.white, fontSize: 15, paddingRight: 2}} name="pencil"/>
        <Text style={{color: color.white, fontFamily: 'nunito_semibold'}}>Thêm địa điểm</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonPost} onPress={() => addNewPost()}>
        <Text style={{color: color.white, fontFamily: 'nunito_semibold'}}>Đăng bài</Text>
      </TouchableOpacity>
     </View>

     <View style={styles.content}>
      <TouchableOpacity style={styles.part_upload} onPress={() => pickImageNewPost()}>
        <Entypo name="images" size={30} color={color.grayOriginal} />
        <Text style={{fontSize: 14, fontFamily: 'nunito_semibold', paddingLeft: 8, color: color.grayOriginal, fontWeight: 'bold'}}>Thêm hình ảnh</Text>
      </TouchableOpacity>

      {showImageNewPost(dataNewPost.image)}

      <View style={styles.part_contentPost}>
        <TextInput 
          style={styles.part_contentPost_title}
          placeholder="Nhập tiêu đề review"
          onChangeText={(text) => setDataNewPost({...dataNewPost, title: text})}
        />  
        <TextInput 
          style={styles.part_contentPost_content}
          placeholder="Nhập nội dung review"
          multiline={true}
          textAlignVertical={'top'}
          onChangeText={(text) => setDataNewPost({...dataNewPost, content: text})}
        />  
      </View>

      <View style={styles.part_location}>
        <Text style={{fontFamily: 'nunito_semibold', fontSize: 16}} >Danh mục review</Text>

        <SelectList 
            setSelected={(key) => setDataNewPost({...dataNewPost, id_cat_post: key})} 
            data={dataCategoriesPost} 
            save="key"
            boxStyles={{borderColor: color.gray, width: '100%', fontFamily: 'nunito_lightbold', marginTop: 10}}
            placeholder="Chọn danh mục"
        />
      </View>

      <View style={styles.part_location}>
        <Text style={{fontFamily: 'nunito_semibold', fontSize: 16}} >Địa điểm</Text>
        {/* <MapView style={styles.map} 
          region={{
            latitude: 10.841960,
            longitude: 106.798200,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          >
            <Marker coordinate={{
              latitude: 10.841960,
              longitude: 106.798200,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
              
            }}
            title="Marker"/>
        </MapView> */}
        {
          !dataNewPost.id_food_place ? 
          <TouchableOpacity style={[styles.part_upload, {marginTop: 15}]} onPress={() => toggleModalAddPost()}>
          <Entypo name="location" size={25} color={color.grayOriginal} />
          <Text style={{fontSize: 14, fontFamily: 'nunito_semibold', paddingLeft: 8, color: color.grayOriginal, fontWeight: 'bold'}}>Nhấn để chọn địa điểm review</Text>
          </TouchableOpacity> :
          <View>
            <TouchableOpacity style={[styles.part_upload, {marginTop: 15}]} onPress={() => toggleModalAddPost()}>
              <Entypo name="location" size={25} color={color.grayOriginal} />
              <Text style={{fontSize: 14, fontFamily: 'nunito_semibold', paddingLeft: 8, color: color.grayOriginal, fontWeight: 'bold'}}>Thay đổi địa điểm</Text>
            </TouchableOpacity>
            <View style={[styles.part_upload, {marginTop: 15, height: 100, backgroundColor: color.white}]}>
              <View style={{marginHorizontal: 5}}>
                {showImageFoodPlace(placeFoodSelected.avatar)}
              </View>
              <View style={{marginHorizontal: 5}}>
                <Text style={{fontFamily: 'nunito_semibold'}}>{placeFoodSelected.name}</Text>
                <Text style={{fontFamily: 'Nunito_400Regular', color: color.grayOriginal}}>{placeFoodSelected.address}</Text>
              </View>
            </View>
          </View>
        }
      </View>

      <View style={styles.part_review}>
        <Text style={{fontFamily: 'nunito_semibold', fontSize: 16}}>Đánh giá</Text>

        <View style={styles.part_review_field}>
          <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 14}}>Vệ sinh</Text>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            {maxRate.hygiene.map((rating, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => setDefaultRating({...defaultRating, hygiene: rating})}>
                  {rating <= defaultRating.hygiene ? starImgFilled : starImgCorner}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <View style={styles.part_review_field}>
          <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 14}}>Giá cả</Text>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            {maxRate.price.map((rating, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => setDefaultRating({...defaultRating, price: rating})}>
                  {rating <= defaultRating.price ? starImgFilled : starImgCorner}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <View style={styles.part_review_field}>
          <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 14}}>Hương vị</Text>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            {maxRate.taste.map((rating, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => setDefaultRating({...defaultRating, taste: rating})}>
                  {rating <= defaultRating.taste ? starImgFilled : starImgCorner}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <View style={styles.part_review_field}>
          <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 14}}>Không gian</Text>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            {maxRate.space.map((rating, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => setDefaultRating({...defaultRating, space: rating})}>
                  {rating <= defaultRating.space ? starImgFilled : starImgCorner}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <View style={styles.part_review_field}>
          <Text style={{fontFamily: 'Nunito_400Regular', fontSize: 14}}>Dịch vụ</Text>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            {maxRate.service.map((rating, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => setDefaultRating({...defaultRating, service: rating})}>
                  {rating <= defaultRating.service ? starImgFilled : starImgCorner}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </View>
     </View>
    </ScrollView>
  )
}

export default AccountAddReviewScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: color.white,
  },
  header:{
    paddingHorizontal: 20,
    height: 50,
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }, 
  buttonPost:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: color.main,
    borderRadius: 8
  },
  content:{
    paddingHorizontal: 20,
    marginVertical: 20
  },
  part_upload:{
    height: 50,
    backgroundColor: color.grayInputText,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  part_contentPost:{
    marginTop: 30
  },
  part_contentPost_title:{
    height: 30,
    width: '100%',
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    fontFamily: 'nunito_semibold',
    fontSize: 18,
    paddingLeft: 10,
    paddingBottom: 5
  },
  part_contentPost_content:{
    marginTop: 30,
    height: 250,
    width: '100%',
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    fontFamily: 'nunito_semibold',
    fontSize: 14,
    paddingLeft: 10,
  },
  part_location:{
    marginTop: 30
  },
  part_review:{
    marginTop: 30
  },
  part_review_field:{
    width: 230,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7
  },
  map: {
    width: '100%',
    height: 300,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: color.grayOriginal,
    marginTop: 20,
    marginHorizontal: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'nunito_semibold',
    letterSpacing: 0.25,
    color: color.white,
  },
})