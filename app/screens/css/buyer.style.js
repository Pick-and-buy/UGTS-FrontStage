import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";


const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 20
    },
    card: {
        width: "96%",
        height: 100,
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
        width: "30%",
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
        marginBottom: 10,
        marginTop: -10
    },
    shop: {
        fontSize: 14,
        color: '#8F8F8F',
        marginBottom: 10,
    },
    price: {
        fontSize: 14,
        color: '#4CAF50',
    },
    statusButton: {
        marginLeft: 8,
        paddingHorizontal: 25,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
    },

})

export default styles