import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from "../components/Button";
import styles from "./css/congratulations.style";

const Congratulations = ({ navigation, route }) => {
  const { title, content, routerName, btnTxt } = route.params;
  return (
    <View style={styles.wrapper}>
      <Image
        style={{ transform: [{ scale: 0.8 }] }}
        source={require('../../assets/images/congratulation.png')}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>

      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: routerName }],
        })}
      >
        <Text style={styles.btnTxt}>{btnTxt}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Congratulations