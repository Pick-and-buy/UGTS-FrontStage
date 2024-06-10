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

const Home = () => {


  return (
    <SafeAreaView style={styles.viewOne}>
      <View style={styles.viewTwo}>
        <Header/>
        
        
        {/* <FlatList
          data={data}
          keyExtractor={(item) => item.login.usename}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10 }}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={{ uri: item.picture.thumbnail }}
              />
              <View>
                <Text>
                  {item.name.firstName} {item.name.lastName}
                </Text>
                <Text>{item.email}</Text>
              </View>
            </View>
          )}
        /> */}

      </View>
    </SafeAreaView>
  );
};

export default Home;
