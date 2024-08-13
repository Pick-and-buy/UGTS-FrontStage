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
        width: "58%",
        marginBottom: 4,
        fontWeight: "bold",
    },
    backButton: {
        marginLeft: "2%",
        zIndex: 999,
    },
    wrapper: {
        width: "100%",
    },
    money: {
        width: "96%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginTop: 15
    },
    inputContainer: {
        width: "96%",
        marginHorizontal: "auto",
    },
    label: {
        fontSize: 18,
        marginVertical: 12,
    },
    amount: {
        position: "relative",
    },
    input: {
        backgroundColor: "#f2f2f2",
        borderRadius: 4,
        padding: 15,
        fontSize: 30,
        paddingLeft: 40
    },
    unit: {
        fontSize: 30,
        position: "absolute",
        top: "20%",
        zIndex: 2,
        marginLeft: 8
    },
    error: {
        color: 'red',
        marginTop: 4,
    },
    balance: {
        fontSize: 16,
        marginBottom: 16,
        marginHorizontal: "2%",
        marginTop: 10
    },
    quickAmounts: {
        width: "96%",
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'center',
        marginHorizontal: "auto"
    },
    quickAmountButton: {
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        color: COLORS.black,
        width: windowWidth / 3 - 20,
        marginBottom: 15,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: COLORS.primary,
    },
    quickAmountButtonText: {
        fontSize: 16,
    },
    activeButtonText: {
        color: '#fff', // Active text color
    },
    divider: {
        height: 3,
        width: "94%",
        backgroundColor: "#F3F3F3",
        marginVertical: 10,
        marginHorizontal: "auto"
    },
    paymentMethod: {
        width: "96%",
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 16,
        marginHorizontal: "auto"
    },
    paymentText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    paymentMethodInfo: {
        marginTop: 4,
        fontSize: 14,
        color: '#aaa',
        marginLeft: "8%"
    },
    totalContainer: {
        width: "96%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginTop: 15,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    total: {
        width: "96%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    totalLabel: {
        fontSize: 18,
        marginVertical: 10,
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {

    },
    submitButton: {
        width: "96%",
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal: "auto",
        marginTop: 40
    },
    submitText: {
        fontSize: 16,
        color: '#fff',
    },
    footerNote: {
        width: "96%",
        marginTop: 16,
        fontSize: 12,
        color: '#aaa',
        marginHorizontal: "auto"
    },
    highlightText: {
        color: 'blue'
    },
    WebView: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: COLORS.white,
    }
});

export default styles;