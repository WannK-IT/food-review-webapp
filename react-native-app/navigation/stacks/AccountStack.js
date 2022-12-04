import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AccountDrawerNavigator from '../AccountDrawerNavigator';

// Initial Navigator
const Stack = createStackNavigator();

// Stack name
const LoginScreenName = 'LoginScreen'
const RegisterScreenName = 'RegisterScreen'
const AccountScreenName = 'AccountScreen'

const AccountStack = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={LoginScreenName} component={LoginScreen} />
        <Stack.Screen name={AccountScreenName} component={AccountDrawerNavigator} />
        <Stack.Screen name={RegisterScreenName} component={RegisterScreen} />
      </Stack.Navigator>
  )
}

export default AccountStack