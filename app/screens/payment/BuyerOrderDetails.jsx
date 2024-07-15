import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import styles from "../css/buyerOrderDetails.style";
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons ,Entypo} from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { G, Line, Svg } from "react-native-svg";
import { getUserByToken } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from 'react-native-paper';
import { format, addDays } from 'date-fns';
import { order } from '../../api/order';

const BuyerOrderDetails = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="chevron-left" size={30} color={COLORS.primary} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Thông tin đơn hàng</Text>
      </View>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>

        <View>
          <View style={styles.ownerAddress}>
            <SimpleLineIcons name="location-pin" size={20} color="black" />
            <Text style={styles.ownerName}>
              {/* {user?.result?.firstName} {user?.result?.lastName} {maskPhoneNumber(user?.result?.phoneNumber, '+84')} */}
              {"Trần Anh Quang (+84)56*****66"}
            </Text>
          </View>
          <View style={styles.locationDetails}>
            <Text style={styles.locationText}>
              {/* {address.addressLine}, {address.street}, {address.district}, {address.province}, {address.country} */}
              {"Masteri Home,Tân Xá, huyện Thạch Thất, thành phố Hà Nội, Việt Nam"}
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
              // source={{ uri: postDetails?.product?.images[0]?.imageUrl }}
              source={{ uri: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg" }}
            />
            <Text style={styles.sellerText}>
              Người bán
            </Text>
          </View>
          <View style={styles.product}>
            <Image
              style={styles.productImage}
              // source={{ uri: postDetails?.product?.images[0]?.imageUrl }}
              source={{ uri: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg" }}
            />
            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.productName}>
                {/* {postDetails?.product?.name} */}
                Áo sơ mi nam ROWAY form
              </Text>
              <Text numberOfLines={1} style={styles.productDescription}>
                {/* Color: {postDetails?.product?.color}, Size: {postDetails?.product?.size} */}
                Kẻ xanh, SIZE:L
              </Text>
              <View style={styles.label}>
                <View style={styles.verifiedLabel}>
                  <MaterialIcons name="verified" size={14} color="#FFBB00" />
                  <Text style={{ fontSize: 12 }}>Đã xác minh</Text>
                </View>
                <View style={styles.returnLabel}>
                  <AntDesign name="retweet" size={14} color="#FFBB00" />
                  <Text style={{ fontSize: 12 }}>Trả hàng miễn phí</Text>
                </View>
              </View>
              <Text style={styles.price}>
                <Text style={styles.currency}>đ</Text>
                {/* {formattedProductPrice} */}
                199.000
              </Text>
            </View>
          </View>

          <View style={styles.relatedInformation}>
            <View style={styles.transport}>
              <Text style={{ fontSize: 16, color: COLORS.gray }}>Vận chuyển tiêu chuẩn</Text>
              <Text style={{ fontSize: 16, color: COLORS.gray }}>
                {/* {formattedShippingPrice}đ */}
                42.500đ
              </Text>
            </View>
            <View style={styles.transportFrom}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={18} color={COLORS.gray} />
              <Text style={{ fontSize: 12, color: COLORS.gray }}>Từ Buôn Ma Thuột</Text>
            </View>
            <View style={styles.transportTime}>
              <AntDesign name="clockcircleo" size={16} color={COLORS.gray} />
              <Text style={{ fontSize: 12, color: COLORS.gray }}>
                {/* Ngày giao hàng dự kiến: {deliveryDateFrom ? format(deliveryDateFrom, 'MMM d') : ''} - {deliveryDateTo ? format(deliveryDateTo, 'MMM d') : ''} */}
                Ngày giao hàng dự kiến: Jul 4 - Jul 6
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
                  {/* {formattedProductPrice}đ */}
                  199.000đ
                </Text>
                <Text style={styles.totalText}>
                  {/* {formattedShippingPrice}đ */}
                  42.500đ
                </Text>
              </View>
            </View>
            <View style={styles.totalPrice}>
              <Text style={styles.totalHeader}>Tổng</Text>
              <Text style={styles.totalHeader}>
                {/* {formattedTotalPrice}đ */}
                241.500đ
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentMethods}>
            <Text style={styles.paymentMethodsHeader}>Phương thức thanh toán</Text>
            <View>
              {/* List phương thức thanh toán in here*/}
              <Text>
                VNPay
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.specification}>
            <View style={styles.left}>
              <Text style={{ fontSize: 18 }}>ID đơn hàng</Text>
            </View>
            <View style={styles.right}>
              <View style={styles.orderId}>
                <Text style={{ fontSize: 18 }}>ABCSDEFFE123</Text>
                <MaterialIcons name="content-copy" size={20} color="black" />
              </View>
            </View>
          </View>
          <View style={styles.redirect}>
            <TouchableOpacity style={styles.redirectBtn} onPress={() => { }}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
              <Text style={styles.redirectBtnText}>Liên hệ người bán</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.redirectBtn} onPress={() => { }}>
              <Entypo name="shop" size={24} color="black" />
              <Text style={styles.redirectBtnText}>Ghé thăm người bán</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBtn}>
        <TouchableOpacity style={styles.changeAddressBtn} onPress={() => { }}>
          <Text style={styles.changeAddressBtnText}>Thay đổi địa chỉ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Hủy đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default BuyerOrderDetails