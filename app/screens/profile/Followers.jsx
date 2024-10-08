import { View, Text, TextInput, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import styles from '../css/followers.style';
import { checkIfFollowing, followUser, getListsFollowers, unfollowUser } from '../../api/user';

const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const Followers = ({ navigation, route }) => {
  const { user } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [followers, setFollowers] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followStatus, setFollowStatus] = useState({});

  useEffect(() => {
    fetchFollowers();
  }, [user]);

  const fetchFollowers = async () => {
    try {
      const response = await getListsFollowers(user.id);
      setFollowers(response.result);
      setFilteredFollowers(response.result);

      // Check follow status for each user
      const statusPromises = response.result.map(item => checkFollowStatus(item));
      const statuses = await Promise.all(statusPromises);

      const statusMap = {};
      statuses.forEach((status, index) => {
        statusMap[response.result[index].id] = status;
      });
      setFollowStatus(statusMap);
    } catch (error) {
      console.log('Error fetching follower:', error);
    }
  };

  const checkFollowStatus = async (userItem) => {
    try {
      const status = await checkIfFollowing(user.id, userItem.id);
      return status;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleFollowToggle = async (userItem) => {
    try {
      setLoading(true);
      const currentStatus = followStatus[userItem.id];
      if (currentStatus) {
        console.log('Unfollowing user...');
        const response = await unfollowUser(user.id, userItem.id);
        console.log('Unfollow response:', response);
      } else {
        console.log('Following user...');
        const response = await followUser(user.id, userItem.id);
        console.log('Follow response:', response);
      }
      setFollowStatus(prevStatus => ({
        ...prevStatus,
        [userItem.id]: !currentStatus
      }));
    } catch (error) {
      console.log('Error in handleFollowToggle:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredFollowers(followers);
    } else {
      const filtered = followers.filter(item =>
        item.username.toLowerCase().includes(text.toLowerCase()) ||
        item.firstName.toLowerCase().includes(text.toLowerCase()) ||
        item.lastName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFollowers(filtered);
    }
  };

  const UserItem = ({ item }) => {
    const isFollowing = followStatus[item.id];
    return (
      <TouchableOpacity style={styles.user} onPress={() => navigation.navigate("user-profile-details", { user: item, userIdLogged: user.id })}>
        <Image
          style={styles.avatar}
          source={{ uri: item.avatar ? item.avatar : profile }}
        />
        <View style={styles.names}>
          <Text style={styles.name}>{item.lastName} {item.firstName}{' '}
            {item.isVerified ? (
              <MaterialIcons name="verified-user" size={14} color="#699BF7" />
            ) : (
              <Octicons name="unverified" size={14} color="gray" />
            )}
          </Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <View>
            {user && item.id !== user.id && (
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
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
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
      </View>

      <View style={styles.followers}>
        <FlatList
          data={filteredFollowers}
          renderItem={({ item }) => <UserItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={100}
        />
      </View>
    </View>
  );
};

export default Followers;
