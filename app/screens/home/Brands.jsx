import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { callFetchListBrands } from "../../api/brand";
import { COLORS } from "../../constants/theme";

const Brands = () => {
    const [listbrands, setListBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    // console.log(listbrands);
    useEffect(() => {
        fetchAllBrand();
    }, []);

    const fetchAllBrand = async () => {
        setIsLoading(true);
        try {
            const res = await callFetchListBrands();
            setListBrands(res.data.result);
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
                <Text style={styles.heading}>Thương hiệu</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('list-all-brand', { listBrands: listbrands })
                    }
                >
                    <Text style={styles.expandedText}>Xem Tất Cả</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
            ) : (
                <View style={{ marginBottom: 30 }}>
                    <FlatList
                        data={listbrands}
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        pagingEnabled={true}
                        keyExtractor={(item) => item?.id}
                        renderItem={({ item, index }) => (
                            <View style={styles.imageContainer}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('brand-detail', { brands: item })
                                    }
                                >
                                    <Image
                                        style={styles.carouselImage}
                                        source={{ uri: item?.brandLogos[0]?.logoUrl }}
                                    />
                                </TouchableOpacity>
                                <View style={styles.textView}>
                                    <Text style={{ fontWeight: "600", color: COLORS.black }}>
                                        {item?.name}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default Brands;

const styles = StyleSheet.create({
    container: {
        width: '98%',
        marginHorizontal: "auto",
        top: -20
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginTop: -10,
        // marginBottom: 10,
    },
    heading: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    expandedText: {
        fontSize: 14,
        color: COLORS.black,
        fontWeight: '600'
    },
    imageContainer: {
        width: Dimensions.get('window').width / 3 - 15,
        height: Dimensions.get('window').width / 3,
    },
    carouselImage: {
        height: "90%",
        width: "95%",
        borderRadius: 10,
    },
    textView: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10,
    },
});
