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
    RefreshControl,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";
import BackBtn from "../../components/BackBtn"

const ListBrands = ({ navigation, route }) => {
    const listBrands = route.params.listBrands;
    const [refreshing, setRefreshing] = useState(false);

    // Function to handle refresh
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate a network request
        setTimeout(() => {
            // Fetch or refresh the data here
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={{ flex: 1, paddingTop: 60, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackBtn onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>THƯƠNG HIỆU</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <FlatList
                        data={listBrands}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={3}
                        renderItem={({ item, index }) => index <= 5 && (
                            <View style={styles.imageContainer}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('brand-detail', { brands: item })
                                    }
                                >
                                    <Image
                                        style={styles.carouselImage}
                                        source={{ uri: item?.brandLogos[0]?.logoUrl }}
                                        key={item.id}
                                    />
                                </TouchableOpacity>
                                <View style={styles.textView}>
                                    <Text style={{ fontWeight: '600', color: COLORS.black, paddingBottom: 10 }}>
                                        {item?.name}
                                    </Text>
                                </View>
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[COLORS.primary]}
                            />
                        }
                    />
                </View>
            </View>
        </View>
    );
}

export default ListBrands;

const styles = StyleSheet.create({
    container: {
        width: '96%',
        marginHorizontal: "auto",
        backgroundColor:COLORS.white
    },
    header: {
        width: '100%',
        marginTop: 30,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "bold",
        position: 'absolute',
        top: -28
    },
    imageContainer: {
        width: Dimensions.get('window').width / 3 - 4,
        height: Dimensions.get('window').width / 3 - 8,
        marginVertical: 10
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
    }
});
