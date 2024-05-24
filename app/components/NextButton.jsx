import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
  } from "react-native";
  import React from "react";
  import { COLORS } from "../constants/theme";
  
  const NextButton = ({ title, scrollTo, loader }) => {
    return (
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.btnStyle(COLORS.primary)}
      >
        {!loader ? (
          <Text style={styles.btnTxt}>{title}</Text>
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
    );
  };
  
  export default NextButton;
  
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
      // marginVertical: "10%",
      marginHorizontal:"auto",
      backgroundColor: backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      marginBottom:"10%"
    }),
  });
  