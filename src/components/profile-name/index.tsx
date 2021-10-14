import React from "react";
import {Text} from "react-native";
import {styles} from "./styles";


export const ProfileName: React.FC<{
    text: string
}> = ({text}) => {
    return (
        <>
            <Text style={styles.text}>{text}</Text>
        </>
    )
}

