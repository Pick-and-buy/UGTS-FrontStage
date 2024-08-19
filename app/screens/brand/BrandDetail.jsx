import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
import { getPostsByBrandName, getPostsByBrandLineName, getBrandLinesByBrandName } from "../../api/post";
import PostHorizontal from "../post/PostHorizontal";
import BackBtn from "../../components/BackBtn";
import { AntDesign } from '@expo/vector-icons';
const BrandDetail = ({ navigation }) => {
    const brand = useRoute().params.brands;
    const [listPosts, setListPosts] = useState([]);
    const [brandLines, setBrandLines] = useState([]);
    const [selectedBrandLine, setSelectedBrandLine] = useState('All');
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchBrandLinesByBrandName();
        fetchAllPostsByBrandName();
    }, []);

    const fetchBrandLinesByBrandName = async () => {
        try {
            const res = await getBrandLinesByBrandName(brand.name);
            setBrandLines([{ lineName: 'All' }, ...res.data.result]);
        } catch (error) {
            console.log("Error fetching brand lines:", error);
        }
    };

    const fetchAllPostsByBrandName = async () => {
        setIsLoading(true);
        try {
            const res = await getPostsByBrandName(brand.name);
            setListPosts(res.data.result);
        } catch (error) {
            console.log("Error fetching posts by brand name:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPostsByBrandLineName = async (brandLineName) => {
        setIsLoading(true);
        try {
            const res = await getPostsByBrandLineName(brandLineName);
            setListPosts(res.data.result);
        } catch (error) {
            console.log("Error fetching posts by brand line name:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (selectedBrandLine === 'All') {
            fetchAllPostsByBrandName().finally(() => setRefreshing(false));
        } else {
            fetchPostsByBrandLineName(selectedBrandLine).finally(() => setRefreshing(false));
        }
    }, [selectedBrandLine]);

    const handleBrandLinePress = (brandLineName) => {
        setSelectedBrandLine(brandLineName);
        if (brandLineName === 'All') {
            fetchAllPostsByBrandName();
        } else {
            fetchPostsByBrandLineName(brandLineName);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>{brand.name.toUpperCase()}</Text>
            </View>
            <View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginLeft: "3%",
                    marginBottom: 5,
                    gap: 5
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: "bold" }}>Dòng thương hiệu</Text>
                    <AntDesign name="filter" size={16} color="black" />
                </View>
                <FlatList
                    data={brandLines}
                    horizontal
                    keyExtractor={(item) => item.lineName}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.brandLineButton,
                                selectedBrandLine === item.lineName && styles.selectedBrandLineButton
                            ]}
                            onPress={() => handleBrandLinePress(item.lineName)}
                        >
                            <Text
                                style={[
                                    styles.brandLineButtonText,
                                    selectedBrandLine === item.lineName && styles.selectedBrandLineButtonText
                                ]}
                            >
                                {item.lineName}
                            </Text>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.brandLineList}
                />
            </View>
            <View style={styles.content}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginLeft: "3%",
                    marginBottom: 10,
                    marginTop:10
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: "bold" }}>Sản phẩm</Text>
                </View>
                {listPosts?.length > 0 ? (
                    <FlatList
                        data={listPosts}
                        renderItem={({ item }) => (
                            <PostHorizontal post={item} type="buyer" />
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
                    <View style={styles.noPostsContainer}>
                        <Text style={styles.noPostsText}>
                            Hiện tại chưa có sản phẩm {selectedBrandLine === 'All' ? brand.name : selectedBrandLine}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default BrandDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
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
        top: -25,
    },
    content: {
        flex:1
    },
    brandLineList: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        // width: '100%',
        height: 50,
        // marginHorizontal:"auto",
        justifyContent: "center",
        alignItems: "center",
        gap: 15
    },
    brandLineButton: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        ...SHADOWS.medium,

    },
    selectedBrandLineButton: {
        backgroundColor: COLORS.primary,
    },
    brandLineButtonText: {
        color: COLORS.black,
    },
    selectedBrandLineButtonText: {
        color: COLORS.white,
    },
    noPostsContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPostsText: {
        fontFamily: 'bold',
        textAlign: 'center',
        color: 'gray',
    },
});
