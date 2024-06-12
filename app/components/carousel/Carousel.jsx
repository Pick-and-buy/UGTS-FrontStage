import React, { useRef, useState } from 'react';
import { FlatList, Text, View, Dimensions, Image, Pressable } from 'react-native';
import styles from './carousel.style';
import { AntDesign } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH; // Define the width of each item

const Carousel = ({ data }) => {
    const flatListRef = useRef(null);
    const [slide, setSlide] = useState(0); // Initialize slide index as 0
    const [prevDisable, setPrevDisable] = useState(true); // Disable "Previous" button initially
    const [nextDisable, setNextDisable] = useState(data.length <= 1); // Disable "Next" button if less than 2 items

    const onPrevious = () => {
        if (slide === 0) return; // Prevent scrolling before the first item
        flatListRef.current.scrollToIndex({ index: slide - 1 });
    };

    const onNext = () => {
        if (slide === data.length - 1) return; // Prevent scrolling after the last item
        flatListRef.current.scrollToIndex({ index: slide + 1 });
    };

    const onScroll = ({ nativeEvent }) => {
        const offset = nativeEvent.contentOffset.x;
        const newSlide = Math.round(offset / ITEM_WIDTH);

        setSlide(newSlide);
        setPrevDisable(newSlide === 0);
        setNextDisable(newSlide === data.length - 1);
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={ITEM_WIDTH} // Ensure snapToInterval matches item width
                decelerationRate="fast"
                onScroll={onScroll}
                renderItem={({ item }) => (
                    <View style={{ width: ITEM_WIDTH, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: item.uri }} style={styles.image} />
                    </View>
                )}
            />
            <View style={styles.footer}>
                <Pressable
                    onPress={onPrevious}
                    disabled={prevDisable}
                    style={[styles.button, prevDisable && styles.hiddenButton]}
                >
                    <AntDesign name="left" size={24} color="white" />
                </Pressable>
                <Text style={styles.sildeNumber}>{slide + 1}/{data.length}</Text>
                <Pressable
                    onPress={onNext}
                    disabled={nextDisable}
                    style={[styles.button, nextDisable && styles.hiddenButton]}
                >
                    <AntDesign name="right" size={24} color="white" />
                </Pressable>
            </View>
            
        </View>
    );
};

export default Carousel;
