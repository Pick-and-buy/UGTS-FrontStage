import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        width: '98%',
        marginHorizontal: "auto",
        marginTop: "10%"
    },
    notification: {
        width: "98%",
        marginHorizontal: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30%"
    },
    title: {
        fontWeight: "bold",
        fontSize: 26
    },
    subTitle: {
        width: "90%",
        marginHorizontal: "auto",
        marginTop: 20,
        marginBottom: 30
    },
    btnWrapper: {
        width: "90%",
        flexDirection: "row",
        marginHorizontal: "auto"
    },
    button: {
        width: "50%",
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderRadius: 6,
        marginHorizontal: "auto",
        marginBottom: 40
    },
    backButton: {
        width: "40%",
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderRadius: 6,
        marginHorizontal: "auto",
        marginBottom: 40
    },
    btnText: {
        marginLeft: 6,
        fontWeight: "500",
    },
    divider: {
        borderWidth: 0.5,
        borderColor: "#ccc"
    },
    recommendation: {
        width: "100%",
        marginTop: 10,
        marginHorizontal: "auto",
    },
    recommendationText: {
        marginHorizontal: "2%",
        fontSize: 16,
        fontWeight: "bold",
    },
    posts: {
        width: '98%',
        // marginTop: "-10%",
        marginHorizontal: "auto",
    },
    row: {
        width: "100%",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginHorizontal: "auto",
        marginBottom: "20%",
    },

});

export default styles;