import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import * as firebase from 'firebase'

export default function ProfileScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.safeArea}>
                <Text style={styles.name}>Profil</Text>
            </View>

            <TouchableWithoutFeedback onPress={() => {
                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                  }, function(error) {
                    // An error happened.
                  });
            }}>
                <Text>Ausloggen</Text>
            </TouchableWithoutFeedback>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Image
                        style={[styles.headerImage]}
                        resizeMode="contain"
                        source={require("../../assets/private.png")}
                    />
                </View>

                <View style={styles.kasten}>
                    <View style={styles.h1wrapper}>
                        <Text style={styles.lineh1}>Profil</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("UserData")}>
                        <View style={styles.line}>
                            <View style={styles.row}>
                                <Icon name="user" size={26} color="#5A6176" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>Benutzerdaten</Text>
                            </View>
                            <Icon name="chevron-right" size={26} color="grey" />
                        </View>
                    </TouchableWithoutFeedback>

                    {!props.screenProps.premium ? <TouchableWithoutFeedback onPress={() => props.navigation.navigate("BuyModal")}>
                        <View style={styles.line}>
                            <View style={styles.row}>
                                <Icon name="gift" size={26} color="#5A6176" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>Dein Programm</Text>
                            </View>
                            <Icon name="chevron-right" size={26} color="grey" />
                        </View>
                    </TouchableWithoutFeedback> : null }
                </View>

                <View style={styles.kasten}>
                <View style={styles.h1wrapper}>
                        <Text style={styles.lineh1}>Einstellungen</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("Notifications")}>
                        <View style={styles.line}>
                            <View style={styles.row}>
                                <Icon name="bell" size={26} color="#5A6176" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>Mitteilungen</Text>
                            </View>
                            <Icon name="chevron-right" size={26} color="grey" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={[styles.kasten, {marginBottom: 40}]}>
                <View style={styles.h1wrapper}>
                        <Text style={styles.lineh1}>Rechtliches</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("LawWebsite", {type: "datenschutz"})}>
                        <View style={styles.line}>
                            <View style={styles.row}>
                                <Icon name="lock" size={26} color="#5A6176" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>Datenschutz</Text>
                            </View>
                            <Icon name="chevron-right" size={26} color="grey" />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("LawWebsite", {type: "agb"})}>
                        <View style={styles.line}>
                            <View style={styles.row}>
                                <Icon name="file-text" size={26} color="#5A6176" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>AGB</Text>
                            </View>
                            <Icon name="chevron-right" size={26} color="grey" />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("LawWebsite", {type: "impressum"})}>
                        <View style={styles.line}>
                            <View style={styles.row}>
                                <Icon name="book" size={26} color="#5A6176" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>Impressum</Text>
                            </View>
                            <Icon name="chevron-right" size={26} color="grey" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* <View style={styles.logoContainer}>
                    <Text style={styles.logo}>Break/<Text style={{color: "#f47d31"}}>up</Text></Text>
                </View> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fefffe',
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
        marginTop: 25,
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
