import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const CustomModalCreatePost = ({ visible, onClose, onConfirm, title, detailText, confirmText, cancelText }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Quy Định</Text>
                    <Text style={styles.modalDetailText}>
                        Gồm có 3 mức xác minh: cấp 1, cấp 2 và cấp 3.
                    </Text>
                    <Text style={styles.modalDetailText}>
                        <Text style={{ color: COLORS.primary }}>Xác minh cấp 1:</Text> Người bán cung cấp đầy đủ ảnh và thông tin sản phẩm.
                    </Text>
                    <Text style={styles.modalDetailText}>
                        <Text style={{ color: "#ff8000" }}>Xác minh cấp 2:</Text> Người bán dùng cung cấp ảnh hóa đơn và video của sản phẩm.
                    </Text>
                    <Text style={styles.modalDetailText}>
                        <Text style={{ color: "#33cc33" }}>Xác minh cấp 3:</Text> Sản phẩm của người bán sẽ được kiểm tra và xác nhận là hàng thật từ dịch vụ LEGITGRAILS.
                    </Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={onConfirm}
                        >
                            <Text style={styles.modalButtonText}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 350,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDetailText: {
        width: "100%",
        textAlign: 'left',
        fontSize: 16,
        marginBottom: 10,
    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    modalButton: {
        width: '95%',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: "auto",
    },
    modalCancelButton: {
        width: '45%',
        backgroundColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: "auto",
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default CustomModalCreatePost;