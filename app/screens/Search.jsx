import React, { useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../screens/css/search.style';
import { searchPostsByTitle } from '../api/post';
import { COLORS } from '../constants/theme';
import Post from './post/Post';

const Search = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const initialQuery = route.params?.query ?? '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      fetchResults(initialQuery);
    }
    loadSearchHistory();
  }, [initialQuery]);

  const fetchResults = async (query) => {
    setLoading(true);
    try {
      const response = await searchPostsByTitle(query);
      setResults(response.data.result);
      await saveSearchHistory(query);
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

  const saveSearchHistory = async (query) => {
    try {
      const currentHistory = await AsyncStorage.getItem('searchHistory');
      let historyArray = currentHistory ? JSON.parse(currentHistory) : [];
      if (!historyArray.includes(query)) {
        historyArray.push(query);
        await AsyncStorage.setItem('searchHistory', JSON.stringify(historyArray));
        setSearchHistory(historyArray);
      }
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  };

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      setSearchHistory([]);
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  };

  const removeSearchHistoryItem = async (item) => {
    try {
      const currentHistory = await AsyncStorage.getItem('searchHistory');
      let historyArray = currentHistory ? JSON.parse(currentHistory) : [];
      const updatedHistory = historyArray.filter((query) => query !== item);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to remove search history item:', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (searchQuery.trim() !== '') {
      fetchResults(searchQuery).finally(() => setRefreshing(false));
    } else {
      setRefreshing(false);
    }
  }, [searchQuery]);

  const renderSearchHistoryItem = ({ item }) => (
    <View style={styles.historyItemContainer}>
      <TouchableOpacity onPress={() => handleSearchFromHistory(item)} style={styles.historyItem}>
        <FontAwesome name="history" size={16} color="#AFAFAE" style={styles.historyIcon} />
        <Text style={styles.historyText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeSearchHistoryItem(item)} style={styles.removeButton}>
        <FontAwesome name="times" size={16} color="#AFAFAE" />
      </TouchableOpacity>
    </View>
  );

  const handleSearchFromHistory = (query) => {
    setSearchQuery(query);
    fetchResults(query);
  };

  const clearSearchInput = () => {
    setSearchQuery('');
    setResults([]); // Clear the search results
    loadSearchHistory(); // Load search history to display
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
            {searchQuery.trim() !== '' && (
              <TouchableOpacity onPress={clearSearchInput} style={styles.clearInputButton}>
                <FontAwesome name="times-circle" size={16} color="#AFAFAE" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {!loading && results.length === 0 && (
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>Sản phẩm bạn tìm kiếm không tồn tại</Text>
          </View>
        )}
        {results.length === 0 && searchHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Lịch sử tìm kiếm</Text>
            <FlatList
              data={searchHistory}
              renderItem={renderSearchHistoryItem}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
            <TouchableOpacity onPress={clearSearchHistory} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Xóa lịch sử</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <FlatList
              data={results}
              renderItem={({ item }) => <Post key={item.id} post={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              columnWrapperStyle={styles.row}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Search;
