import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        width: "100%",
        height: "20%",
        // justifyContent: "center",
        alignItems: "center",
    },
    options: {
        width: "95%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: "15%",
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        height: 35,
        backgroundColor: "#F3F3F3",
        borderRadius: 4,
        padding: 5,
        flex: 0.7,

    },
    option: {
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        gap: 20,
    },
    optionItem: {
        width: 35,
        height: 35,
        borderRadius: 99,
        backgroundColor: '#F3F3F3',
        justifyContent: "center",
        alignItems: 'center',

    },

    // //Navigate
    // navContainer: {
    //     marginTop: 15,
    //     width: Dimensions.get('window').width,
    //     height: 1500,
    // },
    // tabBarStyle: {
    //     marginTop: 10,
    //     width: "100%",
    //     elevation: 0, // This will remove the shadow on Android
    //     shadowOpacity: 0, // This will remove the shadow on iOS
    // },
    // tabActive: {
    //     fontSize: 18,
    //     fontFamily: 'bold',
    //     color: 'red',
    // },
    // tab: {
    //     fontSize: 18,
    //     fontFamily: 'bold',
    //     color: 'black',
    // },


})

export default styles;