  
import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Modal, Platform, Dimensions,ImageBackground } from 'react-native';

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
                {/* <ImageBackground blurRadius={0.1} source={{uri: "https://cdn.pixabay.com/photo/2017/01/24/03/53/plant-2004483_960_720.jpg"}} style={{width: '100%', height: '100%'}}> */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name="x" size={25} color="#5A6174" />
                        </TouchableOpacity>
                    </View>

                    {/* Logo */}
                    <View style={styles.logoWrapper}>
                        <Text style={styles.logo}>Break/<Text style={{color: "#f47d31"}}>up</Text></Text>
                    </View>

                    <View style={styles.container}>


                        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>

                            <Text>Breakup-Programm</Text>
                            <Text>39,99 €</Text>
                            <Text>(einmalig)</Text>

                            <View style={{height: (screenHeight - 160)}}>
                                {/* Vorteile von EyeYoga */}
                                <View style={{marginBottom: 35}}>
                                    <View style={styles.proArgument}>
                                        <View style={styles.iconWrapper}>
                                            <Icon name="check" size={24} color="#77C79F" />
                                        </View>
                                        <View>
                                            <Text style={styles.proText}>Ungebgrenzter Zugang zum gesamten</Text>
                                            <Text style={styles.proText}>EyeYoga Archiv</Text>
                                        </View>
                                    </View>
                                    <View style={styles.proArgument}>
                                        <View style={styles.iconWrapper}>
                                            <Icon name="check" size={24} color="#77C79F" />
                                        </View>
                                        <View>
                                            <Text style={styles.proText}>Kurse zu Themen wie Augentraining,</Text>
                                            <Text style={styles.proText}>Entspannung, trockene Augen und mehr</Text>
                                        </View>
                                    </View>
                                    <View style={styles.proArgument}>
                                        <View style={styles.iconWrapper}>
                                            <Icon name="check" size={24} color="#77C79F" />
                                        </View>
                                        <View>
                                            <Text style={styles.proText}>EyeYoga - Lass uns zusammen deine Augen</Text>
                                            <Text style={styles.proText}>verbessern!</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Buyoptions */}
                                <View style={{flex: 1, justifyContent: "flex-start"}}>
                                    <TouchableOpacity onPress={() => this.buyItem(0)}>
                                        <View style={styles.registerBtnContainer}>
                                            <View style={[styles.shadow,styles.registerBtn]}>
                                                <Text style={styles.registerTxt}>Will ich haben</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
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

                        </ScrollView>

                        <View style={[styles.downIcon, {marginTop: (screenHeight-140)}]}>
                            <Icon name="chevrons-down" size={28} color="#333" />
                        </View>

                    </View>
                {/* </ImageBackground> */}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20
    },
    container: {
        marginHorizontal: 20,
        flex: 1,
        // marginTop: Platform.OS === 'android' ? 25 : 50,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 18,
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
        marginBottom: 15
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
        justifyContent: "flex-start",
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
        fontSize: 13,
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
});