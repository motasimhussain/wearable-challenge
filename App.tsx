import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {View} from 'react-native';
import {WearablePage} from "./src/pages/wearable-page";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {MaterialIcons} from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import {Asset} from "expo-asset";
import {useFonts} from "expo-font";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import RobotoRegular from './assets/fonts/Roboto/Roboto-Regular.ttf';
import RobotoBold from './assets/fonts/Roboto/Roboto-Bold.ttf';
import RobotoMedium from './assets/fonts/Roboto/Roboto-Medium.ttf';
import RobotoThin from './assets/fonts/Roboto/Roboto-Thin.ttf';
import {styles} from "./app-styles";

const Tab = createBottomTabNavigator()


export default function App() {
    const [isReady, setIsReady] = useState(false);
    let [fontsLoaded] = useFonts({
        "RobotoRegular": RobotoRegular,
        "RobotoMedium": RobotoMedium,
        "RobotoBold": RobotoBold,
        "RobotoThin": RobotoThin,
    })

    if (!isReady || !fontsLoaded) {
        return (
            <AppLoading
                startAsync={_cacheResourcesAsync}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        );
    }
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <StatusBar style="auto"/>

                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: {
                            borderTopColor: '#fff',
                            backgroundColor: 'transparent',
                            elevation: 0,
                            height: hp(12),
                            justifyContent: 'center',
                        },
                        tabBarLabelStyle: {
                            flex: 1,
                            fontSize: 12
                        },
                        tabBarActiveTintColor: '#000',
                        tabBarInactiveTintColor: '#A0A9B7'
                    }}

                >
                    <Tab.Screen
                        name="Wearables"
                        component={WearablePage}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({color}) => <MaterialIcons name='category' size={26} style={{color: color}}/>
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={WearablePage}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({color}) => <MaterialIcons name='face' size={26} style={{color: color}}/>
                        }}
                    />
                    <Tab.Screen
                        name="Help"
                        component={WearablePage}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({color}) => <MaterialIcons name='help' size={26} style={{color: color}}/>
                        }}
                    />
                </Tab.Navigator>
            </View>
        </NavigationContainer>
    );
}

const _cacheResourcesAsync = (): Promise<any> => {
    console.log("Caching Resources");

    const images: string[] = [
        require('./assets/backgrounds/main/Background.png'),
        require('./assets/profile-images/dp.jpeg'),
        require('./assets/products/sapphire.png'),
        require('./assets/products/moon-stone.png'),
    ];

    const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
}


