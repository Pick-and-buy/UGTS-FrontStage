import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";


const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 20
    },
    card: {
        width: "96%",
        // height: 100,
        flexDirection: 'row',
        marginHorizontal: "auto",
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 4,
        padding: 10,
        borderRadius: 10,
        ...SHADOWS.small
    },
    image: {
        width: "25%",
        height: "100%",
        borderRadius: 15,
        marginRight: 10,
        objectFit: "cover"
    },
    info: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    shop: {
        fontSize: 14,
        color: '#8F8F8F',
    },
    price: {
        fontSize: 24,
        color: '#4CAF50',
    },
    statusButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
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