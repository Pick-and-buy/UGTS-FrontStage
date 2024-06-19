import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: COLORS.white,
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 15,
    },
    // Space
    shadow: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        width: "100%",
    },
    // Personal Information
    personalContainer: {
        marginHorizontal: 15,
        marginTop: 25,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 99,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        left: 50,
        borderRadius: 15,
        padding: 3,
    },
    // Follower
    followerView: {
        flexDirection: 'row',
        gap: 20,
        marginHorizontal: 15,
        marginTop: 20,
        marginLeft: 20,
    },
    followBtn: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
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
        justifyContent: "space-around",
        alignItems: "center",
        gap: 5,
        marginHorizontal: 10,
        marginTop: 10,
        marginHorizontal: "auto",
    },
});

export default styles;
