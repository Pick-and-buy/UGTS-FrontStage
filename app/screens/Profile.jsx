import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import NetworkImage from "../components/NetworkImage";
import ProfileTile from "../components/ProfileTile";
import RegistrationTile from "../components/RegistrationTile";
import styles from "./css/profile.style";
const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null)

  // const { user, isProfileLoading, error, refetch } = fetchProfile();
  const profile =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/b5065bb8-4c6b-4eac-a0ce-86ab0f597b1e-vinci_04.jpg";
  const bkImg =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/ab6356de-429c-45a1-b403-d16f7c20a0bc-bkImg-min.png";
  // if (isProfileLoading) {
  //   return <LoadingScreen />;
  // }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={{ flex: 1 }}
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
                  source={user === null ? profile : user.profile}
                  width={45}
                  height={45}
                  radius={99}
                />
                <View style={{ marginLeft: 10, marginTop: 10 }}>
                  <Text style={styles.text}>
                    {user === null ? "Bạn chưa đăng nhập" : user.username}
                  </Text>
                  {/* <Text style={styles.email}>
                    {user === null ? "" : user.email}
                  </Text> */}
                </View>
              </View>

              {/* <TouchableOpacity>
                <AntDesign name="logout" size={24} color="red" />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.loginbtn}
                onPress={() => navigation.navigate("login-navigation")}
              >
                <Text style={styles.textbtn}>Đăng nhập</Text>
              </TouchableOpacity>



            </View>

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

            {/* Before login */}
            {/* <View
              style={{
                backgroundColor: COLORS.lightWhite,
                margin: 10,
                borderRadius: 12,
              }}
            >
              <ProfileTile title={"Lịch sử mặt hàng đã xem"} icon={"history"} font={3} />
            </View>
  
            <View
              style={{
                height: 140,
                backgroundColor: COLORS.lightWhite,
                margin: 10,
                borderRadius: 12,
              }}
            >
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
            </View> */}


            {/* Before login */}

            {/* After login */}
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
            <Text style={{ width: "100%", marginBottom: 20, flex: 1, textAlign: "center", color: "gray" }}>Phiên bản v5.5.5</Text>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;


