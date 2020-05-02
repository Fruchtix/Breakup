import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableWithoutFeedback, Image, Platform, Dimensions } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import LessonPreview from '../components/LessonPreview'
import helpLessons from '../data/help.json'
import programm from '../data/programm.json'
import * as firebase from 'firebase'
import 'firebase/firestore'


export default function HomeScreen(props) {
    const [currentExercise, setcurrentExercise] = useState(0)
    const [currentWeek, setcurrentWeek] = useState(0)
    const [randomOne, setRandomOne] = useState(0)
    const [randomTwo, setRandomeTwo] = useState(0)
    const [randomThree, setRandomeThree] = useState(0)
    const [randomFour, setRandomeFour] = useState(0)
    const [breakupDate, setBreakupDate] = useState(null)

    useEffect(() => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("History").doc("lastCourse").get()
            .then((doc) => {
                if (doc.exists) {
                    setcurrentExercise(doc.data().currentLesson)
                    setcurrentWeek(doc.data().currentCourse)
                } else {
                    setcurrentExercise("7")
                    setcurrentWeek("7")
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    const ok = parseDate(doc.data().breakupDate)
                    setBreakupDate(DifferenceInDays(ok, new Date()))
                } else {
                    console.log("error")
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

        let one = Math.round(Math.random() * 1)
        let two = Math.round(Math.random() * 3)
        let three = Math.round(Math.random() * 1)
        let four = Math.round(Math.random() * 3)

        if(four === two) {
            four = Math.round(Math.random() * 3)
        }
        
        setRandomOne(one)  
        setRandomeTwo(two)  
        setRandomeThree(three)  
        setRandomeFour(four)  
    }, [])

    function parseDate(str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[1]-1, mdy[0]);
    }

    function DifferenceInDays(firstDate, secondDate) {
        return Math.round((secondDate-firstDate)/(1000*60*60*24));
    }

    return (
            <ScrollView style={{backgroundColor: "#fefffe", paddingTop: 25}} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
                <Text style={styles.logo}>Break/<Text style={{color: "#f47d31"}}>up</Text></Text>

                {/* Next Lesson */}
                <View style={{marginHorizontal: 23}}>
                    <View style={[ {padding: 5, borderRadius: 8, marginBottom: 35, overflow: "hidden"}, styles.shadow]}>
                        <ImageBackground
                            style={[styles.headerImage]}
                            resizeMode="cover"
                            source={require("../../assets/meditate.png")}
                        >
                        </ImageBackground>
                    </View>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("ProgrammScreen")}>
                        <View style={[styles.btnWrapper, {top: 190, elevation: 10}]}>
                            <View style={[styles.btn, styles.shadow]}>
                                <Icon name={"play"} size={24} color={"#f9f7f3"} />
                                <Text style={styles.btnTxt}>Programm {currentExercise === 0 || currentWeek === 1 ? "starten" : "fortsetzen"}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* Tage seit Trennung */}
                {/* <View style={{paddingHorizontal: 27, marginTop: 30}}>
                    <Text style={[styles.suggestionsTxt, {marginBottom: 6}]}>Dein Fortschritt</Text>
                        <View style={styles.breakupDaysContainer}>
                            <Text style={styles.daysH1}>{breakupDate} Tage seit letztem Kontakt</Text>
                            <Text style={styles.daysH1}>-</Text>
                            <Text style={styles.daysH1}>{breakupDate} Tage seit Trennung</Text>
                        </View>
                </View> */}

                {/* Empfehlungen */}
                <View style={styles.suggestions}>
                    <Text style={[styles.suggestionsTxt, {marginBottom: 15}]}>Empfehlungen für dich</Text>
                    <LessonPreview 
                        id={helpLessons[randomOne].lessons[randomTwo].id}
                        free={helpLessons[randomOne].lessons[randomTwo].free}
                        headline={helpLessons[randomOne].lessons[randomTwo].headline}
                        description={helpLessons[randomOne].lessons[randomTwo].description}
                        currentExercise={100}
                        navigation={props.navigation}
                        weekId={helpLessons[randomOne].id}
                        premium={props.screenProps.premium}
                    />
                    <LessonPreview 
                        id={helpLessons[randomThree].lessons[randomFour].id}
                        free={helpLessons[randomThree].lessons[randomFour].free}
                        headline={helpLessons[randomThree].lessons[randomFour].headline}
                        description={helpLessons[randomThree].lessons[randomFour].description}
                        currentExercise={100}
                        navigation={props.navigation}
                        weekId={helpLessons[randomThree].id}
                        premium={props.screenProps.premium}
                    />
                </View>

                {/* About */}
                <View style={styles.aboutContainer}>
                    <Text style={[styles.abouth1, styles.suggestionsTxt]}>Über Breakup</Text>

                    <View style={styles.aboutInnerContainer}>
                        <Image
                            style={styles.profileImage}
                            resizeMode="cover"
                            source={require("../../assets/women.png")}
                        />
                        <Text style={styles.abouth2}>Prof. Dr. Breakup</Text>
                        <Text style={[styles.aboutTxt, {marginBottom: 11}]}>Breakup ist eine wirklich tolle app, das musst du jetzt einfach glauben! Bitte gib mir dein Geld, Danke!</Text>
                        <Text style={styles.aboutTxt}>Der Wunsch deine Trennung zu heilen ist fucking groß. Also worauf waretst du?! Kauf dir jetzt alles und morgen bist du wieder die Glücklichkeit in Person. Dafür stehe ich mit meinem Namen, 'Herr Breakup'.</Text>

                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate("PlayLessonScreen", {id: 0,weekId: 999, headline: "Wilkommen bei Breakup"})}>
                            <View style={{paddingTop: 25, marginBottom: 12, borderBottomColor: "#f47d31", borderBottomWidth: 1}}>
                                <Text style={styles.welcometxt}>Wilkommens-Audio anhören</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>


                <View style={styles.buyWrapper}>
                    <Text style={styles.headline}>Breakup Programm</Text>
                    <Text style={styles.headline}>{props.screenProps.premium ? "freigeschaltet" : "freischalten"}</Text>

                    <ImageBackground style={{flex: 1, height: "100%",width: "100%"}} resizeMode="contain" source={require("../../assets/friends.png")}>
                        {/* Buy Button */}
                        <TouchableWithoutFeedback style={{alignSelf: "center"}} onPress={() => {props.screenProps.premium ? props.navigation.navigate("ProgrammScreen") : props.navigation.navigate("BuyModal")}}>
                            <View style={[styles.buyButton, styles.shadow]}>
                                <Text style={styles.btnTxt}>{props.screenProps.premium ? "Zum Programm" : "Jetzt freischalten"}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ImageBackground>
                </View>

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fefffe',
      paddingTop: 28,
    },
    btn: {
        borderRadius: 20,
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#586077",
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 9
    },
    btnWrapper: {
        zIndex: 100,
        alignItems: "center",
        overflow: "hidden",
        position: "absolute",
        padding: 10,
        alignSelf: "center"
    },
    btnTxt: {
        textTransform: "uppercase",
        color: "#f9f7f3",
        paddingLeft: 5,
        fontWeight: "bold"
    },
    headerImage: {
        width: "100%",
        height: 210,
        zIndex: 1,
        overflow: "hidden",
        borderRadius: 8
        // borderWidth: 1,
        // borderColor: "#f47d31",
    },
    buyImage: {
        width: "100%",
        height: 210,
    },
    daysImage: {
        width: "100%",
        height: 200,
        overflow: "hidden",
    },
    infoWrapper: {
        marginLeft: "10%",
        marginRight: "25%",
        justifyContent: "center",
        flex: 1,
        paddingTop: 10
    },
    logo: {
        fontSize: 26,
        paddingHorizontal: 27,
        marginBottom: 17,
        color: "#3a3938"
    },
    h1: {
        color: "#fefffe",
        fontSize: 20
    },
    subh1: {
        color: "#fefffe"
    },
    profileImage: {
       height: 100,
       width: 100 ,
       borderRadius: 100,
       marginTop: -30
    },
    aboutContainer: {
        alignItems: "center",
        // backgroundColor: "#f4e6d4",
        backgroundColor: "#faf7f2",
        paddingHorizontal: 27,
        marginTop: 40,
        paddingTop: 35,
    },
    aboutInnerContainer: {
        alignItems: "center",
        backgroundColor: "#fefffe",
        borderRadius: 5,
        paddingHorizontal: "8%",
        marginTop: 44,
        marginBottom: 40,
        paddingBottom: 20
    },
    aboutTxt: {
        textAlign: "center"
    },
    abouth2: {
        marginTop: 10,
        marginBottom: 10
    },
    abouth1: {

    },
    suggestions: {
        paddingHorizontal: 27,
        marginTop: 40
    },
    suggestionsTxt: {
        textAlign: "center",
        textTransform: "uppercase",
        color: "grey"
    },
    // buyWrapper: {
    //     marginTop: 30,
    //     alignItems: "center",
    //     marginBottom: 40
    // },
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
    sign: {
        height: 115
    },
    daysH1: {
        color: "#fefffe",
        fontSize: 20
    },
    daysH2: {
        color: "#fefffe",
        fontSize: 20

    },
    breakupDaysContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        // backgroundColor: "#2a9d8f",
        height: 175
    },
    welcometxt: {
        textTransform: "uppercase",
        color: "#f47d31",
    },
    buyTxt: {
        fontSize: 20,
        marginBottom: 20
    },
    buyWrapper: {
        height: 350,
        backgroundColor: "#fefffe",
        alignItems: "center",
        paddingTop: 25,
    },
    buyButton: {
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        flexDirection: "row",
        backgroundColor: "#5A6176",
        paddingHorizontal: 25,
        marginTop: 15,
        alignSelf: "center"
    },
    btnText: {
        color: "#fff",
        fontSize: 14,
        letterSpacing: 3,
        textTransform: "uppercase"
    },
    headline: {
        fontSize: 21,
        color: "#5A6176",
        lineHeight: 32,
    },
    ios: {
        overflow: "hidden"
    }
  });
