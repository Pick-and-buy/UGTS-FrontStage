import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesome6, Entypo, Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme'
import styles from '../css/createPostGuide.style'
import Slider from '../home/Slider'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByToken } from '../../api/user';
import { useAuth } from '../../context/AuthContext';
import CustomModal from '../../components/CustomModal';

const CreatePostGuide = ({ navigation }) => {

    const { isAuthenticated, user } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        detailText: '',
        confirmText: '',
        cancelText: '',
        onConfirm: () => { },
        onClose: () => { }
    });

    const validateImages = () => {
        let valid = true;
        let message = '';
        let text = '';
        let navigateText = '';

        // Kiểm tra điều kiện khi người dùng chưa đăng nhập
        if (!isAuthenticated) {
            valid = false;
            message = 'Bạn cần đăng nhập để thực hiện tạo mới bài post';
            text = 'Đăng nhập';
            navigateText = 'login-navigation';

        } else 
        // if (!user?.isVerified) {
        //     valid = false;
        //     message = 'Bạn cần xác thực bằng căn cước công dân để thực hiện tạo mới bài post';
        //     text = 'Xác Thực';
        //     navigateText = 'GetID';
        // }
        return { valid, message, text, navigateText };
    };

    handleRedirectQuickCreatePost = () => {
        const { valid, message, text, navigateText } = validateImages();
        if (valid) {
            navigation.navigate("quick-create-post")
        } else {
            setModalContent({
                title: text,
                detailText: message,
                confirmText: text,
                cancelText: "Thoát",
                onConfirm: () => {
                    setModalVisible(false);
                    navigation.navigate(navigateText);
                },
            });
            setModalVisible(true);
        }
    }

    handleRedirectCreatePost = () => {
        const { valid, message, text, navigateText } = validateImages();
        if (valid) {
            navigation.navigate("create-post")
        } else {
            setModalContent({
                title: text,
                detailText: message,
                confirmText: text,
                cancelText: "Thoát",
                onConfirm: () => {
                    setModalVisible(false);
                    navigation.navigate(navigateText);
                },
            });
            setModalVisible(true);
        }
    }


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.heading}>Đăng bài</Text>
                <Image
                    source={require('../../../assets/images/beginner.png')}
                    style={styles.icon}
                />
            </View>

            <View style={styles.divider} />

            <View style={styles.news}>
                <Image
                    source={require('../../../assets/images/Advertising.png')}
                    style={styles.newsImage}
                />
            </View>

            <View style={styles.optionsWrapper}>
                <Text style={styles.title}>Tùy chọn</Text>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.option} onPress={handleRedirectQuickCreatePost}>
                        <FontAwesome6 name="bolt-lightning" size={28} color="black" />
                        <Text style={styles.text}>Đăng bài nhanh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={handleRedirectCreatePost}>
                        <Entypo name="news" size={28} color="black" />
                        <Text style={styles.text}>Đăng bài chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.guide}>
                <View style={styles.outline}>
                    <View style={styles.outlineHeader}>
                        <Image
                            source={require('../../../assets/images/beginner.png')}
                            style={styles.outlineImage}
                        />
                        <Text style={styles.title}>Hướng dẫn cho người mới</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Giao dịch</Text>
                            <Feather style={{ right: -10 }} name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Đóng gói</Text>
                            <Feather style={{ right: -10 }} name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Vận chuyển</Text>
                            <Feather style={{ right: -10 }} name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <CustomModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                }}
                onConfirm={modalContent.onConfirm}
                title={modalContent.title}
                detailText={modalContent.detailText}
                confirmText={modalContent.confirmText}
                cancelText={modalContent.cancelText}
            />
        </View>
    )
}

export default CreatePostGuide
