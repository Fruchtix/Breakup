import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import LessonPreview from './LessonPreview'
import * as firebase from 'firebase'
import 'firebase/firestore'
import * as Progress from 'react-native-progress';
import Download from '../components/Download'

export default function WeekPreview(props) {
    const [showDetails, setShowDetails] = useState(false)
    const [currentExercise, setcurrentExercise] = useState(0)

    useEffect(() => {
        reload()
    })

    const reload = () => {
        //Von Firebase aktuelle Exercise holen
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("Courses").doc(`${props.week-1}`).get()
            .then((doc) => {
                if (doc.exists) {
                    setcurrentExercise(doc.data().currentExercise)
                } else {
                    setcurrentExercise(0)
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
    }

    return (
        <View style={[styles.container, styles.shadow]}>
            <View style={{paddingHorizontal: 15, paddingBottom: 10}}>
                <Text style={styles.h1}>Woche {props.week}</Text>
                <Text style={styles.h2}>{props.description}</Text>

                {showDetails ? 
                <View>
                    <View style={{marginTop: 5}}>
                        <Download week={props.week} count={props.totalExercise} />
                    </View>

                    <View style={{marginTop: 20}}>
                        {
                            props.lessons.map((lesson, index) => {
                                return <LessonPreview 
                                            key={index}
                                            id={lesson.id}
                                            weekId={props.id}
                                            free={lesson.free}
                                            headline={lesson.headline}
                                            description={lesson.description}
                                            currentExercise={currentExercise+1}
                                            navigation={props.navigation}
                                            reload={() => reload()}
                                            premium={props.premium}
                                        />
                            })
                        }
                    </View> 
                </View>
                : null }

                <View style={{alignItems: "center", marginTop: 15}}>
                    <Text style={currentExercise > 0 ? [styles.doneCount,{color: "#3a3938"}] : styles.doneCount}>{currentExercise > props.totalExercise ? props.totalExercise : currentExercise}/{props.totalExercise} Abgeschlossen</Text>
                </View>

                <View style={{position: "absolute", right: 10, bottom: 7}}>
                    <TouchableWithoutFeedback hitSlop={{top: 10,right: 10,left: 10,bottom: 10}} onPress={() => setShowDetails(!showDetails)}>
                        <Icon name={showDetails ? "chevron-up" : "chevron-down"} size={26} color="#5A6176" />
                    </TouchableWithoutFeedback>
                </View>
            </View>

                <View>
                    <Progress.Bar color={"#77c79f"} borderWidth={0} unfilledColor={"#ebe8e4"} progress={currentExercise > props.totalExercise ? 1 : currentExercise/props.totalExercise} width={null} height={12} borderRadius={0} />
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fefffe",
        paddingTop: 15,
        overflow: "hidden",
        marginHorizontal: "10%",
        borderRadius: 8
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
    doneCount: {
        color: "#666"
    },
    h1: {
        marginBottom: 3,
        color: "#3a3938",
        fontSize: 17,
        fontFamily: Platform.OS === "android" ? "Roboto-Medium" : "Roboto-Medium"
    },
    h2: {
        color: "#444",
        fontSize: 14
    }
  });
