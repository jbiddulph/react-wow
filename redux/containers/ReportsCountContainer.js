import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import colors from "../../assets/colors";
import PropTypes from 'prop-types';

const ReportsCountContainer = ({color,type,...props}) => {
    return (
        <View style={styles.container}>
            <Text style={{color:color}}>{props.reports[type].length || 0}</Text>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        reports: state.reports
    }
}


ReportsCountContainer.defaultProps = {
    color: colors.txtPlaceholder
}

ReportsCountContainer.propTypes = {
    color:PropTypes.string,
    type:PropTypes.string.isRequired
}
export default connect(mapStateToProps)(ReportsCountContainer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
