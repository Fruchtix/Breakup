import React from 'react';
import { StyleSheet, Platform, YellowBox, View, Text } from 'react-native';
import MainNavigator from '../navigation/MainNavigator'
import SplashScreen from '../screens/SplashScreen'
import * as Font from 'expo-font';
import _ from 'lodash';
// import * as RNIap from 'react-native-iap';
import * as firebase from "firebase";
import "firebase/firestore";


class ScreenManager extends React.Component {
    constructor(props) {
      super(props);

      this.state ={ 
          loggedInStatus: '',
          emailVerified: false,
          fontLoaded: false,
          name: '',
          premium: null
      }

      //To supress the "Setting a Timer" warning
      YellowBox.ignoreWarnings(['Setting a timer']);
      const _console = _.clone(console);
      console.warn = message => {
          if (message.indexOf('Setting a timer') <= -1) {
              _console.warn(message);
          }
      }
    }

    componentDidMount() {
      this.checkIfloggedIn()
      Font.loadAsync({
        // 'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
        // 'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
      }).then(() => this.setState({ fontLoaded: true }));
    }

    checkIfloggedIn = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          firebase.firestore().collection("users").doc(user.uid).get()
                .then(async(doc) => {
                    if (doc.exists) {
                        this.setState({name: doc.data().first})
                        this.setState({loggedInStatus: 'loggedIn', emailVerified: user.emailVerified})
                    } else {
                        this.setState({loggedInStatus: 'loggedOut'})
                    }
                })
                .catch((error) => console.log(error.message))
        } else {
          this.setState({loggedInStatus: 'loggedOut'})
        }
      })
    }

  
    render() {
      if (this.state.loggedInStatus === 'loggedIn' && this.state.fontLoaded) {
        return (
          <View style={styles.safeArea}>
            <MainNavigator screenProps={{name: this.state.name}} />
          </View>
        )
    }
    else if (this.state.loggedInStatus === 'loggedOut' && this.state.fontLoaded) {
        return (
            <MainNavigator screenProps={{name: this.state.name}} />
            // <AuthNavigator />
        )
      }
      return <SplashScreen />
    }
}

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
    //   paddingTop: Platform.OS === 'android' ? 25 : 40,
    //   backgroundColor: "#FAF7F2",
  }
});

export default ScreenManager