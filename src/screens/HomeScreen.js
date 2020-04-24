import React from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import LessonPreview from '../components/LessonPreview'
import helpLessons from '../data/help.json'

export default function HomeScreen(props) {
    return (
            <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
                <Text style={styles.logo}>Breakup</Text>

                {/* Next Lesson */}
                <View style={{paddingHorizontal: 27}}>
                    <ImageBackground
                        style={styles.headerImage}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                    >
                        <View style={styles.infoWrapper}>
                            <Text numberOfLines={1} style={styles.h1}>Tag X: Headline aeuhöfdf öahöfaihf asiufdshödi</Text>
                            <Text numberOfLines={3} style={styles.subh1}>Lerne alle wichtigen Grundlagen, um direkt wixxen zu können. fhöafuhadöf adsköfsdhfös sdihfsöjdhfös kjdskdjfaöksdjf kajdsöflajdskfjsdöfsdhfösjdhfösd sjdöhfsjdhf sdjhfsjkdhflksa </Text>
                        </View>
                    </ImageBackground>

                    <TouchableWithoutFeedback onPress={() => console.log("Lets go")}>
                        <View style={styles.btnWrapper}>
                            <View style={styles.btn}>
                                <Icon name={"play"} size={24} color={"#fefffe"} />
                                <Text style={styles.btnTxt}>Programm fortsetzen</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* Empfehlungen */}
                <View style={styles.suggestions}>
                    <Text style={styles.suggestionsTxt}>Empfehlungen für dich</Text>
                    <LessonPreview 
                        key={helpLessons[0].id}
                        id={helpLessons[0].lessons[0].id}
                        free={helpLessons[0].lessons[0].free}
                        headline={helpLessons[0].lessons[0].headline}
                        description={helpLessons[0].lessons[0].description}
                        currentExercise={100}
                        navigation={props.navigation}
                        weekId={helpLessons[0].id}
                    />
                    <LessonPreview 
                        key={helpLessons[1].id}
                        id={helpLessons[1].lessons[0].id}
                        free={helpLessons[1].lessons[0].free}
                        headline={helpLessons[1].lessons[0].headline}
                        description={helpLessons[1].lessons[0].description}
                        currentExercise={100}
                        navigation={props.navigation}
                        weekId={helpLessons[1].id}
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

                        <TouchableWithoutFeedback onPress={() => console.log("buy")}>
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
      backgroundColor: '#fff',
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
    infoWrapper: {
        marginLeft: "10%",
        marginRight: "25%",
        justifyContent: "center",
        flex: 1,
        paddingTop: 10
    },
    logo: {
        fontSize: 24,
        marginBottom: 16
    },
    h1: {
        color: "#fff",
        fontSize: 20
    },
    subh1: {
        color: "#fff"
    },
    profileImage: {
       height: 100,
       width: 100 ,
       borderRadius: 100,
       marginTop: -30
    },
    aboutContainer: {
        alignItems: "center",
        backgroundColor: "grey",
        paddingHorizontal: 27,
        marginTop: 40,
        paddingTop: 25,
    },
    aboutInnerContainer: {
        alignItems: "center",
        backgroundColor: "#eee",
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
        marginBottom: 15,
        textTransform: "uppercase",
        color: "grey"
    },
    buyContainer: {
        alignItems: "center",
        backgroundColor: "grey",
        paddingHorizontal: 27,
        marginTop: 40,
        paddingTop: 25,
    },
    buyInnerContainer: {
        backgroundColor: "#eee",
        borderRadius: 5,
        paddingHorizontal: "8%",
        marginTop: 50,
        marginBottom: 40,
        paddingBottom: 20
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
    }
  });
