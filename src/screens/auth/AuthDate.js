import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Picker, Button } from 'react-native'
import GoBackHeader from '../../components/GoBackHeader';
import DateTimePicker from "react-native-modal-datetime-picker";

export default class AuthDate extends Component {
    constructor() {
        super()
        this.state = {
            gebDat: '',
            isDateTimePickerVisible: false,
            errorVisibility: false
        }
    }

    componentDidMount() {
        const date = new Date()
        const d = date.getDate()
        const m = date.getMonth()+1
        const y = date.getFullYear()

        today = (d<10 ? '0'+d : d) + '/' + (m<10 ? '0'+m : m) + '/' + y;
        this.setState({gebDat: today})
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
     
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    
    handleDatePicked = date => {
        const d = date.getDate()
        const m = date.getMonth()+1
        const y = date.getFullYear()

        today = (d<10 ? '0'+d : d) + '/' + (m<10 ? '0'+m : m) + '/' + y;
        this.setState({gebDat: today})
        this.hideDateTimePicker()
        
        this.hideDateTimePicker()

        if(this.isDate16orMoreYearsOld(date.getDate(), (date.getMonth() + 1), date.getFullYear())) {
            this.setState({errorVisibility: false})
        } else {
            this.setState({errorVisibility: true})
        }
    };

    isDate16orMoreYearsOld(day, month, year) {
        return new Date(year, month-1, (day-2)) <= new Date();
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <GoBackHeader navigation={this.props.navigation} />
                <View style={[styles.content, {marginTop: 40}]}>
                    <Text style={[styles.headline, {fontSize: 19}]} adjustsFontSizeToFit numberOfLines={1}>Wann war deine Trennung?</Text>            
                    <View onPress={this.showDateTimePicker} style={styles.inputData}>
                        <Text style={styles.textLabel}>Datum</Text>
                        <Text style={styles.input} onPress={this.showDateTimePicker}>{this.state.gebDat}</Text>
                    </View>

                    {this.state.errorVisibility ? <View>
                        <Text style={styles.error}>Das Datum muss in der Vegangenheit liegen.</Text>
                    </View> : null}
                    
                    {/* Die Torte */}
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
                        <Image resizeMode="center" source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
                    </View>

                    <View style={{justifyContent: "flex-end"}}>
                        <TouchableOpacity 
                            style={[styles.submitBtn, (this.state.gebDat === '' || this.state.errorVisibility) ? {backgroundColor: "#ddd"} : {backgroundColor: "#5A6174"}]}
                            disabled={this.state.gebDat === '' || this.state.errorVisibility}
                            onPress={() => navigate('AuthPassword', {breakupDate: this.state.gebDat})}>
                            <Text style={styles.btnText}>Weiter</Text>
                        </TouchableOpacity>
                    </View>

                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            cancelTextIOS="Abbrechen"
                            confirmTextIOS="Auswählen"
                            titleIOS="Wähle ein Datum"
                        />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        paddingTop: 10,
        height: 38,
        fontSize: 18
    },
    subHeadline: {
        color: "#999",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 40,
        paddingTop: 30
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