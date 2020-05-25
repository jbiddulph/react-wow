import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import colors from "../../assets/colors";
import ListItem from "../../components/ListItem";
import {connect} from "react-redux";
import ListEmptyComponent from "../../components/ListEmptyComponent";

class ReportsReadingScreen extends Component {

    renderItem = (item) => {
        return <ListItem item={item}/>
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.reports.isLoadingReports && (
                    <View style={{...StyleSheet.absoluteFill,align:'center',justifyContent:'center',zIndex: 1000, elevation: 1000 }}>
                        <ActivityIndicator size="large" color={colors.logoColor}/>
                    </View>
                )}
                <FlatList
                    data={this.props.reports.reportsReading}
                    renderItem={({ item }, index) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}

                    ListEmptyComponent={
                        !this.props.reports.isLoadingReports && (
                            <ListEmptyComponent text="No new reports"/>
                        )
                    }

                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reports: state.reports
    }
}

export default connect(mapStateToProps)(ReportsReadingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: colors.bgMain
    }
})

