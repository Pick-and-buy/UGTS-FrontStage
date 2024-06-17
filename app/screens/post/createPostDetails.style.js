import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";


const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginBottom: 100,
    },
    viewContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        width: "100%",
    },
    //error message
    errorMessage: {
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall
    },
    // Header
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 10,
        paddingLeft: 10
    },
    textName: {
        fontSize: 25,
        fontFamily: 'bold',
        color: COLORS.black,
        textAlign: 'center',
        paddingLeft: 30
    },
    //Space
    shadow: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#D3D3D3',
        width: Dimensions.get('window').width,
    },
    //Image Upload
    imageUploadContaniner: {
        marginVertical: 20,
        width: Dimensions.get('window').width,
        height: 150,
        backgroundColor: COLORS.gray2,
    },
    imageUpload: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        gap: 20
    },
    image: {
        width: Dimensions.get('window').width / 6.5,
        height: Dimensions.get('window').width / 6.5,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 5,
        alignItems: 'center',
        paddingTop: -10
    },
    //Product Information
    productContainer: {
        width: Dimensions.get('window').width,
        backgroundColor: COLORS.lightWhite,
    },
    inputProduct: {
        flex: 1,
        width: "90%",
        marginVertical: 5,
        fontSize: 16,
    },
    //Brand Name: Tên Nhãn Hiệu
    dropdownContainer: {
        paddingHorizontal: 10,
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    dropdown: {
        marginBottom: 20,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    errorText: {
        fontSize: 14,
        color: 'red',
    },

    //Exterior Color, Interior Color, width, height, length, Reference Code
    textCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    //Product Detail
    productDetailContainer: {
        marginBottom: 20,
        width: Dimensions.get('window').width,
        height: 200,
        backgroundColor: COLORS.gray2,
    },
    productDetailView: {
        flexDirection: "row",
        marginTop: 20,
        width: "94%",
        height: "70%",
        marginHorizontal: "3%",
        backgroundColor: COLORS.lightWhite,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    //Product Description
    productDescriptionContainer: {
        marginBottom: 20,
        width: "95%",
        height: 100,
        backgroundColor: COLORS.lightWhite,
        marginLeft: 10,
    },

    // Shipping information
    shippingInformation: {
        width: Dimensions.get('window').width,
        height: 50,
        backgroundColor: COLORS.gray2,
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

})

export default styles;