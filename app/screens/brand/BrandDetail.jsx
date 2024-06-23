import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";
import { getPostsByBrandName } from "../../api/post";
import PostHorizontal from "../post/PostHorizontal";
import BackBtn from "../../components/BackBtn";

const BrandDetail = ({ navigation }) => {

    //Lấy props khi onPress
    const brand = useRoute().params.brands;
    // console.log(brand);
    const [listPosts, setListPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAllPostsByBrandName();
    }, [])

    const fetchAllPostsByBrandName = async () => {
        setIsLoading(true);
        try {
            const res = await getPostsByBrandName(brand.name);
            setListPosts(res.data.result);
        } catch (error) {
            console.error("Error fetching brands:", error);
            // Handle error as per your application's requirements
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>SẢN PHẨM</Text>
            </View>

            {listPosts?.length > 0 ?
                <FlatList
                    data={listPosts}
                    renderItem={({ item, index }) => (
                        <PostHorizontal post={item} />
                    )}
                />
                :
                <View>
                    <Text
                        style={{
                            fontFamily: 'bold',
                            textAlign: 'center',
                            marginTop: '20%',
                            color: 'gray'
                        }}>
                        Không tìm thấy sản phẩm nào có thương hiệu {brand.name}
                    </Text>
                </View>
            }
        </View>
    );
}

export default BrandDetail;

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        width: '100%',
        height: '100%',
        paddingTop: 60,
        marginBottom: 80,
        backgroundColor: COLORS.white
    },
    header: {
        width: '96%',
        marginTop: 30,
        marginBottom: 30,
        marginHorizontal: "auto",
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "bold",
        position: 'absolute',
        top: -28
    },
    textName: {
        fontSize: 25,
        fontFamily: 'bold',
        color: COLORS.black,
        textAlign: 'center',
        paddingLeft: 40
    },
})

