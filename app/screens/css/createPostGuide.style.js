import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: COLORS.white,
    },
    header: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: COLORS.white,
        paddingBottom: 12,
        paddingHorizontal: 15
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        color: COLORS.black
    },
    icon: {
        position: "absolute",
        height: 28,
        width: 28,
        right: 10,
        bottom: "16%",
    },
    divider: {
        height: 3,
        backgroundColor: "#F2F2F2",
        marginTop: 10
    },
    news: {
        width: "100%",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    newsImage: {
        transform: [{ scale: 1.15 }],
    },
    optionsWrapper: {
        width: "100%",
        height: 80,
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
        fontWeight: "500",
    },
    options: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        marginTop: 20
    },
    option: {
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.gray2,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    text: {
        fontSize: 18,

    },
    guide: {
        flex: 1,
        backgroundColor: "#ccc",
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outline: {
        backgroundColor: COLORS.white,
        width: "95%",
        height: "40%",
        borderRadius: 15,
        marginBottom: '40%'
    },
    outlineHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    outlineImage: {
        height: 24,
        width: 24,
        marginTop: 10,
        marginLeft: 10
    },
    buttons: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 20
    },
    button: {
        width: "45%",
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.gray2,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default styles;
