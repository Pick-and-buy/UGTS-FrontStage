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
import Brands from './Brands';
import ProductList from './ProductList';
import ProductItem from "./ProductItem";
import { getAllPosts } from "../../api/post";
const HomeFollow = ({ navigation }) => {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllPosts(); // Replace with your API URL
                // console.log(response.data.result);
                const products = response.data.result
                setProducts(products);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Slider />
            <View style={styles.row}>
                {
                    products.map(product => (
                        <ProductItem key={product.id} product={product} />
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
    },
    row: {
        width: "98%",
        justifyContent: "space-around",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 5,
        marginHorizontal: "auto",
    }
});
