import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons, SimpleLineIcons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";

const ProfileTile = ({ onPress, title, icon, font, isDivider }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.outter}>
        <View style={styles.inner}>
          {font === 1 ? (
            <Ionicons name={icon} size={26} color={COLORS.gray} />
          ) : font === 2 ? (
            < SimpleLineIcons name={icon} size={20} color={COLORS.gray} />
          ) : font === 3 ? (
            <FontAwesome name={icon} size={24} color={COLORS.gray} />
          ) : font === 4 ? (
            <MaterialIcons name={icon} size={24} color={COLORS.gray} />
          ) : font === 5 ? (
            <MaterialCommunityIcons name={icon} size={24} color={COLORS.gray} />
          ) : (
            <AntDesign name={icon} size={22} color={COLORS.gray} />
          )}
          <Text style={styles.text}>{title}</Text>
        </View>

        <AntDesign
          name="right"
          size={18}
          color={COLORS.gray2}
          style={{ bottom: -3, marginRight: 10 }}
        />
      </View>
      {isDivider && <View style={styles.divider} />}
      {isDivider || <View style={styles.divider2} />}
    </TouchableOpacity>
  );
};

export default ProfileTile;

const styles = StyleSheet.create({
  divider: {
    borderColor: COLORS.gray2,
    opacity: 0.7,
    borderWidth: 0.3,
    width: SIZES.width - 35,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 7,
  },
  divider2: {
    borderColor: COLORS.white,
    opacity: 0.7,
    borderWidth: 0.3,
    width: SIZES.width - 35,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 7,
  },
  outter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inner: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    marginVertical: 6,
  },
  text: {
    marginLeft: 10,
    fontFamily: "regular",
    fontSize: 14,
    color: COLORS.gray,
  },
});
