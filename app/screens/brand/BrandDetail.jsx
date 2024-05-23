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

const BrandDetail = (props) => {

    //Lấy props khi onPress
    const brand = useRoute().params.brands;

    const [productList, setProductList] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        console.log("check brand <BrandDetail>: ", brand);
        // brand && getProductByBrand();
    }, [brand])

    //Lấy danh sách Túi xách theo từng Brand thông qua API
    // const getProductByBrand = () => {
    //     //query: Viết câu lệnh query database: lấy product list theo brand
    //     Api.query(brand.name)
    //     .then(res => {
    //         console.log('check get product by brand <BrandDetail>', res);
    //         //set data sau khi call api vào trong state
    //         setProductList(res.data)
    //     })
    // }

    let dataFake = [
        {
            id: 1,
            category: 'chanel',
            name: 'Chanel Vanity Caviar',
            contactPerson: 'Jenny Wilson',
            phone: '0123456789',
            address: 'Hà Nội',
            price: 1500,
            images: 'https://p-vn.ipricegroup.com/f7854e3fb2a3ce7a31020ae326cd9d62fcb1e143_0.jpg'
        },
        {
            id: 2,
            category: 'chanel',
            name: 'Chanel Túi đeo Beige Clair',
            contactPerson: 'Emma Potter',
            phone: '0987582146',
            address: 'Hải Phòng',
            price: 2400,
            images: 'https://p-vn.ipricegroup.com/1ad39d3fa3ce7c7ce9a812580c4f0c43e9d8686a_0.jpg'
        },
        {
            id: 3,
            category: 'chanel',
            name: 'Chanel Card Holder Grained Calfskin',
            contactPerson: 'Jenny Wilson',
            phone: '0987885333',
            address: 'Ba Vì',
            price: 2650,
            images: 'https://p-vn.ipricegroup.com/24c2d9a9c152211d90ff266d5858383df5b77918_0.jpg'
        },
        {
            id: 4,
            category: 'chanel',
            name: 'Chanel Interlocking CC Leather',
            contactPerson: 'Hary Maguire',
            phone: '0465289711',
            address: 'Ninh Bình',
            price: 3650,
            images: 'https://p-vn.ipricegroup.com/622a315c17db25512d5acd4eae0ff6c78444d666_0.jpg'
        },
        {
            id: 5,
            category: 'chanel',
            name: 'Chanel Vanity Top Handle Bag',
            contactPerson: 'Mark Johnso',
            phone: '0569994210',
            address: 'Thành phố Hồ Chí Minh',
            price: 980,
            images: 'https://p-vn.ipricegroup.com/3f7b7b62ab33024818b7529210fb61e001c68bcf_0.jpg'
        },
        {
            id: 6,
            category: 'chanel',
            name: 'Chanel Matrasse Leather Sliver',
            contactPerson: 'Mickoe',
            phone: '0785963159',
            address: 'Yên Bái',
            price: 3200,
            images: 'https://p-vn.ipricegroup.com/1e7b77cd7df3a14824d89d912bf17b84f6d67e7c_0.jpg'
        },
        {
            id: 7,
            category: 'chanel',
            name: 'Chanel Vintage Round Flap Bag',
            contactPerson: 'Sam',
            phone: '0498635188',
            address: 'Thanh Hóa',
            price: 6000,
            images: 'https://p-vn.ipricegroup.com/856acd350eeedc36d93af705f7c3f83e850409ac_0.jpg'
        },
        {
            id: 8,
            category: 'chanel',
            name: 'Chanel Lambskin White Bag',
            contactPerson: 'David Luis',
            phone: '0345869555',
            address: 'Nghệ An',
            price: 4800,
            images: 'https://p-vn.ipricegroup.com/77039f7c77c79048dd5700a11585b672d38e7ddd_0.jpg'
        },
        {
            id: 9,
            category: 'chanel',
            name: 'Chanel French Riviera Quilted Caviar Large',
            contactPerson: 'Vinni Cris',
            phone: '0987451246',
            address: 'Bình Dương',
            price: 2200,
            images: 'https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/01/tui-tote-nu-chanel-french-riviera-quilted-caviar-large-mau-cam-65b9ac1c7e1f9-31012024091036.jpg'
        },
        {
            id: 10,
            category: 'chanel',
            name: 'Chanel Vanity With Chain Lambskin Màu Vàng Be',
            contactPerson: 'Junio JR',
            phone: '0941238974',
            address: 'Nha Trang',
            price: 1265,
            images: 'https://p-vn.ipricegroup.com/4b4ac7548cb819021eaf27759d78239e0f6a170f_0.jpg'
        },
    ]

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
                data={dataFake}
                renderItem={({ item, index }) => (
                    <ProductListItemByBrand listItem={item} />
                )}
            />
        </View>
    );
}

export default BrandDetail;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40
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
        paddingLeft: 85
    },
})

