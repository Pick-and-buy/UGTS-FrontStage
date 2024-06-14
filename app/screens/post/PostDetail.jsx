import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    Pressable,
} from "react-native";
import { Octicons, Ionicons, Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import Carousel from "pinar";
import { getPostDetails } from "../../api/post";

const PostDetail = ({ navigation, route }) => {
    const productId = route.params;
    // console.log(productId);

    const [postDetails, setPostDetails] = useState([]);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        fetchPostDetails()
    }, [])

    const fetchPostDetails = async () => {
        try {
            const response = await getPostDetails(productId);
            // console.log(response.data.result);
            const postInfo = response.data.result
            setPostDetails(postInfo);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const carouselData = [
        {
            id: "01",
            image: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg'
        },
        {
            id: "02",
            image: 'https://soliloquywp.com/wp-content/uploads/2016/09/How-to-Add-a-Homepage-Slider-in-WordPress.png'
        },
        {
            id: "03",
            image: 'https://www.searchenginejournal.com/wp-content/uploads/2019/10/25-of-the-best-examples-of-home-pages-5dc504205de2e.png'
        },
        {
            id: "04",
            image: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg'
        },
    ]


    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>

                </View>
                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>

            </View>
        </ScrollView>
    );
}

export default PostDetail;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        marginTop: 20
    },

    //Header
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40,
        marginBottom: 20,
        marginLeft: 15
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 99,
    },

    //Space
    shadow: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        backgroundColor: '#D3D3D3',
        width: Dimensions.get('window').width,
    },

    //Carousel
    carouselContainer: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    carouselImage: {
        height: 150,
        borderRadius: 10,
    },

    //Body: Information Product
    inforProduct: {
        marginHorizontal: 15,
        marginTop: -15,
    },
    textCategory: {
        fontFamily: 'bold',
        color: "blue",
        marginVertical: 10
    },

    //Icon: Time And More
    time: {
        marginHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewMoreIcon: {
        borderWidth: 1,
        borderRadius: 99,
        borderColor: 'black'
    },

    // Comment
    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 25
    },
    commentBox: {
        borderWidth: 1,
        width: '70%',
        borderRadius: 5,
        borderColor: '#E2E2E2',
        backgroundColor: '#E2E2E2',
    },
    icon: {
        flexDirection: 'row',
        gap: 10,
    },
    iconHeart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4,
    }

})

