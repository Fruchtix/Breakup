import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'

export default function LessonPreview(props) {
    return (
        <View style={styles.container}>
            <View>
                <Text>{props.headline}</Text>
                <Text>{props.description}</Text>
            </View>
            <View style={styles.playBtn}>
                <Icon name="play" size={20} color={"#fff"} />
            </View>
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
    playBtn: {
        borderRadius: 40,
        width: 40,
        height: 40,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center"
    }
  });
