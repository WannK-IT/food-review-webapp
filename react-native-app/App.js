import { StatusBar } from "expo-status-bar";
import React from 'react';
import { StyleSheet, View, LogBox } from "react-native";

import MainContainer from "./navigation/MainContainer";

export default function App() {
  LogBox.ignoreLogs(['Remote debugger'])
  return (
    <View style={styles.container}>
        <MainContainer/>
      <StatusBar hidden={true} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
