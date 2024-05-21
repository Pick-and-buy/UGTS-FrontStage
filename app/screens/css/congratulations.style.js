import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        marginVertical: 20,
        marginHorizontal: 80,
        fontSize: 35,
        color: COLORS.primary,
    },
    content: {

    },
    btnStyle: {
        height: 60,
        width: "50%",
        marginVertical: 20,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        marginLeft: "6%",
        top: "12%"
    }, 
    btnTxt: {
        fontFamily: "bold",
        color: COLORS.white,
        fontSize: 18,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;