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

const ProductListItemByBrand = ({ listItem }) => {

    const navigation = useNavigation();

    let dataFake = [
        {
            id: 1,
            category: 'chanel',
            name: 'Chanel Vanity Caviar',
            contactPerson: 'Jenny Wilson',
            phone: '0123456789',
            address: 'Hà Nội',
            price: 1500,
            title: 'Túi sách Chanel hàng like new xinh xắn phiên bản cao cấp 2024',
            images: 'https://p-vn.ipricegroup.com/f7854e3fb2a3ce7a31020ae326cd9d62fcb1e143_0.jpg',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            description: 'Cảm ơn bạn đã đến thăm. Tôi quyết định bán nó vì không còn sử dụng nữa. Phần cầm tay ở mặt sau hơi bẩn nhưng có bụi bẩn ở mặt sau. Tôi không nghĩ rằng bụi bẩn sẽ được chú ý khi bạn cầm nó. Vui lòng xem trang thứ ba để biết chi tiết. Có hai túi nhỏ bên trong và một túi có khóa kéo lớn.',
        },
        {
            id: 2,
            category: 'chanel',
            name: 'Chanel Túi đeo Beige Clair',
            contactPerson: 'Emma Potter',
            phone: '0987582146',
            address: 'Hải Phòng',
            price: 2400,
            title: 'Túi sách Chanel hàng like new xinh xắn phiên bản cao cấp 2024 được sản xuất thủ công tại Anh và chỉ giới hạn 200 chiếc trên toàn thế giới',
            images: 'https://p-vn.ipricegroup.com/1ad39d3fa3ce7c7ce9a812580c4f0c43e9d8686a_0.jpg',
            avatar: 'https://www.pontodopainel.com.br/imagem/index/27506094/G/naruto_1.jpg',
            description: 'Cảm ơn bạn đã đến thăm. Tôi quyết định bán nó vì không còn sử dụng nữa. Phần cầm tay ở mặt sau hơi bẩn nhưng có bụi bẩn ở mặt sau. Tôi không nghĩ rằng bụi bẩn sẽ được chú ý khi bạn cầm nó. Vui lòng xem trang thứ ba để biết chi tiết. Có hai túi nhỏ bên trong và một túi có khóa kéo lớn.',
        },
        {
            id: 3,
            category: 'chanel',
            name: 'Chanel Card Holder Grained Calfskin',
            contactPerson: 'Jenny Wilson',
            phone: '0987885333',
            address: 'Ba Vì',
            price: 2650,
            title: 'Túi sách Chanel hàng like new xinh xắn phiên bản cao cấp 2024',
            images: 'https://p-vn.ipricegroup.com/24c2d9a9c152211d90ff266d5858383df5b77918_0.jpg',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            description: 'Cảm ơn bạn đã đến thăm. Tôi quyết định bán nó vì không còn sử dụng nữa. Phần cầm tay ở mặt sau hơi bẩn nhưng có bụi bẩn ở mặt sau. Tôi không nghĩ rằng bụi bẩn sẽ được chú ý khi bạn cầm nó. Vui lòng xem trang thứ ba để biết chi tiết. Có hai túi nhỏ bên trong và một túi có khóa kéo lớn.',
        },
        {
            id: 4,
            category: 'chanel',
            name: 'Chanel Interlocking CC Leather',
            contactPerson: 'Hary Maguire',
            phone: '0465289711',
            address: 'Ninh Bình',
            price: 3650,
            title: 'Túi sách Chanel hàng like new xinh xắn phiên bản cao cấp 2024',
            images: 'https://p-vn.ipricegroup.com/622a315c17db25512d5acd4eae0ff6c78444d666_0.jpg',
            avatar: 'https://www.pontodopainel.com.br/imagem/index/27506094/G/naruto_1.jpg',
            description: 'Cảm ơn bạn đã đến thăm. Tôi quyết định bán nó vì không còn sử dụng nữa. Phần cầm tay ở mặt sau hơi bẩn nhưng có bụi bẩn ở mặt sau. Tôi không nghĩ rằng bụi bẩn sẽ được chú ý khi bạn cầm nó. Vui lòng xem trang thứ ba để biết chi tiết. Có hai túi nhỏ bên trong và một túi có khóa kéo lớn.',
        },
        {
            id: 5,
            category: 'chanel',
            name: 'Chanel Vanity Top Handle Bag',
            contactPerson: 'Mark Johnso',
            phone: '0569994210',
            address: 'Thành phố Hồ Chí Minh',
            price: 980,
            title: 'Túi sách Chanel hàng like new xinh xắn phiên bản cao cấp 2024',
            images: 'https://p-vn.ipricegroup.com/3f7b7b62ab33024818b7529210fb61e001c68bcf_0.jpg',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            description: 'Cảm ơn bạn đã đến thăm. Tôi quyết định bán nó vì không còn sử dụng nữa. Phần cầm tay ở mặt sau hơi bẩn nhưng có bụi bẩn ở mặt sau. Tôi không nghĩ rằng bụi bẩn sẽ được chú ý khi bạn cầm nó. Vui lòng xem trang thứ ba để biết chi tiết. Có hai túi nhỏ bên trong và một túi có khóa kéo lớn.',
        },
        {
            id: 6,
            category: 'chanel',
            name: 'Chanel Matrasse Leather Sliver',
            contactPerson: 'Mickoe',
            phone: '0785963159',
            address: 'Yên Bái',
            price: 3200,
            title: 'Túi sách Chanel hàng like new xinh xắn phiên bản cao cấp 2024',
            images: 'https://p-vn.ipricegroup.com/1e7b77cd7df3a14824d89d912bf17b84f6d67e7c_0.jpg',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            description: 'Cảm ơn bạn đã đến thăm. Tôi quyết định bán nó vì không còn sử dụng nữa. Phần cầm tay ở mặt sau hơi bẩn nhưng có bụi bẩn ở mặt sau. Tôi không nghĩ rằng bụi bẩn sẽ được chú ý khi bạn cầm nó. Vui lòng xem trang thứ ba để biết chi tiết. Có hai túi nhỏ bên trong và một túi có khóa kéo lớn.',
        },
        {
            id: 7,
            category: 'chanel',
            name: 'Chanel Vintage Round Flap Bag',
            contactPerson: 'Sam',
            phone: '0498635188',
            address: 'Thanh Hóa',
            price: 6000,
            title: 'Túi sách Chanel hàng like new xinh xắn phiên bản cao cấp 2024',
            images: 'https://p-vn.ipricegroup.com/856acd350eeedc36d93af705f7c3f83e850409ac_0.jpg',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            description: 'Cảm ơn bạn đã đến thăm. Tôi quyết định bán nó vì không còn sử dụng nữa. Phần cầm tay ở mặt sau hơi bẩn nhưng có bụi bẩn ở mặt sau. Tôi không nghĩ rằng bụi bẩn sẽ được chú ý khi bạn cầm nó. Vui lòng xem trang thứ ba để biết chi tiết. Có hai túi nhỏ bên trong và một túi có khóa kéo lớn.',
        },
        {
            id: 8,
            category: 'chanel',
            name: 'Chanel Lambskin White Bag',
            contactPerson: 'David Luis',
            phone: '0345869555',
            address: 'Nghệ An',
            price: 4800,
            title: 'Túi sách Chanel hàng like new xinh xắn phiên bản cao cấp 2024',
            images: 'https://p-vn.ipricegroup.com/77039f7c77c79048dd5700a11585b672d38e7ddd_0.jpg',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            description: 'Cảm ơn bạn đã đến thăm. Tôi quyết định bán nó vì không còn sử dụng nữa. Phần cầm tay ở mặt sau hơi bẩn nhưng có bụi bẩn ở mặt sau. Tôi không nghĩ rằng bụi bẩn sẽ được chú ý khi bạn cầm nó. Vui lòng xem trang thứ ba để biết chi tiết. Có hai túi nhỏ bên trong và một túi có khóa kéo lớn.',
        },
        {
            id: 9,
            category: 'chanel',
            name: 'Chanel French Riviera Quilted Caviar Large',
            contactPerson: 'Vinni Cris',
            phone: '0987451246',
            address: 'Bình Dương',
            price: 2200,
            title: 'Túi sách Chanel hàng like new xinh xắn phiên bản cao cấp 2024',
            images: 'https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/01/tui-tote-nu-chanel-french-riviera-quilted-caviar-large-mau-cam-65b9ac1c7e1f9-31012024091036.jpg',
            avatar: 'https://symbols.vn/wp-content/uploads/2022/02/Anh-Co-Hai-Tac-Mu-Rom-dep-nhat.jpg',
            description: 'Cảm ơn bạn đã đến thăm. Tôi quyết định bán nó vì không còn sử dụng nữa. Phần cầm tay ở mặt sau hơi bẩn nhưng có bụi bẩn ở mặt sau. Tôi không nghĩ rằng bụi bẩn sẽ được chú ý khi bạn cầm nó. Vui lòng xem trang thứ ba để biết chi tiết. Có hai túi nhỏ bên trong và một túi có khóa kéo lớn.',
        },
        {
            id: 10,
            category: 'chanel',
            name: 'Chanel Vanity With Chain Lambskin Màu Vàng Be',
            contactPerson: 'Junio JR',
            phone: '0941238974',
            address: 'Nha Trang',
            price: 1265,
            title: 'Túi sách Chanel hàng like new xinh xắn phiên bản cao cấp 2024',
            images: 'https://p-vn.ipricegroup.com/4b4ac7548cb819021eaf27759d78239e0f6a170f_0.jpg',
            avatar: 'https://www.pontodopainel.com.br/imagem/index/27506094/G/naruto_1.jpg',
            description: 'Cảm ơn bạn đã đến thăm. Tôi quyết định bán nó vì không còn sử dụng nữa. Phần cầm tay ở mặt sau hơi bẩn nhưng có bụi bẩn ở mặt sau. Tôi không nghĩ rằng bụi bẩn sẽ được chú ý khi bạn cầm nó. Vui lòng xem trang thứ ba để biết chi tiết. Có hai túi nhỏ bên trong và một túi có khóa kéo lớn.',
        },
    ]

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Image
                        style={styles.imag}
                        source={{ uri: listItem?.product.images[1].imageUrl }}
                    />
                    <Text style={styles.textPrice}>
                        ${listItem.product.price}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('product-detail', { itemDetail: listItem })
                        }
                        style={styles.subContainer}>
                        <Text style={{ fontFamily: 'bold' }}>{listItem.title}</Text>
                        <Text>Contact Person: {dataFake[0].contactPerson}</Text>
                    </TouchableOpacity>
                    
                </View>

            </View>

        </ScrollView>
    );
}

export default ProductListItemByBrand;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
    },
    imag: {
        width: 100,
        height: 100,
    },
    textPrice: {
        fontFamily: 'bold',
        color: COLORS.primary,
        textAlign: 'center',
        marginTop: 10
    },
    subContainer: {
        marginLeft: 10,
        width: '90%',
        height: '90%',
        marginTop: 10,
        gap: 10,
    },
   
})

