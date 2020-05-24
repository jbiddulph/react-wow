import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons"

export default function AddReportForm () {
        const [modalOpen, setModalOpen] = useState(false)
        return (
            <View>
                <MaterialIcons
                    name='add'
                    size={34}
                    onPress={() => setModalOpen(true)}
                    style={styles.modalToggle}
                />

                <Modal visible={modalOpen} animationType='slide'>
                    <View style={styles.modalContent}>
                        <MaterialIcons
                            name='close'
                            size={34}
                            onPress={() => setModalOpen(false)}
                            style={{...styles.modalToggle, ...styles.modalClose}}
                        />
                        <Text>HELLooooO</Text>
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
        padding:10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0
    },
    modalContent: {
        flex: 1
    }
})
