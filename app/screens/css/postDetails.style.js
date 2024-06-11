import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        width: "100%",
        height: "100%",
    },
    header: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        backgroundColor: COLORS.white,
        paddingBottom: 12,
        ...SHADOWS.medium
    },
    headerText: {
        color: COLORS.black,
        fontSize: 18
    },
    carousel: {
        height: "20%",
    }
})
export default styles

