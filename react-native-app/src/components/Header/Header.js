import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 

import color from '../../color'
const Header = (props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity>  
        <Feather onPress={props.directBack} style={styles.iconBack} name="arrow-left"/>
      </TouchableOpacity>
      <Text numberOfLines={1} ellipsizeMode='tail' style={styles.headerText}>Gà rán sốt cay Hàn Quốc tại Bình Thạnh</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
      height: 50,
      backgroundColor: color.main,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconBack:{  
      paddingHorizontal: 8,
      fontSize: 20,
      color: color.white,
    },
    headerText:{
      color: color.white,
      width: 350,
      fontSize: 16,
      fontWeight: 'bold',
      paddingHorizontal: 10,
    }
})