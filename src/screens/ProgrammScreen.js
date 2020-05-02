import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native'
import WeekPreview from '../components/WeekPreview'
import programm from '../data/programm.json'
import LinearGradient from "react-native-linear-gradient";

export default function ProgrammScreen(props) {
    const [currentExercise, setCurrentExercise ] = useState(4)

    return (
        <LinearGradient colors={[
            "#fefffe",
            "green"
          ]}>
        <ScrollView style={{backgroundColor: "#fefffe"}} showsVerticalScrollIndicator={false} >
            <View style={styles.container}>
                {/* Image */}
                <View style={styles.imageWrapper}>
                    <Image
                        style={styles.headerImage}
                        source={require("../../assets/meditate.png")}
                        resizeMode="cover"
                    />
                </View>

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
                                            premium={props.screenProps.premium}
                                        /></View>
                            })
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#faf7f2",
      paddingBottom: 50,
    },
    headerImage: {
        width: "100%",
        height: 230,
        marginTop: Platform.OS === "ios" ? 50 : 35
    },
    imageWrapper: {
        backgroundColor: "#fff",
    },
    headline: {
        color: "#3a3938",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10
    },
    content: {
        marginTop: 30
    },
    pathLine: {
        width: 7,
        backgroundColor: "#5A6176",
        height: "100%",
        position: "absolute",
        left: "49%"
    }
  });
