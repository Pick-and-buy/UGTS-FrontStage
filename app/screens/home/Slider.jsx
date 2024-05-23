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
import { COLORS, SIZES } from "../../constants/theme";

const Slider = () => {

    const [slider, setSLider] = useState([]); //call API để lấy slider ra

    const data = [
        {
            ima: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg'
        },
        {
            ima: 'https://soliloquywp.com/wp-content/uploads/2016/09/How-to-Add-a-Homepage-Slider-in-WordPress.png'
        },
        {
            ima: 'https://www.searchenginejournal.com/wp-content/uploads/2019/10/25-of-the-best-examples-of-home-pages-5dc504205de2e.png'
        },
        {
            ima: 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/homepage-web-design.jpg?width=595&height=400&name=homepage-web-design.jpg'
        }
    ]

    return (
        <View>
            <Text style={styles.heading}>Dành Cho Bạn</Text>
            <FlatList
                data={data}
                horizontal={true}  //vuốt màn hình từ trái sang phải
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={styles.viewSlider}>
                        <Image
                            style={styles.sliderImage}
                            source={{ uri: item?.ima }}
                        />
                    </View>
                )}
            />
        </View>
    );
}

export default Slider;

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        marginBottom: 10
    },
    viewSlider: {
        marginRight: 20
    },
    sliderImage: {
        width: 200,
        height: 100,
        borderRadius: 20,
        objectFit: 'contain'
    }
})

