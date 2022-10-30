import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import color from '../../color'

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
        <Text style={styles.city}>Hồ Chí Minh</Text>
        <TextInput
            style={styles.input}
            placeholder='Bạn cần tìm món ?'  
        />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  searchBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  city:{
    fontWeight: 'bold',
    marginHorizontal: 10
  },
  input:{
    height: 40,
    width: '60%',
    marginHorizontal: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: 20,
  }
});
