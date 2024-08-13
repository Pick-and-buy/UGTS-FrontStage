import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: COLORS.background
    },
    wrapper: {
        width: "98%",
        // marginTop: 40,
        // marginBottom: 100,
        backgroundColor: COLORS.background,
        marginHorizontal: "auto"
    },
    // Header
    headerContainer: {
        width: "100%",
        height: "10%",
        backgroundColor: COLORS.white,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingBottom: 5
    },
    textName: {
        width: windowWidth,
        fontSize: 20,
        fontFamily: 'bold',
        color: COLORS.black,
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 999
    },
    //Space
    shadow: {
        height: 3,
        backgroundColor: "#F3F3F3",
        // marginTop: 15
    },
    labelText: {
        fontSize: 16,
        color: COLORS.gray,
        // marginHorizontal: 20,
        marginVertical: 5,
        marginLeft:5
    },
    //Image Upload
    imageUploadContainer: {
        width: windowWidth,
        height: 150,
        backgroundColor: COLORS.white,
    },
    imageUpload: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginHorizontal: 'auto'
    },
    image: {
        width: windowWidth / 5,
        height: windowWidth / 4.7,
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
    //error message
    errorMessage: {
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall
    },

    //Check box
    checkboxContainer: {
        width: "96%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        gap: 10,
        marginBottom: 10
    },
    checkboxView: {
        height: 50,
        width: "48%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        gap: 5,
    },
    textVerified: {
        textAlign: 'center'
    },

    uploadContainer: {
        width: '48%',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 'auto',
        gap: 10,
        padding: 10,
    },
    imageSelect: {
        width: 30,
        height: 30,
    },
    //Upload Image by gallery and Camera Option
    selectOption: {
        width: "100%",
        flexDirection: 'row',
        // marginBottom: 20,
        gap: 10,
    },
    //Upload Invoice
    uploadInvoiceContainer: {
        width: '45%',
        height: Dimensions.get('window').width / 3,
        borderRadius: 20,
        marginLeft: 10,
        overflow: 'hidden', //Kết hợp với flex = 1 để tạo borderRadius cho ImageBackground
    },
    uploadInvoice: {
        flex: 1, //Kết hợp với overflow: 'hidden' để tạo borderRadius cho ImageBackground
        width: '100%',
        height: Dimensions.get('window').width / 3,
    },

    //Upload Video
    uploadVideoContainer: {
        position: 'relative',
        width: '45%',
        height: Dimensions.get('window').width / 3,
        borderRadius: 20,
        marginLeft: 10,
        overflow: 'hidden', //Kết hợp với flex = 1 để tạo borderRadius cho ImageBackground
    },

    uploadVideo: {
        flex: 1, //Kết hợp với overflow: 'hidden' để tạo borderRadius cho ImageBackground
        width: '100%',
        height: Dimensions.get('window').width / 3,
    },

    //Product Information
    productContainer: {
        width: "96%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
    productField:{
        width: "100%",
        marginTop:10
    },
    inputProduct: {
        width: "94%",
        marginHorizontal: "auto",
        marginBottom: 10,
        height: 40,
        borderColor: "#ddd",
        borderBottomWidth: 1,
        fontSize: 16,
    },
    //Brand Name: Tên Nhãn Hiệu
    dropdownContainer: {
        width: "94%",
        marginHorizontal: "auto",
    },
    dropdown: {
        marginBottom: 10,
        height: 60,
        borderColor: "#ddd",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    label: {
        fontSize: 16,
    },
    required: {
        color: 'red',
        fontSize: 18,
        fontFamily: 'bold'
    },

    errorText: {
        fontSize: 14,
        color: 'red',
        marginLeft: 10,
        marginTop: -28,
        marginBottom: 10
    },

    title: {
        fontSize: 16,
        marginLeft: 10,
        // marginBottom:-5
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
        width: "98%",
        height: 50,
        paddingTop: 10,
        flexDirection: 'row',
        gap:5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    summary: {
        width: "96%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
    buttonWrapper: {
        width: "100%",
        backgroundColor: COLORS.white,
        marginBottom:100,
        marginTop:50
    },

    button: {
        width: "96%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderColor: COLORS.gray2,
        marginHorizontal: "auto",
        marginVertical: 'auto',
        borderRadius: 8
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    //Modal style
    modalContainer: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: SIZES.large,
        textAlign: "center",
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
    },
})

export default styles;