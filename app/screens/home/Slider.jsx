import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import Carousel from "pinar";
import { getAllNews } from "../../api/news";

const Slider = ({ navigation }) => {
    const [slider, setSlider] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchAllNews();
    }, []);

    const fetchAllNews = async () => {
        try {
            const response = await getAllNews();
            setNews(response.data.result);
            fetchSlider(response.data.result);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    const fetchSlider = (data) => {
        const extracted = data.map(item => ({
            id: item.id,
            banner: item.banner,
            title: item.title
        }));
        setSlider(extracted);
    };

    return (
        <View
            style={{ width: '100%', marginHorizontal: "auto", marginTop: "2%" }}
        >
            <Carousel
                style={styles.carouselContainer}
                showsControls={false}
                showsDots={true}
                autoplay={true}
                autoplayInterval={3000}
                loop={true}
            >
                {slider.map((image) => (
                    <TouchableOpacity
                        key={image.id}
                        style={styles.carouselItem}
                        onPress={() => navigation.navigate('news-navigation', image.id)}
                    >
                        <Image
                            style={styles.carouselImage}
                            source={{ uri: image.banner }}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{image.title}</Text>
                            <TouchableOpacity
                                style={styles.viewMoreButton}
                                onPress={() => navigation.navigate('news-navigation', image.id)}
                            >
                                <Text style={styles.viewMoreText}>View more</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </Carousel>
        </View>
    );
}

export default Slider;

const styles = StyleSheet.create({
    carouselContainer: {
        width: "100%",
        height: 200,
    },
    carouselItem: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    carouselImage: {
        width: '98%',
        height: 150,
        borderRadius: 10,
        resizeMode: "cover",
        marginHorizontal: "auto"
    },
    textContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        alignItems: 'center',
    },
    text: {
        color: COLORS.white,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: "10%",
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // borderRadius: 10,
        // padding: 5,
    },
    viewMoreButton: {
        marginBottom: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewMoreText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        // textDecorationLine: 'underline',
    },
    image: {
        height: 150,
        borderRadius: 10,
    },
});
