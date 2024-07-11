import { StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    header: {
        width: '100%',
        height: "10%",
        flexDirection: "row",
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'flex-end',
        ...SHADOWS.small
    },
    title: {
        fontSize: 22,
        marginVertical: 10,
        fontWeight: "bold",
    },
    backButton: {
        position: "absolute",
        left:15,
        bottom:10
    },
    card: {
        width: "94%",
        height: 100,
        flexDirection: 'row',
        marginHorizontal: "auto",
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 25,
        ...SHADOWS.medium
    },
    image: {
        width: "30%",
        height: "100%",
        borderRadius: 20,
        marginRight: 10,
        objectFit: "cover"
    },
    info: {
        flex: 1,
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
        fontSize: 14,
        color: '#4CAF50',
    },
    statusButton: {
        marginLeft: 8,
    },
    gradient: {
        paddingHorizontal: 25,
        paddingVertical: 8,
        borderRadius: 25,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
    },
});
export default styles