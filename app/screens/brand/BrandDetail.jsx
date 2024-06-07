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
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";
import ProductListItemByBrand from "./ProductListItemByBrand";
import { callFetchListPost } from "../../api/post";

const BrandDetail = () => {

    //Lấy props khi onPress
    const brand = useRoute().params.brands;
    const navigation = useNavigation();

    const [listPost, setListPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        // console.log("check brand <BrandDetail>: ", brand);
        fetchAllPost();
    }, [brand])

    const fetchAllPost = async () => {
        setIsLoading(true);
        const res = await callFetchListPost();
        // console.log(">>> check res List Post<BrandDetail>: ", res.data.result[0]);
        // console.log(">>> check res List Post<BrandDetail>: ", res.data.result.length);
        // console.log(">>> check res List Post<BrandDetail>: ", res.data.result[0].title);
        if(res && res.data && res.data.result) {
            setListPost(res.data.result)
        }
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="chevron-back-outline"
                    size={35}
                    color={COLORS.primary} />
                <Text style={styles.textName}>
                    {brand.name}
                </Text>

            </View>
            {/* fix cứng data về sau khi query từ API phải truyền lại data
            khi click vào từng brand thì phải hiển thị ra list sản phẩm thuộc brand đó */}
            <FlatList
                data={listPost}
                renderItem={({ item, index }) => (
                    <ProductListItemByBrand listItem={item} />
                )}
            />

            {/* {brand?.length > 0 ?
                <Text>Truyền FlatList vào đây</Text>
                :
                <Text
                    style={{
                        fontFamily: 'bold',
                        textAlign: 'center',
                        marginTop: '20%',
                        color: 'gray'
                    }}>
                    Không tìm thấy sản phẩm
                </Text>
            } */}
        </View>
    );
}

export default BrandDetail;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 60
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 20
    },
    textName: {
        fontSize: 25,
        fontFamily: 'bold',
        color: COLORS.black,
        textAlign: 'center',
        paddingLeft: 40
    },
})

