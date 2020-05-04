import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Keyboard, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'
import {validate} from '../../utilities/ValidateInput'
import GoBackHeader from '../../components/GoBackHeader';
import { SplashScreen } from 'expo';

export default class AuthRegister extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            errorVisibility: false,
            showActivityIndicator: false
        }
    }

    createUser = (email, password) => {
        this.setState({showActivityIndicator: true})
        firebase.auth().createUserWithEmailAndPassword(email, password)
            // .then(() => this.sendVerificationEmail())
            .then(() => this.updateUserProfile())
            // .then(() => this.setState({showActivityIndicator: false}))
            .catch((error) => {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage)
            this.setState({errorVisibility: true, showActivityIndicator: false})
        });
    }

    updateUserProfile = () => {
        const userId = firebase.auth().currentUser.uid
        console.log(userId)
        //Connect to UserDb and add information
        firebase.firestore().collection("users").doc(userId).set({
            token: ""
        })
        .then(function() {
        })
        .catch(function(error) {
        });

        firebase.firestore().collection("users").doc(userId).collection("Courses").doc("0").set({
            currentExercise: 0
        })
        .then(function() {
        })
        .catch(function(error) {
        });

        firebase.firestore().collection("users").doc(userId).collection("History").doc("lastCourse").set({
            currentCourse: 0,
            currentLesson: 0
        })
        .then(function() {
        })
        .catch(function(error) {
        });
    }

    render() {
        const password = this.props.navigation.getParam('password', 'unknown')

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
                    <Text style={styles.headline}>Wie lautet deine Email?</Text>
                    <View onPress={this.showDateTimePicker} style={styles.inputData}>
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
                        <Text style={styles.error}>Ups! Da ist etwas schief gelaufen.</Text>
                    </View> : null}

                    <View style={styles.documents}>
                        <Text>
                            <Text style={{fontSize: 13}}>Wenn du auf "Registrierung abschließen" tippst, bestätigst du, dass du die </Text>
                            <Text onPress={() => {this.props.navigation.navigate("LawWebsite", {type: "datenschutz", color: "#fff"})}} style={{color: "#f47d31",fontSize: 13}}>Datenschutzbestimmungen</Text>
                            <Text style={{fontSize: 13}}> gelesen hast und dass du den </Text> 
                            <Text onPress={() => {this.props.navigation.navigate("LawWebsite", {type: "agb", color: "#fff"})}} style={{color: "#f47d31",fontSize: 13}}>AGB's</Text>
                            <Text style={{fontSize: 13}}> zustimmst.</Text>
                        </Text>
                    </View>

                    <View style={styles.submitBtnWrapper}>
                        <TouchableOpacity 
                            style={[styles.submitBtn, !(validate("email", this.state.email)) ? {backgroundColor: "#bdbfc8"} : {backgroundColor: "#5A6174"}]}
                            disabled={!(validate("email", this.state.email))}
                            onPress={() => {this.createUser(this.state.email, password), Keyboard.dismiss()}}>
                                    {this.state.showActivityIndicator ? <ActivityIndicator color="#333" /> : null}
                                    <Text style={styles.btnText}> Registrierung abschließen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
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
  });
