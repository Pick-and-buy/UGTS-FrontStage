import React, { useState, useEffect } from 'react';
import { View, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS } from '../../constants/theme';

const ScanFontIDScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        startIdentification();
    }, []);

    const startIdentification = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera access is needed to take photos.');
            navigation.goBack();
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.back,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setLoading(true);
            uploadImage(result.assets[0].uri);
            console.log(result.assets[0].uri);
        } else {
            navigation.goBack();
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
                    'api-key': 'NuQBfzczBYurMfXcN4GJBN12uaO6tBE2',
                },
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            setLoading(false);
            if (result.errorCode === 0 && result.errorMessage === "") {
                navigation.navigate("ScanBackID", { imageUri: imageUri });
            } else {
                Alert.alert(
                    "Nhận diện ID thất bại",
                    "Hãy kiểm tra lại ID của bạn và thử lại.",
                    [
                        {
                            text: "Thoát",
                            onPress: () => navigation.goBack(),
                        },
                        {
                            text: "Thử lại",
                            onPress: startIdentification,
                        }
                    ]
                );
            }
        } catch (error) {
            setLoading(false);
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'An error occurred while uploading the image. Please try again.', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        }
    };

    return (
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});

export default ScanFontIDScreen;
