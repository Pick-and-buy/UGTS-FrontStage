import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme'

const BackBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backbtn}>
      <Ionicons
        name='chevron-back'
        size={30}
        color={COLORS.primary}
      />
    </TouchableOpacity>
  )
}

export default BackBtn

const styles = StyleSheet.create({
  backbtn: {
    width: 45,
    height: 45,
    backgroundColor: "#FEECED",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 999,
    // top: SIZES.large-10
    top: SIZES.large - 50,
    left: 0
  }
})