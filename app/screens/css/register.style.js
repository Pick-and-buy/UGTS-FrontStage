import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";



const styles = StyleSheet.create({
    view_1: {
        marginTop: 10,
        marginHorizontal: 10,
        alignItems: 'center'
    },
    textHeader: {
        width: '80%',
        height: 100,
        fontSize: 35,
        fontWeight: '800',
        textAlign: 'center',
    },
    view_2: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 20,
        width: '95%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderColor: COLORS.lightWhite
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: 150,
        height: 50,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    footer: {
        color: COLORS.black,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 50
    },
    
    titleRegister: {
        marginVertical: 20,
        marginHorizontal: 80,
        fontFamily: "bold",
        fontSize: 35,
        color: COLORS.primary,
    },
})

export default styles;