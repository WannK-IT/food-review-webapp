import { View, Text, Image, StyleSheet, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Entypo, FontAwesome } from '@expo/vector-icons';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import axios from 'axios';
import * as ImagePicker from "expo-image-picker";
import Spinner from 'react-native-loading-spinner-overlay/lib';

import { apiAdress } from '../../src/api/apiAddress';
import color from '../../src/color'
import { AuthContext } from '../../src/context/AuthContext'
import { SelectList } from 'react-native-dropdown-select-list'
import { dataCity } from '../../src/dataGlobal';
import { firebase } from "../../config"
import { getStringDate, messageToast } from '../../src/functions';


const AccountEditScreen = ({navigation}) => {

  // State of info profile
  const [fullname, setFullName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [selected, setSelected] = useState('');
  const [avatar, setAvatar] = useState('');
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState('');
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  const [newAvatar, setNewAvatar] = useState(false);


  // Auth Context
  const {userInfo, logout} = useContext(AuthContext)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setNewAvatar(true)
    }
  };



  // Calendar picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    setBirthday(fDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const valueMapCity = (valueCity) => {
    return dataCity.find(item => item.value === valueCity);
  }

  const valueMapCity2 = (valueCity) => {
    return dataCity.find(item => item.key === valueCity).value;
  }

  const displayImage = () => {
    if(image){
      return loadingAvatar ? <Spinner visible={loadingAvatar}/> : <Image resizeMode="cover" 
      source={{ uri: image }} 
      style={{width: 130, height: 130, borderRadius: 130/2, borderWidth: 1}} />
    }else{
      return loadingAvatar ? <Spinner visible={loadingAvatar}/> : <Image resizeMode="cover" 
        source={ require('react-native-app/assets/user_undefined.jpg') } 
        style={{width: 130, height: 130, borderRadius: 130/2, borderWidth: 1}}
      />

    }
  }

  // Button save
  const updateInfo = async () => {
    let fileNameAvatar = '';

    // Delete old avatar in firebase storage
    if(newAvatar){
      if(userInfo.user.avatar){
        let oldImage = firebase.storage().ref('avatar').child(userInfo.user.avatar)
        oldImage.delete().then((response) => {
          console.log('Delete old image successfully');
        }).catch((error) => {
          console.log('Fail to delete old image');
        });
      }
    }

    if(image){
      const response = await fetch(image)
      const blob = await response.blob();
      fileNameAvatar = getStringDate() + '_' + image.substring(image.lastIndexOf('/') + 1)
      var ref = firebase.storage().ref('avatar').child(fileNameAvatar).put(blob)

      try {
        await ref
      } catch (error) {
        console.log(error);
      }finally{
        await firebase.storage().ref('avatar/' + fileNameAvatar).getDownloadURL().then((result) => {
          fileNameAvatar = result
        }).catch((error) => {
          console.log(error);
        })
      }

      setImage('')
    }

    let config = {
      validateStatus: function(status){
        return true;
      },
      headers: {
        accept : 'application/json',
      }
    }

    await axios.post(`${apiAdress}user/${userInfo.user.id}`, {
      fullname: fullname,
      birthday: birthday,
      gender: gender,
      location: (selected) ? valueMapCity2(selected) : userInfo.user.location,
      avatar: (newAvatar) ? fileNameAvatar : '',
      _method: 'PUT'
    }, config)
    .then((response) => {
      if(response.data.success == true){
        messageToast('success', 'Thành công', response.data.message, 2000)
        logout();
      }else{
        messageToast('error', 'Lỗi', 'Cập nhật thông tin không thành công', 2000)
      }

    }).catch(error => {
      console.log(error);
    })

  }


  useEffect(() => {
    setFullName((userInfo.user.fullname) ? userInfo.user.fullname : '')
    setBirthday((userInfo.user.birthday) ? userInfo.user.birthday : '')
    setGender((userInfo.user.gender) ? userInfo.user.gender : '')
    setSelected((userInfo.user.location) ? userInfo.user.location : '')
    setAvatar((userInfo.user.avatar) ? userInfo.user.avatar : '')

    setLoadingAvatar(true)
    if(userInfo.user.avatar){
      setImage(userInfo.user.avatar)
      setLoadingAvatar(false)
    }else{
      setImage('')
      setLoadingAvatar(false)
    }
    
  }, [])
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoUser}>

        {displayImage()}
        
        <TouchableOpacity 
          style={{paddingHorizontal: 40, paddingVertical: 5, borderWidth: 1.5, borderRadius: 5, borderColor: color.gray, marginTop: 15}} 
          onPress={() => pickImage()}
          >
          <Text style={{color: "#666666"}}>Thay đổi avatar</Text>
        </TouchableOpacity>
        
      </View>

      <View style={styles.infoPart}>
        <View style={styles.groupInput}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Email</Text>
            <Text style={{color: 'red', fontWeight: 'bold', lineHeight: 15}}> *</Text>
          </View>
          <View style={styles.sectionInput}>
            <TextInput
              style={styles.inputText}
              value={userInfo.user.email}
              editable={false}
            />
          </View>
        </View>


        <View style={styles.groupInput}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Họ tên</Text>
            <Text style={{color: 'red', fontWeight: 'bold', lineHeight: 15}}> *</Text>
          </View>
          <View style={styles.sectionInput}>
            <TextInput
              style={styles.inputText}
              value={fullname}
              placeholder="Nhập họ tên"
              onChangeText={(text) => setFullName(text)}
            />
            <Entypo name="circle-with-cross" style={styles.iconCross} color={color.grayOriginal} size={13} onPress={() => setFullName("")}/>
          </View>
        </View>

        <View style={styles.groupInput}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Mật khẩu</Text>
            <Text style={{color: 'red', fontWeight: 'bold', lineHeight: 15}}> *</Text>
          </View>
          <TouchableOpacity 
            style={[styles.sectionInput, styles.inputText]} 
            onPress={() => navigation.navigate("AccountChangePasswordDrawer")}
          >
            <Text style={{color: '#b3b3b3'}}>
              Đổi mật khẩu <FontAwesome name="sign-in"/>
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={{fontWeight: 'bold', marginTop: 10, marginBottom: 15, fontSize: 15}}>Thông tin khác</Text>

        <View style={styles.groupInput}>
          <Text style={styles.label}>Ngày sinh</Text>
          <TouchableOpacity 
            style={[styles.sectionInput, styles.inputText]} 
            onPress={() => showDatepicker()}
          >
            <Text style={{color: '#b3b3b3'}}>{birthday}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.groupInput}>
          <View>
            <Text style={styles.label}>Giới tính</Text>
          </View>
          <View style={styles.sectionInput}>
            <TextInput
              style={styles.inputText}
              value={gender}
              placeholder="Nhập giới tính"
              onChangeText={(text) => setGender(text)}
            />
            <Entypo name="circle-with-cross" style={styles.iconCross} color={color.grayOriginal} size={13} onPress={() => setGender("")}/>
          </View>
        </View>

        <View style={[styles.groupInput, {marginBottom: 20}]}>
          <Text style={styles.label}>Khu vực</Text>
          <SelectList 
              setSelected={(val) => setSelected(val)} 
              defaultOption={valueMapCity(selected)}
              data={dataCity} 
              save="value"
              search
              placeholder='Chọn khu vực'
              boxStyles={[styles.inputText, {paddingBottom: 5}]}
            />
        </View>

          <TouchableOpacity onPress={() => updateInfo()}>
            <View style={styles.buttonSave}>
                <Text style={{color: color.white, fontWeight: 'bold'}}>Lưu</Text>
            </View>
          </TouchableOpacity>

      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white
  },
  infoUser:{
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  statistics:{
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 15
  },
  infoPart:{
    marginHorizontal: 20
  },
  sectionInput:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  label:{
    fontSize: 13,
    fontWeight: 'bold'
  },
  inputText: {
    width: '100%', 
    height: 40, 
    marginVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    backgroundColor: color.grayInputText,
    borderColor: color.grayInputText,
    borderRadius: 10,
    paddingLeft: 10
  },
  iconCross:{
    position: 'absolute',
    right: 15
  },
  groupInput:{
    marginVertical: 3
  },
  buttonSave:{
    height: 40, 
    backgroundColor: color.main, 
    width: "100%", 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 10,
    marginBottom: 20
  }
})

export default AccountEditScreen