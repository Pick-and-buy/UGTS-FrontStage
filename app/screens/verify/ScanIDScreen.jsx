import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { COLORS } from '../../constants/theme';

const ScanIDScreen = ({ navigation }) => {
    // const [image, setImage] = useState(null);

    const startIdentification = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera access is needed to take photos.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.back,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // setImage(result.assets[0].uri);
            uploadImage(result.assets[0].uri);
            console.log(result.assets[0].uri);
        }
    };

    const uploadImage = async (imageUri) => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'image.jpg',
            });

            const response = await fetch('https://api.fpt.ai/vision/idr/vnm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'api-key': '',
                },
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            if (result.errorCode === 0 && result.errorMessage === "") {
                navigation.navigate("ScanBackID", { imageUri: imageUri });
            } else {
                Alert.alert(
                    "Nhận diện ID thất bại",
                    "Hãy kiểm tra lại ID của bạn và thử lại.",
                    [
                        {
                            text: "Thoát",
                        },
                        {
                            text: "Thử lại",
                            onPress: startIdentification
                        }
                    ]
                );
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Image source={require("../../../assets/images/id card.png")} style={styles.image} />
            <Text style={styles.title}>Scan your ID document</Text>
            <Text style={styles.description}>
                A 60 second timer is going to start. Please make sure that all information is within the borders of the scanner.
            </Text>
            <TouchableOpacity onPress={startIdentification} style={styles.btn}>
                <Text style={styles.next}>Start Identification</Text>
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

export default ScanIDScreen;
