import React, { useState, setState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { globalStyles } from '../styles/global';
import colors from '../assets/colors';

export default class AddReportForm extends React.Component {

    constructor(props) {
        super(props);
        state = {
            errorMessage: ''
        }
    }

    render() {
        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Formik
                        initialValues={{ name: '', latitude: this.props.latitude, longitude: this.props.longitude, read: false, saved: false }}
                        onSubmit={(values, actions) => {
                            this.props.addReport(values)
                            actions.resetForm()
                        }}
                    >
                        {(props) => (
                            <View>
                                <TextInput
                                    multiline
                                    style={styles.input}
                                    placeholder='Name'
                                    onChangeText={props.handleChange('name')}
                                    value={props.values.name}
                                />
                                <View style={globalStyles.button}>
                                    <Button
                                        color={colors.btnTextColor}
                                        title='Submit' onPress={props.handleSubmit}
                                    />
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.bgMain
    },
    input: {
        borderBottomWidth: 3,
        borderBottomColor: 'yellow',
        color: 'yellow',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15,
        lineHeight: 34,
        fontSize: 22,
        marginBottom: 20
    }
})
