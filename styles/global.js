import { StyleSheet } from 'react-native';
import colors from "../assets/colors";

export const globalStyles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    paragraph: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        marginVertical: 8,
        lineHeight: 20,
        fontSize: 16,
        color: colors.txtWhite
    },
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 15
    },
    errorText: {
        color: '#ff6699',
        marginBottom: 20,
        fontWeight: 'bold'
    }
})

// export const images = {
//     ratings: {
//         '1': require('../assets/rating-1.png'),
//         '2': require('../assets/rating-2.png'),
//         '3': require('../assets/rating-3.png'),
//         '4': require('../assets/rating-4.png'),
//         '5': require('../assets/rating-5.png'),
//     }
// }
