import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: COLORS.white,
    },
    // Header
    header: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        backgroundColor: COLORS.white,
        paddingBottom: 12,
        paddingHorizontal: 15
    },
    divider: {
        height: 1,
        backgroundColor: "#F3F3F3",
        marginTop: 15
    },
    // Personal Information
    personalContainer: {
        width: "100%",
        marginTop: 15,
    },
    avatarTouchable: {
        marginHorizontal: "auto"
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: 99,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        left: 60,
        backgroundColor: COLORS.white,
        borderRadius: 99
    },
    username: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 16,

    },
    // Follower
    followerView: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 30,
        marginHorizontal: "auto"
    },
    blockView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        fontSize: 18,
        fontWeight: "600",
    },
    buttonWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    editBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    editText: {
        fontSize: 16,
        color: COLORS.white
    },
    followBtn: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderColor: COLORS.primary,
    },
    followBtnText: {
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: '500'
    },
    followingBtn: {
        backgroundColor: COLORS.primary,
    },
    followingBtnText: {
        color: COLORS.white,
        textAlign: 'center',
    },
    btnText: {
        fontSize: 16,
        color: COLORS.white
    },
    containerPost: {
        flex: 1,
        width: '100%',
        paddingBottom: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    row: {
        width: '98%',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 6,
        marginHorizontal: 10,
        marginTop: 10,
        marginHorizontal: "auto",
    },
});

export default styles;
