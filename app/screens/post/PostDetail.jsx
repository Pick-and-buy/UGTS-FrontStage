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
import { FontAwesome, Ionicons, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import Carousel from "pinar";

const PostDetail = () => {

    const navigation = useNavigation();

    //Lấy props khi onPress
    const item = useRoute().params.post;

    useEffect(() => {
        console.log("check post <PostDetail>: ", item);
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: item?.avatar }}
                        />
                        <Text style={{ fontSize: 24 }}>
                            {item?.name}
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
                            <View style={{ paddingHorizontal: 50 }}>
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
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontFamily: 'bold' }}>
                            Kích Thước: <Text style={{ fontFamily: 'default' }}>50cm x 18cm x 15cm</Text>
                        </Text>
                        <Text style={{ fontFamily: 'bold' }}>
                            Màu Sắc: <Text style={{ fontFamily: 'default' }}>Trắng</Text>
                        </Text>
                        <Text style={{ fontFamily: 'bold' }}>
                            Chất Liệu: <Text style={{ fontFamily: 'default' }}>Da cao cấp, vải cao cấp</Text>
                        </Text>
                    </View>
                    <View style={{ marginVertical: 15 }}>
                        <Text>
                            Mô tả: Chúng tôi cam kết sẽ cẩn thận đóng gói và vận chuyển để sản phẩm không bị ướt hoặc bẩn
                        </Text>
                    </View>
                </View>

                {/* Icon: Time And More */}
                <View style={styles.time}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                            name="time-outline"
                            size={24}
                            color="black" />
                        <Text style={{ marginLeft: 5 }}>16 giờ trước</Text>
                    </View>
                    <View style={styles.viewMoreIcon}>
                        <Feather
                            onPress={() => console.warn('More Function')}
                            name="more-horizontal"
                            size={24}
                            color="black" />
                    </View>
                </View>
                <View style={[styles.shadow, { marginTop: 10 }]}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Comment */}
                <View style={{ marginHorizontal: 15 }}>
                    <View>
                        <Text style={{ fontFamily: 'bold', marginVertical: 10 }}>
                            Bình Luận
                        </Text>
                    </View>
                    <View style={styles.commentBox}>
                        <TextInput
                            style={{ paddingHorizontal: 15 }}
                            numberOfLines={4}
                            multiline={true}
                            placeholder="Hãy Nhập Bình Luận Vào Đây"
                        />
                    </View>
                </View>
            </View>
        </ScrollView>

    );
}

export default PostDetail;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },

    //Header
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40,
        marginBottom: 20,
        marginLeft: 15
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 99,
    },

    //Space
    shadow: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#D3D3D3',
        width: Dimensions.get('window').width,
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

    //Body: Information Product
    inforProduct: {
        marginHorizontal: 15,
        marginTop: -15,
    },
    textCategory: {
        fontFamily: 'bold',
        color: "blue",
        marginVertical: 10
    },

    //Icon: Time And More
    time: {
        marginHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewMoreIcon: {
        borderWidth: 1,
        borderRadius: 99,
        borderColor: 'black'
    },

    // Comment
    commentBox: {
        borderWidth: 1,
        width: '70%',
        borderRadius: 5,
        borderColor:'#E2E2E2',
        backgroundColor: '#E2E2E2'
    },

})

