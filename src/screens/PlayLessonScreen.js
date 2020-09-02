import React, { Component } from 'react'
import GoBackHeader from '../components/GoBackHeader'
import { StyleSheet, Text, View, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, Modal, Platform , ImageBackground } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as firebase from 'firebase'
import 'firebase/firestore'
import { Audio } from 'expo-av';
import {Feather as Icon} from '@expo/vector-icons'
import CircleSlider from '../components/CircleSlider'
import { Circle } from 'react-native-svg'
import * as FileSystem from 'expo-file-system';

export default class PlayLessonScreen extends Component {
    constructor() {
        super()
        this.didMount = false;
        this.soundObject = null;
        this.state = {
            isPlaying: false,
            audio: null,
            audioLength: 0,
            currentPosition: 0,
            unlockNext: false,
            currentPositionSec: 0,
            changePositionAvalable: true,
            circlePosition: 90,
        }
    }

    componentWillUnmount() {
        this.didMount = false;
        if(this.soundObject !== null) {
            this.soundObject.pauseAsync()
        }
    }

    componentDidMount() {
        this.didMount = true;
        Audio.setIsEnabledAsync(true);
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
          });

        this.checkDownloaded()
    }

    checkDownloaded = () => {
        const lessonId = this.props.navigation.getParam("id")
        const weekId = this.props.navigation.getParam("weekId")

        FileSystem.getInfoAsync(FileSystem.documentDirectory + `${weekId}` + `${lessonId}.wav`)
            .then((promise) => {
                if(promise.exists) {
                    console.log("downloaded")
                    this.getExeciseFromUrl({uri: promise.uri})
                } else {
                    console.log("nicht downloaded")
                    this.getUrl()
                }
            })
            .catch((promise) => {
                console.log("error")
            })
    }

    getUrl = () => {
        const lessonId = this.props.navigation.getParam("id")
        const weekId = this.props.navigation.getParam("weekId")

        var storage = firebase.storage();
        var pathReference = storage.ref(`Audios/${weekId}/${lessonId}.wav`);
        pathReference.getDownloadURL()
            .then((url) => {
                if(this.didMount) {
                    this.setState({audio: {uri: url}})
                }
                this.getExeciseFromUrl({uri: url})
            })
            .catch((error) => {
                console.log("error")
        });
    }

    getExeciseFromUrl = async(audio) => {
        try {
            const { sound: soundObject, status } = await Audio.Sound.createAsync(
              audio,
              { shouldPlay: false }
            );
            this.soundObject = soundObject
            this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
            if(this.didMount) {
                this.setState({audioLength: (status.durationMillis/100000).toFixed(2)})
            }
          } catch (error) {
            // An error occurred!
          }
    }

    play = async() => {
        try {
            if(this.state.isPlaying) {
                if(this.didMount) {
                    this.setState({isPlaying: false})
                }
                this.soundObject.pauseAsync()
            } else {
                if(this.didMount) {
                    this.setState({isPlaying: true})
                }
                this.soundObject.playAsync();
            }
        }
        catch(e) {

        }
    }

    pushToHistory = () => {
        const lessonId = this.props.navigation.getParam("id")
        const weekId = this.props.navigation.getParam("weekId")
        return new Promise((resolve,reject) => {
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("History").doc("lastCourse").set(({
                currentCourse: weekId,
                currentLesson: lessonId+1
            }))
            .then(() => {
                resolve("SUCCESS")
            })
            .catch(() => {
                console.log("error push")
                reject("FAILURE")
            })
        })
    }

    unlockNext = () => {
        const lessonId = this.props.navigation.getParam("id")
        const weekId = this.props.navigation.getParam("weekId")
        return new Promise((resolve,reject) => {
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("Courses").doc(`${weekId}`).get()
            .then((doc) => {
                if (doc.exists) {
                    if(doc.data().currentExercise <= lessonId) {
                        //Unlock next Exercise
                        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("Courses").doc(`${weekId}`).update({
                            currentExercise: doc.data().currentExercise + 1
                        })
                        .then(() => {
                            resolve("SUCCESS")
                        })
                        .catch(function(error) {
                            console.error("Error updating document: ", error);
                            reject("FAILURE")
                        });
                    }
                    else {
                        resolve("SUCCESS")
                    }
                } else {
                    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("Courses").doc(`${weekId}`).set({
                        currentExercise: 1
                    })
                    .then(() => {
                        resolve("SUCCESS")
                    })
                    .catch(function(error) {
                        console.error("Error updating document: ", error);
                        reject("FAILURE")
                    });
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
                reject("FAILURE")
            });
        })
    } 

    _onPlaybackStatusUpdate = async(playbackStatus) => {
        const weekId = this.props.navigation.getParam("weekId")
        const reload = this.props.navigation.getParam("reload")
        if (!playbackStatus.isLoaded) {
          // Update your UI for the unloaded state
          if (playbackStatus.error) {
            console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            // Send Expo team the error on Slack or the forums so we can help you debug!
          }
        } else {
          // Update your UI for the loaded state
      
          if (playbackStatus.isPlaying) {
            // Update your UI for the playing state
                if(this.didMount) {
                    this.setState({currentPositionSec: playbackStatus.positionMillis,currentPosition: (playbackStatus.positionMillis/playbackStatus.durationMillis) * 100})
                }
                if(((playbackStatus.positionMillis/playbackStatus.durationMillis) * 100) >= 65 && !this.state.unlockNext ) {
                    if(this.didMount) {
                        this.setState({unlockNext: true})
                    }
                    if(weekId < 99) {
                        try {
                            await Promise.all([this.pushToHistory(), this.unlockNext()]) 
                            reload()
                        } catch(e) {

                        }
                    } 
                }
          } else {
            // Update your UI for the paused state
          }
      
          if (playbackStatus.isBuffering) {
            // Update your UI for the buffering state
          }
      
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
            if(this.didMount) {
                this.setState({currentPosition: 100})
            }
          }
        }
      };

      changePosition = (value) => {
        if(value !== this.state.circlePosition) {
            this.changePosition("-- ", value)
            if(this.soundObject !== null && this.state.changePositionAvalable) {
                try {
                    if(this.didMount) {
                        this.setState({changePositionAvalable: false,currentPosition: (value/365) * 100})
                    }
                    setTimeout(() => {if(this.didMount) {this.setState({changePositionAvalable: true})}}, 1000)
                } catch(e) {
    
                }
            }
        }
    }

    time_convert(timestamp) {
        var hours = Math.floor(timestamp / 60 / 60);
        var minutes = Math.floor(timestamp / 60) - (hours * 60);
        var seconds = timestamp % 60;

        return (minutes < 10 ? "0"+minutes : minutes) + ":" + (seconds < 10 ? "0"+seconds : seconds)
    }

    render() {
        const headline = this.props.navigation.getParam("headline")
        const description = this.props.navigation.getParam("description")

        return (
            <ImageBackground style={styles.safeArea} source={require("../../assets/audio.png")} >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <TouchableWithoutFeedback
                            hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name="x" size={27} color="#fefffe" />
                        </TouchableWithoutFeedback>
                    </View>

                    {/* <View style={{marginTop: 20}}>
                        <Text style={styles.subHeadline}>{headline}</Text>
                    </View> */}

                    <View style={{flex: 2.4, justifyContent: "center", alignItems: "center"}}>
                        {/* <Text style={styles.headline}>{description}</Text> */}
                        <Text style={styles.subHeadline}>{headline}</Text>
                    </View>

                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {/* <TouchableOpacity hitSlop={{top: 7, right: 7, left: 7, bottom: 7}} style={{justifyContent: "flex-end", marginRight: 23}} onPress={() => this.changePosition("rewind")}>
                            <Icon name="rewind" size={25} color="#fff" />
                        </TouchableOpacity> */}

                        {/* <View style={styles.slider}>
                            <CircleSlider
                                // value={this.state.circlePosition}
                                textColor={"transparent"}
                                // onValueChange={(value) => this.changePosition(value)}
                                strokeColor={"transparent"}
                                strokeWidth={10}
                                fillColor={"none"}
                                // meterColor={"none"}
                                dialWidth={30}
                                dialRadius={60}
                                btnRadius={40}
                                xCenter={this.state.x}
                                yCenter={this.state.y}
                            />
                        </View> */}

                        <AnimatedCircularProgress
                            size={125}
                            width={10}
                            rotation={0}
                            fill={this.state.currentPosition}
                            tintColor="#5A6175"
                            // renderCap={({ center }) => this.setState({x: center.x, y: center.y})}
                            onAnimationComplete={this.state.currentPosition===100? () => setTimeout(() => this.props.navigation.goBack(), 800): () => {}}
                            style={{alignItems: "center",justifyContent: "center"}}
                            backgroundColor="#d4d4d4">
                            {
                                (fill) => (
                                    <TouchableWithoutFeedback onPress={this.soundObject !== null ? () => this.play() : () => {}}>
                                        <View style={styles.buttonInnerWrapper}>
                                            {this.soundObject === null ? <ActivityIndicator size="small" color="#5A6175" /> : <Icon name={this.state.isPlaying ? "pause" : "play"} size={28} color="#5A6175" />}
                                        </View> 
                                    </TouchableWithoutFeedback>
                                )
                            }
                        </AnimatedCircularProgress>

                        {/* <TouchableOpacity hitSlop={{top: 7, right: 7, left: 7, bottom: 7}} style={{justifyContent: "center", marginLeft: 23}} onPress={() => this.changePosition("forward")}>
                            <Icon name="fast-forward" size={25} color="#fff" />
                        </TouchableOpacity> */}
                    </View>

                    <View style={{paddingBottom: "15%", flex: 3.3, justifyContent: "center", alignItems: "center"}}>
                        <Text style={styles.currentTime}>{(this.time_convert(Math.round(this.state.currentPositionSec/1000)))}</Text>
                        <View style={styles.timeContainer}>
                            <Text style={styles.timeTxt}>{Math.round(this.state.audioLength)} MIN.</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            // <View style={styles.container}>
            //     <GoBackHeader navigation={this.props.navigation} />
            //     <Text>{headline}</Text>
            //     <Text>{description}</Text>
            //     <Text>{lessonId}</Text>
            //     <Text>{weekId}</Text>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#EBE7E4",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 18,
        marginTop: Platform.OS === 'android' ? 30 : 50,
    },
    buttonInnerWrapper: {
        width: 110,
        height: 110,
        borderRadius: 110,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBF5EB",
    },
    headline: {
        fontSize: 28,
        color: "green",
    },
    subHeadline: {
        fontSize: 18,
        color: "#faf7f2",
        // color: "#3a3938",
        fontFamily: Platform.OS === "android" ? "Roboto-Medium" : "Roboto-Medium"
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        // width: "70%",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex: 1
    },
    timeContainer: {
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderColor: "#d4d4d4"
    },
    timeTxt: {
        color: "#d4d4d4",
        letterSpacing: 1,
        fontSize: 15
    },
    currentTime: {
        marginBottom: 40,
        color: "#d4d4d4",
        letterSpacing: 0.9
    },
    slider: {
        position: "absolute",
        right: "-10%"
    }
  });
