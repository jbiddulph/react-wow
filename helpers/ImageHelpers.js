import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {Platform} from "react-native";


export const openImageLibrary = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(status !== 'granted') {
        alert('Sorry we need camera permission to select an image')
        return false
    } else {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect:[1,1],
            base64: true
        })

        return !result.cancelled ? result : false
    }
}

export const openCamera = async () => {
    const {status} = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
    );
    if(status !== 'granted') {
        alert('Sorry we need camera permission to select an image')
        return false
    } else {
        const result = await ImagePicker.launchCameraAsync({
            quality:0.4,
            allowsEditing: Platform.OS == 'ios'?false:true,
            aspect:[4,3],
            base64: true
        })

        return !result.cancelled ? result : false
    }
}
export const prepareBlob = async imageUri => {
    const blob = await new Promise((resolve, reject) => {

        //New Request
        const xml = new XMLHttpRequest()

        //Success resolved
        xml.onload = function() {
            resolve(xml.response)
        }
        //error threw new error
        xml.onerror = function (e) {
            console.log(e)
            reject(new TypeError('Image Upload Failed'))
        }
        //set response type to get the blob
        xml.responseType = 'blob'
        xml.open('GET', imageUri,true)
        //send the request
        xml.send()
    })

    return blob
}

