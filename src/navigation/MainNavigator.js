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

const MainContainer = createBottomTabNavigator({
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({focused}) => focused ? <Icon name="home" color="#ecb300" size={27} /> : <Icon name="home" color="#aaa" size={26} />
      }
    },
    ProgrammScreen: {
      screen: ProgrammScreen,
      navigationOptions: {
        tabBarLabel: "Programm",
        tabBarIcon: ({focused}) => focused ? <Icon name="play-circle" color="#ecb300" size={27} /> : <Icon name="play-circle" color="#aaa" size={26} />
      }
    },
    HelpScreen: {
        screen: HelpScreen,
        navigationOptions: {
          tabBarLabel: "Hilfe",
          tabBarIcon: ({focused}) => focused ? <Icon name="book" color="#ecb300" size={27} /> : <Icon name="book" color="#aaa" size={26} />
        }
    },
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarLabel: "Profil",
          tabBarIcon: ({focused}) => focused ? <Icon name="user" color="#ecb300" size={27} /> : <Icon name="user" color="#aaa" size={26} />
        }
      },
    }, {
    initialRouteName: "HomeScreen",
    tabBarOptions: {
      activeTintColor: '#ecb300',
      inactiveTintColor: '#aaa',
      style: {
        // borderTopWidth: 0,
        // marginVertical: 20,
        height: 60
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
  UserData
}, {
  initialRouteName: "MainContainer",
  headerMode: "none",
  mode: "card"
})

const MainNavigator = createAppContainer(StackContainer)

export default MainNavigator