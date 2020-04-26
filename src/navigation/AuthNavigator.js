import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Feather as Icon} from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation-stack';

import React from 'react';

import AuthWelcome from '../screens/auth/AuthWelcome'
import AuthRegister from '../screens/auth/AuthRegister'
import AuthPassword from '../screens/auth/AuthPassword'
import AuthDate from '../screens/auth/AuthDate'
import LogInScreen from '../screens/auth/LogInScreen';
import ResetPassword from '../screens/auth/ResetPassword'

const AuthContainer = createStackNavigator({
    AuthWelcome,
    AuthDate,
    AuthPassword,
    AuthRegister,
    LogInScreen,
    ResetPassword
}, {
  initialRouteName: "AuthWelcome",
  headerMode: "none",
  mode: "card"
})

const MainNavigator = createAppContainer(AuthContainer)

export default MainNavigator