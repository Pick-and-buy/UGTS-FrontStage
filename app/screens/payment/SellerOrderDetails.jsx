import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView, Alert } from "react-native";
import styles from "../css/sellerOrderDetails.style";
import { useFocusEffect } from '@react-navigation/native';
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { G, Line, Svg } from "react-native-svg";


const SellerOrderDetails = ({ navigation, route }) => {
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
                  Nguyen Tien Thanh (+84) 0964593840
                </Text>
              </View>
              <View style={styles.locationDetails}>
                <Text style={styles.locationText}>
                  Thôn 8, xã Tam Hiệp, Huyện Phúc Thọ, Thành Phố Hà Nội, Việt Nam
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
                  source={{ uri: "https://louiskimmi.com/wp-content/uploads/2022/09/tui-deo-cheo-nam-nu-gucci-like-auth-hang-dep-05.jpg" }}
                />
                <Text style={styles.sellerText}>
                  username
                </Text>
              </View>
              <View style={styles.product}>
                <Image
                  style={styles.productImage}
                  source={{ uri: "https://louiskimmi.com/wp-content/uploads/2022/09/tui-deo-cheo-nam-nu-gucci-like-auth-hang-dep-05.jpg" }}
                />
                <View style={styles.content}>
                  <Text numberOfLines={1} style={styles.productName}>
                    product-name
                  </Text>
                  <Text numberOfLines={1} style={styles.productDescription}>
                    Color: red, Size: M
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
                    350
                  </Text>
                </View>
              </View>
    
              <View style={styles.relatedInformation}>
                <View style={styles.transport}>
                  <Text style={{ fontSize: 16, color: COLORS.gray }}>Vận chuyển tiêu chuẩn</Text>
                  <Text style={{ fontSize: 16, color: COLORS.gray }}>
                    42.500đ
                  </Text>
                </View>
                <View style={styles.transportFrom}>
                  <MaterialCommunityIcons name="truck-delivery-outline" size={18} color={COLORS.gray} />
                  <Text style={{ fontSize: 12, color: COLORS.gray }}>Từ Hà Nội</Text>
                </View>
                <View style={styles.transportTime}>
                  <AntDesign name="clockcircleo" size={16} color={COLORS.gray} />
                  <Text style={{ fontSize: 12, color: COLORS.gray }}>
                    Ngày giao hàng dự kiến: Jul 25 - Jul - 29
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
                      350đ
                    </Text>
                    <Text style={styles.totalText}>
                      42.500đ
                    </Text>
                  </View>
                </View>
                <View style={styles.totalPrice}>
                  <Text style={styles.totalHeader}>Tổng</Text>
                  <Text style={styles.totalHeader}>
                    42.850đ
                  </Text>
                </View>
              </View>
    
              <View style={styles.divider} />
    
              <View style={styles.paymentMethods}>
                <Text style={styles.paymentMethodsHeader}>Phương thức thanh toán</Text>
                <View>
                  {/* List phương thức thanh toán in here*/}
                  <Text>
                    VNPAY
                  </Text>
                </View>
              </View>
    
              <View style={styles.divider} />
    
              <View style={styles.specification}>
                <View style={styles.left}>
                  <Text style={{ fontSize: 18 }}>ID đơn hàng</Text>
                </View>
                <View style={styles.right}>
                  <TouchableOpacity style={styles.orderId} >
                    <Text style={{ fontSize: 18 }}>
                      10-ajjfuwuejn-5521477f
                    </Text>
                    <MaterialIcons name="content-copy" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.redirect}>
                <TouchableOpacity style={styles.redirectBtn} onPress={() => { }}>
                  <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                  <Text style={styles.redirectBtnText}>Liên hệ người bán</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.redirectBtn}
                  onPress={() => {}}
                >
                  <Entypo name="shop" size={24} color="black" />
                  <Text style={styles.redirectBtnText}>Ghé thăm người bán</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
            <View style={styles.bottomBtn}>
              <TouchableOpacity style={styles.changeAddressBtn}
                // onPress={() => navigation.navigate('address-lists', {
                //   orderInfo,
                //   type: 'buyer-change-address'
                // })}
              >
                <Text style={styles.changeAddressBtnText}>Từ chối đơn hàng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Sắp xếp vận chuyển</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      )
}

export default SellerOrderDetails;