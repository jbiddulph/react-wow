import React from 'react';
import {View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import colors from "../../assets/colors";
import CustomActionButton from '../../components/CustomActionButton';

export default class WelcomeScreen extends React.Component {
    render() {
        return(
            <View style={{flex: 1, backgroundColor: colors.bgMain}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="ios-ice-cream" size={150} color={colors.logoColor}/>
                    <Text style={{fontSize:36, fontWeight: '200', color: 'white'}}>Watch Out Worthing</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <CustomActionButton
                        style={{width:200, backgroundColor:'transparent', borderWidth: 0.5, borderColor: 'white', marginBottom: 20}}
                        onPress={() => this.props.navigation.navigate('LoginScreen')}>
                        <Text style={{fontWeight: '100', color: 'white', fontSize:18}}>Login</Text>
                    </CustomActionButton>
                </View>
            </View>
        )
    }
}
