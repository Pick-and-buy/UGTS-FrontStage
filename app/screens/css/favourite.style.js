import { StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection:"row",
        backgroundColor:COLORS.white,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    title:{
        fontSize:22,
        marginVertical:10,
        fontWeight:"bold",
    }
})

export default styles