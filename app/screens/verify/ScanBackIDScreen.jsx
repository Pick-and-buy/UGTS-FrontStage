import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';

const ScanBackIDScreen = ({ navigation, route }) => {
    const frontImageUri = route.params.imageUri;
    const [image, setImage] = useState(null);
    // console.log("image uri font:", frontImageUri);
    useEffect(() => {
        startIdentification();
    }, []);

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
            if (result.errorCode === 0 && result.errorMessage === "") {
                navigation.navigate("FaceMatch", { frontImageUri: frontImageUri })
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
        <View></View>
    );
};

export default ScanBackIDScreen;
