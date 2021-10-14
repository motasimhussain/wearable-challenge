import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";


export const ProductCounter: React.FC<{
    count: number
}> = ({count}) => {
    return (
        <View style={styles.label}>
            <Text>You have {count} Products</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: "RobotoRegular",
        fontSize: RFValue(14),
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15
    }
})