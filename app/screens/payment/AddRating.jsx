import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RatingInput, Rating } from "react-native-stock-star-rating";
import { COLORS, SIZES } from "../../constants/theme";
const AddRating = () => {
  const [rating, setRating] = useState(0);
  console.log(rating);
  return (
    <View style={styles.container}>
      <View style={styles.ratingBox}>
        <View style={styles.image}>
        </View>

        <View>
          <RatingInput
            rating={rating}
            color={COLORS.yellow}
            setRating={setRating}
            size={50}
            maxStars={5}
            bordered={false}
          />

          <Text
            style={[
              styles.small,
              { marginTop: 10, color: COLORS.gray, marginHorizontal: "auto" },
            ]}
          >
            Chạm để đánh giá
          </Text>
        </View>
      </View>

      <View style={{ height: 50 }} />

      <TouchableOpacity
        style={{
          width: "80%",
          height: 50,
          backgroundColor: COLORS.primary,
          borderRadius: 12,
          borderColor: COLORS.lightWhite,
          borderWidth: 0.5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: "auto"
        }}
      >
        <Text style={styles.small}>Gửi đánh giá</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
  },
  ratingBox: {
    width: '80%',
    // height:'80%',
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    marginHorizontal: "auto"
  },

  image: {
    position: "absolute",
    zIndex: 999,
    top: -30,
  },
  small: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.lightWhite,
  },
});
