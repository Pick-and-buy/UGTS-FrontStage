import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GetIDScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Image source={{uri:'https://img.freepik.com/premium-vector/plastic-id-card-personal-identity-card-driver-license-identification-verification_349999-510.jpg'}} style={styles.image} />
            <Text style={styles.title}>Get ID document ready</Text>
            <Text style={styles.description}>
                Before you start, make sure your passport, driver's licence is with you. You will need to scan it during the process.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('TakeSelfie')}>
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
        width: 200,
        height: 200,
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
    next: {
        fontSize: 18,
        color: '#000',
        padding: 10,
    },
});

export default GetIDScreen;
