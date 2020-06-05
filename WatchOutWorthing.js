import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ReportDetails from "./screens/AppSwitchNavigator/ReportDetails";
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerComponent from "./screens/DrawerNavigator/CustomDrawerComponent";
import LoadingScreen from './screens/AppSwitchNavigator/LoadingScreen';
import ReportsReadScreen from "./screens/HomeTabNavigator/ReportsReadScreen";
import ReportsReadingScreen from "./screens/HomeTabNavigator/ReportsReadingScreen";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import colors from "./assets/colors";
import * as firebase from "firebase/app";
import 'firebase/auth';
import {connect} from 'react-redux';
import SplashScreen from "./screens/SplashScreen";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import ReportsCountContainer from "./redux/containers/ReportsCountContainer";
import {Ionicons} from '@expo/vector-icons';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


class WatchOutWorthing extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.checkIfLoggedIn()
        console.log('THIS PROPS: ',this.props)
    }

    checkIfLoggedIn = () => {

        let unsubscribe
        try{
            unsubscribe = firebase.auth().onAuthStateChanged(user => {
                if(user){
                    //sign in teh user
                    this.props.signIn(user)
                }
                else{
                    this.props.signOut()
                }
                unsubscribe()
            })
        } catch (e) {
            console.log(e)
            this.props.signOut()
        }
    }

    render(props) {
        const { navigation } = this.props;
        if(this.props.auth.isLoading)
        {
            return <SplashScreen/>
        }

        return (
            <NavigationContainer>
                {!this.props.auth.isSignedIn ?(
                <Stack.Navigator
                    screenOptions={
                        {
                            headerStyle: {
                                backgroundColor: colors.bgMain
                            },
                            headerTintColor: "white"
                        }}
                    {...props} navigation={navigation}
                >
                    <Stack.Screen name="WelcomeScreen" options={{headerShown: false}} component={WelcomeScreen}  />
                    <Stack.Screen name="LoginScreen" options={{backTitleVisible: false}} component={LoginScreen} />
                </Stack.Navigator>
                ):(
                    <ActionSheetProvider>
                        <AppDrawerNavigator/>
                    </ActionSheetProvider>
                )}
            </NavigationContainer>
        );
    }
}

const HomeTabNavigator = () => (

    <Tab.Navigator
        tabBarOptions={{
            style: {
                backgroundColor:colors.bgMain
            },
            activeTintColor:colors.logoColor,
            inactiveTintColor:colors.bgTextInput
        }}
        screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
                switch (route.name) {
                    case 'Reports':
                        return <ReportsCountContainer color={color} type="reports"/>
                    case 'ReportsReading':
                        return <ReportsCountContainer color={color} type="reportsReading"/>
                    case 'ReportsRead':
                        return <ReportsCountContainer color={color} type="reportsRead"/>
                }
            }
        })}
    >
        <Tab.Screen options={{tabBarLabel: 'Total'}} name="Reports" component={HomeScreen} />
        <Tab.Screen options={{tabBarLabel: 'New'}} name="ReportsReading" component={ReportsReadingScreen} />
        <Tab.Screen options={{tabBarLabel: 'Saved'}} name="ReportsRead" component={ReportsReadScreen} />
    </Tab.Navigator>
)

const getHeaderTitle = route => {
    const routeName = route.state ? route.state.routes[route.state.index].name
        :'Home'

    switch(routeName){
        case "Reports":
            return "Home"
        case "ReportsReading":
            return "New"
        case "ReportsRead":
            return "Saved"
        default: "Reports"
    }
}

const HomeStackNavigator = ({navigation}) => (

    <Stack.Navigator
        screenOptions={{
            headerStyle: {backgroundColor: colors.bgMain},
            headerTintColor: 'white',
            headerLeft: () => (
                <Ionicons onPress={()=>navigation.openDrawer()} name="ios-menu" size={30} color="white"  style={{marginLeft:10}}/>
            )

        }}
    >
        <Stack.Screen
            options={({route}) => ({
              title:getHeaderTitle(route)
            })}
            name="Home"
            component={HomeTabNavigator}
            navigationOptions={navigation}
        />

        <Stack.Screen
            options={({route}) => ({
                title:getHeaderTitle(route)
            })}
            name="ReportDetails"
            component={ReportDetails}
            navigationOptions={navigation}
            navigation={navigation}
        />
    </Stack.Navigator>
)

const AppDrawerNavigator = ({navigation}) => (
    <Drawer.Navigator
        drawerContent={props => <CustomDrawerComponent {...props}/>}
    >
        <Drawer.Screen
            options={{drawerIcon:()=><Ionicons name="ios-home" size={24}/>}}
            name="HomeScreen"
            component={HomeStackNavigator}
        />
        <Drawer.Screen
            options={{drawerIcon:()=><Ionicons name="ios-settings" size={24}/>}}
            name="Settings"
            component={SettingsScreen}
        />
    </Drawer.Navigator>
)


const mapStatetoProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: user => dispatch({type: 'SIGN_IN', payload: user}),
        signOut: () => dispatch({type: 'SIGN_OUT'})
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(WatchOutWorthing);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
