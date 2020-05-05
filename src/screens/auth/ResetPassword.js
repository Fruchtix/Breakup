import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'
import {validate} from '../../utilities/ValidateInput'
import GoBackHeader from '../../components/GoBackHeader';

export default class ResetPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            errorVisibility: false,
            showActivityIndicator: false
        }
    } 

    sendPasswordResetEmail(navigate) {
        var auth = firebase.auth();

        auth.sendPasswordResetEmail(this.state.email).then(function() {
            // Email sent.
            console.log("test")
            // navigate.setParams({ emailReset: this.state.email})
            navigate.goBack()
            // this.props.navigation.navigate("LogIn", {email: this.state.email})
        }).catch((error) => {
            // An error happened.
            this.setState({errorVisibility: true, showActivityIndicator: false})        
        });
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "padding"}
                style={styles.container}
                enabled={Platform.OS === "ios" ? true : false}
            >
                <View style={{paddingBottom: 35, flex: 1}}>
                <GoBackHeader navigation={this.props.navigation} />
                <View style={[styles.content, {marginTop: 40}]}>
                    <Text style={styles.headline}>Passwort zurücksetzen</Text>
                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 10}}>
                        <Text style={styles.subHeadline}>Wenn du dein Passwort vergessen hast </Text>
                        <Text style={styles.subHeadline}>kannst du es hier ändern.</Text>
                    </View>
                    <View style={styles.inputData}>
                        <Text style={styles.textLabel}>Email</Text>
                        <TextInput 
                                autoFocus={true}
                                style={styles.input}
                                keyboardType="email-address"
                                autoCompleteType="email"
                                value={this.state.email}
                                onChangeText={(text) => {this.setState({email: text})}}
                        />
                    </View>

                    {this.state.errorVisibility ? <View>
                        <Text style={styles.error}>Ups! Die Email-Adresse ist falsch.</Text>
                    </View> : null}

                    <View style={styles.submitBtnWrapper}>
                        <TouchableOpacity 
                            style={[styles.submitBtn, !(validate("email", this.state.email)) ? {backgroundColor: "#bdbfc8"} : {backgroundColor: "#5A6174"}]}
                            disabled={!(validate("email", this.state.email))}
                            onPress={() => this.sendPasswordResetEmail(this.props.navigation)}>
                                {this.state.showActivityIndicator ? <ActivityIndicator color="#333" /> : null}
                                <Text style={styles.btnText}>Senden</Text>
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
        paddingTop: Platform.OS === "ios" ? 40 : 13
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