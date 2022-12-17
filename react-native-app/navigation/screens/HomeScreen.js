import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

import SearchBar from "../../src/components/SearchBar/SearchBar"
import Recommend from "../../src/components/Recommend/Recommend";
import Post from "../../src/components/Post/Post";

const HomeScreen = ({navigation}) => {
  const directDetail = () => {
    return navigation;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <SearchBar />
        <Recommend directDetailFood={navigation}/>
        <Post directDetailFood={navigation}/>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
