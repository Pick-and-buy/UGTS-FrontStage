import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const Comment = ({ visible, onClose }) => {
    const [comments, setComments] = useState([
        { id: 1, userName: 'Thanh Ha Bui', comment: 'Đáng đồng tiền bát gạo đấy. Tôi yêu chó lắm. Nhưng không đủ tiền mua cả con. Mỗi lần mua được có 5 lạng thôi', timeAgo: '1 ngày', avatar: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg' },
        { id: 2, userName: 'Phan Trung Hiếu', comment: 'Mặt nó gian vậy? :))', timeAgo: '17 giờ', avatar: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg' },
        { id: 3, userName: 'Thành Lộc', comment: 'Nhớ mua 2 bích xúc xích nha ní', timeAgo: '12 giờ', avatar: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg' },
        { id: 4, userName: 'Nam Nguyễn', comment: 'Trộm said: 2 que xương chứ phải :)))', timeAgo: '5 giờ', avatar: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg' },
    ]);

    const [newComment, setNewComment] = useState('');
    const currentUserAvatar = 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg';

    const addComment = () => {
        if (newComment.trim() !== '') {
            setComments([
                ...comments,
                { id: comments.length + 1, userName: 'User', comment: newComment, timeAgo: 'Just now', avatar: currentUserAvatar },
            ]);
            setNewComment('');
        }
    };

    const renderComment = ({ item }) => (
        <View style={styles.commentContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.commentTextContainer}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.commentText}>{item.comment}</Text>
                <Text style={styles.timeAgo}>{item.timeAgo}</Text>
            </View>
        </View>
    );

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>2.586 bình luận</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Icon name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderComment}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={styles.inputContainer}>
                        <Image source={{ uri: currentUserAvatar }} style={styles.avatarSmall} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Add a comment..."
                            value={newComment}
                            onChangeText={setNewComment}
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={addComment}>
                            <Icon name="arrow-up" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '100%',
        height: "70%",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        right: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    list: {
        paddingBottom: 16,
    },
    commentContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    avatarSmall: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    commentTextContainer: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
    },
    commentText: {
        fontSize: 16,
        marginTop: 4,
        marginBottom: 4,
    },
    timeAgo: {
        color: 'gray',
        fontSize: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingVertical: 8,
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Comment;
