import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width:"100%",
        height:"50%",
        position:"relative",
        top:-25
    },
    image: {
        width: "100%",
        height: SCREEN_WIDTH - 100,
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
        top: "40%",
    },
    sildeNumber: {
        position: "absolute",
        left: "48%",
        bottom: "-210%",
        color: COLORS.white,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 10,
        textAlign: "center",

    },
    button: {
        padding: 5,
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