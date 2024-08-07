import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: (windowWidth / 3) - 12,
        height: (windowWidth / 3) - 12,
        borderRadius: 10,
        overflow: 'hidden',
        margin: 4.6, // Added margin between posts
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
    label: {
        position: 'absolute',
        top: 10,
        left: -40,
        width: "100%",
        height: 25,
        backgroundColor: COLORS.primary,
        transform: [{ rotate: '-45deg' }],
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelText: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: 14
    },
    text: {
        color: COLORS.white,
        fontWeight: "600",
        fontSize: 14,
        position: "absolute",
        bottom: 6,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingLeft: 6,
        paddingRight: 6,
        paddingVertical: 2,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
    },
    currency: {
        textDecorationLine: 'underline',
        fontSize: 14,
    },
});

export default styles;
