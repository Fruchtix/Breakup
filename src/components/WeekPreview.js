import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import LessonPreview from './LessonPreview'

export default function WeekPreview(props) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={[styles.container, styles.shadow]}>
            <ScrollView>
                <Text>Woche {props.week}</Text>
                <Text>Jetzt loslegen!</Text>
                <Text>{props.description}</Text>

                {showDetails ? 
                <View style={{marginTop: 30}}>
                    <LessonPreview 
                        headline={"later ändern"}
                        description={"later ändern desc"}
                    />
                </View> 
                : null }

                <View style={{alignItems: "center"}}>
                    <Text>{props.currentExercise}/{props.totalExercise} Abgeschlossen</Text>
                </View>

                <View style={{position: "absolute", right: 0, bottom: -4}}>
                    <TouchableWithoutFeedback hitSlop={{top: 10,right: 10,left: 10,bottom: 10}} onPress={() => setShowDetails(!showDetails)}>
                        <Icon name={showDetails ? "chevron-up" : "chevron-down"} size={26} />
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fefffe",
        padding: 10,
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
