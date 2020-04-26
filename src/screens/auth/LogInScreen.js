import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, Text, View, TextInput, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase'
import {validate} from '../../utilities/ValidateInput'

import GoBackHeader from '../../components/GoBackHeader';

export default class LogInScreen extends Component {
    constructor() {
        super()
        this.state={
            email: '',
            password: '',
            errorVisibility: false,
            showActivityIndicator: false
        }
    }

    validateUser() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            this.setState({errorVisibility: true, showActivityIndicator: false})
        });
    }

    onFocus(type) {
        if(type === 'password') {
            this.setState({errorVisibility: false, password: ''})
        } else {
            this.setState({errorVisibility: false})
        }
    }

    render() {

        const emailReset = this.props.navigation.getParam('email', 'Error')
        if(emailReset !== 'Error') {
            this.setState({email: emailReset})
        }

        return (
            <View style={styles.container}>
                <GoBackHeader navigation={this.props.navigation} />
                <View style={styles.content}>
                    <Text style={styles.headline}>Login</Text>
                    <View style={styles.inputData}>
                        <Text style={styles.textLabel}>Email</Text>
                        <TextInput 
                                autoFocus={true}
                                style={styles.input}
                                keyboardType="email-address"
                                autoCompleteType="email"
                                value={this.state.email}
                                onFocus={() => this.onFocus('email')}
                                onChangeText={(text) => {this.setState({email: text})}}
                        />
                    </View>
                    <View style={styles.inputData}>
                        <Text style={styles.textLabel}>Passwort</Text>
                        <TextInput 
                                style={styles.input}
                                onFocus={() => this.onFocus('password')}
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={(text) => {this.setState({password: text})}}
                        />
                    </View>

                    {this.state.errorVisibility ? <View>
                        <Text style={styles.error}>Ups! Die Email-Adresse oder das Passwort ist falsch.</Text>
                    </View> : null}

                    <TouchableOpacity 
                        style={{alignItems: "center", marginTop: 5}}
                        onPress={() => this.props.navigation.navigate('ResetPassword')}
                    >
                        <Text style={{color: "#df9401", marginTop: 2}}>Passwort vergessen?</Text>
                    </TouchableOpacity>

                    <View style={styles.submitBtnWrapper}>
                        <TouchableOpacity 
                            style={[styles.submitBtn, !(validate("email", this.state.email)) || !(validate("password", this.state.password)) ? {backgroundColor: "#ddd"} : {backgroundColor: "#5A6174"}]}
                            disabled={!(validate("email", this.state.email)) || !(validate("password", this.state.password))}
                            onPress={() => {this.validateUser(), Keyboard.dismiss(), this.setState({showActivityIndicator: true})}}>
                                {this.state.showActivityIndicator ? <ActivityIndicator color="#333" /> : null}
                                <Text style={styles.btnText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 35,
        paddingTop: 25
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