import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SHADOWS } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        marginBottom: "15%",
    },
    posts: {
        width: '98%',
        marginTop: "-10%",
        marginHorizontal: "auto",
    },
    row: {
        width: "100%",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginHorizontal: "auto",
        marginBottom: "20%",
    },
    heading: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 12,
        gap: 10,
    },
    filterButton: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        ...SHADOWS.medium,
    },
    filterButtonText: {
        color: COLORS.black,
    },
    activeFilter: {
        backgroundColor: COLORS.primary,
    },
    activeFilterText: {
        color: 'white',
    },
    inactiveFilterText: {
        color: COLORS.black,
    },
});

export default styles;
