import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: COLORS.background
    },
    info: {
        marginLeft: 4,
        marginTop: 0,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%"
    },
    text: {
        marginLeft: 10,
        fontFamily: "medium",
        color: COLORS.black,
        fontSize: 18,
    },
    ratingWrapper: {
        marginLeft: 10,
        marginTop: -6,
        flexDirection: "row",
        width: "100%",
    },
    verifyWrapper: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    email: {
        marginLeft: 10,
        fontFamily: "regular",
        color: COLORS.gray,
    },
    profile: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: "18%",
        marginBottom: 20
    },
    loginbtn: {
        borderRadius: 40,
        borderColor: COLORS.primary,
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "auto",
        marginLeft: 30,
        marginRight: 20,
        paddingVertical: 6,
        paddingHorizontal: 20,
        marginBottom: 10
    },
    textbtn: {
        color: COLORS.primary,
    },
    options: {
        width: '100%',
        // height: '6%',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: "#e4e4e4",
        borderTopWidth: 4,
    },
    option: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',

    },
    tip: {
        backgroundColor: "#0ccd72",
        width: "96%",
        height: 65,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: "auto"
    },
    triangle: {
        borderLeftWidth: 16,
        borderRightWidth: 16,
        borderBottomWidth: 16,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: "#0ccd72",
        position: "absolute",
        top: -16,
        left: "25%"
    },
    content: {
        width: "63%",
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "2%"
    },
    needed: {
        width: "35%",
        justifyContent: "center",
        alignItems: "center"
    },
    quickBtn: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 8,
        paddingVertical: 1,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.black,
        marginTop: 2
    }
});

export default styles;