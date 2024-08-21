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

const ProductList = () => {

    const [businessList, setBusinessList] = useState([]);

    const navigation = useNavigation();


    let data = [
        {
            id: '1',
            name: 'Shiro',
            email: 'shiro@gmail.com',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            thumbnail: 'https://tse1.mm.bing.net/th?id=OIP.n6NRfD8qNXn_9u_LxO8N-wHaE8&pid=Api&P=0&h=180',
            phone: '0986888888',
            address: 'Hà Nội',
            category: 'Hermes',
            title: 'Túi Hermes Birkin 25',
            description: 'Sản phẩm túi Hermes đang là mẫu hot trên thị trường 2024',
            like: 68,
            comment: 10,
        },
        {
            id: '2',
            name: 'Naruto',
            email: 'naruto@gmail.com',
            avatar: 'https://www.pontodopainel.com.br/imagem/index/27506094/G/naruto_1.jpg',
            thumbnail: 'https://gostyle.vn/wp-content/uploads/2020/10/tui-xach-nu-chinh-hang-louisvuitton-M45165-gostyle4.jpg',
            phone: '0968999999',
            address: 'TP Hồ Chí Minh',
            category: 'Louis Vuitton',
            title: 'Túi Louis Vuitton: Excursion PM',
            description: 'Sản phẩm Túi Louis Vuitton đang là mẫu hot trên thị trường 2024',
            like: 50,
            comment: 20
        },
        {
            id: '3',
            name: 'Naruto',
            email: 'naruto@gmail.com',
            avatar: 'https://www.pontodopainel.com.br/imagem/index/27506094/G/naruto_1.jpg',
            thumbnail: 'https://p-vn.ipricegroup.com/f7854e3fb2a3ce7a31020ae326cd9d62fcb1e143_0.jpg',
            phone: '0968999999',
            address: 'Hải Phòng',
            category: 'Chanel',
            title: 'Chanel Vanity Caviar',
            description: 'Sản phẩm Túi Chanel đang là mẫu hot trên thị trường 2024',
            like: 80,
            comment: 46
        },
        {
            id: '4',
            name: 'Naruto',
            email: 'naruto@gmail.com',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            thumbnail: 'https://product.hstatic.net/200000456445/product/6077881gf0j9207_9b3af2378dd245d3b9012edb42e319d7_grande.png',
            phone: '0968999999',
            address: 'Phú Quốc',
            category: 'Saint Laurent',
            title: 'Saint Laurent Card Holder Grained Calfskin',
            description: 'Sản phẩm Túi Saint Laurent đang là mẫu hot trên thị trường 2024',
            like: 60,
            comment: 15
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
                                onPress={() => navigation.navigate('post-detail', { post:item })}
                                key={item.id}
                           >
                                <Image
                                    style={styles.thumbnail}
                                    source={{ uri: item?.thumbnail }}
                                    key={item.id}
                                />
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text>
                                        {item?.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Avatar & Comment */}
                        <View style={styles.profileMainContainer}>
                            <View style={styles.profileContainer}>
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: item?.avatar }}
                                    key={item.id}
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


export default ProductList;


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

    //Avatar & Comment
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

