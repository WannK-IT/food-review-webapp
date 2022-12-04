import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';

import { messageToast } from '../../src/functions';
import color from '../../src/color'
import { AuthContext } from '../../src/context/AuthContext';
import axios from 'axios';
import { apiAdress } from '../../src/api/apiAddress';

const AccountChangePasswordScreen = () => {
  const [secureOldPassword, setSecureOldPassword] = useState(true)
  const [iconOldPassword, setIconOldPassword] = useState('eye')
  const [secureNewPassword, setSecureNewPassword] = useState(true)
  const [iconNewPassword, setIconNewPassword] = useState('eye')
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true)
  const [iconConfirmPassword, setIconConfirmPassword] = useState('eye')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Auth Context
  const {userInfo} = useContext(AuthContext)
  // console.log(userInfo)

  const changePassword = async (id, oldPassword, confirmPassword) => {
    await axios.post(`${apiAdress}checkPassword`, {
      id: id,
      oldPassword: oldPassword,
      confirmPassword: confirmPassword
    }, {
      validateStatus: function(status){
          return true;
      },
      headers: {
          Authorization: `Bearer ${userInfo.access_token}`
      }
    }).then((response) => {
      if(response.data.success == false){
        messageToast('error', 'Mật khẩu cũ chưa chính xác', 'Vui lòng nhập mật khẩu cũ chính xác', 2500)
      }else{
        messageToast('success', 'Thành công !', 'Đổi mật khẩu thành công', 2000)
      }
    }).catch((error) => {
      console.log(error);
    })
  }
  
  const checkPassword = (oldPassword, newPassword, confirmPassword) => {
    if(!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()){
      messageToast('error', 'Thông tin chưa đầy đủ', 'Vui lòng nhập đầy đủ thông tin', 2500)
    }else{
      if(oldPassword.trim().length < 5 || newPassword.trim().length < 5 || confirmPassword.trim().length < 5){
        messageToast('error', 'Mật khẩu không hợp lệ', 'Độ dài mật khẩu phải từ 5 ký tự trở lên', 2500)
      }else if(newPassword !== confirmPassword){
        messageToast('error', 'Xác nhận mật khẩu không khớp', 'Vui lòng xác nhận mật khẩu khớp với mật khẩu mới', 3000)
      }else{
        changePassword(userInfo.user.id, oldPassword, confirmPassword)
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoPart}>

        <View style={styles.groupInput}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Mật khẩu cũ</Text>
            <Text style={{color: 'red', fontWeight: 'bold', lineHeight: 15}}> *</Text>
          </View>
          <View style={styles.sectionInput}>
            <TextInput
              style={styles.inputText}
              secureTextEntry={secureOldPassword}
              placeholder="Nhập mật khẩu cũ"
              value={oldPassword}
              onChangeText={(value) => setOldPassword(value)}
            />
            <Entypo name={iconOldPassword} style={styles.iconCross} color={color.grayOriginal} size={13} onPress={
              () => {
                setSecureOldPassword(secureOldPassword ? false : true)
                setIconOldPassword(secureOldPassword ? 'eye-with-line' : 'eye')
              }}/>
          </View>
        </View>

        <View style={styles.groupInput}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Mật khẩu mới</Text>
            <Text style={{color: 'red', fontWeight: 'bold', lineHeight: 15}}> *</Text>
          </View>
          <View style={styles.sectionInput}>
            <TextInput
              style={styles.inputText}
              secureTextEntry={secureNewPassword}
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChangeText={(value) => setNewPassword(value)}
            />
            <Entypo name={iconNewPassword} style={styles.iconCross} color={color.grayOriginal} size={13} onPress={
              () => {
                setSecureNewPassword(secureNewPassword ? false : true)
                setIconNewPassword(secureNewPassword ? 'eye-with-line' : 'eye')
              }}/>
          </View>
        </View>

        <View style={styles.groupInput}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
            <Text style={{color: 'red', fontWeight: 'bold', lineHeight: 15}}> *</Text>
          </View>
          <View style={styles.sectionInput}>
            <TextInput
              style={styles.inputText}
              secureTextEntry={secureConfirmPassword}
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
            />
            <Entypo name={iconConfirmPassword} style={styles.iconCross} color={color.grayOriginal} size={13} onPress={
              () => {
                setSecureConfirmPassword(secureConfirmPassword ? false : true)
                setIconConfirmPassword(secureConfirmPassword ? 'eye-with-line' : 'eye')
              }}/>
          </View>
        </View>

          <TouchableOpacity onPress={() => checkPassword(oldPassword, newPassword, confirmPassword)}>
            <View style={styles.buttonSave}>
                <Text style={{color: color.white, fontWeight: 'bold'}}>Lưu thay đổi</Text>
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
    marginTop: 10,
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
    marginTop: 10,
    marginBottom: 20
  }
})

export default AccountChangePasswordScreen