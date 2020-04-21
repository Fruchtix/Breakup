import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text>Breakup</Text>

                <View>
                    <Text>Tag X: Headline</Text>
                    <Text>Lerne alle wichtigen Grundlagen, um direkt wixxen zu können.</Text>
                </View>

                <View style={styles.btnWrapper}>
                    <View style={styles.btn}>
                        <Icon name={"play"} size={24} color={"#fefffe"} />
                        <Text style={styles.btnTxt}>Programm fortsetzen</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingBottom: 40,
      paddingTop: 30
    },
    btn: {
        borderRadius: 16,
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#7e004c",
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 7
    },
    btnWrapper: {
        alignItems: "center",
        overflow: "hidden",
    },
    btnTxt: {
        textTransform: "uppercase",
        color: "#fefffe",
        paddingLeft: 5
    }
  });
