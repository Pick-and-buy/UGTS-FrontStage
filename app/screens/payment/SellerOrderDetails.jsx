import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView, Alert } from "react-native";
import styles from "../css/sellerOrderDetails.style";
import { useFocusEffect } from '@react-navigation/native';
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
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
                        <View style={styles.feePrice}>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>Tổng tiền hàng</Text>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>
                                199.000đ
                            </Text>
                        </View>
                        <View style={styles.feePrice}>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>Vận chuyển</Text>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>
                                42.500đ
                            </Text>
                        </View>
                        <View style={styles.feePrice}>
                            <Text style={{ fontSize: 16 }}>Tổng cộng</Text>
                            <Text style={{ fontSize: 16, color: COLORS.gray }}>
                                241.500đ
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
                                    10-ajjfuwuejn-5521477f
                                </Text>
                                <MaterialIcons name="content-copy" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{color: COLORS.gray}}>Thời gian đặt hàng</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{color: COLORS.gray}}>
                                    2024-07-10 16:20:11
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{color: COLORS.gray}}>Đơn vị giao hàng</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{color: COLORS.gray}}>
                                    J&T Express
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.specification}>
                        <View style={styles.left}>
                            <Text style={{color: COLORS.gray}}>Phương thức thanh toán</Text>
                        </View>
                        <View style={styles.right}>
                            <TouchableOpacity style={styles.orderId} >
                                <Text style={{color: COLORS.gray}}>
                                    VN pay
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.redirect}>
                        <TouchableOpacity style={styles.redirectBtn} onPress={() => { }}>
                            <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                            <Text style={styles.redirectBtnText}>Liên hệ người mua</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.redirectBtn}
                            onPress={() => { }}
                        >
                            <FontAwesome name="wechat" size={24} color="black" />
                            <Text style={styles.redirectBtnText}>Liên hệ hỗ trợ</Text>
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
                <TouchableOpacity style={styles.button} onPress={() => { }}>
                    <Text style={styles.buttonText}>Sắp xếp vận chuyển</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SellerOrderDetails;