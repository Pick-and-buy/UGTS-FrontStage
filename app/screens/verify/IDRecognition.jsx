import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';

const IDRecognition = () => {
    const [image, setImage] = useState(null);

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera access is needed to take photos.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
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

            // Make the POST request using fetch
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
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Take Photo" onPress={takePhoto} />
        </View>
    );
};

export default IDRecognition;
