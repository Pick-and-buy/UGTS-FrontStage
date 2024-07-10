import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";
import { getPostsByBrandLineName } from "../../api/post";
import PostHorizontal from "../post/PostHorizontal";
import BackBtn from "../../components/BackBtn";
const ListsPostOfBrandLine = ({ navigation }) => {
    const brandLine = useRoute().params.brandLine;
    const [listPosts, setListPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    console.log(brandLine);
    useEffect(() => {
        fetchAllPostsByBrandLineName();
    }, []);

    const fetchAllPostsByBrandLineName = async () => {
        setIsLoading(true);
        try {
            const res = await getPostsByBrandLineName(brandLine);
            setListPosts(res.data.result);
        } catch (error) {
            console.error("Error fetching brands line:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchAllPostsByBrandLineName().finally(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>{brandLine} Bags</Text>
            </View>

            {listPosts?.length > 0 ? (
                <FlatList
                    data={listPosts}
                    renderItem={({ item, index }) => (
                        <PostHorizontal post={item} type="buyer"/>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[COLORS.primary]}
                        />
                    }
                />
            ) : (
                <View>
                    <Text
                        style={{
                            fontFamily: 'bold',
                            textAlign: 'center',
                            marginTop: '20%',
                            color: 'gray',
                        }}
                    >
                        Không tìm thấy sản phẩm nào có thương hiệu {brandLine}
                    </Text>
                </View>
            )}
        </View>
    )
}

export default ListsPostOfBrandLine

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 60,
        marginBottom: 80,
        backgroundColor: COLORS.white,
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
        top: -28,
    },
    textName: {
        fontSize: 25,
        fontFamily: 'bold',
        color: COLORS.black,
        textAlign: 'center',
        paddingLeft: 40,
    },
})