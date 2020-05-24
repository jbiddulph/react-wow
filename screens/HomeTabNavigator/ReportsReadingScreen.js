import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class ReportsReadingScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Reading</Text>
            </View>
        );
    }
}

export default ReportsReadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
