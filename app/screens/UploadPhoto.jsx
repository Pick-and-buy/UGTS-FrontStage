import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import styles from "../screens/css/uploadPhoto.style.js";
import Button from '../components/Button.jsx';
import BackBtn from '../components/BackBtn.jsx';
import { COLORS, SIZES } from '../constants/theme.js';

const UploadPhoto = ({navigation}) => {
    const [image, setImage] = useState();

    const uploadImage = async (mode) => {
        try {
            let result = {};

            if (mode === "gallery") {
                await ImagePicker.
                    requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.
                    launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.
                            Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                    });
            } else {
                await ImagePicker.
                    requestCameraPermissionsAsync();
                result = await ImagePicker.
                    launchCameraAsync({
                        cameraType: ImagePicker.CameraType.front,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                    })
            }

            if (!result.canceled) {
                //save image
                saveImage(result.assets[0].uri);
            }
        } catch (err) {
            alert("Error uploading image: " + err.message);
        }
    }

    const saveImage = async (image) => {
        try {
            //update displayed image
            setImage(image);
        } catch (err) {
            throw err;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.wrapper}>
                <View style={styles.view_1}>
                    <View>
                        <BackBtn onPress={() => navigation.navigate('register-infor-navigation')} />
                        <TouchableOpacity style={{
                            position: "absolute",
                            zIndex: 999,
                            top: SIZES.large - 45,
                            right: 25,
                        }}>
                            <Text style={{ fontSize: 24, color: "#2566AF", }}>Bỏ qua</Text>
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
                            onPress={() => navigation.navigate("payment-method-navigation")}
                            isValid={true}
                        />
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default UploadPhoto