import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    Pressable,
} from "react-native";
import { FontAwesome, Ionicons, AntDesign, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import Carousel from "pinar";

const ProductDetail = () => {

    const navigation = useNavigation();

    //Lấy props khi onPress
    const item = useRoute().params.itemDetail;

    useEffect(() => {
        console.log("check product <ProductDetail>: ", item);
        // brand && getProductByBrand();
    }, [item])

    const carouselData = [
        {
            id: "01",
            image: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg'
        },
        {
            id: "02",
            image: 'https://soliloquywp.com/wp-content/uploads/2016/09/How-to-Add-a-Homepage-Slider-in-WordPress.png'
        },
        {
            id: "03",
            image: 'https://www.searchenginejournal.com/wp-content/uploads/2019/10/25-of-the-best-examples-of-home-pages-5dc504205de2e.png'
        },
        {
            id: "04",
            image: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg'
        },
    ]

    const openComments = () => {
        console.warn('open comments')
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        name="chevron-back-outline"
                        size={35}
                        color={COLORS.primary} />
                    <View style={styles.headerText}>
                        <Text
                            style={styles.textName}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {item.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>
                {/* Carousel */}
                <View>
                    <Carousel
                        style={styles.carouselContainer}
                        showsControl={false}
                    >
                        {carouselData.map((image) => (
                            <View style={styles.viewImage}>
                                <Image
                                    style={styles.carouselImage}
                                    source={{ uri: image?.image }}
                                    key={image.id}
                                />
                            </View>

                        ))}
                    </Carousel>
                </View>
                {/* Body */}
                <View style={styles.inforProduct}>

                    <View>
                        <Text
                            style={{ fontSize: 20 }}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >
                            {item.title}
                        </Text>
                        <Text style={styles.textCategory}>
                            {item.category}
                        </Text>
                    </View>

                    <View style={styles.viewTransport}>
                        <Text style={{ textAlign: 'center' }}>
                            Miễn Phí Vận Chuyển
                        </Text>
                    </View>
                    <View>
                        <Text style={{ marginVertical: 10, color: COLORS.red, fontFamily: 'bold' }} >
                            ${item.price}
                        </Text>
                    </View>
                    <View style={styles.viewPayment}>
                        <AntDesign
                            name="creditcard"
                            size={24}
                            color="black" />
                        <Text style={{ marginLeft: 15 }}>
                            Sử dụng ví GIATOTPAY để mua với giá <Text style={{ color: COLORS.red }}>${item.price - 200}</Text>
                        </Text>
                    </View>
                </View>
                <View style={[styles.shadow, { marginTop: 10, height: 20 }]}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Comment */}
                <View style={{ marginHorizontal: 15 }}>
                    <TouchableOpacity onPress={openComments}>
                        <Text style={{ fontFamily: 'bold', marginVertical: 10 }}>
                            Bình Luận
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.commentContainer}>
                        <Image
                            style={styles.avatarComment}
                            source={{ uri: item?.avatar }}
                        />
                        <Text>
                            {item.contactPerson}
                        </Text>
                    </View>
                </View>

                <View style={[styles.shadow, { marginTop: 10, height: 20 }]}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Description */}
                <View style={{ marginHorizontal: 15 }}>
                    <Text style={{ marginVertical: 10 }}>
                        {item.description}
                    </Text>
                    <View style={styles.description}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons
                                name="time-outline"
                                size={24}
                                color="black" />
                            <Text style={{ marginLeft: 5 }}>26-3-2024 8:10</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons
                                name="flag-outline"
                                size={24}
                                color="black" />
                            <Text style={{ marginLeft: 5 }}>Báo Cáo</Text>
                        </View>
                    </View>
                    <View style={[styles.shadow, { marginLeft: -15 }]}>
                        {/* Tạo Khoảng Trống */}
                    </View>
                    {/* Hastag */}
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <View style={{ borderWidth: 1, backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', marginRight: 10 }}>
                            <Text>#tuisach</Text>
                        </View>
                        <View style={{ borderWidth: 1, backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', marginRight: 10 }}>
                            <Text>#chanel</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.shadow, { marginTop: 10, height: 20 }]}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Detail Sản Phẩm */}
                <View>
                    <View style={styles.detailContainer}>
                        <View style={styles.detail}>
                            <Text>Danh Mục</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ color: 'blue' }}>Túi Xách</Text>
                        </View>
                    </View>
                    <View style={styles.shadow}>
                        {/* Tạo Khoảng Trống */}
                    </View>

                    <View style={styles.detailContainer}>
                        <View style={styles.detail}>
                            <Text>Thương Hiệu</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ color: 'blue' }}>Gucci</Text>
                        </View>
                    </View>
                    <View style={styles.shadow}>
                        {/* Tạo Khoảng Trống */}
                    </View>

                    <View style={styles.detailContainer}>
                        <View style={styles.detail}>
                            <Text>ID Sản Phẩm</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ color: 'blue' }}>Z189881722</Text>
                        </View>
                    </View>
                    <View style={styles.shadow}>
                        {/* Tạo Khoảng Trống */}
                    </View>

                    <View style={styles.detailContainer}>
                        <View style={styles.detail}>
                            <Text>Màu Sắc</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ color: 'blue' }}>Màu Ghi</Text>
                        </View>
                    </View>
                    <View style={styles.shadow}>
                        {/* Tạo Khoảng Trống */}
                    </View>

                    <View style={styles.detailContainer}>
                        <View style={styles.detail}>
                            <Text>Tình trạng sản phẩm</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ color: 'blue' }}>Không trầy xước và bụi bẩn</Text>
                        </View>
                    </View>
                    <View style={styles.shadow}>
                        {/* Tạo Khoảng Trống */}
                    </View>

                    <View style={styles.detailContainer}>
                        <View style={styles.detail}>
                            <Text>Phương Thức Vận Chuyển</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ color: 'blue' }}>J&T Express</Text>
                        </View>
                    </View>
                    <View style={styles.shadow}>
                        {/* Tạo Khoảng Trống */}
                    </View>

                    <View style={styles.detailContainer}>
                        <View style={styles.detail}>
                            <Text>Thời Gian Vận Chuyển</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ color: 'blue' }}>Ước Tính 2 - 3 ngày</Text>
                        </View>
                    </View>
                    <View style={styles.shadow}>
                        {/* Tạo Khoảng Trống */}
                    </View>

                    <View style={styles.detailContainer}>
                        <View style={styles.detail}>
                            <Text>Khu Vực</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ color: 'blue' }}>
                                Gia Lâm - Hà Nội
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.shadow, { marginTop: 10, height: 20 }]}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Personal Information */}
                <View style={[styles.detailContainer, { marginBottom: 100, marginTop: 15 }]}>
                    <View style={[styles.commentContainer, { alignItems: 'flex-start' }]}>
                        <Image
                            style={styles.avatarComment}
                            source={{ uri: item?.avatar }}
                        />
                        <View>
                            <Text>
                                {item.contactPerson}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <EvilIcons
                                        name="star"
                                        size={18}
                                        color="black" />
                                    <EvilIcons
                                        name="star"
                                        size={18}
                                        color="black" />
                                    <EvilIcons
                                        name="star"
                                        size={18}
                                        color="black" />
                                    <EvilIcons
                                        name="star"
                                        size={18}
                                        color="black" />
                                    <EvilIcons
                                        name="star"
                                        size={18}
                                        color="black" />
                                    <View style={{ marginTop: -4, marginLeft: 5 }}>
                                        <Text style={{ color: 'red' }}>(0)</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5, marginTop: -4, marginLeft: 60 }}>
                                    <MaterialIcons
                                        name="verified"
                                        size={20}
                                        color="black" />
                                    <Text>Đã định danh</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <MaterialIcons
                            onPress={() => console.warn('Profile')}
                            name="navigate-next"
                            size={35}
                            color={COLORS.primary} />
                    </View>
                </View>

                {/* btn submit */}
                <TouchableOpacity
                    onPress={() => console.warn('Tiếp tục mua hàng')}
                    style={styles.btnSubmit}
                >
                    <Text style={styles.btnTxt}>
                        Tiếp tục mua hàng
                    </Text>
                </TouchableOpacity>


            </View>
        </ScrollView>

    );




};



