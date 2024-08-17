import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { useAuth } from '../../context/AuthContext';
import { verifyInformation } from '../../api/user';
import CustomModal from '../../components/CustomModal';

const FaceMatch = ({ navigation, route }) => {
    const { frontImageUri, fontData, backData } = route.params;
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        detailText: '',
        confirmText: '',
        cancelText: '',
        onConfirm: () => { },
        onClose: () => { }
    });

    useEffect(() => {
        setModalContent({
            title: "Chú ý",
            detailText: "Chụp cận cảnh khuôn mặt của bạn ở nơi đủ ánh sáng để xác thực được chính xác nhất.",
            confirmText: "Đồng ý",
            cancelText: "Thoát",
            onConfirm: () => {
                setModalVisible(false);
                takePhoto();
            },
            onClose: () => {
                setModalVisible(false);
                navigation.navigate("GetID");
            },
        });
        setModalVisible(true);
    }, []);

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            setModalContent({
                title: "Permission Denied",
                detailText: "Camera access is needed to take photos.",
                confirmText: "OK",
                cancelText: "Cancel",
                onConfirm: () => setModalVisible(false),
            });
            setModalVisible(true);
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
                    'api-key': 'Tat5rfLhfZ89E5DxTzXDltHHKgspgEIR', // Replace with your API key
                },
                body: formData,
            });

            const result = await response.json();

            if (result?.data?.isMatch === true && result?.data?.similarity >= 80.00) {
                await verifyInformation(user, fontData, backData, result);
                navigation.navigate("congrats-navigation", {
                    title: "HOÀN THÀNH!",
                    content: "Xác minh người dùng thành công tài khoản của bạn đã sẵn sàng để sử dụng!",
                    routerName: "bottom-navigation",
                    btnTxt: "Mua sắm ngay!",
                });
            } else {
                setModalContent({
                    title: "Nhận diện khuôn mặt thất bại",
                    detailText: "Hãy chụp lại ảnh và thử lại.",
                    confirmText: "Thử lại",
                    cancelText: "Thoát",
                    onConfirm: () => {
                        setModalVisible(false);
                        takePhoto();
                    },
                    onClose: () => {
                        setModalVisible(false);
                        navigation.navigate("GetID");
                    },
                });
                setModalVisible(true);
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
            <CustomModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    navigation.goBack();
                }}
                onConfirm={modalContent.onConfirm}
                title={modalContent.title}
                detailText={modalContent.detailText}
                confirmText={modalContent.confirmText}
                cancelText={modalContent.cancelText}
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
