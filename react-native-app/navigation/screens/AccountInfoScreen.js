import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import color from '../../src/color'
import { AuthContext } from '../../src/context/AuthContext'
import ManagementTabsNavigator from '../ManagementTabsNavigator'
import { firebase } from "../../config"
import Spinner from 'react-native-loading-spinner-overlay'

const AccountInfoScreen = ({navigation}) => {
 const {userInfo, logout} = useContext(AuthContext)
 const [avatar, setAvatar] = useState();
 const [loadingAvatar, setLoadingAvatar] = useState(false);
 
 const userFullName = userInfo.user.fullname;
 const userLocation = (userInfo.user.location ? <Text style={{fontSize: 12, color: color.grayOriginal, paddingTop: 5, fontFamily: 'nunito_normal'}}>{userInfo.user.location}</Text> : '');

 const displayImage = () => {
  if(avatar){
    return loadingAvatar ? <Spinner visible={loadingAvatar}/> : <Image resizeMode="contain" source={{ uri: avatar }} style={{width: 100, height: 100, borderRadius: 100/2, borderWidth: 1}}/>
  }else{
    return loadingAvatar ? <Spinner visible={loadingAvatar}/> : <Image resizeMode="contain" source={require('react-native-app/assets/user_undefined.jpg')} style={{width: 100, height: 100, borderRadius: 100/2, borderWidth: 1}}/>
  }
}

useEffect(() => {
  setLoadingAvatar(true)
  if(userInfo.user.avatar != null){
    firebase.storage().ref('avatar').child(userInfo.user.avatar).getDownloadURL()
    .then((url) => {
      setAvatar(url)
      setLoadingAvatar(false)
    }).catch(error => console.log(error))
  }else{
    setAvatar(null)
    setLoadingAvatar(false)
  }

}, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerPart}>

        <View style={styles.infoUser}>
          {displayImage()}
          <Text style={{fontSize: 15, color: color.black, paddingTop: 10, fontFamily: 'nunito_semibold'}}>{userFullName}</Text>
          {userLocation}
        </View>

        <View style={styles.statistics}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'nunito_semibold'}}>5</Text>
            <Text style={{fontSize: 10, color: color.grayOriginal, fontFamily: 'nunito_normal'}}>Reviews</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'nunito_semibold'}}>12</Text>
            <Text style={{fontSize: 10, color: color.grayOriginal, fontFamily: 'nunito_normal'}}>Followers</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'nunito_semibold'}}>3</Text>
            <Text style={{fontSize: 10, color: color.grayOriginal, fontFamily: 'nunito_normal'}}>Following</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("AccountEditDrawer")}>
          <View style={styles.buttonEditProfile}>
            <Text style={{fontSize: 13, fontFamily: 'nunito_semibold', color: "#666666"}}>Chỉnh sửa thông tin cá nhân</Text>
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.navPart} showsVerticalScrollIndicator={false}>
        <ManagementTabsNavigator/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerPart: {
    backgroundColor: color.white,
    marginBottom: 6,
  },
  navPart: {
    flex: 2,
    backgroundColor: color.white
  },
  infoUser:{
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 10
  },
  statistics:{
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 15
  },
  buttonEditProfile:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 25,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: color.gray,
    padding: 5,
    marginTop: 10,
    marginBottom: 20
  }
})

export default AccountInfoScreen