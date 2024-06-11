import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useRef, useContext, useEffect } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from './page.style'
import uidata from "../constants/uidata";
import { EvilIcons } from '@expo/vector-icons';
import Header from "./home/Header";
import Slider from "./home/Slider";
import Brands from "./home/Brands";
import ProductList from "./home/ProductList";
// import filter from "lodash.filter";

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const API_SEARCH = '';

  useEffect(() => {
    fetchData(API_SEARCH);
  }, [])

  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const json = await response.json();

      setData(json.results);

      console.log(json.results);

      setFullData(json.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({ name, email }, query) => {
    const { firstName, lastName } = name;

    if (firstName.includes(query) ||
      lastName.includes(query) ||
      email.includes(query)
    ) {
      return true;
    }
    return false;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#5500dc" />
      </View>
    );
  }

  return (
    <View>
      <Header />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  viewOne: {
    flex: 1,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: 'red',
  },
  viewTwo: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    width: '65%',
    flexDirection: 'row'
  },
  viewText: {
    paddingVertical: 10,
    paddingHorizontal: 25

  }
});
