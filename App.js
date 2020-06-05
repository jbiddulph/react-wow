import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
    createBottomTabNavigator} from 'react-navigation';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import colors from "./assets/colors";
import * as firebase from 'firebase/app';
import { firebaseConfig } from './config/config';

import * as Font from 'expo-font';

import AddReportModal from "./components/AddReportModal";
import {Provider} from "react-redux";
import store from "./redux/store/index";
import ReportsCountContainer from "./redux/containers/ReportsCountContainer";
import ReportDetails from "./screens/AppSwitchNavigator/ReportDetails";
import WatchOutWorthing from "./WatchOutWorthing";

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.initializeFirebase()
    }
    initializeFirebase = () => {
        firebase.initializeApp(firebaseConfig)
    }
    render() {
        return (
            <Provider store={store}>
                <WatchOutWorthing/>
            </Provider>
        )
    }
}

export default App
