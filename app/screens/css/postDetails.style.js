import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        position: 'relative'
    },
    header: {
        position: 'absolute',
        top: "5%",
        width: "96%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        zIndex: 9999,
    },
    headerText: {
        // flex:1,
        color: COLORS.black,
        fontSize: 20,
        width: "65%",
        marginBottom: 4,
        textAlign: "center",
    },
    backButton: {
        marginLeft: "2%",
        marginRight: "-2%",
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 99,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        paddingBottom: "10%",
        width: "100%",
        marginHorizontal: "auto",
    },
    wrapper: {
        flex: 1,
        marginTop: -15,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden"
    },
    like: {
        width: 40,
        height: 40,
        position: "absolute",
        right: 0,
        top: 5,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 5,
        ...SHADOWS.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    numberOfLike: {
        color: COLORS.gray,
        fontWeight: "bold",
        position: "absolute",
        right: 15,
        top: 50,
        fontSize: 18
    },
    informationContainer: {
        width: "96%",
        // height: "16%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        marginVertical: 10,
        // top: "-12%",
    },
    labelWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    label: {
        flexDirection: "row",
        alignItems: "center",
    },
    keyword: {
        color: COLORS.blue,
    },
    info: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 5
    },
    verified: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 3
    },
    verifiedText: {
        color: COLORS.white,
        marginLeft: 2,
        fontSize: 12
    },
    ads: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#66bcb0",
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    currency: {
        textDecorationLine: 'underline',
    },
    price: {
        fontSize: 35,
        color: COLORS.primary,
        marginBottom: 5,
        marginTop: 10
    },
    wallet: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    walletTitle: {
        marginLeft: 5,
        color: COLORS.gray
    },
    walletTitlePrice: {
        color: COLORS.primary,
        marginLeft: 5,
    },
    divider: {
        width: "100%",
        borderColor: COLORS.gray2,
        opacity: 0.1,
        borderWidth: 5,
        width: SIZES.width,
        backgroundColor: COLORS.gray,
        marginVertical: 4
    },
    dividerLight: {
        width: "100%",
        marginHorizontal: "auto",
        borderColor: COLORS.gray2,
        opacity: 1,
        borderWidth: 0.3,
        marginBottom: 5,
        marginTop: 7,
    },
    comment: {
        flex: 1,
        width: "96%",
        backgroundColor: COLORS.white,
        // padding: 10,
        marginHorizontal: "auto",
        marginTop: 8
    },
    commentContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    commentBtnActive: {
        width: '50%',
        height: 30,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: COLORS.white,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10
    },
    commentContainerUnActive: {
        width: '50%',
        height: 30,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: COLORS.white,
        borderWidth: 1.5,
        borderColor: COLORS.gray,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10
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
        marginTop: 8
    },
    descriptionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,

    },
    descriptionText: {
        marginBottom: 8,
    },
    readMore: {
        width: "100%",
        textAlign: "center",
        marginHorizontal: "auto",
        borderRadius: 16,
    },
    createdTime: {
        color: COLORS.gray,
        fontSize: 12,
        marginTop: 10
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
        paddingVertical: 2,
        paddingHorizontal: 6
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
        height: 65,
        width: "96%",
        marginHorizontal: "auto",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },

    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginVertical: "auto"
    },
    recommended: {
        width: "98%",
        marginHorizontal: "auto",
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
    commentText: {
        fontSize: 12,
    },
    seeMore: {
        color: COLORS.primary,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    userDetails: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
    },
    oneLine: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bottomBtn: {
        flexDirection: 'row',
        height: "10%",
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 999,
        backgroundColor: COLORS.white,
    },
    button: {
        width: "96%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderColor: COLORS.gray2,
        marginHorizontal: "auto",
        marginVertical: 'auto',
        borderRadius: 8
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    posts: {
        width: '100%',
        marginHorizontal: "auto",
    },
    row: {
        width: "100%",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginHorizontal: "auto",
    },
    evidence: {
        width: "96%",
        marginHorizontal: "auto",
    },
    evidenceImage: {
        width: "100%",
        height: 250,
        justifyContent: "center",
        alignItems: "center",
    },
    imageSelect: {
        width: "96%",
        height: "96%",
        objectFit: "contain"
    },
    evidenceVideo: {
        width: "100%",
        height: 250,
        justifyContent: "center",
        alignItems: "center",
    },
    videoSelect: {
        width: "96%",
        height: "96%",
    }

});

export default styles;
