import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";



const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    tabBarStyle: {
        width: "100%",
        elevation: 0, // This will remove the shadow on Android
        shadowOpacity: 0, // This will remove the shadow on iOS
    },
    tabActive: {
        fontSize: 14,
        color: COLORS.primary,
    },
    tab: {
        fontSize: 14,
        color: "#AFAFAE",
    },
    tabBarIndicator:{
        backgroundColor: COLORS.primary, // This will be the color of the underline
        width: 10,
    }

})

export default styles