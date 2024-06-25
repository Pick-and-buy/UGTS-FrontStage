import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    wrapper: {
        flex: 1,
    },
    header: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        backgroundColor: COLORS.white,
        paddingBottom: 12,
        ...SHADOWS.medium
    },
    headerText: {
        color: COLORS.black,
        fontSize: 20,
        width: "65%",
        marginBottom: 4
    },
    contentContainer: {
        paddingBottom: "10%",
        width: "100%",
        marginHorizontal: "auto",
    },
    like: {
        width: 40,
        height: 40,
        position: "absolute",
        right: 15,
        top: -30,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 5,
        ...SHADOWS.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    informationContainer: {
        width: "96%",
        // height: "16%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        marginVertical: 10,
        // top: "-12%",
    },
    label: {
        flexDirection: "row",
        alignItems: "center",
    },
    keyword: {
        color: COLORS.blue,
    },
    verified: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    verifiedText: {
        color: COLORS.blue,
        marginLeft: 2,
    },
    labelTransport: {
        marginTop: 20,
        backgroundColor: "#D9D9D9",
        borderRadius: 3,
        width: "35%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    currency: {
        textDecorationLine: 'underline',
    },
    price: {
        fontSize: 35,
        color: COLORS.primary,
        marginBottom: 10,
    },
    wallet: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    walletTitle: {
        marginLeft: 5,
    },
    walletTitlePrice: {
        color: COLORS.primary,
        marginLeft: 5,
    },
    divider: {
        borderColor: COLORS.gray2,
        opacity: 0.15,
        borderWidth: 6,
        width: SIZES.width,
        backgroundColor: COLORS.gray,
    },
    dividerLight: {
        borderColor: COLORS.gray2,
        opacity: 1,
        borderWidth: 0.3,
        width: SIZES.width,
        marginBottom: 5,
        marginTop: 7,
    },
    comment: {
        flex: 1,
        width: "96%",
        backgroundColor: COLORS.white,
        // padding: 10,
        marginHorizontal: "auto",
        marginTop:8
    },
    commentContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    avatarComment: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentTextContainer: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
    },
    commentText: {
        fontSize: 16,
    },
    timeAgo: {
        color: 'gray',
        fontSize: 12,
    },

    
    description: {
        width: "96%",
        backgroundColor: COLORS.white,
        // padding: 10,
        marginHorizontal: "auto",
        marginTop:8
    },
    descriptionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,

    },
    descriptionText: {
        marginBottom: 10,
    },
    seeMore: {
        borderColor: COLORS.gray,
        borderWidth: 1,
        width: "25%",
        textAlign: "center",
        marginHorizontal: "auto",
        borderRadius: 16,
        padding: 2

    },
    createdTime: {
        color: COLORS.gray,
        fontSize: 12,
    },
    hashtags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginVertical: 8
    },
    tag: {
        backgroundColor: "#D9D9D9",
        borderRadius: 3,
        padding: 2
    },
    details: {
        width: '96%',
        flexDirection: 'row',
        marginHorizontal: "auto"

    },
    left: {
        flex: 1,
    },
    right: {
        flex: 1,
    },
    rightText: {
        color: COLORS.blue
    },
    personalContainer: {
        height: 60,
        width: "96%",
        marginHorizontal: "auto",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 99,
    },
    recommended: {
        width: "96%",
        marginHorizontal: "auto",
        marginVertical: 20

    },

    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    commentInput: {
        flex: 1,
        fontSize: 16,
    },
    // commentContainer: {
    //     padding: 10,
    //     // borderBottomColor: COLORS.lightGray,
    //     // borderBottomWidth: 1,
    // },
    commentText: {
        fontSize: 12,
    },
    seeMore: {
        color: COLORS.primary,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    bottomBtn: {
        flexDirection: 'row',
        height: "10%",
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 999,
        backgroundColor:COLORS.white,
    },
    button: {
        width:"60%",
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderColor: COLORS.gray2,
        marginHorizontal:"auto",
        marginVertical:'auto',
        borderRadius:8
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
