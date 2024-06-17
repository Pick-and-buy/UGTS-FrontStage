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
    const [slider, setSlider] = useState([]); //call API to fetch slider data
    const [news, setNews] = useState([]);


    // const data = [
    //     {
    //         id: 1,
    //         image: 'https://bantersa.com/wp-content/uploads/2015/05/5-Beautiful-Websites.jpg'
    //     },
    //     {
    //         id: 2,
    //         image: 'https://soliloquywp.com/wp-content/uploads/2016/09/How-to-Add-a-Homepage-Slider-in-WordPress.png'
    //     },
    //     {
    //         id: 3,
    //         image: 'https://www.searchenginejournal.com/wp-content/uploads/2019/10/25-of-the-best-examples-of-home-pages-5dc504205de2e.png'
    //     },
    //     {
    //         id: 4,
    //         image: 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/homepage-web-design.jpg?width=595&height=400&name=homepage-web-design.jpg'
    //     }
    // ];


    useEffect(() => {
        fetchAllNews();
    }, []);

    const fetchAllNews = async () => {
        try {
            const response = await getAllNews();
            setNews(response.data.result);
            fetchSlider(response.data.result);
            // console.log(response.data.result);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };


    const fetchSlider = (data) => {
        const extracted = data.map(item => ({
            id: item.id,
            banner: item.banner
        }));
        setSlider(extracted);
    };
    // console.log(slider);


    return (
        <View
            style={{ width: '100%', marginHorizontal: "auto", marginTop: "2%" }}
        >
            <Carousel
                style={styles.carouselContainer}
                showsControls={false}
                showsDots={true}
                autoplay={true}
                autoplayInterval={3000} // Slide interval in milliseconds
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
    },
    carouselImage: {
        width: '98%',
        height: 150,
        borderRadius: 10,
        resizeMode: "cover",
        marginHorizontal: "auto"
    },
    image: {
        height: 150,
        borderRadius: 10,
    },
});
