import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useState, useRef, useContext, useEffect } from "react";
import { COLORS, SIZES } from "../constants/theme";
import styles from "../screens/css/page.style"
import Header from "./home/Header";
import HomeTab from "../navigation/HomeTab";

const Home = () => {


  return (
    <SafeAreaView style={styles.viewOne}>
      <View style={styles.viewTwo}>
        <Header />
        <HomeTab />
      </View>
    </SafeAreaView>

  );
};

export default Home;
