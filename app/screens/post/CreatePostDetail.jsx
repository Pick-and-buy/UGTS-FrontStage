import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    FlatList,
} from "react-native";
import { FontAwesome, Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS } from "../../constants/theme";
import { Dropdown } from 'react-native-element-dropdown';
import styless from './createPostDetail.style';

const CreatePostDetail = () => {

    const navigation = useNavigation();

    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState([]);
    const [productStatus, setProductStatus] = useState([]);
    const [productDescription, setProductDescription] = useState("");
    const [shippingMethod, setShippingMethod] = useState("");
    const [shippingTime, setShippingTime] = useState("");
    const [shippingAdress, setShippingAdress] = useState("");
    const [price, setPrice] = useState(null);
    const [fee, setFee] = useState(null);
    const [saleProfit, setSaleProfit] = useState(null);

    const [value, setValue] = useState(null);

    const dataCategory = [
        { category: 'Item 1', value: '1' },
        { category: 'Item 2', value: '2' },
        { category: 'Item 3', value: '3' },
        { category: 'Item 4', value: '4' },
        { category: 'Item 5', value: '5' },
        { category: 'Item 6', value: '6' },
        { category: 'Item 7', value: '7' },
        { category: 'Item 8', value: '8' },
    ];

    const dataProductStatus = [
        { status: 'Đã qua sử dụng 1', value: '1' },
        { status: 'Đã qua sử dụng 2', value: '2' },
        { status: 'Đã qua sử dụng 3', value: '3' },
    ];

    const dataShippingMethod = [
        { status: 'J&T Express', value: '1' },
        { status: 'Giao Hàng Nhanh', value: '2' },
        { status: 'Viettel Post', value: '3' },
        { status: 'Giao Hàng Tiết Kiệm', value: '4' },
    ];

    const dataShippingTime = [
        { status: '1 ngày', value: '1' },
        { status: '2 ngày', value: '2' },
        { status: '3 ngày', value: '3' },
        { status: '4 ngày', value: '4' },
    ];

    const dataShippingAdress = [
        { status: 'Hà Nội', value: '1' },
        { status: 'Quảng Ninh', value: '2' },
        { status: 'Hải Phòng', value: '3' },
        { status: 'Hưng Yên', value: '4' },
    ];


    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Feather
                        onPress={() => navigation.goBack()}
                        name="x"
                        size={35}
                        color={COLORS.primary} />
                    <Text style={styles.textName}>
                        Thông Tin Sản Phẩm
                    </Text>
                </View>
                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>
                {/* Image Upload */}
                <View style={styles.imageUploadContaniner}>
                    <View style={styles.imageUpload}>
                        <View style={styles.image}>
                            <FontAwesome
                                name="camera"
                                size={20}
                                color={COLORS.gray} />
                            <Text style={{ marginTop: 5, color: COLORS.gray }}>Ảnh</Text>
                        </View>
                        <View style={styles.image}>

                        </View>
                        <View style={styles.image}>

                        </View>
                        <View style={styles.image}>

                        </View>
                        <View style={styles.image}>

                        </View>
                    </View>
                    <View style={{ marginTop: 35, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 16 }}>Thông tin sản phẩm</Text>
                        <TouchableOpacity
                            style={{ flexDirection: "row", gap: 10 }}
                            onPress={() => console.warn("Quy Tắc")}
                        >
                            <AntDesign
                                name="questioncircle"
                                size={20}
                                color="black" />
                            <Text>Quy tắc</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Product Information */}
                <View style={styles.productContainer}>
                    <View style={{ marginHorizontal: 5 }}>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 16 }}>Tên sản phẩm</Text>
                        </View>
                        <View style={{ height: 40 }}>
                            <TextInput
                                value={productName}
                                placeholder="Nhập tên sản phẩm"
                                style={styles.inputProductName}
                                onChangeText={(input) => setProductName(input)}
                            />
                        </View>
                    </View>
                    <View style={styles.shadow}>
                        {/* Tạo Khoảng Trống */}
                    </View>
                    <View>
                        <Dropdown
                            style={styless.dropdown}
                            placeholderStyle={styless.placeholderStyle}
                            selectedTextStyle={styless.selectedTextStyle}
                            inputSearchStyle={styless.inputSearchStyle}
                            iconStyle={styless.iconStyle}
                            data={dataCategory}
                            search
                            maxHeight={300}
                            labelField="category"
                            valueField="value"
                            placeholder="Chọn thể loại"
                            searchPlaceholder="Tìm kiếm"
                            // value={value}
                            value={category}
                            onChange={item => {
                                setCategory(item.value);
                            }}

                        />
                    </View>
                    <View>
                        <Dropdown
                            style={styless.dropdown}
                            placeholderStyle={styless.placeholderStyle}
                            selectedTextStyle={styless.selectedTextStyle}
                            inputSearchStyle={styless.inputSearchStyle}
                            iconStyle={styless.iconStyle}
                            data={dataProductStatus}
                            search
                            maxHeight={300}
                            labelField="status"
                            valueField="value"
                            placeholder="Trạng thái sản phẩm"
                            searchPlaceholder="Tìm kiếm"
                            value={productStatus}
                            onChange={item => {
                                setProductStatus(item.value);
                            }}
                        />
                    </View>
                </View>

                {/* Product Detail */}
                <View style={styles.productDetailContainer}>
                    <View style={styles.productDetailView}>
                        <View style={{ width: "40%", borderRightWidth: 1, borderRightColor: COLORS.gray2 }}>
                            <Text>Thiết lập sản phẩm sẽ được đăng trong thông tin sản phẩm, giúp người mua tìm thấy dễ dàng hơn</Text>
                        </View>
                        <View style={{ width: "60%", flexDirection: 'row' }}>
                            <View style={{ width: "50%", paddingHorizontal: 5, paddingTop: 20 }}>
                                <Image
                                    style={{ width: "100%", height: "80%" }}
                                    source={{ uri: 'https://gostyle.vn/wp-content/uploads/2020/10/tui-xach-nu-chinh-hang-louisvuitton-M45165-gostyle4.jpg' }}
                                // key={item.id}
                                />
                            </View>
                            <View style={{ width: "50%", paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Túi xách Gucci hàng like new xinh xắn không còn gì để chê</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'bold' }}>Chi Tiết Sản Phẩm</Text>
                    </View>
                </View>

                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Product Description */}
                <View style={styles.productDescriptionContainer}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'bold' }}>Mô Tả Sản Phẩm</Text>
                    </View>
                    <View>
                        <TextInput
                            value={productDescription}
                            placeholder="Nhập mô tả sản phẩm"
                            style={styles.inputProductName}
                            onChangeText={(input) => setProductDescription(input)}
                        />
                    </View>
                </View>

                {/* Shipping information */}
                <View style={styles.shippingInformation}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'bold' }}>Thông Tin Vận Chuyển</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => console.warn('Quy tắc')}
                        style={{ flexDirection: 'row', marginTop: 10 }}>
                        <AntDesign
                            name="questioncircle"
                            size={20}
                            color="black"
                        />
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>Quy tắc</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Dropdown
                        style={styless.dropdown}
                        placeholderStyle={styless.placeholderStyle}
                        selectedTextStyle={styless.selectedTextStyle}
                        iconStyle={styless.iconStyle}
                        data={dataShippingMethod}
                        maxHeight={300}
                        labelField="status"
                        valueField="value"
                        placeholder="Phương thức vận chuyển"
                        searchPlaceholder="Tìm kiếm"
                        value={shippingMethod}
                        onChange={item => {
                            setShippingMethod(item.value);
                        }}
                    />
                    <Dropdown
                        style={styless.dropdown}
                        placeholderStyle={styless.placeholderStyle}
                        selectedTextStyle={styless.selectedTextStyle}
                        iconStyle={styless.iconStyle}
                        data={dataShippingTime}
                        maxHeight={300}
                        labelField="status"
                        valueField="value"
                        placeholder="Thời gian vận chuyển"
                        searchPlaceholder="Tìm kiếm"
                        value={shippingTime}
                        onChange={item => {
                            setShippingTime(item.value);
                        }}
                    />
                    <Dropdown
                        style={styless.dropdown}
                        placeholderStyle={styless.placeholderStyle}
                        selectedTextStyle={styless.selectedTextStyle}
                        inputSearchStyle={styless.inputSearchStyle}
                        iconStyle={styless.iconStyle}
                        data={dataShippingAdress}
                        search
                        maxHeight={300}
                        labelField="status"
                        valueField="value"
                        placeholder="Khu vực xuất hàng"
                        searchPlaceholder="Tìm kiếm"
                        value={shippingAdress}
                        onChange={item => {
                            setShippingAdress(item.value);
                        }}
                    />
                </View>
                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* price */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ margin: 10, marginRight: 20 }}>
                        <Text style={{ fontSize: 16 }}>Giá Bán</Text>
                    </View>
                    <View>
                        <TextInput
                            value={price}
                            placeholder="Nhập giá tiền"
                            style={{ width: "100%", fontSize: 16, marginTop: 7, paddingRight: 10 }}
                            onChangeText={(input) => setPrice(input)}
                        />
                    </View>
                    <View style={{ marginTop: 12, marginLeft: 50 }}>
                        <Text>VND</Text>
                    </View>
                </View>
                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* fee */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ margin: 10, marginRight: 20 }}>
                        <Text style={{ fontSize: 16 }}>Tiền Hoa Hồng</Text>
                    </View>
                    <View>
                        <TextInput
                            value={fee}
                            placeholder="Nhập tiền hoa hồng"
                            style={{ width: "100%", fontSize: 16, marginTop: 7, paddingRight: 10 }}
                            onChangeText={(input) => setFee(input)}
                        />
                    </View>
                    <View style={{ marginTop: 12, marginLeft: 50 }}>
                        <Text>VND</Text>
                    </View>
                </View>
                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* sales profit */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ margin: 10, marginRight: 20 }}>
                        <Text style={{ fontSize: 16 }}>Lợi Nhuận Bán Hàng</Text>
                    </View>
                    <View>
                        <TextInput
                            value={saleProfit}
                            placeholder="Lợi Nhuận"
                            style={{ width: "100%", fontSize: 16, marginTop: 7, paddingRight: 10 }}
                            onChangeText={(input) => setSaleProfit(input)}
                        />
                    </View>
                    <View style={{ marginTop: 12, marginLeft: 50 }}>
                        <Text>VND</Text>
                    </View>
                </View>
                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Discount */}
                <View style={styles.discoutContainer}>
                    <TextInput
                        style={{ paddingHorizontal: 15, fontSize: 16 }}
                        placeholder="Hoan Nghênh Việc Giảm Giá"
                    />
                </View>

                {/* Button */}
                <View style={[styles.button, {backgroundColor: 'red'}]}>
                    <Text style={{color: 'white', fontSize: 20, fontFamily: 'bold'}}>
                        Đăng Bán
                    </Text>
                </View>

                <View style={styles.button}>
                    <Text style={{color: 'red', fontSize: 20, fontFamily: 'bold'}}>
                        Lưu Vào Bản Nháp
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default CreatePostDetail;

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        marginBottom: 80,
        height: 1600
    },
    //Header
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
        paddingTop: 10
    },
    //Product Information
    productContainer: {
        width: Dimensions.get('window').width,
        height: 250,
        backgroundColor: COLORS.lightWhite,
    },
    inputProductName: {
        width: "90%",
        marginVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16,
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
        width: Dimensions.get('window').width,
        height: 100,
        backgroundColor: COLORS.lightWhite,
        marginLeft: 10
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

    //Discount
    discoutContainer: {
        marginTop: 20,
        width: "90%",
        marginHorizontal: "5%",
        height: 80,
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: 10,
    },

    //button
    button: {
        marginTop: 20,
        width: "90%",
        marginHorizontal: "5%",
        height: 60,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

