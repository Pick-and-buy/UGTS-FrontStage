import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import Carousel from "pinar";
import Slider from './Slider';
import { getAllPosts } from "../../api/post";
import Post from "../post/Post";
const HomeFollow = ({ navigation }) => {


    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts(); // Replace with your API URL
                // console.log(response.data.result);
                const posts = response.data.result
                // console.log(response);
                setPosts(posts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Slider />
            <View style={styles.row}>
                {
                    posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))
                }

                {/* <Brands /> */}
                {/* <ProductList /> */}
            </View>

        </ScrollView>
    );
}


export default HomeFollow;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: "8%"
    },
    row: {
        width: "98%",
        justifyContent: "space-around",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 5,
        marginHorizontal: "auto",
        marginTop: "-4%",
    }
});
