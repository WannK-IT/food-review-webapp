import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";

import color from "../src/color";
import HomeScreen from "./screens/HomeScreen";
import VideoScreen from "./screens/VideoScreen";
import NotificationScreen from "./screens/NotificationScreen";
import LoginScreen from "./screens/LoginScreen";
import AddPostScreen from "./screens/AddPostScreen";

// Initial Navigator
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

// Bottom tabs name
const homeName = "Trang chủ";
const loginName = "Tài khoản";
const videoName = "Video";
const notification = "Thông báo";
const buttonAdd = "Thêm";

export default function BottomTabsContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      activeColor={color.main}
      barStyle={{ backgroundColor: color.white }}
    >
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{
          tabBarLabel: homeName,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={videoName}
        component={VideoScreen}
        options={{
          tabBarLabel: videoName,
          tabBarIcon: ({ color }) => (
            <Entypo name="folder-video" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={buttonAdd}
        component={AddPostScreen}
        options={{
          tabBarLabel: buttonAdd,
          tabBarIcon: ({ color }) => (
            <Entypo name="circle-with-plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={notification}
        component={NotificationScreen}
        options={{
          tabBarLabel: notification,
          tabBarIcon: ({ color }) => (
            <Entypo name="bell" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={loginName}
        component={LoginScreen}
        options={{
          tabBarLabel: loginName,
          tabBarIcon: ({ color }) => (
            <Entypo name="user" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
