import React, { useRef, useState } from "react";
import { Image, View, Text, Button, TextInput, Input, ScrollView } from 'react-native';
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";
import { MaterialCommunityIcons, Foundation, MaterialIcons } from '@expo/vector-icons';
import styles from "../css/register.style";
import Login from "../Login";
import RegisterInformation from "./registerInormation";


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

        <ScrollView>
            <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                <View style={{ width: SIZES.width, height: SIZES.height / 3 }}>
                    <Image
                        style={{ position: "absolute", top: -25, right: -25, transform: [{ scale: 0.8 }] }}
                        source={require('../../../assets/images/sky.png')}
                    />
                    <Image
                        style={{ width: 380, height: 380 }}
                        source={require('../../../assets/images/GiaTot_Logo.png')}
                    />
                </View>

            </View>
            <View style={styles.view_1}>
                <View>
                    <Text style={styles.titleRegister}>
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
                <View style={styles.view_2}>
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
                <View style={styles.view_2}>
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
                        onPress={() => navigation.navigate(RegisterInformation)}
                    >
                        Đăng ký
                    </Text>
                </View>
                <Text style={styles.footer}>Bạn đã có tài khoản ?
                    <Text
                        style={{ color: 'red' }}
                        onPress={() => navigation.navigate(Login)}
                    >
                        &nbsp;Đăng Nhập
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
}

export default Register;

