import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Feather as Icon} from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation-stack';

import React from 'react';

import HomeScreen from '../screens/HomeScreen'
import ProgrammScreen from '../screens/ProgrammScreen'
import HelpScreen from '../screens/HelpScreen'
import ProfileScreen from '../screens/ProfileScreen'

import PlayLessonScreen from '../screens/PlayLessonScreen'
import BuyModal from '../screens/BuyModal'

import LawWebsite from '../screens/LawWebsite'
import Notifications from "../screens/Notifications"
import UserData from '../screens/UserData'
import ChangeUserData from '../screens/ChangeUserData'

const MainContainer = createBottomTabNavigator({
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({focused}) => focused ? <Icon name="home" color="#f47d31" size={27} /> : <Icon name="home" color="#5a6175" size={26} />
      }
    },
    ProgrammScreen: {
      screen: ProgrammScreen,
      navigationOptions: {
        tabBarLabel: "Programm",
        tabBarIcon: ({focused}) => focused ? <Icon name="play-circle" color="#f47d31" size={27} /> : <Icon name="play-circle" color="#5a6175" size={26} />
      }
    },
    HelpScreen: {
        screen: HelpScreen,
        navigationOptions: {
          tabBarLabel: "Hilfe",
          tabBarIcon: ({focused}) => focused ? <Icon name="book" color="#f47d31" size={27} /> : <Icon name="book" color="#5a6175" size={26} />
        }
    },
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarLabel: "Profil",
          tabBarIcon: ({focused}) => focused ? <Icon name="user" color="#f47d31" size={27} /> : <Icon name="user" color="#5a6175" size={26} />
        }
      },
    }, {
    initialRouteName: "HomeScreen",
    tabBarOptions: {
      activeTintColor: '#f47d31',
      inactiveTintColor: '#5a6175',
      style: {
        // borderTopWidth: 0,
        // marginVertical: 20,
        height: 70,
        paddingBottom: 5,
        paddingTop: 5
      },
      indicatorStyle: {
        // height: 0,
      },
      showIcon: true,
      showLabel: true
    }
})

const StackContainer = createStackNavigator({
  MainContainer,
  PlayLessonScreen,
  BuyModal,
  LawWebsite,
  Notifications,
  UserData,
  ChangeUserData
}, {
  initialRouteName: "MainContainer",
  headerMode: "none",
  mode: "card"
})

const MainNavigator = createAppContainer(StackContainer)

export default MainNavigator