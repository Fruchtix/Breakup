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
                props.free || props.premium ?  /* oder premium */
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("PlayLessonScreen", {headline: props.headline, description: props.description, id: props.id, weekId: props.weekId, reload: () => props.reload()})}>
                    {
                        props.currentExercise > props.id ?
                        <Svg height={40} width={40}>
                            <Circle cx="20" cy="20" r="18" fill="#5a6175" />
                            <Polygon points="14, 11 14, 29 29, 20" fill="#fefffe" />
                        </Svg> : 
                        <Svg height={40} width={40}>
                            <Circle cx="20" cy="20" r="18" fill="#b2b2b2"/>
                            <Polygon points="14, 11 14, 29 29, 20" fill="#fff" />
                        </Svg>
                    }
                </TouchableWithoutFeedback> :

                <TouchableWithoutFeedback onPress={() => props.navigation.navigate("BuyModal")}>
                    <View>
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
        backgroundColor: "#b2b2b2",
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
