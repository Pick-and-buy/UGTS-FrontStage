import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";

const Header = () => {

    const [listUser, setListUser] = useState([]);

    return (
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <Image
                        style={[styles.urlImage, { backgroundColor: 'black' }]}
                        source={require('../../../assets/images/google-logo.png')}
                    />
                    <View>
                        <Text
                            style={{ color: 'white', fontSize: 20 }}>
                            Welcom, Name
                        </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', gap: 10}}>
                    <View style={styles.notification}>
                        <Ionicons
                            name="notifications"
                            size={24}
                            color={COLORS.primary} />
                    </View>
                    <View style={styles.notification}>
                        <Ionicons
                            name="checkmark"
                            size={24}
                            color={COLORS.primary} />
                    </View>
                </View>


            </View>
            {/* Search Bar Section */}
            <View style={styles.searchBarContainer}>
                <TextInput
                    placeholder="Search"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={true}
                    style={styles.textInput}
                />
                <FontAwesome
                    style={styles.searchBtn}
                    name="search"
                    size={24}
                    color={COLORS.primary} />
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 20,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    notification: {
        borderWidth: 1,
        borderRadius: 99,
        backgroundColor: 'white',
        borderColor: COLORS.primary
    },
    textInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        width: '85%',
        fontSize: 16
    },
    searchBarContainer: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10
    },
    searchBtn: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8
    },
    urlImage: {
        width: 45,
        height: 45,
        borderRadius: 99
    }
})

