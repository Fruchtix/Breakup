import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase'
import {firebaseConfig} from './src/utilities/fireConfig'

import ScreenManager from './src/utilities/ScreenManager'
import * as SplashScreen from 'expo-splash-screen';

firebase.initializeApp(firebaseConfig)
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <View style={styles.container}>
      <ScreenManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefffe"
  },
});
