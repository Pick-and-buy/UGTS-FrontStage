import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import styles from "../screens/css/search.style";
import { searchPostsByTitle } from "../api/post";
import { COLORS } from "../constants/theme";
import Post from "./post/Post";

const Search = () => {
  const route = useRoute();
  const initialQuery = route.params?.query ?? '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  // console.log(results);
  useFocusEffect(
    React.useCallback(() => {
      if (initialQuery) {
        setSearchQuery(initialQuery);
        fetchResults(initialQuery);
      }
    }, [initialQuery])
  );

  const fetchResults = async (query) => {
    setLoading(true);
    try {
      const response = await searchPostsByTitle(query);
      setResults(response.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      fetchResults(searchQuery);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.search}>
            <FontAwesome
              name="search"
              size={20}
              color="#AFAFAE"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit}
              placeholder="Nhập tên sản phẩm bạn muốn tìm kiếm"
              placeholderTextColor="#AFAFAE"
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <View style={styles.row}>
              {
                results.map(post => (
                  <Post key={post.id} post={post} />
                ))
              }
            </View>

          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
