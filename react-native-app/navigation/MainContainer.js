import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabsContainer from "./BottomTabsContainer";
import DetailFoodScreen from "./screens/DetailFoodScreen";

// Initial Navigator
const Stack = createStackNavigator();

// Stack name
const detailFoodName = "DetailFood";

// Tab name
const bottomTabsName = 'BottomTabs'

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={bottomTabsName} component={BottomTabsContainer} />
        <Stack.Screen name={detailFoodName} component={DetailFoodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
