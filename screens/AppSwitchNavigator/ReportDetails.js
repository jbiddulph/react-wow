import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from "../../styles/global";


class ReportDetails extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const navigation = this.props.route.params
        // console.log('This is the Lat: ',this.props.route.params.params.report.latitude)
        console.log('This is the Navigation: ',navigation)

        return (

            <View style={globalStyles.container}>
                <Text>{this.props.route.params.name}</Text>
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
