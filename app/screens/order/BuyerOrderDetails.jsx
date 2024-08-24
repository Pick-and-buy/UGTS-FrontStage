import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import styles from "../css/buyerOrderDetails.style";
import { useFocusEffect } from '@react-navigation/native';
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { G, Line, Svg } from "react-native-svg";
import { getUserByToken } from "../../api/user";
import { format, addDays } from 'date-fns';
import { cancelOrderBuyer, getOrderByOrderId, updateOrderBuyer, uploadReceivePackageVideoByBuyer } from '../../api/order';
import OrderTracking from './OrderTracking';
import * as Clipboard from 'expo-clipboard';
import AddRating from './AddRating';
import { useAuth } from '../../context/AuthContext'
import { Video } from 'expo-av';
import * as ImagePicker from "expo-image-picker";
const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
import CustomModal from '../../components/CustomModal';

const BuyerOrderDetails = ({ navigation, route }) => {

  const orderInfo = route.params.orderInfo;
  const { user } = useAuth();
  const [updatedOrderInfo, setUpdatedOrderInfo] = useState();
  const [phoneUserOrder, setPhoneUserOrder] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddRating, setShowAddRating] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    detailText: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => { },
  });

  const [videoUri, setVideoUri] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  const [videoPackage, setVideoPackage] = useState("");

  const [isBuyerRate, setIsBuyerRate] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Add state to track data loading

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
      setVideoUri(data?.result?.orderDetails?.receivePackageVideo)
      setVideoPackage(data?.result?.orderDetails?.packingVideo)
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


  const copiedOrderId = () => {
    Clipboard.setString(updatedOrderInfo?.id);
    // Alert.alert('>>> check copiedText: ', orderInfo.id)
  };


  useFocusEffect(
    useCallback(() => {
      if (route.params?.selectedAddress) {
        setSelectedAddress(route.params.selectedAddress);
        handleUpdateOrder(route.params.selectedAddress);
      }
    }, [route.params?.selectedAddress])
  );

  const handleUpdateOrder = async (newAddress) => {
    try {
      await updateOrderBuyer(orderInfo, newAddress || selectedAddress);
      setModalVisible(true);
      setModalContent({
        title: 'Thành công',
        detailText: 'Thay đổi địa chỉ thành công!',
        confirmText: 'Xác Nhận',
        cancelText: '',
        onConfirm: () => setModalVisible(false)
      });
    } catch (error) {
      console.log('Submit update buyer order', error);
    }
  };

  const handleCancelOrder = () => {
    setModalContent({
      title: 'Hủy đơn hàng',
      detailText: 'Bạn có chắc chắn muốn hủy đơn hàng không?',
      confirmText: 'Xác Nhận',
      cancelText: 'Hủy',
      onConfirm: async () => {
        try {
          await cancelOrderBuyer(orderInfo, selectedAddress);
          navigation.navigate('cancel-successfully', { orderInfo: orderInfo });
          setModalVisible(false); // Close the modal after the order is canceled
        } catch (error) {
          console.log('Submit cancel buyer order: ', error);
        }
      },
    });
    setModalVisible(true); // Show the modal
  };

  console.log('>>>> check order: ', orderInfo.id);

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

  //submit received order
  const handleSubmitReceived = async (orderInfo) => {
    try {
      if (videoUri) {
        setIsDataLoaded(true);   //Thực hiện màn hình hiển thị chữ Loading... trong lúc chờ call API thành công
        let orderId = orderInfo.id;
        const formData = new FormData();
        const videoFileName = videoUri.split('/').pop();
        formData.append('productVideo', {
          uri: videoUri,
          type: 'video/mp4',
          name: videoFileName,
        });
        await uploadReceivePackageVideoByBuyer(orderId, formData);

        setIsDataLoaded(false);

      }
      setShowAddRating(true)
    } catch (error) {
      console.log('ERROR handle update video: ', error);
    }
  }

  if (isDataLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
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
              {selectedAddress?.addressLine
                ? `${selectedAddress?.addressLine}, ${selectedAddress?.street}, ${selectedAddress?.district}, ${selectedAddress?.province}, ${selectedAddress?.country}`
                : updatedOrderInfo?.orderDetails?.address?.addressLine
                  ? `${updatedOrderInfo?.orderDetails?.address?.addressLine}, ${updatedOrderInfo?.orderDetails?.address?.street}, ${updatedOrderInfo?.orderDetails?.address?.district}, ${updatedOrderInfo?.orderDetails?.address?.province}, ${updatedOrderInfo?.orderDetails?.address?.country}`
                  : `${updatedOrderInfo?.orderDetails?.address?.street}, ${updatedOrderInfo?.orderDetails?.address?.district}, ${updatedOrderInfo?.orderDetails?.address?.province}, ${updatedOrderInfo?.orderDetails?.address?.country}`
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
              source={{ uri: updatedOrderInfo?.post?.user?.avatar ? updatedOrderInfo?.post?.user?.avatar : profile }}
            />
            <Text style={styles.sellerText}>
              {updatedOrderInfo?.post?.user?.lastName} {updatedOrderInfo?.post?.user?.firstName} (Người bán)
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
                <Text style={styles.currency}>đ</Text>
                {formattedProductPrice}
              </Text>
            </View>
          </View>

          <View style={styles.relatedInformation}>
            <View style={styles.transport}>
              <Text style={{ fontSize: 16, color: COLORS.gray }}>Vận chuyển tiêu chuẩn</Text>
              <Text style={{ fontSize: 16, color: COLORS.gray }}>
                {shippingPrice}₫
              </Text>
            </View>
            <View style={styles.transportFrom}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={18} color={COLORS.gray} />
              <Text style={{ fontSize: 12, color: COLORS.gray }}>Từ Hà Nội</Text>
            </View>
            <View style={styles.transportTime}>
              <AntDesign name="clockcircleo" size={16} color={COLORS.gray} />
              <Text style={{ fontSize: 12, color: COLORS.gray }}>
                Ngày giao hàng dự kiến: {updatedOrderInfo?.orderDetails?.deliveryDate ? format(updatedOrderInfo?.orderDetails?.deliveryDate, 'MMM d') : ''} - {updatedOrderInfo?.orderDetails?.receivedDate ? format(updatedOrderInfo?.orderDetails?.receivedDate, 'MMM d') : ''}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.total}>
            <Text style={styles.totalHeader}>Thông tin đặt hàng</Text>
            <View style={styles.totalPrice}>
              <View style={styles.totalLeft}>
                <Text style={styles.totalText}>Sản phẩm</Text>
                <Text style={styles.totalText}>Vận chuyển</Text>
              </View>

              <View style={styles.totalRight}>
                <Text style={styles.totalText}>
                  {formattedProductPrice}₫
                </Text>
                <Text style={styles.totalText}>
                  {shippingPrice}₫
                </Text>
              </View>
            </View>
            <View style={styles.totalPrice}>
              <Text style={styles.totalHeader}>Tổng</Text>
              <Text style={styles.totalHeader}>
                {totalPrice}₫
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentMethods}>
            <Text style={styles.paymentMethodsHeader}>Phương thức thanh toán</Text>
            <View>
              {/* List phương thức thanh toán in here*/}
              <Text>
                {/* {updatedOrderInfo?.orderDetails?.paymentMethod} */}
                LuxBagPay
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.specification}>
            <View style={styles.left}>
              <Text style={{ fontSize: 18 }}>ID đơn hàng</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity style={styles.orderId} onPress={() => { }}>
                <Text style={{ fontSize: 18 }}>
                  {updatedOrderInfo?.id.length > 10 ? `${orderInfo.id.substring(0, 10)}...` : orderInfo.id}
                </Text>
                <MaterialIcons name="content-copy" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.redirect}>
            <TouchableOpacity style={styles.redirectBtn} onPress={() => { }}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color="black" />
              <Text style={styles.redirectBtnText}>Liên hệ người bán</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.redirectBtn}
              onPress={() => navigation.navigate("user-profile-details", { user: updatedOrderInfo?.post?.user, userIdLogged: user?.id })}
            >
              <Entypo name="shop" size={22} color="black" />
              <Text style={styles.redirectBtnText}>Ghé thăm người bán</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />

        {updatedOrderInfo?.orderDetails?.status === "PROCESSING" &&
          <View style={styles.videoContainer}>
            <View
              //onPress={UploadVideoScreen}
              style={styles.uploadVideoContainer_1}
            >
              <Image
                style={styles.imageSelect_1}
                source={require('../../../assets/images/video-player.png')}
              />
              <Text style={{ fontSize: 16 }}>Video nhận hàng</Text>
            </View>
            <View style={styles.uploadVideo_1}>
              <Video
                source={{ uri: videoPackage }}
                style={styles.uploadVideoStyle_1}
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
              <View style={{ marginHorizontal: 'auto', marginTop: 5 }}>
                <Text style={[styles.confirmTextRECEIVED, { fontSize: 16 }]}>Video đóng gói</Text>
              </View>
            </View>
          </View>
        }

        {updatedOrderInfo?.orderDetails?.status === "DELIVERING" &&
          <View style={[styles.videoContainer, { marginBottom: 50 }]}>
            <View
              //onPress={UploadVideoScreen}
              style={styles.uploadVideoContainer_1}
            >
              <Image
                style={styles.imageSelect_1}
                source={require('../../../assets/images/video-player.png')}
              />
              <Text style={{ fontSize: 16 }}>Video nhận hàng</Text>
            </View>
            <View style={styles.uploadVideo_1}>
              <Video
                source={{ uri: videoPackage }}
                style={styles.uploadVideoStyle_1}
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
              <View style={{ marginHorizontal: 'auto', marginTop: 5 }}>
                <Text style={[styles.confirmTextRECEIVED, { fontSize: 16 }]}>Video đóng gói</Text>
              </View>
            </View>
          </View>
        }

        {updatedOrderInfo?.orderDetails?.status === "RECEIVED" && !showAddRating &&
          <View style={styles.receivedContainer}>
            {videoUri === "" || videoUri === null ?
              (
                <>
                  {/* Nếu người dùng chưa rate thì cho phép upload video nhận hàng còn khi đã rate thì xóa bỏ chức năng upload video */}
                  {!isBuyerRate ?
                    (
                      <View style={styles.videoContainer}>
                        <TouchableOpacity
                          onPress={UploadVideoScreen}
                          style={styles.uploadVideoContainer_1}
                        >
                          <Image
                            style={styles.imageSelect_1}
                            source={require('../../../assets/images/video-player.png')}
                          />
                          <Text style={{ fontSize: 16 }}>Video nhận hàng</Text>
                        </TouchableOpacity>
                        <View style={styles.uploadVideo_1}>
                          <Video
                            source={{ uri: videoPackage }}
                            style={styles.uploadVideoStyle_1}
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
                          <View style={{ marginHorizontal: 'auto', marginTop: 5 }}>
                            <Text style={[styles.confirmTextRECEIVED, { fontSize: 16 }]}>Video đóng gói</Text>
                          </View>
                        </View>
                      </View>
                    )
                    :
                    (
                      <View style={styles.videoContainer}>
                        <View
                          //onPress={UploadVideoScreen}
                          style={styles.uploadVideoContainer_1}
                        >
                          <Image
                            style={styles.imageSelect_1}
                            source={require('../../../assets/images/video-player.png')}
                          />
                          <Text style={{ fontSize: 16 }}>Video nhận hàng</Text>
                        </View>
                        <View style={styles.uploadVideo_1}>
                          <Video
                            source={{ uri: videoPackage }}
                            style={styles.uploadVideoStyle_1}
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
                          <View style={{ marginHorizontal: 'auto', marginTop: 5 }}>
                            <Text style={[styles.confirmTextRECEIVED, { fontSize: 16 }]}>Video đóng gói</Text>
                          </View>
                        </View>
                      </View>
                    )
                  }
                </>
              )
              :
              (
                <View style={styles.videoContainer}>
                  {/* Video nhận hàng của người mua */}
                  <View style={styles.uploadVideo_1}>
                    <Video
                      source={{ uri: videoUri }}
                      style={styles.uploadVideoStyle_1}
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
                    {!isBuyerRate ?
                      (
                        <TouchableOpacity onPress={() => removeVideo()} style={{ position: 'absolute', bottom: 10, left: 15 }}>
                          <FontAwesome6 name="xmark" size={20} color="white" />
                        </TouchableOpacity>
                      )
                      :
                      (
                        <View></View>
                      )
                    }

                    <View style={{ marginHorizontal: 'auto', marginTop: 5 }}>
                      <Text style={[styles.confirmTextRECEIVED, { fontSize: 16 }]}>Video nhận hàng</Text>
                    </View>
                  </View>

                  {/* Video đóng hàng của người bán */}
                  <View style={styles.uploadVideo_1}>
                    <Video
                      source={{ uri: videoPackage }}
                      style={styles.uploadVideoStyle_1}
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
                    <View style={{ marginHorizontal: 'auto', marginTop: 5 }}>
                      <Text style={[styles.confirmTextRECEIVED, { fontSize: 16 }]}>Video đóng gói</Text>
                    </View>
                  </View>
                </View>
              )
            }

            {/* Nếu người dùng đã thực hiện chức năng rate rồi thì bỏ nút Đã nhận được hàng */}
            {!isBuyerRate ?
              (
                <View style={styles.confirm_RECEIVED}>
                  <Text style={styles.confirmTextRECEIVED}>
                    Vui lòng chỉ ấn "Đã nhận được hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có vấn để nào.
                    Bạn có thể tải video nhận hàng sau đó đánh giá.
                  </Text>
                  <TouchableOpacity
                    style={styles.confirmButtonRECEIVED}
                    onPress={() => handleSubmitReceived(orderInfo)}
                  >
                    <Text style={styles.confirmTextButton_1}>Đã nhận được hàng</Text>
                  </TouchableOpacity>
                </View>
              )
              :
              (
                <View style={{ marginBottom: 80 }}></View>
              )
            }

          </View>
        }

        {showAddRating && <AddRating navigation={navigation} orderInfo={updatedOrderInfo} />}

      </ScrollView>

      {updatedOrderInfo?.orderDetails?.status !== "DELIVERING" && updatedOrderInfo?.orderDetails?.status !== "RECEIVED" && (
        <View style={styles.bottomBtn}>
          {updatedOrderInfo?.orderDetails?.status === "CANCELLED" ? (

            <TouchableOpacity
              onPress={() => navigation.navigate('post-details', { postId: updatedOrderInfo?.post?.id })}
              style={styles.buyBtn}
            >
              <Text style={styles.buyBtnText}>Mua Lại Sản Phẩm</Text>
            </TouchableOpacity>

          ) : updatedOrderInfo?.orderDetails?.status === "PENDING" || updatedOrderInfo?.orderDetails?.status === "PROCESSING" ? (
            <>
              <TouchableOpacity
                style={styles.changeAddressBtn}
                onPress={() => navigation.navigate('address-lists', {
                  orderInfo,
                  type: 'buyer-change-address'
                })}
              >
                <Text style={styles.changeAddressBtnText}>Thay đổi địa chỉ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCancelOrder}>
                <Text style={styles.buttonText}>Hủy đơn hàng</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      )}

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={modalContent.onConfirm}
        title={modalContent.title}
        detailText={modalContent.detailText}
        confirmText={modalContent.confirmText}
        cancelText={modalContent.cancelText}
      />
    </View>
  )
}

export default BuyerOrderDetails