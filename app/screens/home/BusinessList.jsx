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
import { FontAwesome, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";

const BusinessList = () => {

    const [businessList, setBusinessList] = useState([]);

    const navigation = useNavigation();

    // useEffect(() => {
    //     getBusinessList();
    // }, [])

    /**
     * Get Business List from API
     */

    // const getBusinessList = () => {
    //     Api.query.then(res => {
    //         console.log(res);
    //         setBusinessList(res.data)
    //     })
    // }

    let data = [
        {
            id: '1',
            name: 'Shiro',
            email: 'shiro@gmail.com',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            thumbnail: 'https://tse1.mm.bing.net/th?id=OIP.n6NRfD8qNXn_9u_LxO8N-wHaE8&pid=Api&P=0&h=180',
            phone: '0986888888',
            address: 'Hà Nội',
            category: 'Túi xách',
            title: 'Túi Hermes Birkin 25',
            description: 'Sản phẩm túi LV đang là mẫu hot trên thị trường 2024',
            like: 68,
            comment: 10
        },
        {
            id: '2',
            name: 'Naruto',
            email: 'naruto@gmail.com',
            avatar: 'https://www.pontodopainel.com.br/imagem/index/27506094/G/naruto_1.jpg',
            thumbnail: 'https://gostyle.vn/wp-content/uploads/2020/10/tui-xach-nu-chinh-hang-louisvuitton-M45165-gostyle4.jpg',
            phone: '0968999999',
            address: 'TP Hồ Chí Minh',
            category: 'Túi xách',
            title: 'Ba lô Louis Vuitton: Excursion PM',
            description: 'Sản phẩm ba lô LV đang là mẫu hot trên thị trường 2024',
            like: 99,
            comment: 10
        },
        {
            id: '3',
            name: 'Naruto',
            email: 'naruto@gmail.com',
            avatar: 'https://www.pontodopainel.com.br/imagem/index/27506094/G/naruto_1.jpg',
            thumbnail: 'https://tse2.mm.bing.net/th?id=OIP.1boTFpolrZQV5x5c-DjDxgHaHa&pid=Api&P=0&h=180',
            phone: '0968999999',
            address: 'TP Hồ Chí Minh',
            category: 'Túi xách',
            title: 'Ba lô Louis Vuitton: Excursion PM',
            description: 'Sản phẩm ba lô LV đang là mẫu hot trên thị trường 2024',
            like: 99,
            comment: 10
        },
        {
            id: '4',
            name: 'Naruto',
            email: 'naruto@gmail.com',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            thumbnail: 'https://shopnhatviet.com/apppic/images/tui-xach-lv-mau-01.jpg',
            phone: '0968999999',
            address: 'TP Hồ Chí Minh',
            category: 'Túi xách',
            title: 'Ba lô Louis Vuitton: Excursion PM',
            description: 'Sản phẩm ba lô LV đang là mẫu hot trên thị trường 2024',
            like: 99,
            comment: 10
        }
    ]

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.heading}>Lastest Business</Text>
                <Text>View All</Text>
            </View>

            <FlatList
                data={data}
                horizontal={false}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <View style={styles.view}>
                        <View style={{ height: 145 }}>
                            <TouchableOpacity
                                onPress={() => navigation.push('product-detail')}
                            >
                                <Image
                                    style={styles.thumbnail}
                                    source={{ uri: item?.thumbnail }}
                                />
                                <View style={{ alignItems: 'center' }}>
                                    <Text>
                                        {item?.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileMainContainer}>
                            <View style={styles.profileContainer}>
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: item?.avatar }}
                                />
                                <View>
                                    <Text>
                                        {item?.name}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.icon}>
                                <View style={styles.iconHeart}>
                                    <MaterialCommunityIcons
                                        name="heart"
                                        size={24}
                                        color="black" />
                                    <Text style={{ fontSize: 10 }}>
                                        {item?.like}
                                    </Text>
                                </View>
                                <View style={styles.iconHeart}>
                                    <Octicons
                                        name="comment"
                                        size={24}
                                        color="black" />
                                    <Text style={{ fontSize: 10 }}>
                                        {item?.comment}
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                )}
            />
        </View>
    );
}


export default BusinessList;


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: 20,
        marginBottom: 10,
    },
    view: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 10,
        height: 230,
        borderColor: 'gray',
    },

    thumbnail: {
        width: 170,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 50,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 99,
    },
    icon: {
        flexDirection: 'row',
        gap: 5,
        marginLeft: 10,
        marginTop: 50
    },
    iconHeart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4,
    }

})

