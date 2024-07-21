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
        justifyContent: "space-around",
        alignItems: "flex-end",
        backgroundColor: COLORS.white,
        paddingBottom: 12,
        ...SHADOWS.medium
    },
    headerText: {
        color: COLORS.black,
        fontSize: 20,
        width: "65%",
        marginBottom: 4,
        fontWeight: "bold",
    },
    wrapper: {
        paddingBottom: "10%",
        width: "100%",
        marginHorizontal: "auto",
    },
    address: {
        width: "92%",
        justifyContent: "center",
        alignItems: "flex-start",
        marginHorizontal: "auto",
        marginVertical: 10
    },
    ownerAddress: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    ownerName: {
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 6
    },
    locationDetails: {
        width: "85%",
        marginLeft: "7%",
        marginTop:6
    },
    locationText: {
        color: COLORS.gray
    },
    slanted: {
        height: 20,
        overflow: 'hidden',
        marginTop: -10
    },
    information: {
        width: "100%",
    },
    product: {
        // flex:1,
        width: "96%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: "auto",
        marginTop: 20
    },
    productImage: {
        width: 135,
        height: 115,
        objectFit: "cover",
        borderRadius: 6
    },
    content: {
        marginLeft: 6,

    },
    productName: {
        fontSize: 18,
        fontWeight: "500",
        color: COLORS.black
    },
    productDescription: {
        color: COLORS.gray,
        fontSize: 14
    },
    label: {
        flexDirection: "row",
        gap: 10,
        marginVertical: 4
    },
    verifiedLabel: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 2,
        gap: 4
    },
    returnLabel: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 2,
        gap: 4
    },
    currency: {
        textDecorationLine: 'underline',
    },
    price: {
        fontSize: 30,
        color: COLORS.primary,
        marginBottom: 10,
    },
    relatedInformation: {
        width: "96%",
        marginHorizontal: "auto",
    },
    transport: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2,
    },
    transportFrom: {
        flexDirection: "row",
        gap: 3,
        marginTop: 2

    },
    transportTime: {
        flexDirection: "row",
        gap: 5,
        marginTop: 2
    },
    summary: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 6
    },
    divider: {
        height: 10,
        backgroundColor: "#F3F3F3",
        marginTop: 15
    },
    total: {
        width: "96%",
        marginHorizontal: "auto",
    },
    totalHeader: {
        fontSize: 18,
        fontWeight: "400",
        marginVertical: 10,

    },
    totalPrice: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    totalLeft: {
        alignItems: "flex-start",
    },
    totalRight: {
        alignItems: "flex-end",
    },
    totalText: {
        fontSize: 14,
        color: COLORS.gray
    },
    paymentMethods: {
        width: "96%",
        marginHorizontal: "auto",
    },
    paymentMethodsHeader: {
        fontSize: 18,
        fontWeight: "400",
        marginVertical: 10,
    },


    note: {
        width: "96%",
        marginHorizontal: "auto",
        marginVertical:10
    },
    bottomBtn: {
        flexDirection: 'row',
        height: "10%",
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 999,
        backgroundColor: COLORS.white,
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

});

export default styles;