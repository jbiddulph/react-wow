import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert, Image, ActivityIndicator } from 'react-native';
import ReportCount from '../components/ReportCount';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CustomActionButton from '../components/CustomActionButton';
import colors from '../assets/colors';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import { snapshotToArray } from '../helpers/firebaseHelpers';
import ListItem from "../components/ListItem";
import AddReportModal from "../components/AddReportModal";
import {connect} from "react-redux";
import {compose} from 'redux';
import {connectActionSheet} from "@expo/react-native-action-sheet";
import store from "../redux/store";
import reports from "../redux/reducers/reportsReducer";
import ListEmptyComponent from "../components/ListEmptyComponent";
import Swipeout from "react-native-swipeout";
import * as ImageHelpers from '../helpers/ImageHelpers';

class HomeScreen extends React.Component {

    constructor({navigation}) {
        super()
        this.state = {
            currentUser: {},
            totalCount: 0,
            readingCount: 0,
            readCount: 0,
            textInputData: '',
            reports: [],
            reportsReading: [],
            reportsRead: [],
            reportData: {
                author: ''
            }
        }
    }
    componentDidMount = async () => {
        const { navigation } = this.props
        const user = navigation.getParam('user')
        const currentUserData = await firebase.database().ref('users').child(user.uid).once('value')
        const reports = await firebase.database().ref('reports').child(user.uid).once('value')
        const reportsArray = snapshotToArray(reports)
        this.setState({
            currentUser: currentUserData.val()
        })
        this.props.loadReports(reportsArray.reverse())
        this.props.toggleIsLoadingReports(false)
    }
    openMenu = () => {
        this.navigation.openDrawer()
    }
    addReport = async report => {
        try {
            // const [modalOpen, setModalOpen] = useState(false)
            // const snapshot = await firebase.database().ref('reports')
            //     .child(this.state.currentUser.uid).orderByChild('name').equalTo(report).once('value')
            // if (snapshot.exists()) {
            //     alert('Unable to add report as already exists')
            // } else {
                this.props.toggleIsLoadingReports(true)
                const key = await firebase.database().ref('reports').child
                    (this.state.currentUser.uid).push().key

                const response = await firebase.database().ref('reports').child(this.state.currentUser.uid).child(key)
                    .set(report)
                report.key = key
                this.props.addReport(report)
            this.props.toggleIsLoadingReports(false)
            //}
        } catch (error) {
            console.log(error)
            this.props.toggleIsLoadingReports(false)
        }
    }
    markAsRead = async (selectReport, index) => {
        try {
            this.props.toggleIsLoadingReports(true)
            await firebase.database().ref('reports').child(this.state.currentUser.uid).child(selectReport.key).update({ saved: true })
            let reports = this.state.reports.map(report => {
                if (report.name == selectReport.name) {
                    return { ...report, saved: true }
                }
                return report
            })
            let reportsReading = this.state.reportsReading.filter(report => report.name !== selectReport.name)
            this.props.markReportAsSaved(selectReport)
            this.props.toggleIsLoadingReports(false)
        } catch (error) {
            console.log(error)
            this.props.toggleIsLoadingReports(false)
        }
    }

    markAsUnread = async(selectReport,index) => {
        try {
            this.props.toggleIsLoadingReports(true)
            await firebase.database().ref('reports').child(this.state.currentUser.uid).child(selectReport.key).update({ saved: false })

            this.props.markReportAsUnsaved(selectReport)
            this.props.toggleIsLoadingReports(false)
        } catch (error) {
            console.log(error)
            this.props.toggleIsLoadingReports(false)
        }
    }

    deleteReport = async(selectReport,index) => {
        try{
            this.props.toggleIsLoadingReports(true)
            await firebase.database().ref('reports').child(this.state.currentUser.uid).child(selectReport.key).remove()
            this.props.deleteReport(selectReport)
            this.props.toggleIsLoadingReports(false)
        }catch (error) {
            console.log(error)
            this.props.toggleIsLoadingReports(false)
        }
    }

    uploadImage = async(image, selectReport) => {
        const ref = firebase.storage().ref('reports').child(this.state.currentUser.uid).child(selectReport.key)
        try {
            // converting to blob
            const blob = await ImageHelpers.prepareBlob(image.uri)
            const snapshot = await ref.put(blob)

            let downloadUrl = await ref.getDownloadURL()
            await firebase.database().ref('reports').child(this.state.currentUser.uid).child(selectReport.key).update({image:downloadUrl})
            blob.close()
            return downloadUrl
        } catch (error) {
            console.log(error)
        }
    }

    openImageLibrary = async(selectReport) => {
        const result = await ImageHelpers.openImageLibrary()
        if(result){
            this.props.toggleIsLoadingReports(true)
            const downloadUrl = await this.uploadImage(result,selectReport)
            this.props.updateReportImage({...selectReport,uri: downloadUrl})
            this.props.toggleIsLoadingReports(false)
        }
    }

    openCamera = async(selectReport) => {
        const result = await ImageHelpers.openCamera()
        if(result){
            this.props.toggleIsLoadingReports(true)
            const downloadUrl = await this.uploadImage(result,selectReport)
            this.props.updateReportImage({...selectReport,uri: downloadUrl})
            this.props.toggleIsLoadingReports(false)
        }
    }

