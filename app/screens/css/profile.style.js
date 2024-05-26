import { StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
    text: {
        marginLeft: 10,
        fontFamily: "medium",
        color: COLORS.black,
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
        marginTop: 60,
    },
    loginbtn: {
        width: 90,
        height: 30,
        borderRadius: 40,
        borderColor: COLORS.primary,
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },
    textbtn: {
        color: COLORS.primary,
    },
    options: {
        width: '100%',
        height: '10%',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    option: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;