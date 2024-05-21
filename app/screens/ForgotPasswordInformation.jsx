import React from 'react';
import { View, Text, TextInput, Input, TouchableOpacity, Image } from 'react-native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../screens/css/ViaMethodForgotPassword.style.js";
import Button from '../components/Button.jsx';
import BackBtn from '../components/BackBtn.jsx';
import { COLORS, SIZES } from '../constants/theme.js';

const ForgotPasswordInformation = ({ navigation, route }) => {
    const type = route.params;
    return (
        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <View>
                    <BackBtn onPress={() => navigation.navigate('login-navigation')} />
                    <TouchableOpacity style={{
                        position: "absolute",
                        zIndex: 999,
                        top: SIZES.large - 45,
                        right: 25,
                    }}>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textHeader}>
                        Quên mật khẩu
                    </Text>
                    <Text style={styles.textHeader_1}>
                        Nhâp thông tin dùng nhận mã xác minh để đặt lại mật khẩu của bạn
                    </Text>
                </View>

                {type === "phone" && <View style={[styles.view_3, { marginTop: 25, marginBottom: 25 }]}>
                    <MaterialCommunityIcons name="phone-message" size={30} color={COLORS.primary} />
                    <TextInput
                        style={{ marginLeft: 10, flex: 1 }}
                        placeholder='Số điện thoại'
                        placeholderTextColor='gray'
                        keyboardType='numeric'
                    />
                </View>
                }
                {type === "email" && <View style={[styles.view_3, { marginTop: 25, marginBottom: 25 }]}>
                    <MaterialCommunityIcons name="email-outline" size={30} color={COLORS.primary} />
                    <TextInput
                        style={{ marginLeft: 10, flex: 1 }}
                        placeholder='Email'
                        placeholderTextColor='gray'
                    />
                </View>

                }

                <View style={{ marginTop: "10%" }}>
                    <Button
                        title={"TIẾP TỤC"}
                        onPress={() => navigation.navigate("otp-navigation")}
                        isValid={true}
                    />
                </View>

            </View>
        </View>
    );
}

export default ForgotPasswordInformation; 
