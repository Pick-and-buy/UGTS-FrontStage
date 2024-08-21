import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

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

    wrapper: {
        marginBottom: 20,
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
        height: 55,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: "center"

    }),
    iconStyle: {
        marginRight: 10
    },
    errorMessage: {
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,

    },
    modalDetailText: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 25,
    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap:15
    },
    modalButton: {
        width: '45%',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: "auto",
    },
    modalCancelButton:{
        width: '45%',
        backgroundColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: "auto",
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;