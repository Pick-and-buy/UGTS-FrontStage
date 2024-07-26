import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RatingInput, Rating } from "react-native-stock-star-rating";
import { COLORS, SIZES } from "../../constants/theme";
const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const AddRating = ({ orderInfo }) => {

  const [rating, setRating] = useState(0);
  console.log(rating);
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{ uri: orderInfo?.post?.user?.avatar ? orderInfo?.post?.user?.avatar : profile }}
        />
      </View>
      <View style={styles.seller}>
        <Text style={styles.sellerTitle}>
          {orderInfo?.post?.user?.username}
        </Text>
      </View>
      <View style={styles.ratingBox}>


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
    marginTop: 20,
    marginBottom: 50
  },
  ratingBox: {
    width: '80%',
    // height:'80%',
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    marginHorizontal: "auto"
  },
  imageWrapper: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginHorizontal: "auto",
    marginBottom:8
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    
  },
  small: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.lightWhite,
  },
  seller:{
    justifyContent: "center",
    alignItems: "center",
    marginBottom:10
  },
  sellerTitle:{
    fontSize:22,
    fontWeight:"bold",
    color: '#000'
  }
});
