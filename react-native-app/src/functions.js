import Toast from "react-native-toast-message";
import { firebase } from "../config";

const messageToast = (type, header, message, timeOut = 1500) => {
    Toast.show({
        type: type,
        visibilityTime: timeOut,
        text1: header,
        text2: message,
    });
}

const getStringDate = () => {
    let date = new Date();
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    let year = String(date.getFullYear());
    let hour = String(date.getHours());
    let minute = String(date.getMinutes());
    let second = String(date.getSeconds());

    return year + month + day + hour + minute + second;
}

export {messageToast, getStringDate}