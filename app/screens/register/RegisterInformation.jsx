import React from 'react';
import { View, Text, Button, TextInput, Input } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Register from './Register.jsx';
import styles from "../css/registerInformation.style.js";

const RegisterInformation = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.view_1}>
            <View style={styles.view_2}>
                <AntDesign
                    onPress={() => navigation.navigate(Register)}
                    name="left" size={30} color="red" />
            </View>
            <View>
                <Text style={styles.textHeader}>
                    Điền thông tin của bạn để bắt đầu
                </Text>
                <Text style={styles.textHeader_1}>
                    Dữ liệu này sẽ được hiển thị trong hồ sơ tài khoản của bạn
                </Text>
            </View>
            <View style={styles.view_3}>
                <FontAwesome5 name="user-edit" size={24} color="#FA7494" />
                <TextInput
                    style={{ marginLeft: 10 }}
                    placeholder='Tên'
                    placeholderTextColor='gray'
                />
            </View>
            <View style={[styles.view_3, { marginTop: 25 }]}>
                <FontAwesome5 name="user-edit" size={24} color="#FA7494" />
                <TextInput
                    style={{ marginLeft: 10 }}
                    placeholder='Họ'
                    placeholderTextColor='gray'
                />
            </View>
            <View style={[styles.view_3, { marginTop: 25 }]}>
                <MaterialCommunityIcons name="email-outline" size={30} color="#FA7494" />
                <TextInput
                    style={{ marginLeft: 10 }}
                    placeholder='Email'
                    placeholderTextColor='gray'
                />
            </View>
            <View style={styles.button}>
                <Text
                    style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
                >
                    Tiếp Tục
                </Text>
            </View>
        </View>
    );
}

export default RegisterInformation; 
