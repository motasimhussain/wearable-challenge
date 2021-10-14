import React from "react";
import {Text, View} from "react-native";
import {styles} from "./styles";

export const ProductTitle: React.FC<{
    title: string
}> = ({title}) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}
