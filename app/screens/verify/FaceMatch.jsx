import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

const FaceMatch = ({ navigation, route }) => {
    const frontImageUri = route.params.frontImageUri;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        takePhoto();
    }, []);

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera access is needed to take photos.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const newImageUri = result.assets[0].uri;
            const updatedImages = [frontImageUri, newImageUri];
            setLoading(true);
            uploadImages(updatedImages);
        }
    };

    const uploadImages = async (imageUris) => {
        console.log(imageUris);
        try {
            const formData = new FormData();
            imageUris.forEach((uri, index) => {
                formData.append(`file[]`, {
                    uri,
                    type: 'image/jpeg',
                    name: `image${index}.jpg`,
                });
            });

            const response = await fetch('https://api.fpt.ai/dmp/checkface/v1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'api-key': 'NuQBfzczBYurMfXcN4GJBN12uaO6tBE2', // Replace with your API key
                },
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            setLoading(false);
            navigation.navigate("congrats-navigation", {
                title: "HOÀN THÀNH!",
                content: "Xác minh người dùng thành công tài khoản của bạn đã sẵn sàng để sử dụng!",
                routerName: "bottom-navigation",
                btnTxt: "Mua sắm ngay!",
            })
        } catch (error) {
            setLoading(false);
            console.error('Error uploading images:', error);
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

export default FaceMatch;
