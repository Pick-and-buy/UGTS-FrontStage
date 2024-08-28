import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from "react";
import styles from '../css/createPost.style'
import CustomModalCreatePost from '../../components/CustomModalCreatePost';

const CreatePostGuideVerify = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        detailText: '',
        confirmText: '',
        cancelText: '',
        onConfirm: () => { },
        onClose: () => { }
    });

    const rulesGuide = () => {
        setModalContent({
            title: "",
            detailText: "",
            confirmText: "",
            onConfirm: () => {
                setModalVisible(false);
            },
        });
        setModalVisible(true);
    }

    return (
        <TouchableOpacity onPress={rulesGuide}
            style={{ width: "100%", flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', gap: 5 }}>
            <Text style={[styles.labelText, { marginLeft: 0 }]}>Các mức xác minh</Text>
            <View>
                <FontAwesome6 name="circle-question" size={14} color="gray" />
            </View>
            <CustomModalCreatePost
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                }}

                onConfirm={modalContent.onConfirm}
                title={modalContent.title}
                detailText={modalContent.detailText}
                confirmText={modalContent.confirmText}
            />
        </TouchableOpacity>
    )

}

export default CreatePostGuideVerify;