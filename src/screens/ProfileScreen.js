import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'

export default function ProfileScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.safeArea}>
                <Text>Profile</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.kasten}>
                    <Text style={styles.lineh1}>Profil</Text>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("UserData")}>
                        <View style={styles.line}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="user" size={24} color="green" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>Benutzerdaten</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color="grey" />
                        </View>
                    </TouchableWithoutFeedback>

                    {!props.screenProps.premium ? <TouchableWithoutFeedback onPress={() => props.navigation.navigate("BuyModal")}>
                        <View style={styles.line}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="user" size={24} color="green" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>Dein Programm</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color="grey" />
                        </View>
                    </TouchableWithoutFeedback> : null }
                </View>

                <View style={styles.kasten}>
                    <Text style={styles.lineh1}>Einstellungen</Text>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("Notifications")}>
                        <View style={styles.line}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="user" size={24} color="green" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>Mitteilungen</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color="grey" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.kasten}>
                    <Text style={styles.lineh1}>Rechtliches</Text>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("LawWebsite", {type: "datenschutz"})}>
                        <View style={styles.line}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="user" size={24} color="green" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>Datenschutz</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color="grey" />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("LawWebsite", {type: "agb"})}>
                        <View style={styles.line}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="user" size={24} color="green" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>AGB</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color="grey" />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("LawWebsite", {type: "impressum"})}>
                        <View style={styles.line}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="user" size={24} color="green" style={{marginRight: 15}} />
                                <Text style={styles.linePoint}>Impressum</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color="grey" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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
        paddingTop: 40,
        paddingBottom: 18,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        alignItems: "center"
    },
    line: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: "center"
    },
    lineh1: {
        fontSize: 18,
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: "black"
    },
    kasten: {
        marginTop: 25,
        marginHorizontal: 25
    },
    linePoint: {
        fontSize: 14
    }
  });
