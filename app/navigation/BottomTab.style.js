import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const styles = StyleSheet.create({
    tabBarStyle: {
        width: "100%",
        height: "10%",
        backgroundColor: COLORS.white,
        borderTopWidth: 0,
        paddingHorizontal:8,
        justifyContent: "center",
        alignItems:"center",
        elevation: 0, // This will remove the shadow on Android
        shadowOpacity: 0, // This will remove the shadow on iOS
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabActive:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FEEBEE",
        paddingHorizontal:6,
        paddingVertical:4,
        borderRadius:10,
        width:SIZES.width / 5,

    }
})

export default styles;