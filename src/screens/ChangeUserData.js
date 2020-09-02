import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Platform, TouchableWithoutFeedback } from 'react-native'
import GoBackHeader from '../components/GoBackHeader'
import {Feather as Icon} from '@expo/vector-icons'
import * as firebase from 'firebase'


export default function ChangeUserData(props) {
    return (
        <View style={{flex: 1, backgroundColor: "#fff"}}>
            <View style={styles.colorTop}>
                    <GoBackHeader navigation={props.navigation} />    
            </View>

            {/* <Text style={styles.headline}>Hier wird geradeee</Text>
            <Text style={styles.headline}>noch dran gearbeitet...</Text>
            <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                <ImageBackground style={{width: "100%", height: 300}} source={require("../../assets/inwork.png")} >
                    <Text></Text>
                </ImageBackground>
            </View> */}

            <View style={styles.kasten}>
                <View style={styles.h1wrapper}>
                    <Text style={styles.lineh1}>Benutzerdaten</Text>
                </View>

                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("UserData")}>
                    <View style={styles.line}>
                        <View style={styles.row}>
                            <Icon name="user" size={26} color="#5A6176" style={{marginRight: 15}} />
                            <Text style={styles.linePoint}>E-Mail ändern</Text>
                        </View>
                        <Icon name="chevron-right" size={26} color="grey" />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    firebase.auth().signOut().then(function() {
                        // Sign-out successful.
                    }, function(error) {
                        // An error happened.
                    });
                }}>
                    <View style={styles.line}>
                        <View style={styles.row}>
                            <Icon name="user" size={26} color="#5A6176" style={{marginRight: 15}} />
                            <Text style={styles.linePoint}>Ausloggen</Text>
                        </View>
                        <Icon name="chevron-right" size={26} color="grey" />
                    </View>
                </TouchableWithoutFeedback>

                {/* <TouchableWithoutFeedback onPress={() => props.navigation.navigate("UserData")}>
                    <View style={styles.line}>
                        <View style={styles.row}>
                            <Icon name="user" size={26} color="#5A6176" style={{marginRight: 15}} />
                            <Text style={styles.linePoint}>Konto löschen</Text>
                        </View>
                        <Icon name="chevron-right" size={26} color="grey" />
                    </View>
                </TouchableWithoutFeedback> */}
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colorTop: {
        paddingTop: Platform.OS === "android" ? 13 : 40,
        paddingBottom: 25,
        backgroundColor: "#ebe7e4",
        marginBottom: 28,
    },
    headline: {
        alignSelf: "center",
        fontSize: 25,
        color: "#5A6176",
        lineHeight: 32
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10
    },
    line: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#c8c7cc",
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: "center"
    },
    linePoint: {
        fontSize: 15
    },
    safeArea: {
        paddingTop: Platform.OS === "ios" ? 55 : 18,
        paddingBottom: 18,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        alignItems: "center"
    },
    line: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#c8c7cc",
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: "center"
    },
    lineh1: {
        fontSize: 13,
        marginBottom: 3,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    h1wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: "black"
    },
    kasten: {
        marginTop: 0,
        marginHorizontal: 27
    },
    linePoint: {
        fontSize: 15
    },
    name: {
        fontSize: 14,
        textTransform: "uppercase",
        color: "#3a3938",
        fontWeight: "bold"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10
    },
    logo: {
        fontSize: 26,
        paddingHorizontal: 27,
        marginBottom: 17,
        color: "#3a3938"
    },
    logoContainer: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: "center"
    },
    headerImage: {
        height: 200,
        width: "100%",
        marginBottom: -5
    }
  });
