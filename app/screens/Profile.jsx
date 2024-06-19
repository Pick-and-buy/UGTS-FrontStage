import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView,RefreshControl } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import NetworkImage from "../components/NetworkImage";
import ProfileTile from "../components/ProfileTile";
import styles from "./css/profile.style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserInfo, logout } from "../api/auth";
import { getUserByToken } from "../api/user";
import { Rating } from 'react-native-stock-star-rating'
import { MaterialIcons } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [createdPosts, setCreatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
  const bkImg = "https://d326fntlu7tb1e.cloudfront.net/uploads/ab6356de-429c-45a1-b403-d16f7c20a0bc-bkImg-min.png";

  const fetchUserData = async () => {
    try {
      const userData = await getUserByToken();
      setUser(userData);
      setCreatedPosts(userData.result.createdPosts);
    } catch (error) {
      console.error('Fetching user data failed:', error);
    }
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  useEffect(() => {
    const initialize = async () => {
      await checkToken();
      if (isAuthenticated) {
        await fetchUserData();
      }
    };
    initialize();
  }, [isAuthenticated]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'bottom-navigation' }],
    });
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{
          backgroundColor: COLORS.offwhite,
          marginBottom: "20%"
        }}>
          <View>
            <Image
              source={{ uri: bkImg }}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  opacity: 0.7,
                },
              ]}
            />
            <View style={styles.profile}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <NetworkImage
                  source={user?.result?.avatar ? user?.result?.avatar : profile}
                  width={45}
                  height={45}
                  radius={99}
                />





                {isAuthenticated ? (
                  <TouchableOpacity style={{ flexDirection: "row" }}
                    onPress={() => navigation.navigate("user-profile-details", { user, createdPosts })}
                  >
                    <View style={{ marginLeft: 4, marginTop: 2, flexDirection: "column" }}>
                      <Text style={styles.text}>
                        {user?.result?.username}
                      </Text>
                      <View style={{ marginLeft: 10, marginTop: -8, flexDirection: "row" }}>
                        <Rating
                          stars={4.7}
                          maxStars={5}
                          size={16}

                        />
                        <Text style={{ fontSize: 12, marginTop: 4, marginLeft: 2 }}>(100)</Text>
                        <MaterialIcons name="verified-user" size={16} color="#699BF7" style={{ marginTop: 4, marginLeft: 10 }} />
                        <Text style={{ fontSize: 12, marginTop: 4, marginLeft: 2 }}>Tài khoản đã xác minh</Text>
                      </View>
                    </View>
                    <AntDesign name="right" size={22} color="gray" style={{ marginTop: 12, marginLeft: 40 }} />
                  </TouchableOpacity>
                ) : (

                  <View style={{ flexDirection: "row" }}>
                    <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "column" }}>
                      <Text style={styles.text}>
                        Bạn chưa đăng nhập
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.loginbtn}
                      onPress={() => navigation.navigate("login-navigation")}
                    >
                      <Text style={styles.textbtn}>Đăng nhập</Text>
                    </TouchableOpacity>
                  </View>

                )}
              </View>
            </View>




            {!isAuthenticated ? (
              <>
                {/* Before login */}

                <View
                  style={{
                    height: "auto",
                    backgroundColor: COLORS.lightWhite,
                    margin: 10,
                    borderRadius: 12,
                  }}
                >
                  <ProfileTile title={"Lịch sử mặt hàng đã xem"} icon={"history"} font={3} isDivider={true} />
                  <ProfileTile title={"Thông báo"} icon={"notifications-circle"} font={1} isDivider={true} />
                  <ProfileTile title={"Trợ giúp / Yêu cầu"} icon={"message1"} isDivider={true} />
                  <ProfileTile title={"Hướng dẫn"} icon={"questioncircleo"} isDivider={false} />
                </View>

                <View
                  style={{
                    height: 140,
                    backgroundColor: COLORS.lightWhite,
                    margin: 10,
                    borderRadius: 12,
                  }}
                >
                  <ProfileTile
                    title={"Hướng dẫn về phương thức vận chuyển"}
                    icon={"local-shipping"}
                    font={4}
                    isDivider={true}
                  />
                  <ProfileTile title={"Tổng đài hỗ trợ"} icon={"customerservice"} isDivider={true} />
                  <ProfileTile title={"Điều khoản sử dụng"} icon={"file-document-multiple"} font={5} />
                </View>


                {/* Before login */}
              </>
            ) : (
              <>
                {/* After login */}
                <View style={styles.options}>
                  <TouchableOpacity style={styles.option}>
                    <FontAwesome name="camera" size={24} color="gray" />
                    <Text>Đã đăng</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.option}>
                    <FontAwesome name="shopping-bag" size={24} color="gray" />
                    <Text>Đã mua</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.option}>
                    <FontAwesome name="heart" size={24} color="gray" />
                    <Text>Yêu thích</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.option}>
                    <FontAwesome name="hashtag" size={24} color="gray" />
                    <Text>Theo dõi</Text>
                  </TouchableOpacity>
                </View>
                <View style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: "auto",
                  marginTop: 20
                }}>
                  <Text style={{ fontSize: 20, color: "gray" }}>SỐ DƯ VÍ</Text>
                  <Text style={{ fontSize: 32 }}>1000 VND</Text>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20,
                    marginHorizontal: "auto"
                  }}>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                      <Ionicons name="document-text" size={26} color="gray" />
                      <Text style={{ fontSize: 16, marginTop: 10 }}>Lịch sử</Text>
                    </TouchableOpacity>
                    <View style={{
                      height: "100%",
                      borderLeftWidth: 1,
                      borderColor: 'gray',
                    }}></View>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                      <AntDesign name="pluscircleo" size={26} color="black" />
                      <Text style={{ fontSize: 16, marginTop: 10 }}>Nạp tiền</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    margin: 10,
                    borderRadius: 12,
                  }}
                >
                  <ProfileTile title={"Lịch sử mặt hàng đã xem"} icon={"history"} font={3} isDivider={true} />
                  <ProfileTile title={"Mặt hàng đã thích"} icon={"heart"} font={3} isDivider={true} />
                  <ProfileTile title={"Mặt hàng đã mua"} icon={"shopping-bag"} font={3} isDivider={true} />
                  <ProfileTile title={"Các bài đã đăng"} icon={"camera"} font={3} isDivider={true} />
                  <ProfileTile title={"Danh sách theo dõi"} icon={"hashtag"} font={3} />
                </View>

                <View
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    margin: 10,
                    borderRadius: 12,
                  }}
                >
                  <ProfileTile title={"Địa chỉ"} icon={"location-pin"} font={4} isDivider={true} />
                  <ProfileTile title={"Danh sách thẻ tín dụng"} icon={"credit-card"} font={3} isDivider={true} />
                  <ProfileTile title={"Thiết lập thông báo"} icon={"notifications"} font={1} isDivider={true} />
                  <ProfileTile
                    title={"Đổi mật khẩu"}
                    icon={"password"}
                    font={4}
                    isDivider={true}
                    onPress={() => navigation.navigate('change-password', user)}
                  />
                  <ProfileTile title={"Địa chỉ email"} icon={"email"} font={4} isDivider={true} />
                  <ProfileTile title={"Người dùng bị chặn"} icon={"block"} font={4} isDivider={true} />
                  <ProfileTile title={"Xác minh tài khoản"} icon={"verified-user"} font={4} isDivider={true} />
                  <ProfileTile title={"Xác thực vân tay / Khuôn mặt"} icon={"finger-print"} font={1} />
                </View>


                <View
                  style={{
                    height: 140,
                    backgroundColor: COLORS.lightWhite,
                    margin: 10,
                    borderRadius: 12,
                  }}
                >
                  <ProfileTile title={"Thông tin lỗi"} icon={"report-problem"} font={4} isDivider={true} />
                  <ProfileTile title={"Trợ giúp / Yêu cầu"} icon={"message1"} isDivider={true} />
                  <ProfileTile title={"Hướng dẫn"} icon={"questioncircleo"} isDivider={false} />
                </View>

                <View
                  style={{
                    height: 140,
                    backgroundColor: COLORS.lightWhite,
                    margin: 10,
                    borderRadius: 12,
                  }}
                >
                  <ProfileTile
                    title={"Hướng dẫn về phương thức vận chuyển"}
                    icon={"local-shipping"}
                    font={4}
                    isDivider={true}
                  />
                  <ProfileTile title={"Tổng đài hỗ trợ"} icon={"customerservice"} isDivider={true} />
                  <ProfileTile title={"Điều khoản sử dụng"} icon={"file-document-multiple"} font={5} />

                </View>
                {/* After login */}
                <View
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    margin: 10,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {isAuthenticated &&
                    <TouchableOpacity style={{
                      height: 40,
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: COLORS.primary,
                      borderWidth: 1,
                      borderRadius: 8
                    }}
                      onPress={handleLogout}
                    >
                      <Text style={{ color: COLORS.primary, fontSize: 16 }}>ĐĂNG XUẤT TÀI KHOẢN</Text>
                    </TouchableOpacity>
                  }
                </View>
              </>
            )

            }


            <Text style={{ width: "100%", marginBottom: 20, flex: 1, textAlign: "center", color: "gray" }}>Phiên bản v5.5.5</Text>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;


