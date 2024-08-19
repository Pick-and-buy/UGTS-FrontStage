import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import styles from "../css/sellerOrderDetails.style";
import { useFocusEffect } from '@react-navigation/native';
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons, Entypo, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { G, Line, Svg } from "react-native-svg";
import { getUserByToken } from "../../api/user";
import { format, addDays } from 'date-fns';
import { cancelOrderSeller, getOrderByOrderId, updateOrderSeller, uploadPackageVideoBySeller } from '../../api/order';
import OrderTracking from './OrderTracking';
import SellerAddRating from './SellerAddRating';
import { Video } from 'expo-av';
import * as ImagePicker from "expo-image-picker";

const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const SellerOrderDetails = ({ navigation, route }) => {
    const orderInfo = route.params.orderInfo;
    // console.log('>>> check order infor: ', orderInfo);
    const [phoneUserOrder, setPhoneUserOrder] = useState(null);
    const [updatedOrderInfo, setUpdatedOrderInfo] = useState();
    const [showAddRating, setShowAddRating] = useState(false);

    const [videoUri, setVideoUri] = useState("");
    const [isMuted, setIsMuted] = useState(false);

    const [isBuyerRate, setIsBuyerRate] = useState(false);

    useEffect(() => {
        if (orderInfo) {
            fetchOrderInfo();
        }
    }, [orderInfo]);

    useEffect(() => {
        if (updatedOrderInfo) {
            fetchPhoneUserOder();
        }
    }, [updatedOrderInfo]);

    const fetchOrderInfo = async () => {
        try {
            const data = await getOrderByOrderId(orderInfo.id);
            setUpdatedOrderInfo(data.result);
            setVideoUri(data?.result?.orderDetails?.packingVideo);
            if (orderInfo?.isBuyerRate === true) {
                setIsBuyerRate(true);
            }
        } catch (error) {
            console.log('Fetching order data by order id failed:', error);
        }
    }

    const fetchPhoneUserOder = async () => {
        const phoneNumber = updatedOrderInfo?.orderDetails?.phoneNumber;
        const country = updatedOrderInfo?.orderDetails?.address?.country;
        let regionCode = '';

        if (country === 'Việt Nam') {
            regionCode = '+84';
        }
        const visibleDigits = phoneNumber.slice(0, 2) + '******' + phoneNumber.slice(-2);
        setPhoneUserOrder(`(${regionCode}) ${visibleDigits}`)
    }


    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const formattedProductPrice = formatPrice(updatedOrderInfo?.post?.product?.price);
    const shippingPrice = formatPrice(updatedOrderInfo?.orderDetails?.shippingCost);
    const totalPrice = formatPrice(updatedOrderInfo?.post?.product?.price + updatedOrderInfo?.orderDetails?.shippingCost);

    const handleCancelOrder = async () => {
        try {
            Alert.alert(
                "Hủy đơn hàng",
                "Bạn có chắc chắn muốn hủy đơn hàng không?",
                [
                    {
                        text: "Hủy",
                    },
                    {
                        text: "Xác Nhận",
                        onPress: async () => {
                            await cancelOrderSeller(updatedOrderInfo?.id);
                            navigation.navigate('seller');
                        },
                    }
                ]
            );
        } catch (error) {
            console.log('Submit cancel seller order: ', error);
        }
    };

    const handleTransportation = async () => {
        try {
            if (videoUri) {
                let orderId = updatedOrderInfo?.id;
                const formData = new FormData();
                const videoFileName = videoUri.split('/').pop();
                formData.append('productVideo', {
                    uri: videoUri,
                    type: 'video/mp4',
                    name: videoFileName,
                });
                await uploadPackageVideoBySeller(orderId, formData);
                await updateOrderSeller(updatedOrderInfo?.id);
                navigation.navigate('seller');
            } else {
                Alert.alert(
                    "Thiếu thông tin",
                    "Vui lòng tải thêm video đóng gói sản phẩm để tiến hành sắp xếp vận chuyển",
                    [{ text: "OK" }]
                );
            }

        } catch (error) {
            console.log('Submit Accept seller order: ', error);
        }

    }

    //Upload video
    const UploadVideoScreen = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                // cameraType: ImagePicker.CameraType.back,
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [1, 1],
            });
            if (!result.canceled) {
                setVideoUri(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error Upload Image: ', error);
        }
    };

    //Remove Video
    const removeVideo = () => {
        setVideoUri("");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thông tin đơn hàng</Text>
            </View>
            <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
                {
                    updatedOrderInfo?.orderDetails?.status !== "CANCELLED" &&
                    <View style={styles.orderTracking}>
                        <OrderTracking
                            status={updatedOrderInfo?.orderDetails?.status}
                            orderDate={updatedOrderInfo?.orderDetails?.orderDate}
                            deliveryDateFrom={updatedOrderInfo?.orderDetails?.deliveryDate}
                            deliveryDateTo={updatedOrderInfo?.orderDetails?.receivedDate}
                        />
                    </View>
                }
                <View>
                    <View style={styles.ownerAddress}>
                        <SimpleLineIcons name="location-pin" size={20} color="black" />
                        <Text style={styles.ownerName}>
                            {updatedOrderInfo?.orderDetails?.firstName} {updatedOrderInfo?.orderDetails?.lastName} {phoneUserOrder}
                        </Text>
                    </View>
                    <View style={styles.locationDetails}>
                        <Text style={styles.locationText}>
                            {updatedOrderInfo?.orderDetails?.address?.addressLine ?
                                (
                                    `${updatedOrderInfo?.orderDetails?.address?.addressLine}, ${updatedOrderInfo?.orderDetails?.address?.street}, ${updatedOrderInfo?.orderDetails?.address?.district}, ${updatedOrderInfo?.orderDetails?.address?.province}, ${updatedOrderInfo?.orderDetails?.address?.country}`
                                )
                                :
                                (
                                    `${updatedOrderInfo?.orderDetails?.address?.street}, ${updatedOrderInfo?.orderDetails?.address?.district}, ${updatedOrderInfo?.orderDetails?.address?.province}, ${updatedOrderInfo?.orderDetails?.address?.country}`
                                )
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.slanted}>
                    <Svg height="20" width="100%">
                        <G transform="rotate(0)">
                            <Line x1="0" y1="20" x2="100%" y2="20" stroke="red" strokeWidth="2" />
                            <Line x1="0" y1="20" x2="100%" y2="20" stroke="cyan" strokeWidth="2" strokeDasharray="10" />
                        </G>
                    </Svg>
                </View>

                <View style={styles.information}>
                    <View style={styles.seller}>
                        <Image
                            style={styles.sellerImage}
                            source={{ uri: updatedOrderInfo?.buyer?.avatar ? updatedOrderInfo?.buyer?.avatar : profile }}
                        />
                        <Text style={styles.sellerText}>
                            {updatedOrderInfo?.buyer?.lastName} {updatedOrderInfo?.buyer?.firstName} (Người mua)
                        </Text>
                    </View>
                    <View style={styles.product}>
                        <Image
                            style={styles.productImage}
                            source={{ uri: updatedOrderInfo?.post?.product?.images[0]?.imageUrl }}
                        />
                        <View style={styles.content}>
                            <Text numberOfLines={1} style={styles.productName}>
                                {updatedOrderInfo?.post?.product?.name}
                            </Text>
                            <Text numberOfLines={1} style={styles.productDescription}>
                                Color: {updatedOrderInfo?.post?.product?.color}, Size: {updatedOrderInfo?.post?.product?.size}
                            </Text>
                            <View style={styles.label}>

                                {updatedOrderInfo?.post?.product?.verifiedLevel === 'LEVEL_1' && (
                                    <View style={styles.verified}>
                                        <Text style={styles.verifiedText}>Xác minh cấp 1</Text>
                                    </View>
                                )}
                                {updatedOrderInfo?.post?.product?.verifiedLevel === 'LEVEL_2' && (
                                    <View style={[styles.verified, { backgroundColor: '#ff8000' }]}>
                                        <Text style={styles.verifiedText}>Xác minh cấp 2</Text>
                                    </View>
                                )}
                                {updatedOrderInfo?.post?.product?.verifiedLevel === 'LEVEL_3' && (
                                    <View style={[styles.verified, { backgroundColor: '#33cc33' }]}>
                                        <Text style={styles.verifiedText}>Xác minh cấp 3</Text>
                                    </View>
                                )}

                                <View style={styles.returnLabel}>
                                    <AntDesign name="retweet" size={14} color="#FFBB00" />
                                    <Text style={{ fontSize: 12 }}>Trả hàng miễn phí</Text>
                                </View>
                            </View>
                            <Text style={styles.price}>
                                <Text style={styles.currency}>₫</Text>
                                {formattedProductPrice}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.relatedInformation}>
                        <View style={styles.feePrice}>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>Tổng tiền hàng</Text>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>
                                {formattedProductPrice}₫
                            </Text>
                        </View>
                        <View style={styles.feePrice}>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>Vận chuyển</Text>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>
                                {shippingPrice}₫
                            </Text>
                        </View>
                        <View style={styles.feePrice}>
                            <Text style={{ fontSize: 16 }}>Tổng cộng</Text>
                            <Text style={{ fontSize: 16 }}>
                                {totalPrice}₫
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{ fontSize: 18 }}>Mã đơn hàng</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{ fontSize: 18 }}>
                                    {updatedOrderInfo?.id.length > 12 ? `${orderInfo.id.substring(0, 12)}...` : orderInfo.id}
                                </Text>
                                <MaterialIcons name="content-copy" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{ color: COLORS.gray }}>Thời gian đặt hàng</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{ color: COLORS.gray }}>
                                    {updatedOrderInfo?.orderDetails?.orderDate ? format(updatedOrderInfo?.orderDetails?.orderDate, 'dd/MM/yy HH:mm:ss') : ''}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{ color: COLORS.gray }}>Đơn vị giao hàng</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{ color: COLORS.gray }}>
                                    Nhật Tín Logistics
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{ color: COLORS.gray }}>Phương thức thanh toán</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{ color: COLORS.gray }}>
                                    {/* {updatedOrderInfo?.orderDetails?.paymentMethod} */}
                                    LuxBagPay
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {updatedOrderInfo?.orderDetails?.status === "PENDING" &&
                        <View style={styles.redirect}>
                            <TouchableOpacity style={styles.redirectBtn} onPress={() => { }}>
                                <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                                <Text style={styles.redirectBtnText}>Liên hệ người mua</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.redirectBtn} onPress={() => { }}>
                                <FontAwesome name="wechat" size={24} color="black" />
                                <Text style={styles.redirectBtnText}>Liên hệ hỗ trợ</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

                <View style={styles.divider} />
                {/* Upload video: status = PENDING*/}
                {updatedOrderInfo?.orderDetails?.status === "PENDING" &&
                    <>
                        {videoUri === "" || videoUri === null ?
                            (
                                <View style={styles.videoPackageContainer}>
                                    <TouchableOpacity
                                        onPress={UploadVideoScreen}
                                        style={styles.uploadVideoContainer}>
                                        <Image
                                            style={styles.imageSelect}
                                            source={require('../../../assets/images/video-player.png')}
                                        />
                                        <Text style={{ fontSize: 16 }}>Video đóng gói</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.confirmText}>
                                        Vui lòng tải lên video đóng gói sản phẩm trước khi đơn hàng của bạn được giao tới người tiêu dùng.
                                    </Text>
                                </View>
                            )
                            :
                            (
                                <View style={styles.videoPackageContainer}>
                                    <View style={styles.uploadVideo}>
                                        <Video
                                            source={{ uri: videoUri }}
                                            style={styles.uploadVideoStyle}
                                            useNativeControls
                                            resizeMode="cover"
                                            shouldPlay
                                            isLooping
                                            isMuted={isMuted} // Set initial state to mute
                                            onPlaybackStatusUpdate={(status) => {
                                                if (!status.isPlaying && status.isMuted !== isMuted) {
                                                    setIsMuted(true); // Ensure the video starts muted
                                                }
                                            }}
                                        />
                                        <TouchableOpacity onPress={() => removeVideo()} style={{ position: 'absolute', bottom: 10, left: 15 }}>
                                            <FontAwesome6 name="xmark" size={20} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.confirmText}>
                                        Vui lòng tải lên video đóng gói sản phẩm trước khi đơn hàng của bạn được giao tới người tiêu dùng.
                                    </Text>
                                </View>
                            )

                        }
                    </>
                }

                {/* Preview video: status = PROCESSING*/}
                {updatedOrderInfo?.orderDetails?.status === "PROCESSING" &&
                    <View style={styles.videoPackageContainer}>
                        <View style={styles.uploadVideo}>
                            <Video
                                source={{ uri: videoUri }}
                                style={styles.uploadVideoStyle}
                                useNativeControls
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                isMuted={isMuted} // Set initial state to mute
                                onPlaybackStatusUpdate={(status) => {
                                    if (!status.isPlaying && status.isMuted !== isMuted) {
                                        setIsMuted(true); // Ensure the video starts muted
                                    }
                                }}
                            />
                        </View>
                        <Text style={styles.confirmText}>
                            Video đóng gói sản phẩm đảm bảo sự minh bạch, rõ ràng của bạn. Tạo niềm tin tới người tiêu dùng.
                        </Text>
                    </View>
                }

                {updatedOrderInfo?.orderDetails?.status === "RECEIVED" && !showAddRating &&
                    <>
                        {/* Nếu người mua chưa đánh giá sản phẩm thì người bán sẽ không có quyền đánh giá người mua */}
                        {!isBuyerRate ?
                            (
                                <View style={styles.confirm}>
                                    <Text style={[styles.confirmText, { width: '90%', marginTop: 15 }]}>
                                        Sản phẩm của bạn đã được vận chuyển thành công. Vui lòng chờ đánh giá từ người mua sau đó thực hiện đánh giá để hoàn thành quy trình vận chuyển hàng.
                                    </Text>
                                </View>
                            )
                            :
                            (
                                <View style={styles.confirm}>
                                    <Text style={styles.confirmText}>
                                        Vui lòng chỉ ấn "Đánh giá người mua" khi đơn hàng đã được giao đến người mua và sản phẩm nhận được không có vấn để nào.
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.confirmButton}
                                        onPress={() => setShowAddRating(true)}
                                    >
                                        <Text style={styles.confirmTextButton}>Đánh giá người mua</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }

                    </>
                }
                {showAddRating && <SellerAddRating navigation={navigation} orderInfo={updatedOrderInfo} />}

            </ScrollView>
            {updatedOrderInfo?.orderDetails?.status === "PENDING" &&
                <View style={styles.bottomBtn}>
                    <TouchableOpacity style={styles.changeAddressBtn} onPress={handleCancelOrder}>
                        <Text style={styles.changeAddressBtnText}>Từ chối đơn hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTransportation}>
                        <Text style={styles.buttonText}>Sắp xếp vận chuyển</Text>
                    </TouchableOpacity>
                </View>
            }
            {updatedOrderInfo?.orderDetails?.status === "PROCESSING" &&
                <View style={styles.bottomBtn}>
                    <TouchableOpacity style={styles.changeAddressBtn} onPress={handleCancelOrder}>
                        <Text style={styles.changeAddressBtnText}>Từ chối đơn hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { }}>
                        <Text style={styles.buttonText}>In nhãn</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default SellerOrderDetails;