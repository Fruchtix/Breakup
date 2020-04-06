import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import WeekPreview from '../components/WeekPreview'

export default function ProgrammScreen() {
    return (
        <View style={styles.container}>
            {/* Image */}
            <Image
                style={styles.headerImage}
                source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
            />

            <View style={styles.content}>
                <Text style={styles.headline}>Dein Programm</Text>

                <View>
                    <WeekPreview
                        week={1}
                        description={"Mit Breakup deine Trennung mit leichtigkeit überstehen! Antje erzählt ihre Geschichte und bereitet dich auf deine Reise vor"}
                        currentExercise={2}
                        totalExercise={9}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ededed',
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
    }
  });
