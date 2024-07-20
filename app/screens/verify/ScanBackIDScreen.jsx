import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import Spinner from 'react-native-loading-spinner-overlay';

const ScanBackIDScreen = ({ navigation, route }) => {
    const { frontImageUri, fontData } = route.params;
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [backData, setBackData] = useState();
    useEffect(() => {
        Alert.alert(
            "Chú ý",
            "Hãy chuẩn bị CCCD mặt sau để tiếp tục xác thực.",
            [
                {
                    text: "Thoát",
                    onPress: () => navigation.goBack(),
                },
                {
                    text: "Đồng ý",
                    onPress: startIdentification,
                }
            ]
        );
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
            setLoading(true);
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
                    'api-key': 'NuQBfzczBYurMfXcN4GJBN12uaO6tBE2',
                },
                body: formData,
            });

            const result = await response.json();
            // console.log(result);
            setBackData(result);
            setLoading(false);
            if (result.errorCode === 0 && result.errorMessage === "") {
                navigation.navigate("FaceMatch", { frontImageUri: frontImageUri, fontData: fontData, backData: backData });
            } else {
                Alert.alert(
                    "Nhận diện ID thất bại",
                    "Hãy kiểm tra lại mặt sau ID của bạn và thử lại.",
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
            setLoading(false);
            console.error('Error uploading image:', error);
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

export default ScanBackIDScreen;
