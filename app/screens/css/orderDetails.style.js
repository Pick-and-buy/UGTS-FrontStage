import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,

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
    backButton: {
        marginLeft: "2%"
    },
    headerText: {
        color: COLORS.black,
        fontSize: 20,
        width: "70%",
        marginBottom: 4,
        fontWeight: "bold",
    },
    wrapper: {
        paddingBottom: "10%",
        width: "100%",
        marginHorizontal: "auto",
    },
    address: {
        width: "96%",
        justifyContent: "center",
        alignItems: "flex-start",
        marginHorizontal: "auto",
        marginVertical: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15,
        ...SHADOWS.medium
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
        marginTop: 6
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
        marginHorizontal: "auto"
    },
    product: {
        width: "96%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: "auto",
        marginHorizontal: "auto",
        marginTop: 20,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15,
        ...SHADOWS.small
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
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15,
        marginTop: 5,
        ...SHADOWS.small
    },
    transport: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2,
    },
    transportFrom: {
        flexDirection: "row",
        gap: 3,
        marginTop: 10

    },
    transportTime: {
        flexDirection: "row",
        gap: 5,
        marginTop: 10,
        alignItems:"center"
    },
    summary: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 6
    },
    divider: {
        height: 5,
        backgroundColor: "#F3F3F3",
        marginTop: 15
    },
    total: {
        width: "96%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15,
        ...SHADOWS.small
    },
    totalHeader: {
        fontSize: 18,
        fontWeight: "bold",
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
        fontSize: 16,
        color: COLORS.gray
    },
    paymentMethods: {
        width: "96%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15,
        ...SHADOWS.small
    },
    paymentMethodsHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom:5
    },
    method: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical:4
    },
    methodText: {
        fontSize: 18,
        fontWeight:"500"
    },
    note: {
        width: "96%",
        marginHorizontal: "auto",
        marginVertical: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 15,
        ...SHADOWS.small
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
    highlight: {
        color: COLORS.blue
    },
    column: {
        flexDirection:"column"
    },
    currentAmount:{
        // marginLeft:10,
        color:"#aaa",

    }

});

export default styles;