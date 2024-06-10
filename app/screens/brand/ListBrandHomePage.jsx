import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    FlatList,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";

const ListBrandHomePage = () => {

    //Lấy props khi onPress
    const listBrands = useRoute().params.listBrands;

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="chevron-back-outline"
                    size={35}
                    color={COLORS.primary} />
            </View>
            <View style={{ marginBottom: 30 }}>
                <FlatList
                    data={listBrands}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    numColumns={3}
                    renderItem={({ item, index }) => index <= 5 && (
                        <View style={styles.imageContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('brand-detail', { brands: item })
                                }
                            >
                                <Image
                                    style={styles.carouselImage}
                                    source={{ uri: item?.logoUrl }}
                                    key={item.id}
                                />
                            </TouchableOpacity>
                            <View style={styles.textView}>
                                <Text style={{ fontFamily: "bold", color: COLORS.primary, paddingBottom: 10 }}>
                                    {item?.name}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

export default ListBrandHomePage;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 60,
        marginBottom: 80
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    //View all list
    imageContainer: {
        width: Dimensions.get('window').width / 3 - 15,
        height: Dimensions.get('window').width / 3 + 20,
        marginVertical: 10
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
    }

})

