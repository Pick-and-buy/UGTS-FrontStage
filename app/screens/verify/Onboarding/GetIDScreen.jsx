import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/theme'

const GetIDScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Image source={require("../../../../assets/images/id-card-pass-svgrepo-com.png")} style={styles.image} />
            <Text style={styles.title}>Get ID document ready</Text>
            <Text style={styles.description}>
                Before you start, make sure your passport, driver's licence is with you. You will need to scan it during the process.
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('TakeSelfie')}
                style={styles.btn}
            >
                <Text style={styles.next}>Next</Text>
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
        fontWeight:"bold"

    },
});

export default GetIDScreen;
