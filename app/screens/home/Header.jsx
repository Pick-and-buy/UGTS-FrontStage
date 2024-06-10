import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    SafeAreaView,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { useNavigation } from '@react-navigation/native';
import styles from "../../screens/css/homeHeader.style";
import HomeTab from "../../navigation/HomeTab";

const Header = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* Search */}
                <View style={styles.options}>
                    <View style={styles.search}>
                        <FontAwesome
                            name="search"
                            size={20}
                            color="#AFAFAE"
                        />
                        <TextInput
                            placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
                            placeholderTextColor="#AFAFAE"
                        />
                    </View>
                    <View style={styles.option}>
                        <View style={styles.optionItem}>
                            <Ionicons
                                onPress={() => console.warn('Thông báo')}
                                name="notifications"
                                size={24}
                                color="#AFAFAE" />
                        </View>
                        <View style={styles.optionItem}>
                            <Ionicons
                                onPress={() => navigation.navigate('todo-task')}
                                name="checkmark"
                                size={24}
                                color="#AFAFAE" />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Header;
