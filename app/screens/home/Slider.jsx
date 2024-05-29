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
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import Carousel from "pinar";

const Slider = () => {

    const [slider, setSLider] = useState([]); //call API để lấy slider ra

    const data = [
        {
            id: 1,
            ima: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg'
        },
        {
            id: 2,
            ima: 'https://soliloquywp.com/wp-content/uploads/2016/09/How-to-Add-a-Homepage-Slider-in-WordPress.png'
        },
        {
            id: 3,
            ima: 'https://www.searchenginejournal.com/wp-content/uploads/2019/10/25-of-the-best-examples-of-home-pages-5dc504205de2e.png'
        },
        {
            id: 4,
            ima: 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/homepage-web-design.jpg?width=595&height=400&name=homepage-web-design.jpg'
        }
    ]

    return (
        <View>
            <Carousel
                style={styles.carouselContainer}
                showsControl={false}
                showsDots={true}
            >
                {data.map((image) => (
                    <View>
                        <Image
                            style={styles.carouselImage}
                            source={{ uri: image?.ima }}
                            key={image.id}
                        />
                    </View>
                ))}
            </Carousel>
        </View>
    );
}

export default Slider;

const styles = StyleSheet.create({
    carouselContainer: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    carouselImage: {
        height: 150,
        borderRadius: 10,
    },
})

