import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ManagementMediaScreen from "./screens/ManagementMediaScreen";
import ManagementReviewScreen from "./screens/ManagementReviewScreen";
import ManagementPlaceScreen from './screens/ManagementPlaceScreen';

const ReviewName = "ReviewTabName"
const ReviewLabel = "Bài viết"

const MediaName = "MediaTabName"
const MediaLabel = "Ảnh"

const PlaceName = "PlaceName"
const PlaceLabel = "Địa điểm"

const ManagementTabs = createMaterialTopTabNavigator();

const ManagementTabsNavigator = ({navigation}) => {
  return (
    <ManagementTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: { 
            fontSize: 10,
            fontFamily: 'nunito_semibold'
          },
        }}
    >
        <ManagementTabs.Screen 
            name={ReviewName} 
            component={ManagementReviewScreen} 
            options={{
                tabBarLabel: ReviewLabel
            }}
        />
        <ManagementTabs.Screen 
            name={PlaceName} 
            component={ManagementPlaceScreen} 
            options={{
                tabBarLabel: PlaceLabel
            }}
        />
        <ManagementTabs.Screen 
            name={MediaName} 
            component={ManagementMediaScreen} 
            options={{
                tabBarLabel: MediaLabel
            }}
        />
        
    </ManagementTabs.Navigator>
  )
}

export default ManagementTabsNavigator
