import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../css/notification.style'

const Notification = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="keyboard-backspace" size={26} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thông báo của tôi</Text>
            </View>

            <View style={styles.notificationItem}>
                <Image
                    source={{ uri: 'https://timbaby.net/wp-content/uploads/2022/11/anh-gai-xinh-2k5.jpg' }}
                    style={styles.image}
                />
                <View style={styles.content}>
                    <Text style={styles.content}>Ơ kìa</Text>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default Notification