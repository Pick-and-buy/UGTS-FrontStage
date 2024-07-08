import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,

    },
    header: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        backgroundColor: COLORS.white,
        paddingBottom: 12,
        ...SHADOWS.small
    },
    headerText: {
        color: COLORS.black,
        fontSize: 20,
        width: "65%",
        marginBottom: 4,
        fontWeight: "bold",
    },
    addAddressContainer: {
        width: "100%",
        height: "5%",
    },
    addAddress: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "5%",
        marginTop: "1%"
    },
    addAddressLeft: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    divider: {
        height: 3,
        backgroundColor: "#F3F3F3",
        marginTop: 15
    },
    addressItem: {
        padding: 16,
        paddingHorizontal: "5%",
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addressName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    editText: {
        fontSize: 16,
        color: COLORS.primary,
    },
    addressDetails: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
    addressPhone: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
});

export default styles;