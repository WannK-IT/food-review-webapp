import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen";

// Initial Navigator
const Stack = createStackNavigator();

// Stack name
const SearchScreenName = 'SearchScreen'

const SearchStack = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SearchScreenName} component={SearchScreen} />
      </Stack.Navigator>
  )
}

export default SearchStack