export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    //Header
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 20,

    },
    textName: {
        fontSize: 22,
        fontFamily: 'bold',
        color: COLORS.black,

    },
    headerText: {
        width: '75%',
        marginLeft: 20,

    },
    //Carousel
    carouselContainer: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    carouselImage: {
        height: 150,
        borderRadius: 10,
    },
    viewImage: {
        paddingHorizontal: 50
    },
    //Body: Information Product
    inforProduct: {
        marginHorizontal: 15,
        marginTop: -15
    },
    textCategory: {
        fontFamily: 'bold',
        color: "blue",
        marginVertical: 10
    },
    viewTransport: {
        width: '40%',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        backgroundColor: '#D3D3D3',
    },
    viewPayment: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    shadow: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#D3D3D3',
        width: Dimensions.get('window').width,
    },
    // Comment
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatarComment: {
        width: 30,
        height: 30,
        borderRadius: 99,
    },
    bottomSheet: {
        flex: 1,
        padding: 120,
        backgroundColor: 'grey',
    },
    // Description
    description: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    //Detail Product
    detailContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        marginHorizontal: 15,
    },
    detail: {
        width: '50%'
    },

    //Submit
    btnSubmit: {
        height: 60,
        width: "70%",
        marginVertical: 20,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginLeft: "15%",
    },
    btnTxt: {
        fontFamily: "bold",
        color: COLORS.white,
        fontSize: 18,
        justifyContent: "center",
        alignItems: "center",
    },
})

