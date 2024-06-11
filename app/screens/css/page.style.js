import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const pages = StyleSheet.create({
    viewOne: {
        backgroundColor: COLORS.white,
        height: SIZES.height,
        justifyContent: "center",
        alignItems: "center",
    },
    viewTwo: {
        backgroundColor: COLORS.white,
        height: SIZES.height,
        width: "100%"
    },
    viewThree: {
        backgroundColor: COLORS.offwhite,
        height: SIZES.height - 80,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
    },
});

export default pages;