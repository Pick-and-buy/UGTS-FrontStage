import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: COLORS.white,
    },    
    // Header
    header: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        backgroundColor: COLORS.white,
        paddingBottom: 12,
        paddingHorizontal: 15
    },
});
export default styles;