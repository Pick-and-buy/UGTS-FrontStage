import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    FlatList,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";
import BrandDetail from "../brand/BrandDetail";
import { callFetchListBrands } from "../../api/brand";

const Brands = () => {

    const [listbrands, setListBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        fetchAllBrand();
    }, [])

    const fetchAllBrand = async () => {
        setIsLoading(true);
        const res = await callFetchListBrands();
        if (res && res.data && res.data.result) {
            setListBrands(res.data.result)
        }
        setIsLoading(false);
    }

    return (
        <>
            <View>
                <View style={styles.container}>
                    <Text style={styles.heading}>Brand</Text>
                </View>

                <View style={{marginBottom: 30}}>
                    <FlatList
                        data={listbrands}
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        pagingEnabled={true}
                        renderItem={({ item, index }) => index <= 5 && (
                            <View style={styles.imageContainer}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('brand-detail', { brands: item })
                                    }        
                                >
                                    <Image
                                        style={styles.carouselImage}
                                        source={{ uri: item?.logoUrl }}
                                        key={item.id}
                                    />
                                </TouchableOpacity>
                                <View style={styles.textView}>
                                    <Text style={{ fontFamily: "bold", color: COLORS.primary, paddingBottom: 10 }}>
                                        {item?.name}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
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
        marginTop: -10
    },
    heading: {
        fontSize: 20,
        marginBottom: 10
    },
    
    imageContainer: {
        width: Dimensions.get('window').width / 3 - 5,
        height: Dimensions.get('window').width / 3 + 20,

    },
    carouselImage: {
        height: "90%",
        width: "95%",
        borderRadius: 10,
    },
    textView: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10
    }
})
