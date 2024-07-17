import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const FaceMatch = ({ navigation, route }) => {
    const frontImageUri = route.params.frontImageUri;
    // console.log("image uri font in face match:", frontImageUri);
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
                    'api-key': '', // Replace with your API key
                },
                body: formData,
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* The camera will start automatically, no need for a button */}
        </View>
    );
};

export default FaceMatch;
