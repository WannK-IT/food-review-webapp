import { enableScreens } from 'react-native-screens';
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from 'react';
import { StyleSheet, View, LogBox } from "react-native";
import {AuthProvider} from "./src/context/AuthContext";
import Toast from 'react-native-toast-message';
import MainContainer from "./navigation/MainContainer";
import { Nunito_600SemiBold, Nunito_400Regular, Nunito_700Bold, Nunito_900Black, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import color from './src/color';

// Accept screen for real device
enableScreens();

export default function App() {
  
  let [fontsLoaded] = useFonts({
    nunito_normal: Nunito_600SemiBold,
    Nunito_400Regular,
    nunito_semibold: Nunito_700Bold,
    nunito_lightbold: Nunito_800ExtraBold,
    nunito_bold: Nunito_900Black
  });

  useEffect(() => {
    const prepareLoadFonts = async () => {
      await SplashScreen.preventAutoHideAsync()
    }
    prepareLoadFonts();
  }, [])
  
  if(fontsLoaded){
    SplashScreen.hideAsync();
  }else{
    return undefined;
  }

  LogBox.ignoreLogs(['Remote debugger'])
  return (
    <View style={styles.container}>
      <AuthProvider>
        <MainContainer/>
        <Toast />
      </AuthProvider>

      <StatusBar hidden={true} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
