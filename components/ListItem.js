import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import colors from '../assets/colors';
import CustomActionButton from './CustomActionButton';
import NetworkImage from 'react-native-image-progress'
// import * as Progress from 'react-native-progress/Circle';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

// const navigation = {navigation}

const ListItem = ({item, children, marginVertical, editable, onPress, navigate}) => (
        <TouchableOpacity
            style={{flex:1}}
            onPress={()=> this.props.navigation.navigate('ReportDetails', item)}
            >
            <View style={[styles.listItemContainer, {marginVertical}]}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        disabled={!editable}
                        style={{flex:1, zIndex:1000, elevation: 1000}}
                        onPress={()=>onPress(item)}>
                        {item.image ?
                            <NetworkImage source={{uri: item.image}} style={styles.image}
                                          // indicator={Progress.CircularProgress}
                                          indicator={()=> (<AnimatedCircularProgress size={70} width={5} fill={50} tintColor={colors.logoColor} backgroundColor={colors.bgMain} />)}
                                          indicatorProps={{
                                            size:40,
                                              borderWidth:0,
                                              color: colors.logoColor,
                                              unfilledColor: colors.bgMain
                                          }
                                          }
                                          imageStyle={{borderRadius:35}}
                            />
                            :
                            <Image source={require('../assets/icon.png')} style={styles.image}/>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.listItemTitleContainer}>
                    <Text style={styles.listItemTitle}>{item.name}</Text>
                </View>
                {children}
            </View>
        </TouchableOpacity>
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
