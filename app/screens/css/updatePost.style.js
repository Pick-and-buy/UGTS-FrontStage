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
        backgroundColor: COLORS.background,
        marginHorizontal: "auto"
    },
    // Header
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignItems: "flex-end",
        gap: 20,
        backgroundColor: COLORS.white,
        width: "100%",
        height: "10%",
        marginTop: 10,
        paddingLeft: 10,
        paddingBottom: 5,
    },

    labelText: {
        fontSize: 16,
        color: COLORS.gray,
        // marginHorizontal: 20,
        marginVertical: 5,
        marginLeft: 5
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

    textName: {
        fontSize: 25,
        fontFamily: 'bold',
        color: COLORS.black,
        textAlign: 'center',
        paddingLeft: 30
    },
    //Space
    shadow: {
        height: 3,
        backgroundColor: "#F3F3F3",
    },
    //Image Upload
    imageUploadContaniner: {
        width: windowWidth,
        backgroundColor: COLORS.white,
        paddingBottom: 5,
    },
    imageUpload: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 'auto',
    },
    image: {
        position: 'relative',
        width: Dimensions.get('window').width / 5,
        height: Dimensions.get('window').width / 4.8,
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
        width: "100%",
        flexDirection: 'row',
        gap: 10,
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

    //Upload Invoice
    uploadInvoiceContainer: {
        width: '48%',
        height: Dimensions.get('window').width / 3,
        marginLeft: 10,
        marginLeft: 0,
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
        width: '48%',
        height: Dimensions.get('window').width / 3,
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
        width: "98%",
        marginHorizontal: "auto",
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
    productField: {
        width: "100%",
        marginTop: 10
    },

    required: {
        color: 'red',
        fontSize: 18,
        fontFamily: 'bold'
    },

    title: {
        fontSize: 16,
        marginLeft: 10,
        // marginBottom:-5
    },
    inputProduct: {
        width: "94%",
        marginHorizontal: "auto",
        marginBottom: 10,
        height: 40,
        borderColor: "#ddd",
        borderBottomWidth: 1,
        fontSize: 16,
        color: COLORS.blue
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

    leftText: {
        fontSize: 16,
        marginVertical: 5,
    },

    rightText: {
        fontSize: 16,
        color: COLORS.blue,
        marginVertical: 5,
    },

    errorText: {
        fontSize: 14,
        color: 'red',
        marginLeft: 10,
        marginTop: -28,
        marginBottom: 10
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

    //Boosted
    checkboxBoostedContainer: {
        width: "98%",
        marginHorizontal: 'auto',
        gap: 5,
    },

    checkboxBoosted: {
        height: 50,
        width: "50%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderRadius: 10,
        backgroundColor: '#fff',

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

})

export default styles;