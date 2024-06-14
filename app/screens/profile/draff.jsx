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
    contentContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
    },
    like: {
        width: 40,
        height: 40,
        position: "absolute",
        left: "85%",
        top: "-20%",
        backgroundColor: COLORS.white,
        borderRadius: 99,
        padding: 5,
        ...SHADOWS.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    informationContainer: {
        width: "96%",
        height: "20%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        top: "-13%",
    },
    label: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 0
    },
    keyword: {
        color: COLORS.blue
    },
    verified: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
        marginVertical: "auto",
        flexDirection: "row"
    },
    verifiedText: {
        color: COLORS.blue
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
        marginRight: 2
    },
    price: {
        fontSize: 35,
        color: COLORS.primary,
        marginBottom: 20
    },
    wallet: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5
    },
    walletTitle: {

    },
    walletTitlePrice: {
        color: COLORS.primary,
    },
    divider: {
        borderColor: COLORS.gray2,
        opacity: 0.6,
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
        backgroundColor: COLORS.white
    },
    description: {
        width: "96%",
        flex:1,
        marginHorizontal: "auto",
    },
    descriptionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 20
    },
    descriptionText: {
        marginBottom: 10,
        marginTop: 20
    },
    createdTime: {

    },
    hashtags: {
        
    }

})
export default styles

