import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import WeekPreview from '../components/WeekPreview'
import programm from '../data/programm.json'

export default function ProgrammScreen(props) {
    const [currentExercise, setCurrentExercise ] = useState(4)

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Image */}
                <Image
                    style={styles.headerImage}
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                />

                <View style={styles.content}>
                    <Text style={styles.headline}>Dein Programm</Text>

                    <View>
                        <View style={styles.pathLine}></View>
                        {
                            programm.map((week) => {
                                return <View key={week.id} style={{marginTop: 25}}><WeekPreview
                                            week={week.week}
                                            id={week.id}
                                            description={week.description}
                                            currentExercise={currentExercise}
                                            totalExercise={week.lessons.length}
                                            lessons={week.lessons}
                                            navigation={props.navigation}
                                        /></View>
                            })
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ededed',
      marginBottom: 50,
    },
    headerImage: {
        width: "100%",
        height: 230,
    },
    headline: {
        color: "#2a9184",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10
    },
    content: {
        marginTop: 30
    },
    pathLine: {
        width: 7,
        backgroundColor: "#64696c",
        height: "100%",
        position: "absolute",
        left: "49%"
    }
  });
