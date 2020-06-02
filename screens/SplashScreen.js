import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AnimatedLottieView from "lottie-react-native";
import colors from "../assets/colors";

const SplashScreen = (props) => {
    return (
        <View style={styles.container}>
            <AnimatedLottieView source={require('../assets/splash')}
                                style={{height:200, width:200}}
                                loop
                                autoPlay
            />
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgMain
    }
})
