import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from "../../styles/global";


class ReportDetails extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>{navigation.getParam('name') }</Text>
            </View>
        );
    }
}

export default ReportDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
