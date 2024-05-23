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
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";
import BrandDetail from "../brand/BrandDetail";

const Brands = () => {

    const [brands, setBrands] = useState([]);

    const navigation = useNavigation();

    const data = [
        {
            id: 1,
            name: 'Chanel',
            ima: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg'
        },
        {
            id: 2,
            name: 'Louis Vuitton',
            ima: 'https://soliloquywp.com/wp-content/uploads/2016/09/How-to-Add-a-Homepage-Slider-in-WordPress.png'
        },
        {
            id: 3,
            name: 'Saint Laurent',
            ima: 'https://www.searchenginejournal.com/wp-content/uploads/2019/10/25-of-the-best-examples-of-home-pages-5dc504205de2e.png'
        },
        {
            id: 4,
            name: 'Bazaar',
            ima: 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/homepage-web-design.jpg?width=595&height=400&name=homepage-web-design.jpg'
        },
        {
            id: 5,
            name: 'Christian Dior',
            ima: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg'
        },
        {
            id: 6,
            name: 'Fendi',
            ima: 'https://www.searchenginejournal.com/wp-content/uploads/2019/10/25-of-the-best-examples-of-home-pages-5dc504205de2e.png'
        },
        {
            id: 7,
            name: 'Prada',
            ima: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg'
        },
        {
            id: 8,
            name: 'Hermes',
            ima: 'https://soliloquywp.com/wp-content/uploads/2016/09/How-to-Add-a-Homepage-Slider-in-WordPress.png'
        },
        {
            id: 9,
            name: 'Gucci',
            ima: 'https://www.searchenginejournal.com/wp-content/uploads/2019/10/25-of-the-best-examples-of-home-pages-5dc504205de2e.png'
        },

    ]

    return (
        <>
            <View>
                <View style={styles.container}>
                    <Text style={styles.heading}>Brand</Text>
                    <Text>View All</Text>
                </View>

                <FlatList
                    data={data}
                    horizontal={false}
                    numColumns={3}
                    renderItem={({ item, index }) => index <= 5 && (
                        <TouchableOpacity
                            style={styles.view}
                            onPress={() =>
                                navigation.navigate('brand-detail', { brands:item })
                            }
                        >
                            <View>
                                <Image
                                    style={styles.sliderImage}
                                    source={{ uri: item?.ima }}

                                />
                            </View>
                            <Text style={{ fontFamily: "bold", color: COLORS.primary }}>
                                {item?.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </>
    );
}

export default Brands;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    heading: {
        fontSize: 20,
        marginBottom: 10
    },
    view: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10
    },
    iconContainer: {
        backgroundColor: COLORS.primary,
        padding: 17,
        borderRadius: 10,
        marginLeft: 5,
        width: '45%',
    },
    sliderImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    }
})
