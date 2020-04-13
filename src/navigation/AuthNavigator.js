import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Feather as Icon} from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation-stack';

import React from 'react';

import AuthWelcome from '../screens/auth/AuthWelcome'
import AuthRegister from '../screens/auth/AuthRegister'

const AuthContainer = createStackNavigator({
    AuthWelcome,
    AuthRegister
}, {
  initialRouteName: "AuthWelcome",
  headerMode: "none",
  mode: "card"
})

const MainNavigator = createAppContainer(AuthContainer)

export default MainNavigator