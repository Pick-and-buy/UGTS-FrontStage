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

const ProductListItemByBrand = ({ listItem }) => {

    const navigation = useNavigation();

    useEffect(() => {
        console.log("List product By Brand <ProductListItemByBrand>: ", listItem);
        // brand && getProductByBrand();
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Image
                        style={styles.imag}
                        source={{ uri: listItem?.images }}
                    />
                    <Text style={styles.textPrice}>
                        ${listItem.price}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('product-detail', { itemDetail: listItem })
                        }
                        style={styles.subContainer}>
                        <Text style={{ color: 'gray' }}>{listItem.contactPerson}</Text>
                        <Text style={{ fontFamily: 'bold' }}>{listItem.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.address}>
                        <Text style={{ color: 'gray' }}>
                        <Ionicons name="location-sharp" size={20} color='black' />
                        {listItem.address}
                    </Text>
                    </View>
                </View>

            </View>

        </ScrollView>
    );
}

export default ProductListItemByBrand;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
    },
    imag: {
        width: 100,
        height: 100,
    },
    textPrice: {
        fontFamily: 'bold',
        color: COLORS.primary,
        textAlign: 'center',
    },
    subContainer: {
        gap: 10,
        paddingLeft: 10,
        paddingTop: 10,
        width: '80%',
        height: '70%',
    },
    address: {
        marginTop: 10,
        width: '80%',
    }
})

