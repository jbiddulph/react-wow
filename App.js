import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
    createBottomTabNavigator} from 'react-navigation';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
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
import ReportsReadScreen from "./screens/HomeTabNavigator/ReportsReadScreen";
import ReportsReadingScreen from "./screens/HomeTabNavigator/ReportsReadingScreen";
import AddReportModal from "./components/AddReportModal";
import {Provider} from "react-redux";
import store from "./redux/store/index";
import ReportsCountContainer from "./redux/containers/ReportsCountContainer";
import ReportDetails from "./screens/AppSwitchNavigator/ReportDetails";


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
            <Provider store={store}>
                <ActionSheetProvider>
                    <AppContainer />
                </ActionSheetProvider>
            </Provider>
        )
    }
}

const ListToDetails = createStackNavigator( {
    ReportDetails: {
        screen: ReportDetails,
    }
})

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

const HomeTabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Total Reports',
            tabBarIcon: ({tintColor}) => <ReportsCountContainer color={tintColor} type="reports"/>
        }
    },
    ReportsReadingScreen: {
        screen: ReportsReadingScreen,
        navigationOptions: {
            tabBarLabel: 'New Reports',
            tabBarIcon: ({tintColor}) => <ReportsCountContainer color={tintColor} type="reportsReading"/>

        }
    },
    ReportsReadScreen: {
        screen: ReportsReadScreen,
        navigationOptions: {
            tabBarLabel: 'Reports Saved',
            tabBarIcon: ({tintColor}) => <ReportsCountContainer color={tintColor} type="reportsRead"/>
        }
    }
},{
    tabBarOptions: {
        style: {
            backgroundColor: colors.bgMain
        },
        activeTintColor: colors.logoColor,
        inactiveTintColor: colors.bgTextInput
    }
})

HomeTabNavigator.navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state.routes[navigation.state.index]

    switch(routeName){
        case 'HomeScreen':
            return{
                headerTitle: 'Total Reports'
            }
        case 'ReportsReadingScreen':
            return{
                headerTitle: 'New Reports'
            }
        case 'ReportsReadScreen':
            return{
                headerTitle: 'Saved Reports'
            }
        default:
            return{
                headerTitle: 'Watch Out Worthing'
            }
    }
}

const HomeStackNavigator = createStackNavigator({
    HomeTabNavigator: {
        screen: HomeTabNavigator,
        navigationOptions: ({navigation}) => {
            return {
                headerLeft: (<Ionicons
                    name="ios-menu"
                    size={30}
                    color={colors.logoColor}
                    onPress={()=>navigation.openDrawer()}
                    style={{marginLeft: 20}}
                    />
                )
            }
        }
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.bgMain
        },
        headerTintColor: colors.txtWhite
    }
})

const AppDrawerNavigator = createDrawerNavigator({
    HomeStackNavigator: {
        screen: HomeStackNavigator,
        navigationOptions: {
            title: 'Home',
            drawerIcon: () => <Ionicons name="ios-home" size={24}/>
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
    ListToDetails,
    AppDrawerNavigator
})


const AppContainer = createAppContainer(AppSwitchNavigator)
export default App
