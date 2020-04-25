import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import Svg, { Circle, Polygon } from 'react-native-svg'

export default function LessonPreview(props) {
    return (
        <View style={styles.container}>
            <View style={{maxWidth: "80%"}}>
                <Text>{props.headline}</Text>
                <Text>{props.description}</Text>
            </View>
            {
                props.free ?  /* oder premium */
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("PlayLessonScreen", {headline: props.headline, description: props.description, id: props.id, weekId: props.weekId, reload: () => props.reload()})}>
                    <View style={styles.shadow}>
                        {
                            props.currentExercise > props.id ?
                            <Svg height={40} width={40}>
                                <Circle cx="20" cy="20" r="18" fill="#7e004c"/>
                                <Polygon points="14, 11 14, 29 29, 20" fill="#fff" />
                            </Svg> : 
                            <Svg height={40} width={40}>
                                <Circle cx="20" cy="20" r="18" fill="#65696c"/>
                                <Polygon points="14, 11 14, 29 29, 20" fill="#fff" />
                            </Svg>
                        }
                    </View>
                </TouchableWithoutFeedback> :

                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("BuyModal")}>
                    <View style={styles.shadow}>
                        <View style={styles.lockBtn}>
                            <Icon name="lock" size={21} color="#fefffe" />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    lockBtn: {
        borderRadius: 50,
        padding: 8,
        backgroundColor: "#b1b3b5",
        // alignItems: "center",
        // justifyContent: "center",
        margin: 2
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
