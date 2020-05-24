import React, { useState, useEffect, setState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import AddReportForm from "./AddReportForm";
import * as Location from 'expo-location';
import colors from "../assets/colors";
import {globalStyles} from "../styles/global";


export default function AddReportModal({ addReport }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    });

    let latitude = 'Waiting..';
    let longitude = 'Waiting..';
    if (errorMsg) {
        latitude = errorMsg;
    } else if (location) {
        latitude = JSON.stringify(location.coords.latitude);
        longitude = JSON.stringify(location.coords.longitude);
    }

    return (
        <View>
            <MaterialIcons
                name='add'
                size={32}
                onPress={() => setModalOpen(true)}
                style={styles.modalToggle}
            />

            <Modal visible={modalOpen} animationType='slide'>
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name='close'
                        size={32}
                        onPress={() => setModalOpen(false)}
                        style={{ ...styles.modalToggle, ...styles.modalClose }}
                    />
                    <Text style={globalStyles.paragraph}>Please type what you have found, your location will also be added, you will then be able to add a picture</Text>
                    <AddReportForm longitude={longitude} latitude={latitude} addReport={addReport} />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    modalClose: {
        marginTop: 40,
        marginBottom: 10
    },
    modalContent: {
        flex: 1,
        backgroundColor: colors.bgMain
    },
    modalText: {
        color: '#999'
    }
})
