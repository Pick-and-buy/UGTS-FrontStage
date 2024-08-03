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
        height: 370,
        backgroundColor: '#dbd9d9',
        paddingLeft: 5,
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
        width: Dimensions.get('window').width / 5,
        height: Dimensions.get('window').width / 4.7,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 5
    },

    imageBrandLogo: {
        width: Dimensions.get('window').width / 5.2,
        height: Dimensions.get('window').width / 4.8,
        borderRadius: 5,
        marginVertical: 'auto'
    },
    viewBrandLogo: {
        width: Dimensions.get('window').width / 4.8,
    },
    textBrandLogo: {
        marginTop: 5,
        color: COLORS.gray,
        textAlign: 'center'
    },

    xmark: {
        position: 'absolute', 
        top: 3, 
        left: 18
    },

    //Upload Image by gallery and Camera Option
    selectOption: {
        flexDirection: 'row',
        marginHorizontal: "5%",
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

    //Upload Invoice
    uploadInvoiceContainer: {
        width: '45%',
        height: Dimensions.get('window').width / 3 + 30,
        marginLeft: 10,
    },

    uploadInvoiceImage: {
        width: '100%',
        height: Dimensions.get('window').width / 3,
        borderRadius: 20,
        overflow: 'hidden', //Kết hợp với flex = 1 để tạo borderRadius cho ImageBackground
    },
    uploadInvoice: {
        flex: 1, //Kết hợp với overflow: 'hidden' để tạo borderRadius cho ImageBackground
        width: '100%',
        height: Dimensions.get('window').width / 3,
    },

    //Upload Video
    uploadVideoContainer: {
        width: '45%',
        height: Dimensions.get('window').width / 3 + 30,
        marginLeft: 5,
    },

    uploadVideo: {
        width: '100%',
        height: Dimensions.get('window').width / 3,
        borderRadius: 20,
        overflow: 'hidden', //Kết hợp với flex = 1 để tạo borderRadius cho ImageBackground
    },
    
    imageUploadVideo: {
        width: '50%', 
        height: '60%', 
        marginHorizontal: "auto", 
        marginVertical: 20, 
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
        color: COLORS.blue
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