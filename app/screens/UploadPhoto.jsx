import { Image, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import styles from "../screens/css/uploadPhoto.style.js";
import Button from '../components/Button.jsx';
import BackBtn from '../components/BackBtn.jsx';
import { COLORS, SIZES } from '../constants/theme.js';
import axios from 'axios';  // Import axios
import { getAuthToken, sendImageToAPI} from '../api/user.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadPhoto = ({ navigation, route }) => {
    const user = route.params;
    // console.log(user.result.id);
    const userId = user.result.id;
    const [image, setImage] = useState();

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
                console.log(result.assets[0].uri);
                // Get the authentication token
                const authToken = await getAuthToken();

                // Send image to API
                await sendImageToAPI(result.assets[0].uri, userId, authToken);
            }
        } catch (err) {
            alert("Error uploading image: " + err.message);
        }
    };

    const saveImage = async (image) => {
        try {
            setImage(image);
        } catch (err) {
            throw err;
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

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative', top: -30 }}>
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
                        onPress={() => navigation.navigate("congrats-navigation", {
                            title: "HOÀN THÀNH!",
                            content: "Cập nhật ảnh đại diện thành công!",
                            routerName: "Profile",
                            btnTxt: "ĐẾN Mua Sắm",
                            isReset: false,
                        })}
                        isValid={true}
                    />
                </View>

            </View>
        </View>
    )
}

export default UploadPhoto;
