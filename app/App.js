/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, NetInfo} from 'react-native';
import { Root } from "native-base";
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import Programs from './Views/Programs';
import Courses from './Views/Courses';
import Lessons from './Views/Lessons';
import SideBar from "./Views/Sidebar";
//Auth
import AuthLoading from "./Views/Auth/AuthLoading";
import Login from './Views/Auth/Login';
import Register from './Views/Auth/Register';
import Logout from './Views/Auth/Logout';


const Drawer = createDrawerNavigator(
  {
    Programs: Programs
  },
  {
    initialRouteName: "Programs",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

//check if user is logged in, if not the initial route name will be login, if yes, initial route name will be home

const AuthStack = createStackNavigator(
  {
    Login: Login,
    Register: Register
  },
  {
    initialRouteName: 'Login',
    headerMode: "none"
  }
);

//

const MainStack = createStackNavigator(
  {
    Programs: Programs,
    Courses: Courses,
    Lessons: Lessons,
    Logout: Logout,
    Drawer: {
      screen: Drawer
    },
  },
  {
    initialRouteName: 'Drawer',
    headerMode: "none"
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    // MyModal: {
    //   screen: ModalScreen,
    // },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

const AppStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Root: RootStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export default class App extends React.Component {
  render() {
    return <Root><AppStack /></Root>;
  }
}
