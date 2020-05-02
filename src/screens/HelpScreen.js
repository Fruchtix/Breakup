import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, Platform } from 'react-native'
import helpLessons from '../data/help.json'
import LessonPreview from '../components/LessonPreview'

export default function HelpScreen(props) {
    return (
        <ScrollView style={{backgroundColor: "#fefffe"}} showsVerticalScrollIndicator={false} >
            <View style={styles.container}>
                {/* Image */}
                <ImageBackground
                    style={styles.headerImage}
                    source={require("../../assets/medicine.png")}
                >
                    <View style={styles.infoWrapper}>
                        <View style={[styles.infoInnerWrapper, styles.shadow]}>
                            <Text style={styles.h1}>Schnelle Hilfen</Text>
                            <Text style={styles.subh1}>Alles was inspiriert,</Text>
                            <Text style={styles.subh1}>motiviert und die</Text>
                            <Text style={styles.subh1}>Trennung erleichtert.</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.content}>
                    {
                        helpLessons.map((subject) => {
                            return <View key={subject.id}>
                                        <Text style={styles.subject}>{subject.subject}</Text>
                                        {
                                            subject.lessons.map((lesson) => {
                                                return <LessonPreview 
                                                            key={lesson.id}
                                                            id={lesson.id}
                                                            free={lesson.free}
                                                            headline={lesson.headline}
                                                            description={lesson.description}
                                                            currentExercise={100}
                                                            navigation={props.navigation}
                                                            weekId={subject.id}
                                                            premium={props.screenProps.premium}
                                                        />
                                            })
                                        }
                                    </View>
                        })
                    }
                </View>
            </View>
        </ScrollView>    
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 50,
      backgroundColor: '#faf7f2',
    },
    headerImage: {
        width: "100%",
        height: 300,
        marginBottom: 25
    },
    infoWrapper: {
        marginTop: Platform.OS === "ios" ? 60 : 45,
        marginLeft: "10%",
        alignItems: "flex-start"
    },
    infoInnerWrapper: {
        padding: 8,
        backgroundColor: "#5a5857",
        borderRadius: 8,
        opacity: 0.9
    },
    h1: {
        color: "#fefffe",
        fontSize: 22,
        marginBottom: 5
    },
    subh1: {
        color: "#fefffe",
        fontSize: 15
    },
    content: {
        marginHorizontal: "10%",
    },
    subject: {
        marginBottom: 5,
        fontSize: 20
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
  });
