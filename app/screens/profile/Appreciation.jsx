import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Rating } from 'react-native-stock-star-rating';
import { checkIfFollowing, followUser, getRatingByUserId, unfollowUser } from '../../api/user';
import styles from '../css/appreciation.style';

const profile = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

const Appreciation = ({ navigation, route }) => {
  const { user } = route.params;
  const [followStatus, setFollowStatus] = useState({});
  const [ratings, setRatings] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All'); // New state for selected filter

  useEffect(() => {
    fetchRatings();
  }, [user]);

  const fetchRatings = async () => {
    try {
      const response = await getRatingByUserId(user.id);
      setRatings(response.result);
      setFilteredRatings(response.result);

      // Check follow status for each user
      const statusPromises = response.result.map(item => checkFollowStatus(item?.ratingUser));
      const statuses = await Promise.all(statusPromises);

      const statusMap = {};
      statuses.forEach((status, index) => {
        statusMap[response.result[index].ratingUser.id] = status;
      });
      setFollowStatus(statusMap);
      console.log('Follow status map:', statusMap); // Debugging log
    } catch (error) {
      console.error('Error fetching follower:', error);
    }
  };

  const checkFollowStatus = async (userItem) => {
    try {
      const status = await checkIfFollowing(user.id, userItem.id);
      return status;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleFollowToggle = async (userItemId) => {
    try {
      setLoading(true);
      const currentStatus = followStatus[userItemId];
      if (currentStatus) {
        console.log('Unfollowing user...');
        const response = await unfollowUser(user.id, userItemId);
        console.log('Unfollow response:', response);
      } else {
        console.log('Following user...');
        const response = await followUser(user.id, userItemId);
        console.log('Follow response:', response);
      }
      setFollowStatus(prevStatus => ({
        ...prevStatus,
        [userItemId]: !currentStatus
      }));
      console.log('Updated follow status:', {
        ...followStatus,
        [userItemId]: !currentStatus
      }); // Debugging log
    } catch (error) {
      console.error('Error in handleFollowToggle:', error);
    } finally {
      setLoading(false);
    }
  };

  const UserItem = ({ item }) => {
    const isFollowing = followStatus[item?.ratingUser?.id];
    return (
      <TouchableOpacity style={styles.user} onPress={() => navigation.navigate("user-profile-details", { user: item?.ratingUser, userIdLogged: user.id })}>
        <Image
          style={styles.avatar}
          source={{ uri: item?.ratingUser?.avatar ? item?.ratingUser?.avatar : profile }}
        />
        <View style={styles.wrapper}>
          <View style={styles.names}>
            <Text style={styles.name}>
              {item?.ratingUser?.lastName} {item?.ratingUser?.firstName}{' '}
              {item?.ratingUser?.isVerified ? (
                <MaterialIcons name="verified-user" size={14} color="#699BF7" />
              ) : (
                <Octicons name="unverified" size={14} color="gray" />
              )}
            </Text>
            <Text style={styles.username}>@{item.ratingUser.username}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <View>
              {user && item?.ratingUser?.id !== user?.ratingUser?.id && (
                <TouchableOpacity
                  onPress={() => handleFollowToggle(item?.ratingUser?.id)}
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
                  onPress={() => handleFollowToggle(item?.ratingUser?.id)}
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
                stars={item?.stars}
                maxStars={5}
                size={22}
              />
              <Text style={{ fontSize: 12, marginTop: 2 }}>({item?.stars})</Text>
            </View>
            <Text style={styles.commentText}>
              {item?.comment}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    applyFilters(text, selectedFilter);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    applyFilters(searchQuery, filter);
  };

  const applyFilters = (searchQuery, filter) => {
    let filtered = ratings;
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item =>
        item.ratingUser.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ratingUser.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ratingUser.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter !== 'All') {
      filtered = filtered.filter(item => item.stars === parseInt(filter));
    }
    setFilteredRatings(filtered);
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

      <View style={styles.filterContainer}>
        {['All', 1, 2, 3, 4, 5].map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => handleFilterChange(filter)}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilterButton
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter && styles.selectedFilterButtonText
              ]}
            >
              {filter === 'All' ? 'Tất cả' : `${filter} sao`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.ratings}>
        <FlatList
          data={filteredRatings}
          renderItem={({ item }) => <UserItem item={item} />}
          keyExtractor={(item) => item.ratingId.toString()}
          estimatedItemSize={100}
        />
      </View>
    </View>
  )
}

export default Appreciation;
