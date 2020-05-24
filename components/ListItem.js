import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import colors from '../assets/colors';
import CustomActionButton from './CustomActionButton';

const ListItem = ({item, children}) => {
        return (
            <View style={styles.listItemContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/icon.png')} style={styles.image}/>
                </View>
                <View style={styles.listItemTitleContainer}>
                    <Text style={styles.listItemTitle}>{item.name}</Text>
                </View>
                {children}
            </View>
        )
}

export default ListItem;

const styles = StyleSheet.create({
    listItemContainer: {
        minHeight:100,
        flexDirection: 'row',
        backgroundColor: colors.listItemBg,
        alignItems:'center',
        marginVertical: 5
    },
    listItemTitle: {
        fontWeight: '100',
        fontSize: 22,
        color: colors.txtWhite,

    },
    imageContainer: {
        height: 70,
        width: 70,
        marginLeft:10
    },
    image: {
        flex: 1,
        height: null,
        width: null,
        borderRadius: 35
    },
    listItemTitleContainer: {
        flex:1,
        justifyContent: 'center',
        paddingLeft: 5
    },
})
