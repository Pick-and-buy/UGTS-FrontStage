import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        position: "relative",
    },
    header: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "flex-end",
        backgroundColor: COLORS.white,
        paddingBottom: 12,
        ...SHADOWS.small
    },
    backButton:{
        marginLeft:"3%"
    },
    headerText: {
        color: COLORS.black,
        fontSize: 20,
        width: "65%",
        marginBottom: 4,
        fontWeight: "bold",
        marginLeft: "auto"
        // textAlign: "right",
    },
    divider: {
        height: 3,
        backgroundColor: "#F3F3F3",
        marginTop: 15
    },
    formContainer: {
        width: "96%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
    dropdownContainer: {
        width: "94%",
        marginHorizontal: "auto",
        // paddingHorizontal: 10,
    },
    label: {
        marginBottom: 10,
        marginTop: 30,
        backgroundColor: COLORS.background,
    },
    labelText: {
        fontSize: 16,
        color: COLORS.gray,
        marginHorizontal: 20,
    },
    dropdown: {
        marginBottom: 10,
        height: 50,
        borderColor: "#ddd",
        borderBottomWidth: 1,
    },
    errorText: {
        fontSize: 14,
        color: 'red',
    },
    input: {
        width: "94%",
        marginHorizontal: "auto",
        marginBottom: 10,
        height: 50,
        borderColor: "#ddd",
        borderBottomWidth: 1,
        fontSize: 16,

    },
    bottomBtn: {
        flexDirection: 'row',
        height: "10%",
        backgroundColor: '#fff',
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 999,
        backgroundColor: COLORS.white,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    button: {
        width: "60%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderColor: COLORS.gray2,
        marginHorizontal: "auto",
        marginVertical: 'auto',
        borderRadius: 8
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    toggle: {
        backgroundColor: COLORS.white,
        width: "94%",
        marginHorizontal: "auto",
        borderRadius: 8,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }

});

export default styles;
