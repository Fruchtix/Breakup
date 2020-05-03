  
import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Modal, Platform, Dimensions,ImageBackground, TouchableWithoutFeedback } from 'react-native';

import {Feather as Icon} from '@expo/vector-icons'
import * as InAppPurchases from 'expo-in-app-purchases'

export default class BuyModal extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    buyItem = async(type) => {
        // Itemlist
        const items = Platform.select({
            ios: ['dev.products.premium'],
            android: ['premium'],
        });
        
        // Get all Products
        const { responseCode, results } = await InAppPurchases.getProductsAsync(items);
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
            // setIcons({ items: results });
            console.log(results)
            // To replace an existing subscription on Android
            await InAppPurchases.purchaseItemAsync(items[type]);
            this.props.navigation.goBack()
        } else {
            console.log("Cant find item")
        }    
    }
    

    render() {
        const screenHeight = Math.round(Dimensions.get('window').height);
        return (
                <View style={styles.safeArea}>
                    <View style={{marginTop: 50}}>
                        <ImageBackground
                            style={[styles.headerImage]}
                            resizeMode="contain"
                            source={require("../../assets/meditate.png")}
                        >
                            <TouchableOpacity
                            hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
                            onPress={() => this.props.navigation.goBack()}>
                                <Icon name="x" size={27} color="#5A6174" />
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>

                    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={[styles.container, {height: (screenHeight - 120)}]}>
                        <View style={{borderBottomWidth: 1, alignItems: "center", paddingBottom: 3, paddingTop: 14, borderBottomColor: "#413d45"}}>
                            <Text style={styles.h1}>Breakup-Programm</Text>
                        </View>
                            <Text style={styles.h2}>29,99 € <Text style={styles.h3}>(einmalig)</Text></Text>

                                {/* Vorteile von EyeYoga */}
                                <View style={{marginBottom: 35, alignItems: "flex-start"}}>
                                    <View style={styles.proArgument}>
                                        <View style={styles.iconWrapper}>
                                            <Icon name="check" size={24} color="#77C79F" />
                                        </View>
                                        <View>
                                            <Text numberOfLines={3} style={styles.proText}>Ungebgrenzter Zugang zum gesamten Breakup Programm</Text>
                                        </View>
                                    </View>
                                    <View style={styles.proArgument}>
                                        <View style={styles.iconWrapper}>
                                            <Icon name="check" size={24} color="#77C79F" />
                                        </View>
                                        <View>
                                            <Text numberOfLines={3} style={styles.proText}>Schnelle Hilfen zu Themen wie Traurigkeit, Motivation, Kummer und mehr</Text>
                                        </View>
                                    </View>
                                    <View style={styles.proArgument}>
                                        <View style={styles.iconWrapper}>
                                            <Icon name="check" size={24} color="#77C79F" />
                                        </View>
                                        <View>
                                            <Text numberOfLines={3} style={styles.proText}>Breakup - Lass uns zusammen deine Trennung überstehen!</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Buyoptions */}
                                <View style={{flex: 1, justifyContent: "flex-start"}}>
                                    <TouchableWithoutFeedback style={{alignItems: "center", justifyContent: "center"}} onPress={() => this.buyItem(0)}>
                                        <View style={[styles.shadow]}>
                                            <View style={[styles.buyButton, styles.shadow]}>
                                                <Text style={styles.btnTxt}>Jetzt freischalten</Text>
                                                <Icon name="chevron-right" size={23} color="#f9f7f3" />
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                            <View style={{marginBottom: 70, alignItems: "center", alignSelf: "center"}}>
                                <TouchableOpacity onPress={() => {this.props.navigation.navigate("LawWebsite", {type: "datenschutz"})}}> 
                                    <Text style={[styles.agb, {marginTop: 12}]}>Datenschutzbestimmungen</Text>
                                </TouchableOpacity>

                                <View style={{flexDirection: "row", justifyContent: "center"}}>
                                    <TouchableOpacity onPress={() => {this.props.navigation.navigate("LawWebsite", {type: "impressum"})}}>
                                        <Text style={[styles.agb, {marginRight: 15}]}>Impressum</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {this.props.navigation.navigate("LawWebsite", {type: "agb"})}}>
                                        <Text style={styles.agb}>AGB</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </View>
                </ScrollView>
                <View style={[styles.downIcon, {zIndex: 120, elevation: 120, right: 20,top: (screenHeight-70)}]}>
                    {/* <View style={[styles.downIcon, {bottom: 10}]}> */}
                    <Icon name="chevrons-down" size={28} color="#5A6174" />
                </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        marginHorizontal: 20,
        flex: 1,
        alignItems: "center"
        // marginTop: Platform.OS === 'android' ? 25 : 50,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 18,
        marginTop: Platform.OS === 'android' ? 25 : 40,
        // position: "absolute",
    },
    headline: {
        fontSize: 28,
        color: "#5A6176",
        marginBottom: 7
    },
    proArgument: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 15,
        marginHorizontal: 26
    },
    buyWrapper: {
        borderRadius: 8,
        backgroundColor: "#5A6175",
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    downIcon: {
        alignSelf: "flex-end",
        position: "absolute"
    },
    unlockWrapper: {
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#77C79F",
        backgroundColor: "#77C79F",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 15
    },
    unlockTxt: {
        fontSize: 14,
        color: "#fff",
        textTransform: "uppercase",
        letterSpacing: 1
    },
    buyoptionTxt: {
        color: "#fff",
        fontSize: 16,
    },
    iconWrapper: {
        marginRight: 6,
        // justifyContent: "center"
    },
    proText: {
        fontSize: 16,
        lineHeight: 21
        // color: "#fff",
    },
    bestPrice: {
        color: "#fff",
        fontSize: 11,
        letterSpacing: 1,
        textTransform: "uppercase"
    },
    price: {
        color: "#fff"
    },
    logoWrapper: {
        alignItems: "flex-start",
        justifyContent: "center",
        left: 20
    },
    rechtliches: {
        marginHorizontal: 10,
        fontSize: 11,
        marginBottom: 15,
    },
    agb: {
        textTransform: "uppercase",
        marginBottom: 18,
        fontWeight: "bold",
        color: "#413d45",
        fontSize: 13,
        textTransform: "uppercase"
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
        // alignItems: "center",
        marginBottom: 10,
        marginTop: 18
    },
    logo: {
        fontSize: 26,
        // paddingHorizontal: 27,
        marginBottom: 17,
        color: "#3a3938"
    },
    headerImage: {
        width: "100%",
        height: 210,
        zIndex: 1,
        overflow: "hidden",
        borderRadius: 8,
        alignItems: "flex-end",
        paddingRight: 20,
        paddingTop: 5
    },
    h1: {
        color: "#413d45",
        fontSize: 20,
        fontWeight: "bold"
    },
    buyButton: {
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: "#5A6176",
        paddingVertical: 11.5,
        paddingHorizontal: 25,
        marginTop: 15,
        justifyContent: "space-between"
    },
    btnText: {
        color: "#fff",
        fontSize: 14,
        letterSpacing: 3,
        textTransform: "uppercase"
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
    btnTxt: {
        textTransform: "uppercase",
        color: "#f9f7f3",
        // paddingLeft: 5,
        fontWeight: "bold",
        fontSize: 14.5
    },
    h2: {
        color: "#413d45",
        textAlign: "center",
        fontSize: 25,
        marginBottom: 25 ,
        marginTop: 2
    },
    h3: {
        fontSize: 14
    }
});