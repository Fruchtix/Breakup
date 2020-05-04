import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import {validate} from '../../utilities/ValidateInput'
import GoBackHeader from '../../components/GoBackHeader';
import {Feather as Icon} from '@expo/vector-icons'

export default class AuthPassword extends Component {
    constructor() {
        super()
        this.state = {
            password: '',
            secureTextEntry: true
        }
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "padding"}
                style={styles.container}
                enabled={Platform.OS === "ios" ? true : false}
            >
                <View style={{paddingBottom: 35, flex: 1}}>
                <GoBackHeader navigation={this.props.navigation} />
                <View style={[styles.content, {marginTop: 40}]}>
                    <Text style={styles.headline}>Wähle ein Passwort</Text>
                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 10}}>
                        <Text style={styles.subHeadline}>Dein Passwort sollte min. 8 Zeichen </Text>
                        <Text style={styles.subHeadline}>lang sein.</Text>
                    </View>
                    <View onPress={this.showDateTimePicker} style={styles.inputData}>
                        <Text style={styles.textLabel}>Passwort</Text>
                        <View style={{flexDirection: "row"}}>
                            <TextInput 
                                    autoFocus={true}
                                    style={[styles.input, {flex: 1}]}
                                    value={this.state.password}
                                    secureTextEntry={this.state.secureTextEntry}
                                    onChangeText={(text) => {this.setState({password: text})}}
                            />
                            <TouchableOpacity onPress={() => this.setState({secureTextEntry: !this.state.secureTextEntry})}>
                                {this.state.secureTextEntry ? <Icon name="eye" size={24} color="gray" /> : <Icon name="eye-off" size={24} color="gray" />}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.submitBtnWrapper}>
                        <TouchableOpacity 
                            style={[styles.submitBtn, !(validate("password", this.state.password)) ? {backgroundColor: "#bdbfc8"} : {backgroundColor: "#5A6174"}]}
                            disabled={!(validate("password", this.state.password))}
                            onPress={() => navigate('AuthRegister', {password: this.state.password})}>
                            <Text style={styles.btnText}>Weiter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    subHeadline: {
        color: "#999",
    },
    container: {
        flex: 1,
        backgroundColor: '#fefffe',
        paddingBottom: 35,
        paddingTop: Platform.OS === "ios" ? 40 : 30
    },
    headline: {
        alignSelf: "center",
        fontSize: 25,
        color: "#5A6176",
        lineHeight: 32
    },
    input: {
        height: 38,
        fontSize: 18
    },
    inputData: {
        marginTop: 25,
        borderBottomColor: '#888',
        borderBottomWidth: 1
    },
    content: {
        flex: 1,
        marginTop: 28,
        marginHorizontal: 50
    },
    inputgender: {
        marginTop: 13,
        marginBottom: 10
    },
    goBack: {
        alignContent: "flex-start",
        width: "100%",
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 10
    },
    submitBtnWrapper: {
        flex: 1,
        justifyContent: "flex-end",
    },
    submitBtn: {
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        flexDirection: "row"
    },
    btnText: {
        color: "#fff",
        fontSize: 14,
        letterSpacing: 1
    },
    documents: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    textLabel: {
        color: "#999",
        textTransform: "uppercase",
        fontSize: 12
    },
    genderPicker: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        height: 35,
        borderBottomColor: '#888',
        borderBottomWidth: 1
    },
    genderText: {
        fontSize: 16,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    error: {
        marginTop: 6,
        color: "red",
    }
})