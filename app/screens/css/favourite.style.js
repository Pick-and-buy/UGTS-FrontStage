import { StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: "row",
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'flex-end',
        ...SHADOWS.medium
    },
    title: {
        fontSize: 22,
        marginVertical: 10,
        fontWeight: "bold",
    },
    content: {
        width: "100%",
        marginTop: 16
    },
    row: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginHorizontal: "1%",
    }, 
    emptyMessage: {
        flex:1,
        fontSize: 16,
        textAlign: 'center',
        color: COLORS.gray,
        marginTop: 20,
    },
    loginPrompt: {
        flex:1,
        fontSize: 16,
        textAlign: 'center',
        color: COLORS.gray,
        marginTop: 20,
    },
})

export default styles