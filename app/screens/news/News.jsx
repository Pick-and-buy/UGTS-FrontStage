import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getNewsById } from '../../api/news';
import styles from '../css/news.style';

const News = ({ navigation, route }) => {
    const newsId = route.params;
    const [newsDetails, setNewsDetails] = useState();
    useEffect(() => {
        fetchNewsDetails();
    }, []);

    const fetchNewsDetails = async () => {
        try {
            const response = await getNewsById(newsId);
            setNewsDetails(response.data.result);
            // console.log(response.data);
        } catch (error) {
            console.error("Error fetching news details:", error);
        }
    };


    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.wrapper}>
                <View style={styles.banner}>
                    <Image
                        style={styles.image}
                        source={{ uri: newsDetails?.banner }}
                    />
                </View>
                <Text style={styles.title}>
                    {newsDetails?.title}
                </Text>

                <Text style={styles.lunchDate}>
                    {newsDetails?.brandLine?.launchDate}
                </Text>


                <Text style={styles.content}>{newsDetails?.content}</Text>

                <TouchableOpacity style={styles.button}
                    onPress={() =>
                        navigation.navigate('lists-post-brand-line', { brandLine: newsDetails?.brandLine?.lineName })
                    }
                >
                    <Text style={styles.buttonText}>See {newsDetails?.brandLine?.lineName} Bags</Text>
                </TouchableOpacity>

                <Text style={styles.subTitle1}>
                    {newsDetails?.subTitle1}
                </Text>

                <Text style={styles.subContent1}>
                    {newsDetails?.subContent1}
                </Text>

                <Text style={styles.subContent2}>
                    {newsDetails?.subContent2}
                </Text>

                <Text style={styles.subContent3}>
                    {newsDetails?.subContent3}
                </Text>

                <Text style={styles.subContent4}>
                    {newsDetails?.subContent4}
                </Text>

                <Image
                    style={styles.image}
                    source={{ uri: newsDetails?.brandLine?.brandLineImages[0]?.lineImageUrl }}
                />

                <Text style={styles.subTitle2}>
                    {newsDetails?.subTitle2}
                </Text>

                <Text style={styles.subContent5}>
                    {newsDetails?.subContent5}
                </Text>
                <Text style={styles.subContent6}>
                    {newsDetails?.subContent6}
                </Text>
                <Text style={styles.subContent7}>
                    {newsDetails?.subContent7}
                </Text>

                <Image
                    style={styles.image}
                    source={{ uri: newsDetails?.brandLine?.brandLineImages[1]?.lineImageUrl }}
                />

                <Text style={styles.subTitle3}>
                    {newsDetails?.subTitle3}
                </Text>

                <Text style={styles.subContent8}>
                    {newsDetails?.subContent8}
                </Text>
                <Text style={styles.subContent9}>
                    {newsDetails?.subContent9}
                </Text>
                <Text style={styles.subContent10}>
                    {newsDetails?.subContent10}
                </Text>
            </View>
        </ScrollView>
    );
};

export default News;
