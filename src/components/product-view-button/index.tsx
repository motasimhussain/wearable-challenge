import React from "react";
import {Pressable, Text} from "react-native";
import {styles} from "./styles";

export const ProductViewButton: React.FC<{
    text: string
}> = ({text}) => {
    return (
        <Pressable style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

