import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: COLORS.background,
    },
    wrapper: {
        width: "100%",
        height: "25%",
    },
    header: {
        width: "100%",
        height: "40%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 12,
    },
    headerText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    backButton: {
        marginLeft: "3%"
    },
    homeButton: {
        marginRight: "3%",
        marginBottom: 4
    },
    content: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: COLORS.white,
        // justifyContent: "center",
        alignItems: "center"
    },
    wallet: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "50%",
    },
    walletTitle: {
        color: COLORS.white,
        fontSize: 18,
        marginBottom: 4
    },
    walletMoney: {
        color: COLORS.white,
        fontSize: 30,
        fontWeight: "bold",
    },
    filter: {
        width: "90%",
        height: 45,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        borderRadius: 20,
        marginTop: 15,
        paddingHorizontal: 8,
        // paddingVertical:2
    },
    filterButtonActive: {
        width: "32%",
        height: "75%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20
    },
    filterButtonTextActive: {
        color: "rgba(38,118,181,1)",
        fontSize: 18
    },
    filterButton: {
        width: "32%",
        height: "75%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    filterButtonText: {
        color: "black",
        fontSize: 18
    },
    lists: {
        flex: 1,
        marginTop: 20,
        marginBottom:220
    },
    item: {
        width: "94%",
        marginHorizontal: "auto",
    },
    half: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 4
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "600",
        width: "50%"
    },
    itemDetailsText: {
        fontSize: 14,
        color: COLORS.gray,
        width: "50%"
    },
    moneyIn: {
        fontSize: 18,
        color: "#22c1c3",
        width: "50%"
    },
    moneyOut: {
        fontSize: 18,
        color: "#FF0000",
        width: "50%"
    }

})
export default styles;