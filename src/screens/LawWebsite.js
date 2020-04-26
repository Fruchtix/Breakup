import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import { WebView } from 'react-native-webview';
import GoBackHeader from '../components/GoBackHeader'

export default class LawWebsite extends Component {
    constructor() {
        super()
        this.state = {
            loading: true
        }
    }

    render() {
        const type = this.props.navigation.getParam("type", "error")
        const color = this.props.navigation.getParam("color", "error")
        
        return (
            <View style={{flex: 1}}>
                <View style={[styles.colorTop, color !== "error" ? {backgroundColor: color, paddingTop: Platform.OS === "android" ? 25 : 0} : {}]}>
                        <GoBackHeader navigation={this.props.navigation} />   
                </View>
                {this.state.loading ? 
                <View style={{backgroundColor: "#EBE7E4"}}>
                    <ActivityIndicator size="small" color="#333" /> 
                </View> : null } 
                    <WebView source={{ uri: `https://sites.google.com/view/eyeyogawebsite/${type}` }} onLoad={() => this.setState({loading: false})} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    colorTop: {
        paddingTop: Platform.OS === "android" ? 25 : 40,
        paddingBottom: 25,
        backgroundColor: "#EBE7E4",
    },
})