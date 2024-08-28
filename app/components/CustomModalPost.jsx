import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';


const CustomModalPost = ({ visible, onClose, onConfirm, title, detailText, confirmText, cancelText }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{title}</Text>
                    <Text style={styles.modalDetailText}>{detailText}</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={onConfirm}
                        >
                            <Text style={styles.modalButtonText}>{confirmText || 'Xác nhận'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

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
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 25,
    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export default CustomModalPost;
