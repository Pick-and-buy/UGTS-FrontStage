import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {
        padding: "2%",
        marginTop: "10%",
        marginBottom: "10%"
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
        // fontSize: 24,
        color: COLORS.black
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
        marginBottom:20
    },
    subContent2: {
        textAlign: 'center',
        marginBottom:20
    },
    subContent3: {
        textAlign: 'center',
    }
});

export default styles;