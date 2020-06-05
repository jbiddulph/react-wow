import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {globalStyles} from "../../styles/global";
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import colors from "../../assets/colors";

class ReportDetails extends Component {

    constructor(props) {
        super(props);
        console.log(props)
    }
    render() {
        const navigation = this.props.route.params
        return (

            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.mapStyle}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: this.props.route.params.latitude,
                            longitude: this.props.route.params.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02
                        }}>
                        <Marker
                            coordinate={{
                                latitude: this.props.route.params.latitude,
                                longitude: this.props.route.params.longitude
                            }}
                            title={this.props.route.params.name}
                            description="hello there"
                        />
                    </MapView>
                    <View style={styles.header}>
                        <Image source={{uri: this.props.route.params.image }} style={styles.image}/>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text  style={styles.headertitle}>{this.props.route.params.name}</Text>
                </View>
            </View>

        );
    }
}

export default ReportDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgMain,
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        flex: 1,
        height: 340
    },
    headertitle: {
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.yellow
    },
    mapStyle: {
        flex: 1,
        height: 340,
    },
    image: {
        flex: 1,
        height: 340,
        flexDirection: 'column'
    }
})
