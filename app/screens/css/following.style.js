import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { Avatar } from "react-native-elements";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: COLORS.white,
    },
    search: {
        width: "96%",
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 15,
        backgroundColor: "#F2F2F2",
        borderRadius: 4,
        padding: 5,
        marginHorizontal: 'auto',
        marginTop: 15,
        paddingLeft: 10
    },
    followings: {
        width: "96%",
        marginHorizontal: "auto",
        marginTop: 10
    },
    user: {
        width: "100%",
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 8
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 99
    },
    names: {
        flexDirection: "column",
        justifyContent: 'center',
        marginLeft: 10,
        marginBottom: 10
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        textAlignVertical: 'center'
    },
    username: {
        fontSize: 14
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom:6
    },
    followBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    followBtnText: {
        color: COLORS.white,
        textAlign: 'center',
        fontWeight: '500'
    },
    followingBtn: {
        backgroundColor: "#f2f2f2",
    },
    followingBtnText: {
        color: COLORS.black,
        textAlign: 'center',
        fontWeight: '500'
    },
})
export default styles