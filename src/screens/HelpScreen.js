import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native'
import helpLessons from '../data/help.json'
import LessonPreview from '../components/LessonPreview'

export default function HelpScreen(props) {
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Image */}
                <ImageBackground
                    style={styles.headerImage}
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                >
                    <View style={styles.infoWrapper}>
                        <Text style={styles.h1}>Schnelle Hilfen</Text>
                        <Text style={styles.subh1}>Alles was inspiriert,</Text>
                        <Text style={styles.subh1}>motiviert und die</Text>
                        <Text style={styles.subh1}>Trennung erleichtert.</Text>
                    </View>
                </ImageBackground>

                <View style={styles.content}>
                    {
                        helpLessons.map((subject) => {
                            return <View key={subject.id}>
                                        <Text>{subject.subject}</Text>
                                        {
                                            subject.lessons.map((lesson) => {
                                                return <LessonPreview 
                                                            key={lesson.id}
                                                            id={lesson.id}
                                                            free={lesson.free}
                                                            headline={lesson.headline}
                                                            description={lesson.description}
                                                            currentExercise={100}
                                                            navigation={props.navigation}
                                                            weekId={subject.id}
                                                        />
                                            })
                                        }
                                    </View>
                        })
                    }
                </View>
            </View>
        </ScrollView>    
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 50,
      backgroundColor: '#fff',
    },
    headerImage: {
        width: "100%",
        height: 300,
        marginBottom: 25
    },
    infoWrapper: {
        paddingTop: 70,
        paddingLeft: "10%"
    },
    h1: {
        color: "#fff"
    },
    subh1: {
        color: "#fff"
    },
    content: {
        marginHorizontal: "10%",
    }
  });
