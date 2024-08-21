import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: (windowWidth / 3) - 12,
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: COLORS.white,
        margin: 4.5,
    },
    wrapper: {
        width: "100%",
        height: "100%",
        overflow: 'hidden',
    },
    image: {
        width: "100%",
        height: "62%",
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    content: {
        width: "92%",
        // height: "100%",
        marginHorizontal: "auto",
    },
    title: {
        color: COLORS.gray,
        fontSize:16
    },
    price: {
        color: COLORS.black,
        fontWeight: "400",
        fontSize: 22,
        // marginBottom: 2,
        marginLeft: 2
    },
    currency: {
        textDecorationLine: 'underline',
        fontSize: 22,
    },
    numberLiked: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom:2
    }
});

export default styles;
