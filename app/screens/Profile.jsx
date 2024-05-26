import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ backgroundColor: COLORS.white, height: SIZES.height }}>
        <View
          style={{
            backgroundColor: COLORS.offwhite,
            height: SIZES.height,
            // borderBottomEndRadius: 30,
            // borderBottomStartRadius: 30,
          }}
        >
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

          <View
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;


