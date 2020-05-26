import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from "../../styles/global";

export default  function ReportDetails ({navigation}) {
        return (
            <View style={globalStyles.container}>
                <Text>{navigation.getParam('name') }</Text>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
