import { Image, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import styles from "../screens/css/uploadPhoto.style.js";
import Button from '../components/Button.jsx';
import BackBtn from '../components/BackBtn.jsx';
import { COLORS, SIZES } from '../constants/theme.js';
import axios from 'axios';  // Import axios
import { getAuthToken, sendImageToAPI } from '../api/user.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const UploadPhoto = ({ navigation, route }) => {
    const user = route.params;
    const userId = user.id;
    const [image, setImage] = useState();
    const { updateAvatar } = useAuth(); // Get updateAvatar from context

    const uploadImage = async (mode) => {
        try {
            let result = {};

            if (mode === "gallery") {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            } else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            }

            if (!result.canceled) {
                // Save image locally
                saveImage(result.assets[0].uri);
            }
        } catch (err) {
            alert("Error uploading image: " + err.message);
        }
    };

    const saveImage = async (imageUri) => {
        try {
            setImage(imageUri);
        } catch (err) {
            throw err;
        }
    };

    const handleContinue = async () => {
        if (image) {
            try {
                // Get the authentication token
                const authToken = await getAuthToken();
                // Update avatar in context
                const respone = await updateAvatar(image, userId, authToken);
                if (respone.code === 1000) {
                    // Navigate to the user profile details screen
                    navigation.navigate("user-profile-details");
                    Alert.alert(respone.message);
                }
            } catch (err) {
                alert("Error updating profile: " + err.message);
            }
        } else {
            alert("Please select an image first.");
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <View>
                    <BackBtn onPress={() => navigation.goBack()} />
                    <TouchableOpacity style={{
                        position: "absolute",
                        zIndex: 999,
                        top: SIZES.large - 45,
                        right: 25,
                    }}>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textHeader}>
                        Cập nhật ảnh hồ sơ của bạn
                    </Text>
                    <Text style={styles.textHeader_1}>
                        Dữ liệu này sẽ được hiển thị trong phần hồ sơ của bạn
                    </Text>
                </View>

                {image &&
                    <View style={{justifyContent: 'center', alignItems: 'center', position: 'relative', top: -30 }}>
                        <Image
                            source={{ uri: image }}
                            style={{ height: 150, width: 150, borderRadius: 15 }}
                        />
                    </View>
                }

                <TouchableOpacity
                    style={styles.view_3}
                    onPress={() => uploadImage()}
                >
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/camera.png')}
                    />
                    <Text style={{ fontSize: 16 }}>Chụp ảnh</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.view_3}
                    onPress={() => uploadImage("gallery")}
                >
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/gallery.png')}
                    />
                    <Text style={{ fontSize: 16 }}>Thư viện</Text>
                </TouchableOpacity>

                <View>
                    <Button
                        title={"TIẾP TỤC"}
                        onPress={handleContinue}
                        isValid={true}
                    />
                </View>
            </View>
        </View>
    );
}

export default UploadPhoto;
