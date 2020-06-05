import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {globalStyles} from "../../styles/global";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';

class ReportDetails extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const navigation = this.props.route.params
        return (

            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: this.props.route.params.latitude,
                        longitude: this.props.route.params.longitude
                    }} />
                    {/*<Marker coordinate={marker.latlng}>*/}
                    {/*    <MyCustomMarkerView {...marker} />*/}
                    {/*    <Callout>*/}
                    {/*        <MyCustomCalloutView {...marker} />*/}
                    {/*    </Callout>*/}
                    {/*</Marker>*/}
                <View style={styles.header}>
                    <Text>{this.props.route.params.name}</Text>
                </View>
            </View>

        );
    }
}

export default ReportDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        fontSize: 30,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: 300,
    }
})
