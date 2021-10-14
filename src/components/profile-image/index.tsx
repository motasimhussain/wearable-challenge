import React from 'react';
import {Image} from "react-native";
import {styles} from "./styles";


export const ProfileImage: React.FC<{
    src: any
}> = ({src}) => {
    return (
        <>
            <Image style={styles.image} source={src}/>
        </>
    )
}

