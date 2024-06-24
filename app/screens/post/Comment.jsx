import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import { getComments, postComment } from '../../api/post';
import moment from 'moment';

const Comment = ({ visible, onClose, postId, isAuthenticated, user, navigation }) => {
    const userId = user?.id;
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isInputEmpty, setIsInputEmpty] = useState(true);

    const flatListRef = useRef();

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
    }, [comments]);

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        setIsInputEmpty(newComment.trim() === '');
    }, [newComment]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            alert("Comment is empty");
            return;
        } else if (!isAuthenticated) {
            Alert.alert(
                "Đăng nhập",
                "Bạn cần đăng nhập để bình luận bài viết.",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Đăng nhập",
                        onPress: () => navigation.navigate('login-navigation')
                    }
                ]
            );
            return;
        }

        try {
            await postComment(userId, postId, newComment);
            setNewComment(""); // Clear the input field
            fetchComments(); // Fetch updated comments list
        } catch (error) {
            console.error("Error posting comment", error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await getComments(postId);
            const formattedComments = response.data.map(comment => ({
                ...comment,
                timeAgo: moment(comment.createAt, 'YYYY-MM-DD HH:mm:ss').fromNow(),
            }));
            setComments(formattedComments); // Reverse the fetched comments
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const renderComment = ({ item }) => (
        <View style={styles.commentContainer}>
            <Image source={{ uri: item?.userImageUrl }} style={styles.avatar} />
            <View style={styles.commentTextContainer}>
                <Text style={styles.userName}>{item?.username}</Text>
                <Text style={styles.commentText}>{item?.commentContent}</Text>
                <Text style={styles.timeAgo}>{item?.timeAgo}</Text>
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
                        <Text style={styles.title}>{comments.length} bình luận</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Icon name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        ref={flatListRef}
                        data={comments.reverse()}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderComment}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={styles.inputContainer}>
                        <Image source={{ uri: user?.avatar }} style={styles.avatarSmall} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Thêm bình luận..."
                            value={newComment}
                            onChangeText={setNewComment}
                        />
                        <TouchableOpacity
                            style={[styles.sendButton, isInputEmpty && styles.sendButtonDisabled]}
                            onPress={handleCommentSubmit}
                            disabled={isInputEmpty}
                        >
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
        height: "65%",
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
        fontSize: 16,
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
        height: 35,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
});

export default Comment;
