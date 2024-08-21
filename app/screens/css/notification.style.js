import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        width: '96%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: "auto",
        marginTop: 50,
        marginBottom: 20
    },
    backButton: {
        // position: 'absolute',
        // top: 50,
        left: 10,
    },
    checkAll: {
        right: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: "500",
        marginHorizontal: "auto"
    },
    notificationList: {
        flex: 1,
    },
    notificationItem: {
        width: "96%",
        minHeight: 65,
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
        ...SHADOWS.medium,
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    content: {
        width: "80%",
        height: "96%",
        marginVertical: "auto",
        marginTop: 2

    },
    readNotificationText: {
        fontSize: 16,
        color: '#666',
        width: "100%",
    },
    unreadNotificationText: {
        fontSize: 16,
        color: '#000',
        fontWeight: "500"
    },
    timestamp: {
        fontSize: 10,
        color: '#666',
        textAlign: "left",
        position: "absolute",
        bottom: 4

    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: 'gray',
    },
})
export default styles