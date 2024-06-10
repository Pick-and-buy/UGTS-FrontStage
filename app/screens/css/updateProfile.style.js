import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";


const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: COLORS.white
    },
    view_1: {
        flex: 1,
        marginTop: "16%",
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
        width: '80%',
        height: 100,
        fontSize: 35,
        fontWeight: '800'
    },
    textHeader_1: {
        marginTop: 20,
        width: '80%',
        height: 100,
        fontSize: 20,
    },
    view_3: {
        flexDirection: 'column',
        flex: 1,
    },
    view_4: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 20,
        width: '95%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderColor: COLORS.lightWhite,
        ...SHADOWS.medium,
    },
    errorMessage: {
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall
    },
})

export default styles;