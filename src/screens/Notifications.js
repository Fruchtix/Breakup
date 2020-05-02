import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Platform } from 'react-native'
import GoBackHeader from '../components/GoBackHeader'

export default function Notifications(props) {
    return (
        <View style={{flex: 1, backgroundColor: "#fff"}}>
            <View style={styles.colorTop}>
                    <GoBackHeader navigation={props.navigation} />    
            </View>

            <Text style={styles.headline}>Hier wird gerade</Text>
            <Text style={styles.headline}>noch dran gearbeitet...</Text>
            <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                <ImageBackground style={{width: "100%", height: 300}} source={require("../../assets/inwork.png")} >
                    <Text></Text>
                </ImageBackground>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colorTop: {
        paddingTop: Platform.OS === "android" ? 30 : 40,
        paddingBottom: 25,
        backgroundColor: "#ebe7e4",
        marginBottom: 28,
    },
    headline: {
        alignSelf: "center",
        fontSize: 25,
        color: "#5A6176",
        lineHeight: 32
    },
  });
