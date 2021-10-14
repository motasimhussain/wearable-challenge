import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: hp(7)
    },
    productCounterContainer:{
        paddingTop: hp(2)
    },
    carouselContainer: {
        alignItems: "flex-start"
    },
    background: {
        flex: 1,
    }
});
