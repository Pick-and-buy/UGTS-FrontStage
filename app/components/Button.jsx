import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(!isValid ? COLORS.gray : COLORS.primary)}
    >
      {!loader ? (
        <Text style={styles.btnTxt}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnTxt: {
    fontFamily: "bold",
    color: COLORS.white,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyle: (backgroundColor) => ({
    height: 60,
    width: "50%",
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginLeft: "25%",
  }),
});
