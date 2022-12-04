import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import color from '../../src/color'

const ManagementReviewScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: "nunito_bold"}}>ManagementReviewScreen</Text>
    </View>
  )
}

export default ManagementReviewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white
  }
})