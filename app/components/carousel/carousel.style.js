import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: 380,
    },
    image: {
        width: "100%",
        height: SCREEN_WIDTH,
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
        width: "96%",
        position: "absolute",
        top: "50%",
    },
    sildeNumber: {
        position: "absolute",
        left: "48%",
        top: 140,
        color: COLORS.white,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 10,
        textAlign: "center",

    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 99,
        justifyContent: "center",
        alignItems: "center",
    },
    hiddenButton: {
        opacity: 0,
    },
})

export default styles