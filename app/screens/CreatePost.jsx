import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  FlatList,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/theme";

const CreatePost = () => {

  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={{ fontFamily: 'bold', fontSize: 28 }}>
              Đăng Bài
            </Text>
          </View>
          <View>
            <MaterialCommunityIcons
              name="post-outline"
              size={36}
              color="black"
            />
          </View>
        </View>

        <View style={styles.shadow}>
          {/* Tạo Khoảng Trống */}
        </View>
        {/* Banner */}
        <View>
          <TouchableOpacity
            onPress={() => console.warn('Click to open Event')}
            style={{ margin: 5 }}>
            <Image
              style={styles.imageBanner}
              source={{ uri: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg' }}
            />
          </TouchableOpacity>
        </View>

        {/* Option */}
        <View style={{ marginHorizontal: 10, marginVertical: 15 }}>
          <Text style={{ fontSize: 20 }}>Tùy chọn</Text>
          <View style={styles.optionContainer}>
            <View style={styles.optionIcon}>
              <FontAwesome
                name="camera"
                size={40}
                color={COLORS.gray} />
              <Text style={{ marginTop: 5, color: COLORS.gray }}>Máy ảnh</Text>
            </View>
            <View style={styles.optionIcon}>
              <FontAwesome
                name="image"
                size={40}
                color={COLORS.gray} />
              <Text style={{ marginTop: 5, color: COLORS.gray }}>Bộ sưu tập</Text>
            </View>
          </View>
        </View>

        {/* Guide */}
        <View style={styles.guiderContainer}>
          <View style={styles.guideView}>
            <View style={{ flexDirection: 'row', marginLeft: 30 }}>
              <MaterialCommunityIcons
                name="post-outline"
                size={36}
                color="black"
              />
              <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 18 }}>
                Hướng dẫn cho người mới
              </Text>
            </View>
            <View style={[styles.shadow, { marginTop: 5 }]}>
              {/* Tạo Khoảng Trống */}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15, gap: 30, marginHorizontal: "10%" }}>
              <View style={{ flexDirection: 'row', width: "45%", paddingHorizontal: 10, borderWidth: 1, borderColor: COLORS.gray, borderRadius: 5 }}>
                <Text style={{ fontSize: 20 }}>Giao dịch</Text>
                <MaterialIcons
                  style={{ marginLeft: 10 }}
                  name="navigate-next"
                  size={30}
                  color="black" />
              </View>
              <View style={{ flexDirection: 'row', width: "45%", paddingHorizontal: 10, borderWidth: 1, borderColor: COLORS.gray, borderRadius: 5 }}>
                <Text style={{ fontSize: 20 }}>Đóng gói</Text>
                <MaterialIcons
                  style={{ marginLeft: 10 }}
                  name="navigate-next"
                  size={30}
                  color="black" />
              </View>
            </View>
            <View style={{ marginTop: 15, marginLeft: "10%" }}>
              <View style={{ flexDirection: 'row', width: "45%", paddingHorizontal: 10, borderWidth: 1, borderColor: COLORS.gray, borderRadius: 5 }}>
                <Text style={{ fontSize: 20 }}>Vận chuyển</Text>
                <MaterialIcons
                  style={{ marginLeft: 10 }}
                  name="navigate-next"
                  size={30}
                  color="black" />
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity 
        onPress={() => navigation.navigate("create-post-details")}
        style={{width: "80%", borderWidth: 2, borderColor: COLORS.primary, borderRadius: 5, paddingVertical: 5, marginHorizontal: "10%", alignItems: 'center'}}>
            <Text style={{color: COLORS.primary, fontSize: 18, fontFamily: 'bold'}}>Tiếp Tục</Text>
        </TouchableOpacity>
    
      </View>
    </View>
  );
}

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginBottom: 80,
  },
  //header
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerText: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: "35%",
    marginRight: "23%",
  },
  //Space
  shadow: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    backgroundColor: '#D3D3D3',
    width: Dimensions.get('window').width,
  },
  //Banner: Story
  imageBanner: {
    height: 150,
    borderRadius: 10,
  },
  //Option
  optionContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 40,
    marginHorizontal: "16%"
  },
  optionIcon: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.gray,
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  //Guide
  guiderContainer: {
    width: Dimensions.get('window').width,
    height: 200,
    backgroundColor: COLORS.gray2,
    marginVertical: 15
  },
  guideView: {
    marginTop: 20,
    marginHorizontal: 10,
    height: 150,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
  },
})