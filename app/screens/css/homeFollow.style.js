import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
    },
    posts: {
        width: '98%',
        marginHorizontal: "auto",
        marginTop: 10,
        marginBottom: "20%",
    },
    row: {
        width: "100%",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginHorizontal: "auto",
    },
    userContainer: {
        width: '98%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 25,
        marginRight: 6,
        marginLeft:4
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewAll: {
        fontSize: 16,
        color: COLORS.primary,
    },
    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 16,
        color: COLORS.gray,
    },
});

export default styles;