import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import  propTypes  from 'prop-types';
import {Ionicons} from '@expo/vector-icons';
import colors from "../assets/colors";

const ReportCount = ({title, icon, count}) => (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <Ionicons name={icon} size={40} color={colors.logoColor} style={{position:'relative'}}/>
            { count > 0?
            <View style={{position:'absolute', top:5, right:25, backgroundColor: 'red',  borderRadius: 100, paddingRight: 6, paddingLeft: 6}}>
                <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>{count}</Text>
            </View>
            :null }
            <Text style={{fontSize: 14}}>
                {title}
            </Text>
        </View>
    )

ReportCount.propTypes = {
    count: propTypes.number.isRequired,
    title: propTypes.string
}

ReportCount.defaultProps = {
    title: 'Total'
}
export default ReportCount
