import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerComponent from "./screens/DrawerNavigator/CustomDrawerComponent";
import colors from "./assets/colors";
import * as firebase from 'firebase/app';
import { firebaseConfig } from './config/config';
import LoadingScreen from './screens/AppSwitchNavigator/LoadingScreen';
import * as Font from 'expo-font';



class App extends React.Component {
    
    constructor() {
        super();
        this.initializeFirebase()
    }
    initializeFirebase = () => {
        firebase.initializeApp(firebaseConfig)
    }
    render() {
        return (
            <AppContainer />
        )
    }
}

const LoginStackNavigator = createStackNavigator({
    WelcomeScreen: {
        screen: WelcomeScreen,
        navigationOptions: {
            header: null
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {}
    }
}, {
        mode: 'modal',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.bgMain
            }
        }
    })

const AppDrawerNavigator = createDrawerNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
            drawerIcon: () => <Ionicons name="ios-home" size={24} />
        }
    },
    SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: {
            title: 'Settings',
            drawerIcon: () => <Ionicons name="ios-settings" size={24} />
        }
    }
}, {
        contentComponent: CustomDrawerComponent
    })

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen,
    LoginStackNavigator,
    AppDrawerNavigator
})


const AppContainer = createAppContainer(AppSwitchNavigator)
export default App
