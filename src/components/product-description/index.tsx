import React from "react";
import {Text, View} from "react-native";
import {styles} from "./styles";

export const ProductDescription: React.FC<{
    description: string
}> = ({description}) => {
    return (
        <View>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

