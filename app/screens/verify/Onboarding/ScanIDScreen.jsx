import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/theme';

const ScanIDScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Image source={require("../../../../assets/images/id card.png")} style={styles.image} />
            <Text style={styles.title}>Chụp ảnh CCCD của bạn</Text>
            <Text style={styles.description}>
                Hãy đảm bảo rằng tất cả thông tin 2 mặt đều nằm trong phạm vi của máy ảnh.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('ScanFontID')} style={styles.btn}>
                <Text style={styles.next}>BẮT ĐẦU XÁC MINH</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    btn: {
        // width: "50%",
        backgroundColor: COLORS.primary,
        paddingVertical: 6,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 50,
    },
    next: {
        fontSize: 18,
        color: COLORS.white,
        padding: 10,
        fontWeight: "bold",
    },
});

export default ScanIDScreen;
