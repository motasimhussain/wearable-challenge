import React from "react";
import {ImageBackground, SafeAreaView, View} from "react-native";


import ProductCarousel, {ProductCarouselItem} from '../components/product-carousel';
import {ProfileImage} from "../components/profile-image";
import {ProfileName} from "../components/profile-name";
import {ProductCounter} from "../components/product-counter";

import MoonStone from '../../assets/products/moon-stone.png';
import Sapphire from '../../assets/products/sapphire.png';
import AddIcon from '../../assets/add-icon.png';
import {styles} from "./styles";

const data: ProductCarouselItem[] = [
    {
        id: 0,
        uri: MoonStone,
        title: 'Moonstone Keychain',
        description: 'Choosing the Best Gemstone for Your Necklace and Jewelry',
        buttonText: 'View'
    },
    {
        id: 1,
        uri: Sapphire,
        title: 'Sapphire Keychain',
        description: 'Choosing the Best Gemstone for Your Necklace and Jewelry',
        buttonText: 'View'
    },
    {
        id: 2,
        uri: 'a',
        title: 'Add a Wearable',
        description: 'Don\'t See One You Like? Choosing the Best Gemstone for Your Necklace and Jewelry',
        optionalIcon: AddIcon
    },
];

export const WearablePage: React.FC = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/backgrounds/main/Background.png')}
                resizeMode="cover"
                style={styles.background}>
                <SafeAreaView style={styles.profileContainer}>
                    <ProfileImage src={require('../../assets/profile-images/dp.jpeg')}/>
                    <ProfileName text={"John Doe"}/>
                    <View style={styles.productCounterContainer}>
                        <ProductCounter count={data.length - 1}/>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={{...styles.container, ...styles.carouselContainer}}>
                    <ProductCarousel data={data}/>
                </SafeAreaView>

            </ImageBackground>

        </View>
    );
}