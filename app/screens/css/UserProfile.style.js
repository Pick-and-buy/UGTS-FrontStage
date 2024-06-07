import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: COLORS.lightWhite,
        justifyContent: 'center',
    },

    //Header
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 15
    },

    //Space
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
        height: "28%",
    },

    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 99,
    },

    //Follower
    followerView: {
        flexDirection: 'row',
        gap: 20,
        marginHorizontal: 15,
        marginTop: 20,
        marginLeft:20
    },
    followBtn: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5
    },

})


export default styles;