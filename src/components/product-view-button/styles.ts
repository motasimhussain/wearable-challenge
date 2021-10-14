import {StyleSheet} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        backgroundColor: '#303371',
        width: 100
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'RobotoBold',
        fontSize: RFValue(14)
    }
})