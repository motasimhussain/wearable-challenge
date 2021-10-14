import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    View,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {TabDots} from "../tab-dots";
import {ProductTitle} from "../product-title";
import {ProductDescription} from "../product-description";
import {ProductViewButton} from "../product-view-button";

const {width} = Dimensions.get('window');

const SPACING = 5;
const ITEM_LENGTH = width * 0.7;
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const BORDER_RADIUS = 20;
const CURRENT_ITEM_TRANSLATE_Y = 28;

export interface ProductCarouselItem {
    id: number;
    uri?: any;
    title?: string;
    description?: string;
    buttonText?: string;
    optionalIcon?: any;
}

interface ProductCarouselProps {
    data: ProductCarouselItem[];
}

const ProductCarousel: FC<ProductCarouselProps> = ({data}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [dataWithPlaceholders, setDataWithPlaceholders] = useState<ProductCarouselItem[]>([]);
    const currentIndex = useRef<number>(0);
    const flatListRef = useRef<FlatList<any>>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        setDataWithPlaceholders([{id: -1}, ...data, {id: data.length}]);
        currentIndex.current = 1;
    }, [data]);

    const handleOnViewableItemsChanged = useCallback(
        ({viewableItems}) => {
            const itemsInView = viewableItems.filter(
                ({item}: { item: ProductCarouselItem }) => item.uri && item.title,
            );

            if (itemsInView.length === 0) {
                return;
            }

            currentIndex.current = itemsInView[0].index;

            setActiveIndex(currentIndex.current);
        },
        [data],
    );


    const getItemLayout = (_data: any, index: number) => ({
        length: ITEM_LENGTH,
        offset: ITEM_LENGTH * (index - 1),
        index,
    });

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={dataWithPlaceholders}
                renderItem={({item, index}) => {
                    if (!item.title || !item.uri) {
                        return <View style={{width: EMPTY_ITEM_LENGTH}}/>;
                    }

                    const inputRange = [
                        (index - 2) * ITEM_LENGTH,
                        (index - 1) * ITEM_LENGTH,
                        index * ITEM_LENGTH,
                    ];

                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [
                            CURRENT_ITEM_TRANSLATE_Y * 2,
                            CURRENT_ITEM_TRANSLATE_Y,
                            CURRENT_ITEM_TRANSLATE_Y * 2,
                        ],
                        extrapolate: 'clamp',
                    });

                    return (
                        <View style={{width: ITEM_LENGTH, height: hp(47)}}>
                            <Animated.View
                                style={[
                                    {transform: [{translateY}]},
                                    styles.itemContent
                                ]}>
                                <View style={styles.contentContainer}>
                                    <View>
                                        <Image source={item.uri} style={styles.itemImage}/>
                                    </View>
                                    <View style={styles.innerContentContainer}>
                                        {(item.optionalIcon) ? (
                                            <Image source={item.optionalIcon} style={styles.optionalIcon}/>
                                        ) : null}
                                        <ProductTitle title={item.title}/>
                                        <View style={{height: hp(1)}}></View>
                                        <ProductDescription description={item.description}/>
                                        {(item.buttonText) ? (
                                            <View style={{flexDirection: 'column-reverse', flex: 1}}>
                                                <ProductViewButton text={"View"}/>
                                            </View>
                                        ) : null}

                                    </View>
                                </View>
                            </Animated.View>
                        </View>
                    );
                }}
                getItemLayout={getItemLayout}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                bounces={false}
                decelerationRate={0}
                renderToHardwareTextureAndroid
                contentContainerStyle={styles.flatListContent}
                snapToInterval={ITEM_LENGTH}
                snapToAlignment="start"
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false},
                )}
                scrollEventThrottle={16}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100,
                }}
            />
            <View style={styles.footer}>
                <TabDots numDots={data.length} activeIndex={activeIndex - 1}/>
            </View>
        </View>
    );
};

export default ProductCarousel;

const styles = StyleSheet.create({
    container: {flex: 1},
    contentContainer: {
        height: hp(1),
        flex: 1,
        flexDirection: 'column'
    },
    innerContentContainer: {
        bottom: hp(10),
        height: hp(35),
        paddingVertical: hp(1),
        paddingHorizontal: wp(5)
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: hp(3),
        backgroundColor: 'transparent'
    },
    flatListContent: {
        height: hp(60),
        alignItems: 'center',
        marginBottom: CURRENT_ITEM_TRANSLATE_Y,
    },
    item: {},
    itemContent: {

        height: hp(60),
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: SPACING * 3,
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: BORDER_RADIUS + SPACING * 2,
    },
    itemImage: {
        alignSelf: 'center',
        width: wp(60),
        height: hp(20),
        bottom: hp(8),
        resizeMode: 'contain'
    },
    optionalIcon: {
        marginTop: hp(-4),
        marginBottom: hp(1),
        width: wp(20),
        height: hp(10),
        resizeMode: 'contain',
        alignSelf: 'center'
    }
});