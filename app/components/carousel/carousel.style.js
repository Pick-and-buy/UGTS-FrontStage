import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    image: {
        width: "72%",
        height: SCREEN_WIDTH - 10,
        resizeMode: "contain",
        borderRadius: 5,
    },
    text: {
        position: "absolute",
        top: 10,
        right: 15,
        color: "black"
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "98%",
        position: "absolute",
        top: "30%",
    },
    sildeNumber: {
        position: "absolute",
        left: "48%",
        bottom: "-140%",
        color: COLORS.white,
        backgroundColor: "#7E7A77",
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 10,
        textAlign: "center",

    },
    button: {
        padding: 10,
        backgroundColor: "#F3F3F3",
        borderRadius: 99,
        justifyContent: "center",
        alignItems: "center",
    },
    hiddenButton: {
        opacity: 0,
    },
})

export default styles