import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    wrapper: {
        // flex: 1,
        width: '96%',
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "15%",
        marginHorizontal: "auto"
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        marginHorizontal: "auto",
        // marginRight: "40%",
    },
    posts: {
        width: '100%',
        marginTop: 20,
        marginHorizontal: "auto",
    },
    row: {
        width: "100%",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginHorizontal: "auto",

    },



});

export default styles;