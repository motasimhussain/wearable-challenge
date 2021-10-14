import React from "react";
import {View} from "react-native";
import {styles} from "./styles";

export const TabDots: React.FC<{
    numDots: number,
    activeIndex: number

}> = ({numDots, activeIndex = 0}) => {

    let dots = [];
    for (let i = 0; i < numDots; i++) {
        let currentStyle = i === activeIndex ? styles.dotActive : styles.dotInactive;
        dots.push(<View key={i} style={[styles.dot, currentStyle]}/>);
    }

    return <>{dots}</>;
}

