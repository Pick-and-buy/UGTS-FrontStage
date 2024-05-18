import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, Input, Dimensions } from 'react-native';
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import Profile from "../Profile";
import { COLORS } from "../../constants/theme";
import { MaterialCommunityIcons, Foundation, MaterialIcons } from '@expo/vector-icons';


const Register = () => {

    const navigation = useNavigation();

    // State variable to hold the password 
    const [password, setPassword] = useState('');

    // State variable to track password visibility 
    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (

        <View>
            <View style={styles.view_0}>
                <Text style={styles.text}>
                    GIÁ TỐT
                </Text>
            </View>
            <View style={styles.view_1}>
                <View>
                    <Text style={styles.textHeader}>
                        Đăng ký
                    </Text>
                </View>
                <View style={styles.view_2}>
                    <Foundation name="telephone" size={25} color="#FA7494" />
                    <TextInput
                        style={{ marginLeft: 20 }}
                        placeholder='Số điện thoại'
                        placeholderTextColor='gray'
                    />
                </View>
                <View style={[styles.view_2, { marginTop: 25 }]}>
                    <MaterialIcons name="lock" size={24} color="#FA7494" />
                    <TextInput
                        style={{ marginLeft: 20 }}
                        placeholder='Mật khẩu'
                        placeholderTextColor='gray'
                        secureTextEntry={!showPassword}
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        style={{ position: "absolute", right: 10, top: 20 }}
                        color="#aaa"
                        onPress={toggleShowPassword}
                    />
                </View>
                <View style={[styles.view_2, { marginTop: 25 }]}>
                    <MaterialIcons name="lock" size={24} color="#FA7494" />
                    <TextInput
                        style={{ marginLeft: 20 }}
                        placeholder='Nhập lại mật khẩu'
                        placeholderTextColor='gray'
                        secureTextEntry={!showPassword}
                    />
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        style={{ position: "absolute", right: 10, top: 20 }}
                        color="#aaa"
                        onPress={toggleShowPassword}
                    />
                </View>
                <View style={styles.button}>
                    <Text
                        style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
                        onPress={() => navigation.navigate('register-navigation')}
                    >
                        Đăng ký
                    </Text>
                </View>
                <Text style={styles.footer}>Bạn đã có tài khoản ? 
                    <Text
                        style={{ color: 'red' }}
                        onPress={() => navigation.navigate(Profile)}
                    >
                        &nbsp;Đăng Nhập
                    </Text>
                </Text>
            </View>
        </View>
    );
}

export default Register;

const styles = StyleSheet.create({
    view_0: {
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        width: "100%",
        height: Dimensions.get('window').height * 0.30,
        alignItems: "center",
        paddingTop: 100
    },
    view_1: {
        marginTop: 10,
        marginLeft: 20,
    },
    textHeader: {
        width: '80%',
        height: 100,
        fontSize: 35,
        fontWeight: '800',
        textAlign: 'center',
    },
    view_2: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 20,
        width: '95%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderColor: COLORS.lightWhite
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: 150,
        height: 50,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,

    },
    footer: {
        color: COLORS.black,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 50
    },
    text: {
        color: COLORS.black,
        fontSize: 31,
        fontWeight: "bold",
        textAlign: 'center',
    }
})


