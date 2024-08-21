import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/theme';

const TakeSelfieScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
            </TouchableOpacity>
            <Image source={require("../../../../assets/images/face recognition.png")} style={styles.image} />
            <Text style={styles.title}>Chụp ảnh khuôn mặt</Text>
            <Text style={styles.description}>
                Khuôn mặt của bạn phải được chiếu sáng tốt. Hãy chắc chắn rằng bạn không có bất kỳ đèn nền nào.
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('ScanID')}
                style={styles.btn}
            >
                <Text style={styles.next}>TIẾP TỤC</Text>
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
        marginLeft: "auto"
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    btn: {
        width: "50%",
        backgroundColor: COLORS.primary,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 50
    },
    next: {
        fontSize: 18,
        color: COLORS.white,
        padding: 10,
        fontWeight: "bold"
    },
});

export default TakeSelfieScreen;
