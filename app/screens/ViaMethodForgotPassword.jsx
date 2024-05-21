import React from 'react';
import { View, Text, TextInput, Input, TouchableOpacity, Image } from 'react-native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../screens/css/ViaMethodForgotPassword.style.js";
import Button from '../components/Button.jsx';
import BackBtn from '../components/BackBtn.jsx';
import { COLORS, SIZES } from '../constants/theme.js';

const ViaMethodForgotPassword = ({ navigation }) => {

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
                        Chọn phương thức dùng nhận mã xác minh để đặt lại mật khẩu của bạn
                    </Text>
                </View>
                <TouchableOpacity style={styles.view_3} onPress={() => navigation.navigate("info-method-navigation","phone")}>
                    <MaterialCommunityIcons name="phone-message" size={35} color={COLORS.primary} />
                    <Text style={styles.text}>Số điện thoại</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.view_3} onPress={() => navigation.navigate("info-method-navigation","email")}>
                    <MaterialCommunityIcons name="email-outline" size={35} color={COLORS.primary} />
                    <Text style={styles.text}>Địa chỉ email</Text>
                </TouchableOpacity>

                {/* <View style={{ marginTop: "10%" }}>
                    <Button
                        title={"TIẾP TỤC"}
                        onPress={() => navigation.navigate("congrats-navigation")}
                        isValid={true}
                    />
                </View> */}

            </View>
        </View>
    );
}

export default ViaMethodForgotPassword; 
