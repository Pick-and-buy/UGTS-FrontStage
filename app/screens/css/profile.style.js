import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: COLORS.background
    },
    info: {
        marginLeft: 4,
        marginTop: 0,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width:"100%"
    },
    text: {
        marginLeft: 10,
        fontFamily: "medium",
        color: COLORS.black,
        fontSize: 18,
    },
    ratingWrapper: {
        marginLeft: 10,
        marginTop: -6,
        flexDirection: "row",
        width: "100%",
    },
    verifyWrapper: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    email: {
        marginLeft: 10,
        fontFamily: "regular",
        color: COLORS.gray,
    },
    profile: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: "18%",
        marginBottom: 20
    },
    loginbtn: {
        width: 90,
        height: 30,
        borderRadius: 40,
        borderColor: COLORS.primary,
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "2.5%",
        marginBottom: 20,
        marginLeft: 40,
    },
    textbtn: {
        color: COLORS.primary,
    },
    options: {
        width: '100%',
        height: '8%',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: "#e4e4e4",
        borderBottomWidth: 18,
        borderTopColor: "#e4e4e4",
        borderTopWidth: 2,
    },
    option: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',

    }
});

export default styles;