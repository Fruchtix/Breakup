import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'

export default function GoBackHeader(props) {
    return ( 
        <View style={styles.goBack}>
            <TouchableWithoutFeedback
                hitSlop={{top: 7, right: 7, left: 7, bottom: 7}}
                onPress={() => props.navigation.goBack()}>
                    <Icon name="chevron-left" size={32} color={props.color ? props.color : "#5A6174"} />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    goBack: {
        alignContent: "flex-start",
        width: "100%",
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
})
