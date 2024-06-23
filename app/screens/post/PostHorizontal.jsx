import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

const PostHorizontal = ({ post }) => {
    const navigation = useNavigation();
    // console.log(post.description);
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("post-details", post.id)}
        >
            <Image source={{ uri: post?.product?.images[0]?.imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.title}>{post?.title}</Text>
                <Text numberOfLines={1} style={styles.subtitle}>{post?.description}</Text>
                <Text style={styles.price}>đ{post?.product?.price}</Text>
            </View>
            <TouchableOpacity style={styles.buttonActive}>
                <Text style={styles.buttonTextActive}>
                    Xem chi tiết
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default PostHorizontal;

const styles = StyleSheet.create({
    container: {
        width: "95%",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 6,
        borderRadius: 15,
        backgroundColor: 'white',
        ...SHADOWS.medium,
        marginHorizontal: "auto"
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        marginRight: 4
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    buttonActive: {
        backgroundColor: COLORS.primary,
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    buttonInactive: {
        backgroundColor: '#ccc',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    buttonTextActive: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonTextInactive: {
        color: '#888',
        fontWeight: 'bold',
    },
});
