import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabsNavigator from "./BottomTabsNavigator";

// Initial Navigator
const Stack = createStackNavigator();

// Tab name
const bottomTabsName = 'BottomTabs'

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={bottomTabsName} component={BottomTabsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
