import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import color from "../../color";
import { Entypo } from '@expo/vector-icons'; 

const BottomTabs = () => {
  return (
    <View style={styles.bottomTabs}>
        <View style={styles.tabs}>
            <TouchableOpacity>
              <Entypo name="home" style={[styles.iconTab, styles.iconTabActive]}/>
              <Text style={[styles.titleTab, styles.titleTabActive]}>Trang chủ</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="folder-video" style={styles.iconTab}/>
              <Text style={styles.titleTab}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="circle-with-plus" style={styles.buttonAdd}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="bell" style={styles.iconTab}/>
              <Text style={styles.titleTab}>Thông báo</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="user" style={styles.iconTab}/>
              <Text style={styles.titleTab}>Tài khoản</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  bottomTabs: {
    bottom: 0,
    height: 60,
  },
  tabs:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconTab:{
    textAlign: 'center',
    fontSize: 24,
    color: color.grayOriginal
  },
  titleTab:{
    fontSize: 10,
    color: color.grayOriginal
  },
  // For Active Tab
  iconTabActive:{
    textAlign: 'center',
    fontSize: 24,
    color: color.main
  },
  titleTabActive:{
    fontSize: 10,
    color: color.main
  },
  // ----------
  buttonAdd:{
    textAlign: 'center',
    fontSize: 45,
    color: color.main
  }
});
