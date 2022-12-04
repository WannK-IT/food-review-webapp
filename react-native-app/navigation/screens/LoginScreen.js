import { View, Text, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useContext} from 'react'
import color from '../../src/color'
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../../src/context/AuthContext';
import Spinner from "react-native-loading-spinner-overlay";

const WIDTH = (Dimensions.get('window').width)
const HEIGHT = (Dimensions.get('window').height)

const LoginScreen = ({navigation}) => {

  const [email, setemail] = useState(null)
  const [password, setpassword] = useState(null)
  const [disabledButton, setDisabledButton] = useState(true)

  const {isLoading, login} = useContext(AuthContext)

  const directToRegister = () => {
    navigation.navigate("RegisterScreen")
  }

  const checkDisableLogin = () => {
    if(email !== null && password !== null){
      if(email.length > 0  && password.length > 0 ){
        setDisabledButton(false)
      }else{
        setDisabledButton(true)
      }
    }else{
      setDisabledButton(true)
    }
  }

  
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}/>
      <Image resizeMode='cover' style={styles.logo} source={require("../../assets/logo-bg.png")} />

      <View style={styles.login}>
        <View style={{marginHorizontal: 50}}>
          <TextInput
            value={email}
            style={styles.inputText}
            placeholder="Email"
            onChangeText={(emailText) => {
              setemail(emailText)
              checkDisableLogin()
            }}
          />
          <TextInput
            value={password}
            secureTextEntry={true}
            style={styles.inputText}
            placeholder="Mật khẩu"
            onChangeText={(passwordText) => {
              setpassword(passwordText)
              checkDisableLogin()
            }}
          />

          <TouchableOpacity disabled={disabledButton} style={disabledButton ? [styles.button, {backgroundColor: 'gray'}] : [styles.button, {backgroundColor: color.main}]} onPress={() => login(email, password)}>
            <Text style={{color: color.white, fontWeight: 'bold'}}>Đăng nhập</Text>
          </TouchableOpacity>

          <Text style={{marginVertical: 10, textAlign: 'center', color: color.grayOriginal, fontSize: 12}}>Hoặc đăng nhập bằng</Text>

          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
            <TouchableOpacity style={[styles.buttonCircle, {backgroundColor: color.facebook, marginHorizontal: 5}]}>
              <FontAwesome name='facebook' style={{color: color.white}} size={18}/>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonCircle, {backgroundColor: color.google, marginHorizontal: 5}]}>
              <FontAwesome name='google' style={{color: color.white}} size={18}/>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
            <TouchableOpacity style={{marginBottom: 10}}>
              <Text style={{color: color.main, fontSize: 12}}>Quên mật khẩu ?</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
              <Text style={{color: color.grayOriginal, fontSize: 12}}>Chưa có tài khoản?</Text>
              <TouchableOpacity onPress={() => directToRegister()}>
                <Text style={{paddingLeft: 4, color: color.main, fontSize: 12, fontWeight: 'bold'}}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    marginTop: 30,
  },
  login: {
    width: WIDTH, 
    height: HEIGHT
  },
  inputText: {
    width: '100%', 
    height: 40, 
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 5,
    borderBottomColor: color.gray
  },
  button: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginVertical: 10
  },
  buttonCircle: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    
  }
});