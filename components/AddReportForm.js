import React, { useState, setState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { globalStyles } from '../styles/global';
import colors from '../assets/colors';
import * as yup from 'yup';
import FlatButton from '../shared/button';

const reviewSchema = yup.object({
    name: yup.string()
        .required()
        .min(4)
})

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
                        validationSchema={reviewSchema}
                        onSubmit={(values, actions) => {
                            actions.resetForm()
                            this.props.addReport(values)
                        }}
                    >
                        {(props) => (
                            <View>
                                <TextInput
                                    minHeight={60}
                                    multiline
                                    style={styles.input}
                                    placeholder='Your report here...'
                                    onChangeText={props.handleChange('name')}
                                    value={props.values.name}
                                    onBlur={props.handleBlur('name')}
                                />
                                <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text>
                                <FlatButton text='submit' onPress={props.handleSubmit}/>
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
        borderBottomColor: colors.yellow,
        color: colors.yellow,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15,
        lineHeight: 34,
        fontSize: 22,
        marginBottom: 20
    }
})
