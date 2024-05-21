import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from "../css/congratulations.style";

const ResetPasswordSuccessfully = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Image
        style={{ transform: [{ scale: 0.8 }] }}
        source={require('../../../assets/images/congratulation.png')}
      />
      <Text style={styles.title}>HOÀN THÀNH!</Text>
      <Text style={styles.content}>Cập nhật mật khẩu thành công</Text>

      <TouchableOpacity 
        style={styles.btnStyle}
        onPress={() => navigation.navigate('login-navigation')}
      >
        <Text style={styles.btnTxt}>ĐĂNG NHẬP NGAY</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ResetPasswordSuccessfully