import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, ImageBackground, Platform, TextInput, TouchableOpacity } from 'react-native'
import GoBackHeader from '../components/GoBackHeader'
import * as firebase from 'firebase'
import 'firebase/firestore'
import {Feather as Icon} from '@expo/vector-icons'
import {validate} from '../utilities/ValidateInput'


export default function UserData(props) {
    const [email,setEmail] = useState("")
    const [pw,setPw] = useState("")
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const changeEmail = () => {
        var user = firebase.auth().currentUser;
        var credentials = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, pw);
        user.reauthenticateWithCredential(credentials)
            .then(() => {
                firebase.auth().currentUser.updateEmail(email).then(() => {
                    props.navigation.goBack()
                }).catch(function(error) {
                    console.log(error)
                });
            })
            .catch(() => {
                console.log("neee")
            })
    }

    useEffect(() => {
        setEmail(firebase.auth().currentUser.email)
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: "#fff", paddingBottom: 30}}>
            <View style={styles.colorTop}>
                    <GoBackHeader navigation={props.navigation} />    
            </View>

            <View style={{flex: 1, marginHorizontal: 50}}>
                <Text style={styles.headline}>Email ändern</Text>
                <View style={styles.inputData}>
                    <Text style={styles.textLabel}>Email</Text>
                    <TextInput 
                            autoFocus={true}
                            style={styles.input}
                            value={email}
                            // onFocus={() => validate("text", this.state.firstName)}
                            onChangeText={(text) => {setEmail(text)}}
                    />
                </View>

                <View style={styles.inputData}>
                    <Text style={styles.textLabel}>Passwort</Text>
                    <View style={{flexDirection: "row"}}>
                        <TextInput 
                                autoFocus={true}
                                style={[styles.input, {flex: 1}]}
                                value={pw}
                                secureTextEntry={secureTextEntry}
                                onChangeText={(text) => {setPw(text)}}
                        />
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            {secureTextEntry ? <Icon name="eye" size={24} color="gray" /> : <Icon name="eye-off" size={24} color="gray" />}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.submitBtnWrapper}>
                    <TouchableOpacity 
                        style={[styles.submitBtn, (!(validate("email", email)) ? {backgroundColor: "#ddd"} : {backgroundColor: "#5A6174"})]}
                        disabled={!(validate("email", email))}
                        onPress={() => changeEmail()}>
                            <Text style={styles.btnText}>Speichern</Text>
                    </TouchableOpacity>
                </View>
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
        paddingTop: Platform.OS === "android" ? 13 : 40,
        paddingBottom: 25,
        backgroundColor: "#faf7f2",
        marginBottom: 28,
    },
    headline: {
        alignSelf: "center",
        fontSize: 25,
        color: "#5A6176",
        lineHeight: 32
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
