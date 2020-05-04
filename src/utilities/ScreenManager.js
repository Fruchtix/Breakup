import React from 'react';
import { StyleSheet, Platform, YellowBox, View, Text } from 'react-native';
import MainNavigator from '../navigation/MainNavigator'
import AuthNavigator from '../navigation/AuthNavigator'
// import SplashScreen from '../screens/SplashScreen'
import * as Font from 'expo-font';
import _ from 'lodash';
// import * as RNIap from 'react-native-iap';
import * as firebase from "firebase";
import "firebase/firestore";
import * as InAppPurchases from 'expo-in-app-purchases'
import { SplashScreen } from 'expo';


class ScreenManager extends React.Component {
    constructor(props) {
      super(props);

      SplashScreen.preventAutoHide();

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

    connectToPayment = async() => {
      return new Promise(async(resolve, reject) => {
          const history = await InAppPurchases.connectAsync()
          if (history.responseCode === InAppPurchases.IAPResponseCode.OK) {
            //If User bought something get current date and check if still valid
            let monthly
            let yearly
            var getNow = firebase.functions().httpsCallable('getCurrentDate')
            await getNow()
              .then((response) => {
                  monthly = new Date(response.data)
                  yearly = new Date(response.data)
                  monthly=new Date(monthly.setMonth(monthly.getMonth() - 1))
                  yearly = new Date(yearly.setFullYear(yearly.getFullYear() - 1))
              })
              .catch((error) => {
                  console.log(error.message)
              })
            
            history.results.forEach(async(result) => {
              console.log("item gekauft")
              if(result.acknowledged){
                if((result.productId === items[0] && result.purchaseTime > monthly.getTime()) || (result.productId === items[1] && result.purchaseTime > yearly.getTime()))
                  //Premium User
                  console.log("ist premium")
                  await this.setState({premium: true})
                  resolve("SUCCESS")
                }
            })
            //No Item is Valid -> normal user
            if(this.state.premium === null) {
              this.setState({premium: false}, () => {
                resolve("SUCCESS")
              })
            } else {
              resolve("SUCCESS")
            }
          } else {
            console.log("cant connect")
            reject("FAILURE")
          }
      })
    }
  
    render() {
      if (this.state.loggedInStatus === 'loggedIn' && this.state.fontLoaded) {
        return (
          <View style={styles.safeArea}>
            <MainNavigator screenProps={{name: this.state.name, premium: this.state.premium}} />
          </View>
        )
    }
    else if (this.state.loggedInStatus === 'loggedOut' && this.state.fontLoaded) {
        return (
            <AuthNavigator />
        )
    }
    return null
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