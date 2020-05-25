import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import colors from '../assets/colors';
import CustomActionButton from './CustomActionButton';

const ListItem = ({item, children, marginVertical, editable, onPress}) => (
            <View style={[styles.listItemContainer, {marginVertical}]}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        disabled={!editable}
                        style={{flex:1}}
                        onPress={()=>onPress(item)}>
                        <Image source={require('../assets/icon.png')} style={styles.image}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.listItemTitleContainer}>
                    <Text style={styles.listItemTitle}>{item.name}</Text>
                </View>
                {children}
            </View>
        )

ListItem.defaultProps = {
    marginVertical: 5,
    editable: false
}
export default ListItem;

const styles = StyleSheet.create({
    listItemContainer: {
        minHeight:100,
        flexDirection: 'row',
        backgroundColor: colors.listItemBg,
        alignItems:'center'
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
