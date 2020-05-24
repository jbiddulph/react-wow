import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert, Image } from 'react-native';
import ReportCount from '../components/ReportCount';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CustomActionButton from '../components/CustomActionButton';
import colors from '../assets/colors';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { snapshotToArray } from '../helpers/firebaseHelpers';
import ListItem from "../components/ListItem";
import AddReportModal from "../components/AddReportModal";

class HomeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            currentUser: {},
            totalCount: 0,
            readingCount: 0,
            readCount: 0,
            textInputData: '',
            reports: [],
            reportsNew: [],
            reportsSaved: [],
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
            currentUser: currentUserData.val(),
            reports: reportsArray,
            reportsNew: reportsArray.filter(report => !report.saved),
            reportsSaved: reportsArray.filter(report => report.saved),
        })
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
                const key = await firebase.database().ref('reports').child
                    (this.state.currentUser.uid).push().key

                const response = await firebase.database().ref('reports').child(this.state.currentUser.uid).child(key)
                    .set(report)
                this.setState((state, props) => ({
                    reports: [...state.reports, report],
                    reportsNew: [...state.reportsNew, report],
                }), () => { })
                console.log(this.state.reports)
                // setModalOpen(false)
            //}
        } catch (error) {
            console.log(error)
        }
    }
    markAsRead = async (selectReport, index) => {
        try {
            await firebase.database().ref('reports').child(this.state.currentUser.uid).child(selectReport.key).update({ saved: true })
            let reports = this.state.reports.map(report => {
                if (report.name == selectReport.name) {
                    return { ...report, saved: true }
                }
                return report
            })
            let reportsNew = this.state.reportsNew.filter(report => report.name !== selectReport.name)

            this.setState(prevState => ({
                reports,
                reportsNew,
                reportsSaved: [...prevState.reportsSaved, { name: selectReport.name, saved: true }]
            }))
        } catch (error) {
            console.log(error)
        }
    }
    renderItem = (item, index) => (
        <ListItem item={item}>
            {item.saved ? (
                <Ionicons name="ios-checkmark" color={colors.logoColor} size={30} />
            ) : (
                    <CustomActionButton style={styles.markAsReadButton} onPress={() => this.markAsRead(item, index)}>
                        <Text style={styles.markAsReadButtonText}>Mark as read</Text>
                    </CustomActionButton>
                )}
        </ListItem>
        // <View style={styles.listItemContainer}>
        //     <View style={styles.imageContainer}>
        //         <Image source={require('../assets/icon.png')} style={styles.image}/>
        //     </View>
        //     <View style={styles.listItemTitleContainer}>
        //         <Text style={styles.listItemTitle}>{item.name}</Text>
        //     </View>

        // </View>
    )
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.header}>
                    <MaterialIcons name='menu' size={32} onPress={this.openMenu} style={styles.menu} />
                    <Text style={styles.headerTitle}>Watch Out Worthing</Text>
                    <AddReportModal addReport={this.addReport} />
                </View>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.reports}
                        renderItem={({ item }, index) => this.renderItem(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={
                            <View style={styles.listEmptyComponent}>
                                <Text style={styles.listEmptyComponentTitle}>There are currently no reports</Text>
                            </View>
                        }
                    />
                </View>
                <View style={styles.footer}>
                    <ReportCount title='Total' icon='ios-archive' count={this.state.reports.length} />
                    <ReportCount title='New' icon='ios-document' count={this.state.reportsNew.length} />
                    <ReportCount title='Saved' icon='ios-heart' count={this.state.reportsSaved.length} />
                </View>
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
export default HomeScreen
