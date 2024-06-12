import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    wrapper: {
        flex: 1,
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
        fontSize: 18,
    },
    contentContainer: {
        paddingBottom: "10%",
        width: "100%",
        marginHorizontal: "auto",
    },
    like: {
        width: 40,
        height: 40,
        position: "absolute",
        right: 15,
        top: -30,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 5,
        ...SHADOWS.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    informationContainer: {
        width: "96%",
        height: "18%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        // top: "-12%",
    },
    label: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    keyword: {
        color: COLORS.blue,
    },
    verified: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    verifiedText: {
        color: COLORS.blue,
        marginLeft: 2,
    },
    labelTransport: {
        marginTop: 20,
        backgroundColor: "#D9D9D9",
        borderRadius: 3,
        width: "35%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    currency: {
        textDecorationLine: 'underline',
    },
    price: {
        fontSize: 35,
        color: COLORS.primary,
        marginVertical: 10,
    },
    wallet: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    walletTitle: {
        marginLeft: 5,
    },
    walletTitlePrice: {
        color: COLORS.primary,
        marginLeft: 5,
    },
    divider: {
        borderColor: COLORS.gray2,
        opacity: 0.15,
        borderWidth: 6,
        width: SIZES.width,
        backgroundColor: COLORS.gray,
    },
    dividerLight: {
        borderColor: COLORS.gray2,
        opacity: 1,
        borderWidth: 0.3,
        width: SIZES.width,
        marginBottom: 5,
        marginTop: 7,
    },
    comment: {
        backgroundColor: COLORS.white,
        padding: 10,
    },
    description: {
        width:"96%",
        backgroundColor: COLORS.white,
        // padding: 10,
        marginHorizontal: "auto",
    },
    descriptionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,

    },
    descriptionText: {
        marginBottom: 10,
    },
    createdTime: {
        color: COLORS.gray,
        fontSize: 12,
    },
    hashtags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    details: {
        width: '96%',
        flexDirection: 'row',
        marginHorizontal:"auto"

    },
    left: {
        flex: 1,
    },
    right: {
        flex: 1,
    },
    rightText: {
        color: COLORS.blue
    }
});

export default styles;