    addReportImage = (selectReport) => {
        const options = ['Select from Photos', 'Camera', 'Cancel']
        const cancelButtonIndex = 2;

        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex
            },
            buttonIndex => {
                if (buttonIndex == 0)
                {
                    this.openImageLibrary(selectReport)
                } else if(buttonIndex == 1)
                {
                    this.openCamera(selectReport)
                }

            },
        )
    }

    renderItem = (item, index) => {
        let swipeoutButtons = [
                {
                    text: 'Delete',
                    component: (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Ionicons name="ios-trash" size={24} color={colors.txtWhite}/>
                        </View>
                    ),
                    backgroundColor: colors.bgDelete,
                    onPress: () => this.deleteReport(item,index)
                }
            ]
            if(!item.saved)
            {
                swipeoutButtons.unshift({
                    text: 'Save',
                    component: (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: colors.txtWhite}}>Save</Text>
                        </View>
                    ),
                    backgroundColor: colors.bgSuccessDark,
                    onPress: () => this.markAsRead(item,index)
                })
            } else {
                swipeoutButtons.unshift({
                    text: 'Unsave',
                    component: (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: colors.txtWhite}}>Unsave</Text>
                        </View>
                    ),
                    backgroundColor: colors.bgUnsave,
                    onPress: () => this.markAsUnread(item,index)
                })
            }
            return (
                <Swipeout
                    autoClose={true}
                    style={{marginHorizontal: 5, marginVertical: 5}}
                    backgroundColor={colors.bgMain}
                    right={swipeoutButtons}
                >
                    <ListItem onPress={() => this.addReportImage(item)} editable={true} marginVertical={0} item={item}>
                        {item.saved && (
                            <Ionicons style={{marginRight: 5}} name="ios-heart" color={colors.logoColor} size={30}/>
                        )}
                    </ListItem>
                </Swipeout>
            )
    }
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView />
                {/*<View style={styles.header}>*/}
                {/*    <MaterialIcons name='menu' size={32} onPress={this.openMenu} style={styles.menu} />*/}
                {/*    <Text style={styles.headerTitle}>Watch Out Worthing</Text>*/}
                {/*    */}
                {/*</View>*/}
                <AddReportModal
                    addReport={this.addReport}
                />
                <View style={styles.container}>
                    {this.props.reports.isLoadingReports && (
                        <View style={{...StyleSheet.absoluteFill,align:'center',justifyContent:'center',zIndex: 1000, elevation: 1000 }}>
                            <ActivityIndicator size="large" color={colors.logoColor}/>
                        </View>
                    )}
                    <FlatList
                        data={this.props.reports.reports}
                        renderItem={({ item }, index) => this.renderItem(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={
                            !this.props.reports.isLoadingReports && (
                                <ListEmptyComponent text="There are no reports yet"/>
                            )
                        }
                    />
                </View>
                {/*<View style={styles.footer}>*/}
                {/*    <ReportCount title='Total' icon='ios-archive' count={this.state.reports.length} />*/}
                {/*    <ReportCount title='New' icon='ios-document' count={this.state.reportsReading.length} />*/}
                {/*    <ReportCount title='Saved' icon='ios-heart' count={this.state.reportsRead.length} />*/}
                {/*</View>*/}
                <SafeAreaView />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgMain,
    },
    header: {
        height: 90,
        borderBottomWidth: 0.5,
        borderColor: colors.borderColor,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    headerTitle: {
        fontSize: 24
    },
    textInput: {
        flex: 1,
        backgroundColor: colors.bgTextInput,
        paddingLeft: 10
    },
    checkMarkButton: {
        backgroundColor: colors.bgSuccess
    },
    listItemContainer: {
        minHeight: 100,
        flexDirection: 'row',
        backgroundColor: colors.listItemBg,
        alignItems: 'center',
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
        marginLeft: 10
    },
    image: {
        flex: 1,
        height: null,
        width: null,
        borderRadius: 35
    },
    listItemTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5
    },
    listEmptyComponent: {
        marginTop: 50,
        alignItems: 'center'
    },
    listEmptyComponentTitle: {
        fontWeight: 'bold'
    },
    markAsReadButton: {
        width: 100,
        backgroundColor: colors.bgSuccess
    },
    markAsReadButtonText: {
        fontWeight: 'bold',
        color: 'white'
    },
    footer: {
        height: 80,
        borderTopWidth: 0.5,
        borderColor: colors.borderColor,
        flexDirection: 'row'
    },
    menu: {
        color: colors.logoColor
    }
});

const mapStateToProps = state => {
    return {
        reports: state.reports
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadReports: reports => dispatch({type:'LOAD_REPORTS_FROM_SERVER', payload: reports}),
        addReport: report => dispatch({type:'ADD_REPORT', payload: report}),
        markReportAsSaved: report => dispatch({type:'MARK_REPORT_AS_SAVED', payload: report}),
        markReportAsUnsaved: report => dispatch({type:'MARK_REPORT_AS_UNSAVED', payload: report}),
        toggleIsLoadingReports: bool => dispatch({type:'TOGGLE_IS_LOADING_REPORTS', payload: bool}),
        deleteReport: report => dispatch({type:'DELETE_REPORT', payload: report}),
        updateReportImage: report => dispatch({type:'UPDATE_REPORT_IMAGE', payload: report})
    }
}

const wrapper = compose(
    connect(mapStateToProps,mapDispatchToProps),
    connectActionSheet
)

export default wrapper(HomeScreen)
