// Updated styles
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
    },
    wrapper: {
        padding: "2%",
        marginBottom: "10%"
    },
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
    backButton: {
        // style for the back button, if needed
    },
    banner: {
        alignItems: 'center',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: "#003bc3",
    },
    lunchDate: {
        textAlign: 'center',
        color: COLORS.black
    },
    button: {
        width: "50%",
        height: 40,
        backgroundColor: "#003bc3",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center', // Center the button horizontally
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
    },
    subTitle1: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: "#003bc3"
    },
    subTitle2: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: "#003bc3"
    },
    subTitle3: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: "#003bc3"
    },
    content: {
        marginTop: 10,
        textAlign: 'center',
    },
    subContent1: {
        textAlign: 'center',
        marginBottom: 20
    },
    subContent2: {
        textAlign: 'center',
        marginBottom: 20
    },
    subContent3: {
        textAlign: 'center',
        marginBottom: 20
    },
    subContent4: {
        textAlign: 'center',
        marginBottom: 20
    },
    subContent5: {
        textAlign: 'center',
        marginBottom: 20
    },
    subContent6: {
        textAlign: 'center',
        marginBottom: 20
    },
    subContent7: {
        textAlign: 'center',
        marginBottom: 20
    },
    subContent8: {
        textAlign: 'center',
        marginBottom: 20
    },
    subContent9: {
        textAlign: 'center',
        marginBottom: 20
    },
    subContent10: {
        textAlign: 'center',
        marginBottom: 20
    },
});

export default styles;
