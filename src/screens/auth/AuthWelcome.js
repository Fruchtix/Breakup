import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Platform } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import * as SplashScreen from 'expo-splash-screen';

export default function AuthWelcome(props) {
    useEffect(() => {
        setTimeout(async () => {
            await SplashScreen.hideAsync();
          }, 400);
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.infos}>
                <Text style={styles.logo}>Break/<Text style={{color: "#f47d31"}}>up</Text></Text>
            </View>

            {/* Headline */}
            <View style={styles.headlineWrapper}>
                <Text style={styles.headline}>Lass uns heute etwas für</Text>
                <Text style={styles.headline}>dein Herz tun</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.headerImage}
                    resizeMode="contain"
                    source={require("../../../assets/meditate.png")}
                />
            </View>

            <View style={styles.buttons}>
                <TouchableWithoutFeedback style={{alignItems: "center", justifyContent: "center"}} onPress={() => props.navigation.navigate("AuthPassword")}>
                    <View style={[styles.shadow, {marginBottom: 12}]}>
                        <View style={[styles.buyButton, styles.shadow]}>
                            <Text style={styles.btnTxt}>Jetzt registrieren</Text>
                            {/* <Icon name="chevron-right" size={23} color="#f9f7f3" /> */}
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("LogInScreen")}>
                    <View style={styles.registerBtnContainer}>
                        <View style={styles.logInBtn}>
                            <Text style={styles.logIntxt}>bin schon registriert</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fefffe',
      paddingBottom: 70
    },
    headerImage: {
        width: "100%",
        height: "100%",
    },
    registerBtn: {
        paddingVertical: 14,
        width: "70%",
        borderRadius: 50,
        overflow: "hidden",
        backgroundColor: "#586077",
        alignItems: "center",
        margin: 3
    },
    registerTxt: {
        textTransform: "uppercase",
        color: "#f9f7f3",
    },
    registerBtnContainer: {
        alignItems: "center",
        marginBottom: 10
    },
    logInBtn: {
        borderBottomColor: "#666",
        borderBottomWidth: 1
    },
    logIntxt: {
        color: "#666",
        textTransform: "uppercase",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttons: {
        // flex: 1,
        // justifyContent: "flex-end",
        paddingTop: 25,
        paddingBottom: 20,
        alignItems: "center"
    },
    infos: {
        alignItems: "center",
        marginTop: Platform.OS === "ios" ? 60 : 35,
        marginBottom: 18
    },
    imageContainer: {
        flex: 3,
        alignItems: "center",
    },
    headlineWrapper: {
        alignItems: "center",
    },
    headline: {
        fontSize: 25,
        color: "#5A6176",
        lineHeight: 30,
        // fontFamily: "Avenir"
    },
    logo: {
        fontSize: 26,
        paddingHorizontal: 27,
        marginBottom: 17,
        color: "#3a3938",
    },
    buyButton: {
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: "#5A6176",
        paddingVertical: 12,
        paddingHorizontal: "15%",
        marginTop: 18,
        justifyContent: "space-between"
    },
    btnTxt: {
        textTransform: "uppercase",
        color: "#f9f7f3",
        // paddingLeft: 5,
        fontWeight: "bold",
        fontSize: 14.5,
        // paddingLeft: 5
    },
  });
