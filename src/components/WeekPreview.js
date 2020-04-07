import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import LessonPreview from './LessonPreview'

export default function WeekPreview(props) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={[styles.container, styles.shadow]}>
                <Text>Woche {props.week}</Text>
                <Text>{props.description}</Text>

                {showDetails ? 
                <View style={{marginTop: 30}}>
                    {
                        props.lessons.map((lesson, index) => {
                            return <LessonPreview 
                                        key={index}
                                        id={lesson.id}
                                        weekId={props.id}
                                        free={lesson.free}
                                        headline={lesson.headline}
                                        description={lesson.description}
                                        currentExercise={props.currentExercise}
                                        navigation={props.navigation}
                                    />
                        })
                    }
                </View> 
                : null }

                <View style={{alignItems: "center"}}>
                    <Text>{props.currentExercise}/{props.totalExercise} Abgeschlossen</Text>
                </View>

                <View style={{position: "absolute", right: 12, bottom: 12}}>
                    <TouchableWithoutFeedback hitSlop={{top: 10,right: 10,left: 10,bottom: 10}} onPress={() => setShowDetails(!showDetails)}>
                        <Icon name={showDetails ? "chevron-up" : "chevron-down"} size={26} />
                    </TouchableWithoutFeedback>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fefffe",
        padding: 15,
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
    }
  });
