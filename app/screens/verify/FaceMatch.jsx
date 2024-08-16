import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { useAuth } from '../../context/AuthContext'
import { verifyInformation } from '../../api/user';

const FaceMatch = ({ navigation, route }) => {
    const { frontImageUri, fontData, backData } = route.params;
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        Alert.alert(
            "Chú ý",
            "Chụp cận cảnh khuôn mặt của bạn ở nơi đủ ánh sáng để xác thực được chính xác nhất.",
            [
                {
                    text: "Thoát",
                    onPress: () => navigation.goBack(),
                },
                {
                    text: "Đồng ý",
                    onPress: takePhoto,
                }
            ]
        );
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
            // console.log(result);


            if (result?.data?.isMatch === true && result?.data?.similarity >= 80.00) {
                // console.log(">>>user: ", user);
                // console.log(">>>fontData: ", fontData.data[0].address);
                // console.log(">>>backData: ", backData.data);
                // console.log(">>>faceMatchData: ", result.data);
                await verifyInformation(user, fontData, backData, result);
                navigation.navigate("congrats-navigation", {
                    title: "HOÀN THÀNH!",
                    content: "Xác minh người dùng thành công tài khoản của bạn đã sẵn sàng để sử dụng!",
                    routerName: "bottom-navigation",
                    btnTxt: "Mua sắm ngay!",
                });
            } else {
                Alert.alert(
                    "Nhận diện khuôn mặt thất bại",
                    "Hãy chụp lại ảnh và thử lại.",
                    [
                        {
                            text: "Thoát",
                            onPress: () => navigation.goBack(),
                        },
                        {
                            text: "Thử lại",
                            onPress: takePhoto,
                        }
                    ]
                );
            }

        } catch (error) {
            console.error('Error uploading images:', error);
        } finally {
            setLoading(false);
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
