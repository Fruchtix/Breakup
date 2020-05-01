import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'

export default function AuthWelcome(props) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.headerImage}
                source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
            />

            <View style={styles.infos}>
                <Text>Bitte registriere dich ...</Text>
                <View>
                    <Text>... um deinen Trennung zu überwinden</Text>
                    <Text>... um deinen Fortschritt zu verfolgen</Text>
                    <Text>... um dein Programm und Übungen zu bekommen</Text>
                </View>
            </View>

            <View style={styles.buttons}>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("AuthDate")}>
                    <View style={styles.registerBtnContainer}>
                        <View style={[styles.shadow,styles.registerBtn]}>
                            <Text style={styles.registerTxt}>jetzt registrieren</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("AuthPassword")}>
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
      backgroundColor: '#fff',
      paddingBottom: 60
    },
    headerImage: {
        width: "100%",
        height: 230,
    },
    registerBtn: {
        backgroundColor: "#7e004c",
        paddingVertical: "3%",
        paddingHorizontal: "15%",
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        margin: 3
    },
    registerTxt: {
        textTransform: "uppercase",
        color: "#fefffe",
    },
    registerBtnContainer: {
        alignItems: "center",
        marginBottom: 10
    },
    logInBtn: {
        borderBottomColor: "#000",
        borderBottomWidth: 1
    },
    logIntxt: {
        color: "#000",
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
        flex: 1,
        justifyContent: "flex-end"
    },
    infos: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    }
  });
