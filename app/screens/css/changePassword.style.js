import { StyleSheet } from "react-native";
import { COLORS, SIZES,SHADOWS } from "../../constants/theme";




const styles = StyleSheet.create({
    cover: {
        height: SIZES.height / 2.4,
        width: SIZES.width,
        marginBottom: SIZES.xxLarge

    },

    titleLogin: {
        marginVertical: 20,
        marginHorizontal: "auto",
        fontFamily: "bold",
        fontSize: 35,
        color: COLORS.primary,
    },

    wrapper2: {
        width:"96%",
        marginBottom: 20,
        marginRight:20,
        justifyContent: "center",
        marginHorizontal:"auto"
    },
    label: {
        fontFamily: "regular",
        fontSize: SIZES.xSmall,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "right"
    },
    inputWrapper: (borderColor) => ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent:"center",
        ...SHADOWS.medium
    }),
    iconStyle: {
        marginRight: 10
    },
    errorMessage: {
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall,
    },
    wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent:"center",
        alignContent:"center",
    },
    view_1: {
        flex: 1,
        marginTop: 100,
        marginLeft: 20,
    },
    view_2: {
        borderWidth: 2,
        borderRadius: 20,
        width: '20%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#F8D4DC',
        borderColor: '#F8D4DC'
    },
    textHeader: {
        marginTop: 30,
        width: '95%',
        height: 100,
        fontSize: 35,
        fontWeight: '800'
    },
    textHeader_1: {
        marginTop: 0,
        width: '95%',
        height: 40,
        fontSize: 16,
    },
    view_3: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 20,
        width: '95%',
        height: 'auto',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderColor: COLORS.lightWhite,
        ...SHADOWS.medium,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: "auto",
    }
});

export default styles;