import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '96%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: "auto",
        marginTop: 50
    },
    backButton: {
        // position: 'absolute',
        // top: 50,
        left: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "500",
        marginHorizontal: "auto"
    },
    notificationItem: {
        width: "96%",
        height: 60,
        marginHorizontal: "auto",
        backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius:50,
        marginLeft:10
    }
})
export default styles