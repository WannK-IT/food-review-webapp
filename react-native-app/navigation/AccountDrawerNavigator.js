import React, {useState, useEffect, useContext} from 'react'
import { Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { createDrawerNavigator, DrawerToggleButton, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import color from '../src/color';
import { AuthContext } from '../src/context/AuthContext';
import AccountInfoScreen from "./screens/AccountInfoScreen"
import AccountChangePasswordScreen from './screens/AccountChangePasswordScreen';
import AccountEditScreen from './screens/AccountEditScreen';
import AccountAddReviewScreen from './screens/AccountAddReviewScreen';
import AccountSavedScreen from './screens/AccountSavedScreen';

const AccountDrawer = createDrawerNavigator();

const LogoutLabel = 'Đăng xuất'

const AccountInfoName = 'AccountInfoDrawer'
const AccountInfoLabel = 'Trang cá nhân'

const AccountChangePasswordName = 'AccountChangePasswordDrawer'
const AccountChangePasswordLabel = 'Đổi mật khẩu'

const AccountEditName = 'AccountEditDrawer'
const AccountEditLabel = 'Chỉnh sửa tài khoản'

const AccountAddReviewName = 'AccountAddReviewDrawer'
const AccountAddReviewLabel = 'Thêm bài viết'

const AccountSavedReviewName = 'AccountSavedReviewDrawer'
const AccountSavedReviewLabel = 'Bài viết đã lưu'

const AccountDrawerNavigator = () => {
  const {userInfo, isLoading, logout} = useContext(AuthContext)

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <Spinner visible={isLoading}/>
        <DrawerItemList {...props} />
        <DrawerItem 
          labelStyle = {{fontFamily: 'nunito_semibold'}}
          label= {LogoutLabel}
          onPress={() => logout()} 
          icon={({ focused, color, size }) => (
            <Entypo color={focused ? color.main : color.black} size={size} name='log-out' /> 
            )
          }
          />
      </DrawerContentScrollView>
    );
  }

  const getEmailWithoutSuffix = (email) => {
    let emailSplit = email.split('@');
    return '@' + emailSplit[0];
  }


  return (
    <AccountDrawer.Navigator 
      screenOptions={{
        drawerPosition: 'right',
        headerLeft: false,
        headerRight: () => <DrawerToggleButton/>,
        drawerStyle: {
          width: 300
        },
        headerTitleAlign: 'center',
        headerTitleStyle:{
          fontSize: 16,
          fontFamily: 'nunito_semibold'
        },
        headerStyle: {
          height: 40,
          borderBottomWidth: 1
        },
        drawerActiveBackgroundColor: 'rgba(241, 50, 0, .1)',
        drawerActiveTintColor: color.main,
        title: getEmailWithoutSuffix(userInfo.user.email),
        drawerLabelStyle: {
          fontFamily: 'nunito_semibold'
        },
        unmountOnBlur: true
      }}
      drawerContent={(props) => <CustomDrawerContent {...props}/>}
      initialRouteName = {AccountInfoName}
      useLegacyImplementation={true}
    >
      <AccountDrawer.Screen 
        name={AccountInfoName}
        component={AccountInfoScreen}
        options={{
          drawerLabel: AccountInfoLabel,
          drawerIcon: ({focused, size}) => (
            <Entypo name='user' size={size} color={focused ? color.main : color.black}/>
          )
        }}
      />
      <AccountDrawer.Screen 
        name={AccountEditName}
        component={AccountEditScreen}
        options={{
          drawerLabel: AccountEditLabel,
          drawerIcon: ({focused, size}) => (
            <FontAwesome name='edit' size={size} color={focused ? color.main : color.black}/>
          )
        }}
      />
      <AccountDrawer.Screen 
        name={AccountChangePasswordName} 
        component={AccountChangePasswordScreen}
        options={{
          drawerLabel: AccountChangePasswordLabel,
          drawerIcon : ({focused, size}) => (
            <Entypo name='key' size={size} color={focused ? color.main : color.black}/>
          )
        }}
      />
      <AccountDrawer.Screen 
        name={AccountAddReviewName} 
        component={AccountAddReviewScreen}
        options={{
          drawerLabel: AccountAddReviewLabel,
          drawerIcon : ({focused, size}) => (
            <Entypo name='news' size={size} color={focused ? color.main : color.black}/>
          )
        }}

      />
      <AccountDrawer.Screen 
        name={AccountSavedReviewName} 
        component={AccountSavedScreen}
        options={{
          drawerLabel: AccountSavedReviewLabel,
          drawerIcon : ({focused, size}) => (
            <MaterialCommunityIcons name='food' size={size} color={focused ? color.main : color.black}/>
          )
        }}
      />
    </AccountDrawer.Navigator>
  )
}

export default AccountDrawerNavigator


