import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../screens/HomeScreen';
import DetailFoodScreen from '../screens/DetailFoodScreen';

// Initial Navigator
const Stack = createStackNavigator();

// Stack name
const HomeScreenName = 'HomeScreen'
const DetailScreenName = 'DetailScreen'

const HomeStack = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={HomeScreenName} component={HomeScreen} />
        <Stack.Screen name={DetailScreenName} component={DetailFoodScreen} />
      </Stack.Navigator>
  )
}

export default HomeStack