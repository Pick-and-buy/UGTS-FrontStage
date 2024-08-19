import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { RatingInput } from "react-native-stock-star-rating";
import { COLORS } from "../../constants/theme";
import { ratingUser } from "../../api/user";

const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const AddRating = ({ navigation, orderInfo }) => {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  // console.log(orderInfo.id);
  const fetchRating = async (ratingLabel) => {
    try {
      const response = await ratingUser(ratingLabel, review, orderInfo?.buyer?.id, orderInfo?.post?.user?.id, orderInfo?.id);
      // console.log(response);
      alert("Cảm ơn bạn đã để lại đánh giá")
      navigation.navigate("bottom-navigation")
    } catch (error) {
      console.log('Fetching rating failed:', error.response ? error.response.data : error.message);
    }
  };

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 1:
        return "ONE_STAR";
      case 2:
        return "TWO_STAR";
      case 3:
        return "THREE_STAR";
      case 4:
        return "FOUR_STAR";
      case 5:
        return "FIVE_STAR";
      default:
        return "NO_RATING";
    }
  };

  const handleSubmitRating = () => {
    const ratingLabel = getRatingLabel(rating);
    if (orderInfo?.buyer?.id && orderInfo?.post?.user?.id) {
      fetchRating(ratingLabel);
    }
  };

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
          {orderInfo?.post?.user?.lastName} {orderInfo?.post?.user?.firstName}
        </Text>
      </View>
      <View style={styles.ratingBox}>
        <RatingInput
          rating={rating}
          color={COLORS.yellow}
          setRating={setRating}
          size={50}
          maxStars={5}
          bordered={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Viết đánh giá của bạn..."
          value={review}
          onChangeText={setReview}
          multiline
        />
      </View>
      <View style={{ height: 50 }} />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitRating}
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
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 50,
  },
  ratingBox: {
    width: '80%',
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    padding: 20,
  },
  imageWrapper: {
    width: 65,
    height: 65,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 8,
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
  seller: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  sellerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#000',
  },
  textInput: {
    marginTop: 10,
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    color: COLORS.black,
  },
  submitButton: {
    width: "80%",
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    borderColor: COLORS.lightWhite,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
