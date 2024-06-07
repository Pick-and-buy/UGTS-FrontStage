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
import moment from "moment/moment";
import { callFetchPostDetails } from "../../api/post";

const ProductDetail = () => {

    const navigation = useNavigation();
    //Lấy props khi onPress
    //API cần phải lấy product detail
    const item = useRoute().params.itemDetail;

    const [postDetail, setPostDetail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //Array: Nếu muốn hiển thị ảnh thì phải dùng vòng map
    const [slider, setSLider] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchPostDetails()
    }, [])

    const fetchPostDetails = async () => {
        setIsLoading(true);
        const res = await callFetchPostDetails(item.id);
        // console.log(">>> check res Post Detail<ProductDetail>: ", res.data.result);
        if (res && res?.data && res?.data?.result) {
            setPostDetail(res?.data?.result)
            setSLider(res?.data?.result?.product?.images);
        }
        setIsLoading(false);
    }

    console.log(postDetail);

    const openComments = () => {
        console.warn('open comments')
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Header */}
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
                            {postDetail?.product?.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Carousel */}
                <View style={{ marginBottom: 30 }}>
                    <View style={styles.carouselContainer}>
                        <View>
                            <FlatList
                                data={slider}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled={true}
                                onScroll={e => {
                                    const x = e.nativeEvent.contentOffset.x;
                                    setCurrentIndex((x / Dimensions.get('window').width).toFixed(0))
                                }}
                                renderItem={({ item, index }) => (
                                    <View style={styles.imageContainer}>
                                        <TouchableOpacity
                                            disabled={true}
                                            style={{ width: '90%', height: '90%', borderRadius: 10 }}
                                        >
                                            <Image
                                                style={styles.carouselImage}
                                                source={{ uri: item?.imageUrl }}
                                                key={item.id}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                    <View style={styles.dotContainer}>
                        {
                            slider?.map((item, index) => {
                                return (
                                    <View style={{
                                        width: currentIndex == index ? 40 : 8,
                                        height: currentIndex == index ? 10 : 8,
                                        borderRadius: currentIndex == index ? 5 : 4,
                                        backgroundColor: currentIndex == index ? COLORS.primary : 'gray',
                                        marginLeft: 5
                                    }}>

                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                {/* Body */}
                <View style={styles.inforProduct}>
                    <View>
                        <Text
                            style={{ fontSize: 20 }}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >
                            {postDetail?.product?.name}
                        </Text>
                        <Text style={styles.textCategory}>
                            {/* {item.category} */}
                            Túi Xách
                        </Text>
                    </View>

                    <View style={styles.viewTransport}>
                        <Text style={{ textAlign: 'center' }}>
                            Miễn Phí Vận Chuyển
                        </Text>
                    </View>
                    <View>
                        <Text style={{ marginVertical: 10, color: COLORS.red, fontFamily: 'bold', fontSize: 20 }} >
                            ${postDetail?.product?.price}
                        </Text>
                    </View>
                    <View style={styles.viewPayment}>
                        <AntDesign
                            name="creditcard"
                            size={24}
                            color="black" />
                        <Text style={{ marginLeft: 15 }}>
                            Sử dụng ví GIATOTPAY để mua với giá <Text style={{ color: COLORS.red }}>${item.product.price - 100}</Text>
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
                        {/* <Image
                            style={styles.avatarComment}
                            source={{ uri: item?.avatar }}
                        />
                        <Text>
                            {item.contactPerson}
                        </Text> */}
                        <Text>API THIẾU avatar + person</Text>
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
                            <Text style={{ marginLeft: 5 }}>
                                {moment(postDetail.createdAt).format("DD-MM-YYYY HH:mm")}
                            </Text>
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
                            <Text style={{ color: 'blue' }}>Gucci-fix cứng</Text>
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
                            <Text style={{ color: 'blue' }}>{postDetail?.product?.serialNumber}-null</Text>
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
                            <Text style={{ color: 'blue' }}>{postDetail?.product?.color}</Text>
                        </View>
                    </View>
                    <View style={styles.shadow}>
                        {/* Tạo Khoảng Trống */}
                    </View>

                    <View style={styles.detailContainer}>
                        <View style={styles.detail}>
                            <Text>Chất Liệu</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ color: 'blue' }}>{postDetail?.product?.material}</Text>
                        </View>
                    </View>
                    <View style={styles.shadow}>
                        {/* Tạo Khoảng Trống */}
                    </View>

                    <View style={styles.detailContainer}>
                        <View style={styles.detail}>
                            <Text>Kích Thước</Text>
                        </View>
                        <View style={styles.detail}>
                            <Text style={{ color: 'blue' }}>{postDetail?.product?.size}</Text>
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
                            <Text style={{ color: 'blue' }}>{postDetail?.product?.condition}</Text>
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
                                {postDetail?.product?.purchasedPlace}-null
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
        marginTop: 20
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    carouselImage: {
        height: "100%",
        borderRadius: 10,
    },

    dotContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width
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

