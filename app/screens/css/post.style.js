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
        fontWeight: "600",
        fontSize: 14,
        position: "absolute",
        bottom: 6,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingLeft:6,
        paddingRight:6,
        paddingVertical:2,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        justifyContent: 'center',
        alignItems:"center",
    },
    currency: {
        textDecorationLine: 'underline',
        fontSize: 14,
    },
});

export default styles;
