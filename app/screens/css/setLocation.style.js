import { StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";


const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: COLORS.white
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
        width: '85%',
        height: 100,
        fontSize: 35,
        fontWeight: '800'
    },
    textHeader_1: {
        marginTop: 10,
        width: '95%',
        height: 100,
        fontSize: 20,
    },
    view_3: {
        flexDirection: 'column',
        borderWidth: 2,
        borderRadius: 20,
        width: '95%',
        height: '25%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderColor: COLORS.lightWhite,
        ...SHADOWS.medium,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 100
    },
    image: {
        marginVertical: 10
    }
})

export default styles;