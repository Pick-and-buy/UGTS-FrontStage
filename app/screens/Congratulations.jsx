import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from "../components/Button";
import styles from "./css/congratulations.style";

const Congratulations = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Image
        style={{ transform: [{ scale: 0.8 }] }}
        source={require('../../assets/images/congratulation.png')}
      />
      <Text style={styles.title}>HOÀN THÀNH!</Text>
      <Text style={styles.content}>Hồ sơ của bạn đã sẵn sàng để sử dụng</Text>

      <TouchableOpacity 
        style={styles.btnStyle}
        onPress={() => navigation.navigate('home-navigation')}
      >
        <Text style={styles.btnTxt}>Đi nào!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Congratulations