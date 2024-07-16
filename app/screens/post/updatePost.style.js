import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";


const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginBottom: 100,
    },
    viewContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        width: "100%",
    },
    left: {
        flex: 1,
    },
    right: {
        flex: 1,
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
        marginVertical: 5
    },
    //Image Upload
    imageUploadContaniner: {
        marginVertical: 20,
        width: Dimensions.get('window').width,
        height: 160,
        backgroundColor: '#dbd9d9',
    },
    imageUpload: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginHorizontal: 'auto'
    },
    image: {
        position: 'relative',
        width: Dimensions.get('window').width / 5.3,
        height: Dimensions.get('window').width / 5.3,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 5
    },

    xmark: {
        position: 'absolute', 
        top: 3, 
        left: 18
    },

    //Upload Image by gallery and Camera Option
    selectOption: {
        flexDirection: 'row',
        marginBottom: 20,
        marginHorizontal: "10%",
        gap: 20,
    },
    uploadContainer: {
        flexDirection: 'column',
        borderWidth: 2,
        borderRadius: 20,
        width: '40%',
        backgroundColor: 'white',
        borderColor: COLORS.lightWhite,
        ...SHADOWS.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    imageSelect:{
        marginVertical:10,
    },

    //Product Information
    productContainer: {
        width: Dimensions.get('window').width,
        backgroundColor: COLORS.lightWhite,
    },
    inputProduct: {
        flex: 1,
        width: "100%",
        marginVertical: 5,
        fontSize: 16,
    },

    leftText: {
        fontSize: 16,
        marginVertical: 5,
    },

    rightText: {
        fontSize: 16,
        color: COLORS.blue,
        marginVertical: 5,
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
        height: 200,
        backgroundColor: COLORS.lightWhite,
        marginLeft: 10,
    },

    // Shipping information
    shippingInformation: {
        width: Dimensions.get('window').width,
        height: 50,
        backgroundColor: '#dbd9d9',
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width:"96%",
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderColor: COLORS.gray2,
        marginHorizontal:"auto",
        marginVertical:'auto',
        borderRadius:8
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

})

export default styles;