import { StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        width: 130,
        height: 130,
        borderRadius: 10,
        overflow: 'hidden',
    },
    wrapper: {
        width: "100%",
        height: "100%",
        overflow: 'hidden',
    },
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    text: {
        color: COLORS.white,
        fontWeight: "400",
        fontSize: 14,
        position: "absolute",
        bottom: 4,
        left: 6
    },
    currency: {
        textDecorationLine: 'underline',
        fontSize: 14,
    },
});

export default styles;
