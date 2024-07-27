import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";


const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 20
    },
    card: {
        width: "96%",
        // height: 120,
        flexDirection: 'row',
        flexWrap: "wrap",
        marginHorizontal: "auto",
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 4,
        padding: 10,
        borderRadius: 10,
        ...SHADOWS.small
    },
    image: {
        width: "28%",
        height: "100%",
        borderRadius: 15,
        marginRight: 10,
        objectFit: "cover"
    },
    info: {
        flex: 1,
        // width: "66%",
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    shop: {
        fontSize: 14,
        color: '#8F8F8F',
    },
    price: {
        fontSize: 20,
        color: '#4CAF50',
    },
    buttonWrapper: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 4,
    },
    cancelBtn: {
        borderWidth: 1,
        borderColor: COLORS.black,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: "auto",

    },
    primaryBtn: {
        width: "65%",
        backgroundColor: COLORS.primary,
        paddingVertical: 6,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelBtnText: {
        color: COLORS.black,
        fontSize: 12,
        fontWeight: '400',
    },
    primaryBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
    },

    processBtn: {
        width: "65%",
        backgroundColor: '#04AA6D',
        paddingVertical: 6,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },


    //Filter Order Status
    orderStatusButton: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        ...SHADOWS.medium,

    },
    selectedOrderStatusButton: {
        backgroundColor: COLORS.primary,
    },
    orderStatusButtonText: {
        color: COLORS.black,
    },
    selectedOrderStatusButtonText: {
        color: COLORS.white,
    },
    orderStatusList: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        // width: '100%',
        height: 50,
        // marginHorizontal:"auto",
        justifyContent: "center",
        alignItems: "center",
        gap: 15
    },

})

export default styles