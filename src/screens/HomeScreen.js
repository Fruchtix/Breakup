import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import LessonPreview from '../components/LessonPreview'
import helpLessons from '../data/help.json'
import programm from '../data/programm.json'
import * as firebase from 'firebase'
import 'firebase/firestore'

/*
    Progress bar
    Profile Page
*/

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
        let two = Math.round(Math.random() * 1)
        let three = Math.round(Math.random() * 1)
        let four = Math.round(Math.random() * 1)

        if(four === two) {
            four = Math.round(Math.random() * 1)
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
                <Text style={styles.logo}>Breakup</Text>

                {/* Next Lesson */}
                <View style={{paddingHorizontal: 27}}>
                    <ImageBackground
                        style={styles.headerImage}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                    >
                        <View style={styles.infoWrapper}>
                            <Text numberOfLines={1} style={styles.h1}>Tag {currentExercise+1}: {programm[currentWeek].lessons[currentExercise].headline}</Text>
                            <Text numberOfLines={3} style={styles.subh1}>{programm[currentWeek].lessons[currentExercise].description}</Text>
                        </View>
                    </ImageBackground>

                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("ProgrammScreen")}>
                        <View style={styles.btnWrapper}>
                            <View style={styles.btn}>
                                <Icon name={"play"} size={24} color={"#fefffe"} />
                                <Text style={styles.btnTxt}>Programm fortsetzen</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* Tage seit Trennung */}
                <View style={{paddingHorizontal: 27, marginTop: 30}}>
                    <Text style={[styles.suggestionsTxt, {marginBottom: 12}]}>Aktuelle Informationen</Text>
                    <ImageBackground
                        style={styles.daysImage}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                    >
                        <View style={styles.breakupDaysContainer}>
                            <Text style={styles.daysH1}>{breakupDate-1} Tage</Text>
                            <Text style={styles.daysH2}>seit Trennung</Text>
                        </View>
                    </ImageBackground>
                </View>

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
                    />
                    <LessonPreview 
                        id={helpLessons[randomThree].lessons[randomFour].id}
                        free={helpLessons[randomThree].lessons[randomFour].free}
                        headline={helpLessons[randomThree].lessons[randomFour].headline}
                        description={helpLessons[randomThree].lessons[randomFour].description}
                        currentExercise={100}
                        navigation={props.navigation}
                        weekId={helpLessons[randomThree].id}
                    />
                </View>

                {/* About */}
                <View style={styles.aboutContainer}>
                    <Text style={styles.abouth1}>Über Breakup</Text>

                    <View style={styles.aboutInnerContainer}>
                        <Image
                            style={styles.profileImage}
                            source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                        />
                        <Text style={styles.abouth2}>Prof. Dr. Breakup</Text>
                        <Text style={[styles.aboutTxt, {marginBottom: 11}]}>Breakup ist eine wirklich tolle app, das musst du jetzt einfach glauben! Bitte gib mir dein Geld, Danke!</Text>
                        <Text style={styles.aboutTxt}>Der Wunsch deine Trennung zu heilen ist fucking groß. Also worauf waretst du?! Kauf dir jetzt alles und morgen bist du wieder die Glücklichkeit in Person. Dafür stehe ich mit meinem Namen, 'Herr Breakup'.</Text>
                    </View>
                </View>

                {/* Buy */}
                <View style={styles.buyContainer}>
                    <View style={styles.buyInnerContainer}>
                        <Text style={styles.buyTxt}>Dein Erfolgsprogramm</Text>

                        <View style={styles.proPoint}>
                            <Icon name="check" size={24} color="green" />
                            <Text style={styles.proPointTxt}>7-Wochen Anti-Liebeskummer Programm</Text>
                        </View>

                        <View style={styles.proPoint}>
                            <Icon name="check" size={24} color="green" />
                            <Text style={styles.proPointTxt}>Mer als 400 Minuten Hörspaß und viele Tipps um deinen liebeskummer schnell zu überstehen.</Text>
                        </View>

                        <View style={styles.proPoint}>
                            <Icon name="check" size={24} color="green" />
                            <Text style={styles.proPointTxt}>7-Wochen Anti-Liebeskummer Programm</Text>
                        </View>

                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate("BuyModal")}>
                            <View style={styles.registerBtnContainer}>
                                <View style={[styles.shadow,styles.registerBtn]}>
                                    <Text style={styles.registerTxt}>Will ich haben</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={styles.sign}>
                            <Text>Unterschrift</Text>
                        </View>

                    </View>


                </View>

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fefffe',
      paddingTop: 40,
    },
    btn: {
        borderRadius: 16,
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#7e004c",
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 7
    },
    btnWrapper: {
        alignItems: "center",
        overflow: "hidden",
        marginTop: -20
    },
    btnTxt: {
        textTransform: "uppercase",
        color: "#fefffe",
        paddingLeft: 5
    },
    headerImage: {
        width: "100%",
        height: 200,
        borderRadius: 5,
        overflow: "hidden"
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
        fontSize: 24,
        paddingHorizontal: 27,
        marginBottom: 16
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
        backgroundColor: "#ededed",
        paddingHorizontal: 27,
        marginTop: 40,
        paddingTop: 25,
    },
    aboutInnerContainer: {
        alignItems: "center",
        backgroundColor: "#fefffe",
        borderRadius: 5,
        paddingHorizontal: "8%",
        marginTop: 50,
        marginBottom: 50,
        paddingBottom: 20
    },
    aboutTxt: {
        textAlign: "center"
    },
    abouth2: {

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
    buyContainer: {
        alignItems: "center",
        backgroundColor: "#2a9184",
        paddingHorizontal: 27,
        // marginTop: 40,
        paddingTop: 25,
        overflow: "hidden"
    },
    buyInnerContainer: {
        backgroundColor: "#fefffe",
        borderRadius: 5,
        paddingHorizontal: "8%",
        marginTop: 50,
        marginBottom: 40,
        paddingBottom: 20,
        overflow: "hidden"

    },
    proPoint: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    buyTxt: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 20
    },
    proPointTxt: {
        marginLeft: 8
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
        flex: 1
    }
  });
