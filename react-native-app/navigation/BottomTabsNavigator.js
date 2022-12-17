import React, { useContext } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Text } from "react-native";

import color from "../src/color";
import HomeStack from "./stacks/HomeStack";
import SearchStack from "./stacks/SearchStack";
import AccountStack from "./stacks/AccountStack";

import NotificationScreen from "./screens/NotificationScreen";
import AccountDrawerNavigator from "./AccountDrawerNavigator";
import { AuthContext } from "../src/context/AuthContext";


// Initial Navigator
const Tab = createMaterialBottomTabNavigator();

// Bottom tabs name
const RouteName = "BottomTabs";

const AccountTabName = "AccountTab";
const AccountLabel = <Text style={{fontFamily: 'nunito_normal'}}>Tài khoản</Text>

const HomeTabName = "HomeTab"
const HomeLabel = <Text style={{fontFamily: 'nunito_normal'}}>Trang chủ</Text>

const SearchTabName = "SearchTab"
const SearchLabel = <Text style={{fontFamily: 'nunito_normal'}}>Search</Text>

const NotificationTabName = "NotificationTab"
const NotificationLabel = <Text style={{fontFamily: 'nunito_normal'}}>Thông báo</Text>


export default function BottomTabsNavigator() {

  const {userInfo} = useContext(AuthContext)

  return (
    <Tab.Navigator
      initialRouteName={RouteName}
      activeColor={color.main}
      barStyle={{ backgroundColor: color.white }}
      screenOptions={{
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name={HomeTabName}
        component={HomeStack}
        options={{
          tabBarLabel: HomeLabel,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={24} />
          ),
          
        }}
      />
      <Tab.Screen
        name={SearchTabName}
        component={SearchStack}
        options={{
          tabBarLabel: SearchLabel,
          tabBarIcon: ({ color }) => (
            <Entypo name="magnifying-glass" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={NotificationTabName}
        component={NotificationScreen}
        options={{
          tabBarLabel: NotificationLabel,
          tabBarIcon: ({ color }) => (
            <Entypo name="bell" color={color} size={24} />
          ),
        }}
      />
      {userInfo.access_token ? 
      <Tab.Screen
        name={AccountTabName}
        component={AccountDrawerNavigator}
        options={{
          tabBarLabel: AccountLabel,
          tabBarIcon: ({ color }) => (
            <Entypo name="user" color={color} size={24} />
          ),
        }}
      /> : 
      <Tab.Screen
        name={AccountTabName}
        component={AccountStack}
        options={{
          tabBarLabel: AccountLabel,
          tabBarIcon: ({ color }) => (
            <Entypo name="user" color={color} size={24} />
          ),
        }}
      /> }
    </Tab.Navigator>
  );
}
