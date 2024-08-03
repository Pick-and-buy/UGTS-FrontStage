import { View, Text, TextInput, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Rating } from 'react-native-stock-star-rating';
import { checkIfFollowing, followUser, unfollowUser } from '../../api/user';
import styles from '../css/appreciation.style';
const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const Appreciation = ({ navigation, route }) => {
  const { user } = route.params;
  const [followStatus, setFollowStatus] = useState({});


  const UserItem = ({ item }) => {
    const isFollowing = followStatus[item?.id];
    return (
      <View style={styles.user}>
        <Image
          style={styles.avatar}
          source={{ uri: item?.avatar ? item?.avatar : profile }}
        />
        <View style={styles.wrapper}>
          <View style={styles.names}>
            <Text style={styles.name}>
              {/* {item?.lastName} {item?.firstName}{' '} */}
              {'Tên ở đây '}
              {item?.isVerified ? (
                <MaterialIcons name="verified-user" size={14} color="#699BF7" />
              ) : (
                <Octicons name="unverified" size={14} color="gray" />
              )}
            </Text>
            <Text style={styles.username}>@{'Test001'}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <View>
              {user && item?.id !== user?.id && (
                <TouchableOpacity
                  onPress={() => handleFollowToggle(item)}
                  style={[
                    styles.followBtn,
                    isFollowing && styles.followingBtn
                  ]}
                >
                  <Text style={[
                    styles.followBtnText,
                    isFollowing && styles.followingBtnText
                  ]}>
                    {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
                  </Text>
                </TouchableOpacity>
              )}
              {!user && (
                <TouchableOpacity
                  onPress={() => handleFollowToggle(item)}
                  style={styles.followBtn}
                >
                  <Text style={styles.followBtnText}>
                    Theo dõi
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.comment}>
            <View style={styles.stars}>
              <Rating
                stars={4}
                maxStars={5}
                size={22}
              />
              <Text style={{ fontSize: 12, marginTop: 2 }}>(4*)</Text>
            </View>
            <Text style={styles.commentText}>
              {'lorem ipsum dolor sit amet, consectetur adip,lorem ipsum dolor sit amet, consectetur adip'}
            </Text>
          </View>
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.search}>
        <FontAwesome
          name="search"
          size={20}
          color="#AFAFAE"
        />
        <TextInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="Nhập tên bạn muốn tìm kiếm"
          placeholderTextColor="#AFAFAE"
          style={styles.textInput}
        />
      </View> */}

      <View style={styles.ratings}>
        {/* <FlatList
          data={filteredFollowers}
          renderItem={({ item }) => <UserItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={100}
        /> */}
        <UserItem />

      </View>
    </View>
  )
}

export default Appreciation