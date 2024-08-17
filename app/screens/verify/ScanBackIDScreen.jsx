import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomModal from '../../components/CustomModal'; // Assuming you have a CustomModal component

const ScanBackIDScreen = ({ navigation, route }) => {
    const { frontImageUri, fontData } = route.params;
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
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
            detailText: "Hãy chuẩn bị CCCD mặt sau để tiếp tục xác thực.",
            confirmText: "Đồng ý",
            cancelText: "Thoát",
            onConfirm: () => {
                setModalVisible(false);
                startIdentification();
            },
            onClose: () => {
                setModalVisible(false);
                navigation.navigate("GetID");
            },
        });
        setModalVisible(true);
    }, []);

    const startIdentification = async () => {
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
            cameraType: ImagePicker.CameraType.back,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setLoading(true);
            uploadImage(result.assets[0].uri);
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
            setLoading(false);

            if (result.errorCode === 0 && result.errorMessage === "") {
                navigation.navigate("FaceMatch", { frontImageUri, fontData, backData: result });
            } else {
                setModalContent({
                    title: "Nhận diện ID thất bại",
                    detailText: "Hãy kiểm tra lại mặt sau ID của bạn và thử lại.",
                    confirmText: "Thử lại",
                    cancelText: "Thoát",
                    onConfirm: () => {
                        setModalVisible(false);
                        startIdentification();
                    },
                    onClose: () => {
                        setModalVisible(false);
                        navigation.navigate("GetID");
                    },
                });
                setModalVisible(true);
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
            <CustomModal
                visible={modalVisible}
                onClose={modalContent.onClose}
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

export default ScanBackIDScreen;
